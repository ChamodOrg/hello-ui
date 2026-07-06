import { test, expect } from "@playwright/test";

test("AC-005-a: The greeting from the API response is displayed on the web page", async ({ page }) => {
  await page.goto("/");
  await page.locator("input").fill("Bob");
  await page.getByRole("button", { name: "Say Hello" }).click();
  const status = page.getByRole("status");
  await expect(status).toBeVisible();
  await expect(status).toHaveText("Hello, Bob!");
});
