import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-008-a: API requests succeed without providing authentication credentials", async ({ request }) => {
  // Issue the request with no Authorization or cookie headers — just a plain GET
  const response = await request.get(`${target("hello-api")}/hello?name=World`, {
    headers: {}, // no auth
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.message).toBe("Hello, World!");
});
