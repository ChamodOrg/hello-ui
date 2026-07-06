import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-004-b: The API response contains a 'message' field", async ({ request }) => {
  const apiBase = target("hello-api");
  const response = await request.get(`${apiBase}/hello?name=Test`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Object.prototype.hasOwnProperty.call(body, "message")).toBe(true);
  expect(typeof body.message).toBe("string");
});
