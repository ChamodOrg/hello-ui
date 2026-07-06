import { test, expect } from "@playwright/test";

test("AC-006-a: Clicking the button with an empty text box results in a greeting of 'Hello, World!'", async ({ page }) => {
  await page.goto("/");

  // Leave the text box empty and click the button
  await page.getByRole("button", { name: "Say Hello" }).click();

  const greeting = page.getByRole("status");
  await expect(greeting).toBeVisible({ timeout: 10_000 });
  await expect(greeting).toContainText("Hello, World!");
});
