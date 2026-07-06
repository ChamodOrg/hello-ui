import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-008-a: API requests succeed without providing authentication credentials", async ({ request }) => {
  const apiBase = target("hello-api");

  // Explicitly omit Authorization header — Playwright's request fixture sends
  // no auth headers by default, which is exactly what we want here.
  const response = await request.get(`${apiBase}/hello?name=Test`, {
    headers: {}, // no Authorization
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.message).toBe("Hello, Test!");
});
