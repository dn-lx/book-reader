import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { longBook } from "../fixtures/reading-books";
async function login(page: Page, corpus?: "long" | "mixed" | "untimed") {
  if (corpus)
    await page
      .context()
      .addCookies([
        {
          name: "reader-test-corpus",
          value: corpus,
          url: "http://localhost:4174",
        },
      ]);
  const u = await (await page.request.post("/__test/account")).json();
  await page.request.post("/api/reader/login", {
    headers: { Origin: "http://localhost:4174" },
    data: { username: u.username, password: u.password },
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Open book", exact: true }).click();
  if (corpus !== "untimed")
    await expect(
      page.getByRole("article", { name: "Book text" }),
    ).toBeVisible();
}
async function savedAnchor(page: Page) {
  return page.evaluate(() => {
    const id = JSON.parse(localStorage.getItem("leaf.reader.session")!).account
      .id;
    return JSON.parse(localStorage.getItem(`leaf.account.${id}.progress.demo`)!)
      .reading;
  });
}
async function selectParagraph(page: Page) {
  await page
    .locator("[data-fragment]")
    .first()
    .evaluate((el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const s = window.getSelection()!;
      s.removeAllRanges();
      s.addRange(range);
    });
  await page.locator(".ebook-paper").dispatchEvent("mouseup");
  await expect(
    page.getByRole("region", { name: "Selected quotation" }),
  ).toBeVisible();
}
test("reading pages preserve all text and move across chapter boundaries without opening PDF", async ({
  page,
}) => {
  await login(page, "long");
  await expect(page.locator("[data-fragment]").first()).toContainText(
    "Moment 1.",
  );
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const all: string[] = [];
  let count = 0;
  do {
    all.push(...(await page.locator("[data-fragment]").allTextContents()));
    count++;
    await page
      .getByRole("button", { name: "Next reading page", exact: true })
      .click();
  } while (
    (await page.locator(".ebook-heading").innerText()).includes(
      "Chapter 1 of 2",
    ) &&
    count < 60
  );
  expect(count).toBeGreaterThan(1);
  expect(all.join("")).toBe(
    longBook.chapters[0].segments.map((s) => s.text).join(""),
  );
  await expect(
    page.getByRole("heading", { name: "The next page", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Previous reading page", exact: true })
    .click();
  await expect(page.locator("[data-fragment]").last()).toContainText(
    "Every word deserves its place",
  );
  await expect(page.locator("canvas")).toHaveCount(0);
  expect(errors).toEqual([]);
});
test("reading place survives reflow, audio saves and reload; appearance is accessible", async ({
  page,
}, info) => {
  await login(page, "long");
  await page
    .getByRole("button", { name: "Next reading page", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Next reading page", exact: true })
    .click();
  const anchor = await savedAnchor(page);
  expect(anchor.offset).toBeGreaterThan(0);
  await page.getByLabel("Reading appearance", { exact: true }).click();
  await page.getByRole("button", { name: "Larger text", exact: true }).click();
  await page.getByRole("button", { name: "Clean sans", exact: true }).click();
  await page.getByRole("button", { name: "Airy", exact: true }).click();
  await page.getByRole("button", { name: "Sepia", exact: true }).click();
  await expect(page.locator(".ebook-reader")).toHaveAttribute(
    "data-surface",
    "sepia",
  );
  expect(await savedAnchor(page)).toEqual(anchor);
  const a = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(a.violations).toEqual([]);
  await page.getByLabel("Reading appearance", { exact: true }).click();
  await page
    .getByRole("button", { name: "Play narration", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Pause narration", exact: true }),
  ).toBeVisible();
  await expect
    .poll(() => page.getByLabel("Chapter playback position").inputValue())
    .not.toBe("0");
  await page
    .getByRole("button", { name: "Pause narration", exact: true })
    .click();
  expect(await savedAnchor(page)).toEqual(anchor);
  await page.reload();
  await page
    .getByRole("button", { name: "Continue reading", exact: true })
    .click();
  expect(await savedAnchor(page)).toEqual(anchor);
  await expect(page.locator(".ebook-prose")).toHaveClass(/font-sans/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: info.outputPath("ebook-sepia.png"),
    fullPage: true,
  });
});
test("selected quotations become private highlights and notes and reopen at their text location", async ({
  page,
}, info) => {
  await login(page);
  await selectParagraph(page);
  await page.getByRole("button", { name: "Highlight", exact: true }).click();
  await expect(page.locator(".ebook-prose mark")).toContainText(
    "A quiet beginning.",
  );
  await selectParagraph(page);
  await page.getByRole("button", { name: "Add note", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("A quiet beginning.");
  await page
    .getByLabel("Your note", { exact: true })
    .fill("A thought attached to this sentence.");
  await page.getByRole("button", { name: "Save note", exact: true }).click();
  await expect(page.locator(".notes-list")).toContainText(
    "A thought attached to this sentence.",
  );
  await page.getByRole("button", { name: "Close dialog", exact: true }).click();
  await page.reload();
  await page
    .getByRole("button", { name: "Continue reading", exact: true })
    .click();
  await expect(page.locator(".ebook-prose mark")).toContainText(
    "A quiet beginning.",
  );
  await page.getByRole("button", { name: "Make a note", exact: true }).click();
  await expect(page.locator(".notes-list")).toContainText(
    "A thought attached to this sentence.",
  );
  await page
    .getByRole("button", { name: "Open page", exact: true })
    .last()
    .click();
  await expect(page.getByRole("article", { name: "Book text" })).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.screenshot({
    path: info.outputPath("ebook-highlight.png"),
    fullPage: true,
  });
});
