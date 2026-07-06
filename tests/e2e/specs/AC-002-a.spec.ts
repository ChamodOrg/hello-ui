import { test, expect } from "@playwright/test";

test("AC-002-a: Clicking the 'Say Hello' button triggers a request to the API with the entered name", async ({ page }) => {
  // Capture the outgoing request to the API (via the /api proxy)
  const requestPromise = page.waitForRequest((req) =>
    req.url().includes("/api/hello") && req.url().includes("name=Alice"),
  );

  await page.goto("/");
  await page.getByPlaceholder("Your name").fill("Alice");
  await page.getByRole("button", { name: "Say Hello" }).click();

  const request = await requestPromise;
  const url = new URL(request.url());
  expect(url.searchParams.get("name")).toBe("Alice");
});
