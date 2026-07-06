// spec: test-plan.md#AC-002-a
import { test, expect } from "@playwright/test";

test("AC-002-a: Clicking the 'Say Hello' button triggers a request to the API with the entered name", async ({ page }) => {
  await page.goto("/");

  // Intercept the fetch to the API hello endpoint (proxied via /api/hello)
  const requestPromise = page.waitForRequest((req) =>
    req.url().includes("/hello") && req.url().includes("name=")
  );

  await page.locator("input").fill("Alice");
  await page.getByRole("button", { name: "Say Hello" }).click();

  const request = await requestPromise;
  const url = new URL(request.url());
  expect(url.searchParams.get("name")).toBe("Alice");
});
