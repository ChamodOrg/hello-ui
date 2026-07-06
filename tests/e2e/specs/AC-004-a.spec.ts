// spec: AC-004-a
import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-004-a: The API response is valid JSON", async ({ request }) => {
  const apiUrl = target("hello-api");
  const response = await request.get(`${apiUrl}/hello?name=Alice`);
  expect(response.ok()).toBeTruthy();
  const contentType = response.headers()["content-type"] ?? "";
  expect(contentType).toContain("application/json");
  // Parsing must not throw — if the body isn't JSON, json() will reject.
  const body = await response.json();
  expect(typeof body).toBe("object");
});
