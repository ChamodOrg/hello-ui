// spec: test-plan.md#AC-003-a
import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-003-a: The API returns a response containing 'Hello, <name>!' where <name> is the provided name", async ({ request }) => {
  const apiUrl = target("hello-api");
  const response = await request.get(`${apiUrl}/hello?name=Ada`);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.message).toBe("Hello, Ada!");
});
