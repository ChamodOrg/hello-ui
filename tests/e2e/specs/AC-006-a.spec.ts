import { test, expect } from "@playwright/test";

test("AC-006-a: Clicking the button with an empty text box results in a greeting of 'Hello, World!'", async ({ page }) => {
  await page.goto("/");
  // Name input is empty by default; click straight away
  await page.getByRole("button", { name: "Say Hello" }).click();
  await expect(page.getByRole("status")).toHaveText("Hello, World!");
});
