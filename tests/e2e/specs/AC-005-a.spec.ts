import { test, expect } from "@playwright/test";

test("AC-005-a: The greeting from the API response is displayed on the web page", async ({ page }) => {
  await page.goto("/");

  const input = page.locator("input");
  await input.fill("Bob");

  await page.getByRole("button", { name: "Say Hello" }).click();

  // Wait for the greeting to appear in the status element
  const greeting = page.getByRole("status");
  await expect(greeting).toBeVisible({ timeout: 10_000 });
  await expect(greeting).toContainText("Hello, Bob!");
});
