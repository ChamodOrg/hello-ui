import { test, expect } from "@playwright/test";

test("AC-004-b: The API response contains a 'message' field", async ({ request }) => {
  const response = await request.get("http://localhost:9090/hello?name=World");
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toHaveProperty("message");
  expect(typeof body.message).toBe("string");
});
