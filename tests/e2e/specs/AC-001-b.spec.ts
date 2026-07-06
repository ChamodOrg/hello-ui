import { test, expect } from "@playwright/test";

test("AC-001-b: A 'Say Hello' button is visible on the web page", async ({ page }) => {
  await page.goto("/");
  const button = page.getByRole("button", { name: "Say Hello" });
  await expect(button).toBeVisible();
});
