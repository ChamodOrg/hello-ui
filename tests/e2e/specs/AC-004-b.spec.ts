// spec: AC-004-b
import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-004-b: The API response contains a 'message' field", async ({ request }) => {
  const apiUrl = target("hello-api");
  const response = await request.get(`${apiUrl}/hello?name=Alice`);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(typeof body.message).toBe("string");
});
