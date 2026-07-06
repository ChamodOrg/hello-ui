import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-007-a: The API provides a single endpoint for greeting requests", async ({ request }) => {
  const apiBase = target("hello-api");

  // The greeting endpoint must return 200 with a message
  const helloResponse = await request.get(`${apiBase}/hello?name=Test`);
  expect(helloResponse.status()).toBe(200);
  const body = await helloResponse.json();
  expect(typeof body.message).toBe("string");

  // Alternative paths should not return a valid greeting (expect non-200)
  const greetResponse = await request.get(`${apiBase}/greet?name=Test`);
  expect(greetResponse.status()).not.toBe(200);

  const apiResponse = await request.get(`${apiBase}/api?name=Test`);
  expect(apiResponse.status()).not.toBe(200);
});
