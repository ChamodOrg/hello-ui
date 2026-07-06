// spec: AC-007-a
import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-007-a: The API provides a single endpoint for greeting requests", async ({ request }) => {
  const apiUrl = target("hello-api");
  // The documented greeting endpoint /hello must respond 200.
  const helloResponse = await request.get(`${apiUrl}/hello?name=World`);
  expect(helloResponse.status()).toBe(200);

  // No other undocumented greeting endpoint should respond 200.
  const altResponse = await request.get(`${apiUrl}/greet?name=World`);
  expect(altResponse.status()).not.toBe(200);
});
