import { test, expect } from "@playwright/test";

test("AC-003-a: The API returns a response containing 'Hello, <name>!' where <name> is the provided name", async ({ request }) => {
  const response = await request.get("http://localhost:9090/hello?name=TestUser");
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.message).toBe("Hello, TestUser!");
});
