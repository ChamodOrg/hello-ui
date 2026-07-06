import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-004-a: The API response is valid JSON", async ({ request }) => {
  const response = await request.get(`${target("hello-api")}/hello?name=Test`);
  expect(response.ok()).toBeTruthy();
  // Content-Type must be application/json
  const contentType = response.headers()["content-type"] ?? "";
  expect(contentType).toContain("application/json");
  // Body must parse without error
  const body = await response.json();
  expect(typeof body).toBe("object");
});
