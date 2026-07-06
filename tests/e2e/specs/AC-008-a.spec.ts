// spec: test-plan.md#AC-008-a
import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-008-a: API requests succeed without providing authentication credentials", async ({ request }) => {
  const apiUrl = target("hello-api");
  // Issue request with no Authorization header, no Cookie — the default APIRequestContext
  const response = await request.get(`${apiUrl}/hello?name=NoAuth`);
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.message).toBe("Hello, NoAuth!");
});
