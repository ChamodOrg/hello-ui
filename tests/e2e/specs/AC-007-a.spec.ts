import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-007-a: The API provides a single endpoint for greeting requests", async ({ request }) => {
  const apiUrl = target("hello-api");

  // The canonical greeting endpoint responds successfully
  const helloResponse = await request.get(`${apiUrl}/hello?name=World`);
  expect(helloResponse.ok()).toBeTruthy();
  const body = await helloResponse.json();
  expect(body).toHaveProperty("message");

  // Alternative greeting path variants are NOT served (not 200)
  const greetResponse = await request.get(`${apiUrl}/greet`);
  expect(greetResponse.status()).not.toBe(200);

  const apiHelloResponse = await request.get(`${apiUrl}/api/hello`);
  expect(apiHelloResponse.status()).not.toBe(200);
});
