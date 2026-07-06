import { test, expect } from "@playwright/test";

test("AC-005-a: The greeting from the API response is displayed on the web page", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Your name").fill("Alice");
  await page.getByRole("button", { name: "Say Hello" }).click();

  const greeting = page.getByRole("status");
  await expect(greeting).toBeVisible();
  await expect(greeting).toHaveText("Hello, Alice!");
});
