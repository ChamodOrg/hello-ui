// spec: AC-006-a
import { test, expect } from "@playwright/test";

test("AC-006-a: Clicking the button with an empty text box results in a greeting of 'Hello, World!'", async ({ page }) => {
  await page.goto("/");
  // Leave the input empty — the API defaults to "World" when name is blank.
  await page.getByRole("button", { name: "Say Hello" }).click();
  const greeting = page.getByRole("status");
  await expect(greeting).toBeVisible();
  await expect(greeting).toHaveText("Hello, World!");
});
