import { test, expect } from "@playwright/test";

test("AC-002-a: Clicking the 'Say Hello' button triggers a request to the API with the entered name", async ({ page }) => {
  const apiRequests: string[] = [];

  // Intercept all requests and record those going to /hello or /api/hello
  page.on("request", (req) => {
    const url = req.url();
    if (url.includes("/hello")) {
      apiRequests.push(url);
    }
  });

  await page.goto("/");

  const input = page.locator("input");
  await input.fill("Alice");

  await page.getByRole("button", { name: "Say Hello" }).click();

  // Wait for any response to /hello
  await page.waitForResponse((res) => res.url().includes("/hello"));

  expect(apiRequests.length).toBeGreaterThan(0);
  // The request URL should contain the encoded name "Alice"
  const requestWithName = apiRequests.find((url) =>
    url.includes("Alice") || url.includes("name=Alice")
  );
  expect(requestWithName).toBeTruthy();
});
