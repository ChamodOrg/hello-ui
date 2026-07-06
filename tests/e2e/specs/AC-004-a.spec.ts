// spec: test-plan.md#AC-004-a
import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-004-a: The API response is valid JSON", async ({ request }) => {
  const apiUrl = target("hello-api");
  const response = await request.get(`${apiUrl}/hello?name=Test`);
  expect(response.ok()).toBeTruthy();
  const contentType = response.headers()["content-type"] ?? "";
  expect(contentType).toContain("application/json");
  // response.json() throws if the body is not valid JSON
  const body = await response.json();
  expect(typeof body).toBe("object");
});
