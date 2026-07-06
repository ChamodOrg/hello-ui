import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-003-a: The API returns a response containing 'Hello, <name>!' where <name> is the provided name", async ({ request }) => {
  const response = await request.get(`${target("hello-api")}/hello?name=Alice`);
  expect(response.ok()).toBeTruthy();
  const text = await response.text();
  expect(text).toContain("Hello, Alice!");
});
