import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-004-a: The API response is valid JSON", async ({ request }) => {
  const apiBase = target("hello-api");
  const response = await request.get(`${apiBase}/hello?name=Test`);
  expect(response.status()).toBe(200);

  // Content-Type must indicate JSON
  const contentType = response.headers()["content-type"] ?? "";
  expect(contentType).toContain("application/json");

  // body must parse as JSON without throwing
  const body = await response.json();
  expect(typeof body).toBe("object");
  expect(body).not.toBeNull();
});
