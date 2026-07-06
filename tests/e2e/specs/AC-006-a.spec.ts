// spec: test-plan.md#AC-006-a
import { test, expect } from "@playwright/test";

test("AC-006-a: Clicking the button with an empty text box results in a greeting of 'Hello, World!'", async ({ page }) => {
  await page.goto("/");
  // Ensure the input is empty (default state)
  await expect(page.locator("input")).toHaveValue("");
  await page.getByRole("button", { name: "Say Hello" }).click();
  const status = page.getByRole("status");
  await expect(status).toBeVisible();
  await expect(status).toHaveText("Hello, World!");
});
