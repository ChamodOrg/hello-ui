import { test, expect } from "@playwright/test";

test("AC-001-a: A text box for entering a name is visible on the web page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByPlaceholder("Your name")).toBeVisible();
});
