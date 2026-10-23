import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const origin = "http://localhost:4174";
async function user(page: Page) {
  return (await page.request.post("/__test/account")).json();
}
async function signIn(page: Page, u: { username: string; password: string }) {
  await page.goto("/");
  await page.getByLabel("Username", { exact: true }).fill(u.username);
  await page.getByLabel("Password", { exact: true }).fill(u.password);
  await page.getByRole("button", { name: "Enter my library" }).click();
  await expect(
    page.getByRole("heading", { name: "A Quiet Beginning", exact: true }),
  ).toBeVisible();
}
async function menu(page: Page) {
  const button = page.getByRole("button", {
    name: "Open library menu",
    exact: true,
  });
  if (
    !(await page.locator(".sidebar.drawer-open").count()) &&
    (await button.isVisible())
  )
    await button.click();
}
async function notes(page: Page) {
  await menu(page);
  await page.getByRole("button", { name: /My notes/ }).click();
}
async function logout(page: Page) {
  await menu(page);
  await page.getByRole("button", { name: "Sign out", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Welcome back." }),
  ).toBeVisible();
  // The reader closes immediately; the form becomes available after worker cleanup/revocation.
  await expect(
    page.getByRole("button", { name: "Enter my library", exact: true }),
  ).toBeEnabled();
}
test("invitation-only sign-in is accessible and book files reject anonymous requests", async ({
  page,
}, info) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Welcome back." }),
  ).toBeVisible();
  for (const url of [
    "/library.json",
    "/books/demo/book.json",
    "/books/demo/book.pdf",
    "/books/demo/1.wav",
  ])
    expect((await page.request.get(url)).status()).toBe(401);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.screenshot({
    path: info.outputPath("sign-in.png"),
    fullPage: true,
  });
});
test("notes and bookmarks stay private across account switches and a fresh browser", async ({
  page,
  browser,
}, info) => {
  const alice = await user(page),
    bob = await user(page);
  await signIn(page, alice);
  await page.getByRole("button", { name: "Open book", exact: true }).click();
  await page.getByRole("button", { name: "Bookmark this moment" }).click();
  await notes(page);
  await page
    .getByLabel("Your note", { exact: true })
    .fill("A thought only Alice should see.");
  await page.getByRole("button", { name: "Save note", exact: true }).click();
  await expect(page.locator(".note-card")).toContainText(
    "A thought only Alice",
  );
  await expect
    .poll(async () => {
      const s = await page.evaluate(
        () =>
          JSON.parse(localStorage.getItem("leaf.reader.session")!).account.id,
      );
      return (
        await (
          await page.request.get("/api/reader/state", {
            headers: { "X-Reader-Account": s },
          })
        ).json()
      ).items.filter((x: any) => x.key.startsWith("note.")).length;
    })
    .toBe(1);
  await page.getByRole("button", { name: "Close dialog" }).click();
  await logout(page);
  await signIn(page, bob);
  await notes(page);
  await expect(page.locator(".note-card")).toHaveCount(0);
  await page.getByRole("button", { name: "Close dialog" }).click();
  await logout(page);
  await signIn(page, alice);
  await notes(page);
  await expect(page.locator(".note-card")).toContainText(
    "A thought only Alice",
  );
  await page.getByRole("button", { name: "Edit note", exact: true }).click();
  await page
    .getByLabel("Your note", { exact: true })
    .fill("An edited thought.");
  await page.getByRole("button", { name: "Save note", exact: true }).click();
  await expect(page.locator(".note-card")).toContainText("An edited thought.");
  await page.screenshot({
    path: info.outputPath("personal-notes.png"),
    fullPage: true,
  });
  await expect
    .poll(async () => {
      const id = await page.evaluate(
        () =>
          JSON.parse(localStorage.getItem("leaf.reader.session")!).account.id,
      );
      return (
        await (
          await page.request.get("/api/reader/state", {
            headers: { "X-Reader-Account": id },
          })
        ).json()
      ).items.some((x: any) => x.value?.body === "An edited thought.");
    })
    .toBe(true);
  const other = await browser.newContext();
  const second = await other.newPage();
  await signIn(second, alice);
  await notes(second);
  await expect(second.locator(".note-card")).toContainText(
    "An edited thought.",
  );
  await other.close();
  await page.getByRole("button", { name: "Delete note", exact: true }).click();
  await expect(page.locator(".note-card")).toHaveCount(0);
});
test("offline outbox survives reload, restarts workers, and logout clears other tabs", async ({
  page,
  context,
}) => {
  const alice = await user(page);
  await signIn(page, alice);
  await page.getByRole("button", { name: "Open book", exact: true }).click();
  await page.getByRole("button", { name: "Save offline", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Remove offline copy", exact: true }),
  ).toBeVisible();
  const second = await context.newPage();
  await second.goto("/");
  await expect(
    second.getByRole("heading", { name: "A Quiet Beginning", exact: true }),
  ).toBeVisible();
  await context.setOffline(true);
  await notes(page);
  await page
    .getByLabel("Your note", { exact: true })
    .fill("A quiet offline thought.");
  await page.getByRole("button", { name: "Save note", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "A Quiet Beginning", exact: true }),
  ).toBeVisible();
  await notes(page);
  await expect(page.locator(".note-card")).toContainText(
    "A quiet offline thought.",
  );
  const cdp = await context.newCDPSession(page);
  await cdp.send("ServiceWorker.enable");
  await cdp.send("ServiceWorker.stopAllWorkers");
  expect(
    await page.evaluate(async () => (await fetch("/library.json")).status),
  ).toBe(200);
  await context.setOffline(false);
  await expect
    .poll(async () => {
      const id = await page.evaluate(
        () =>
          JSON.parse(localStorage.getItem("leaf.reader.session")!).account.id,
      );
      return (
        await (
          await page.request.get("/api/reader/state", {
            headers: { "X-Reader-Account": id },
          })
        ).json()
      ).items.filter((x: any) => x.value?.body === "A quiet offline thought.")
        .length;
    })
    .toBe(1);
  await page.getByRole("button", { name: "Close dialog" }).click();
  await logout(page);
  await expect(
    second.getByRole("heading", { name: "Welcome back." }),
  ).toBeVisible();
  expect(
    await second.evaluate(async () => (await fetch("/library.json")).status),
  ).toBe(401);
  await cdp.detach();
});

test("expiry signs out an open reader and logout survives unavailable local storage", async ({
  page,
}) => {
  const alice = await user(page);
  await page.route("**/api/reader/login", async (route) => {
    const response = await route.fetch(),
      data = await response.json();
    data.expiresAt = new Date(Date.now() + 1600).toISOString();
    await route.fulfill({ response, json: data });
  });
  await signIn(page, alice);
  await expect(
    page.getByRole("heading", { name: "Welcome back." }),
  ).toBeVisible({ timeout: 5000 });
  await page.unroute("**/api/reader/login");
  await signIn(page, alice);
  await page.evaluate(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === "leaf.reader.logged-out")
        throw new DOMException("Quota reached", "QuotaExceededError");
      return original.call(this, key, value);
    };
  });
  await logout(page);
  await expect(page.locator(".app-shell")).toHaveCount(0);
});

test("failed logout keeps the reader closed until server revocation can retry", async ({
  page,
}) => {
  const alice = await user(page);
  await signIn(page, alice);
  await page.route("**/api/reader/logout", (route) =>
    route.fulfill({ status: 503, json: { error: "Temporarily unavailable" } }),
  );
  await logout(page);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Welcome back." }),
  ).toBeVisible();
  await expect(page.locator(".app-shell")).toHaveCount(0);
  await page.unroute("**/api/reader/logout");
  await signIn(page, alice);
});
