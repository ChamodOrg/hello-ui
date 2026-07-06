import { test, expect } from "@playwright/test";

test("AC-002-a: Clicking the 'Say Hello' button triggers a request to the API with the entered name", async ({ page }) => {
  await page.goto("/");

  // Wait for the request that carries the name to the API (proxied through /api/hello)
  const requestPromise = page.waitForRequest((req) =>
    req.url().includes("/hello") && req.url().includes("name=Alice"),
  );

  await page.getByPlaceholder("Your name").fill("Alice");
  await page.getByRole("button", { name: "Say Hello" }).click();

  const request = await requestPromise;
  expect(request.url()).toContain("name=Alice");
});
