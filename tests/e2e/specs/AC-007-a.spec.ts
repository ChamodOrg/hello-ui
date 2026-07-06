import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-007-a: The API provides a single endpoint for greeting requests", async ({ request }) => {
  // The documented greeting endpoint /hello must respond successfully
  const helloResponse = await request.get(`${target("hello-api")}/hello?name=World`);
  expect(helloResponse.ok()).toBeTruthy();
  const body = await helloResponse.json();
  expect(body).toHaveProperty("message");

  // Alternative paths that are not the designated greeting endpoint must not
  // return a greeting — confirming /hello is the one and only greeting path
  const greetResponse = await request.get(`${target("hello-api")}/greet?name=World`);
  expect(greetResponse.ok()).toBeFalsy();

  const greetingResponse = await request.get(`${target("hello-api")}/greeting?name=World`);
  expect(greetingResponse.ok()).toBeFalsy();
});
