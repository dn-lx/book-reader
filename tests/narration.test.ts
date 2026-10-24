import { test } from "node:test";
import { execFileSync } from "node:child_process";
test("offline narration tools preserve word offsets, validate real marks and bound Google requests", () => {
  execFileSync("python3", ["tests/narration_python.py"], { stdio: "pipe" });
});
