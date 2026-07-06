import { test, expect } from "@playwright/test";

test("AC-001-b: A 'Say Hello' button is visible on the web page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Say Hello" })).toBeVisible();
});
