// spec: AC-002-a
import { test, expect } from "@playwright/test";

test("AC-002-a: Clicking the 'Say Hello' button triggers a request to the API with the entered name", async ({ page }) => {
  await page.goto("/");

  const [request] = await Promise.all([
    page.waitForRequest((req) => req.url().includes("/hello") && req.url().includes("name=Alice")),
    page.locator("input").fill("Alice"),
    page.getByRole("button", { name: "Say Hello" }).click(),
  ]);

  expect(request.url()).toContain("name=Alice");
});
