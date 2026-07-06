import { test, expect } from "@playwright/test";

test("AC-004-a: The API response is valid JSON", async ({ request }) => {
  const response = await request.get("http://localhost:9090/hello?name=World");
  expect(response.ok()).toBeTruthy();
  const contentType = response.headers()["content-type"] ?? "";
  expect(contentType).toContain("application/json");
  // response.json() throws if body is not valid JSON
  const body = await response.json();
  expect(body).toBeTruthy();
});
