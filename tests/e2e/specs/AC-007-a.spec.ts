import { test, expect } from "@playwright/test";

test("AC-007-a: The API provides a single endpoint for greeting requests", async ({ request }) => {
  // The /hello endpoint must be accessible and return a valid greeting
  const helloResp = await request.get("http://localhost:9090/hello");
  expect(helloResp.ok()).toBeTruthy();
  const body = await helloResp.json();
  expect(body).toHaveProperty("message");

  // A non-existent path should NOT return 200, confirming /hello is the single greeting endpoint
  const otherResp = await request.get("http://localhost:9090/greet");
  expect(otherResp.status()).not.toBe(200);
});
