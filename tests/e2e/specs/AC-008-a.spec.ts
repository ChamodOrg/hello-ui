// spec: AC-008-a
import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-008-a: API requests succeed without providing authentication credentials", async ({ request }) => {
  const apiUrl = target("hello-api");
  // No Authorization header is sent — the default Playwright request fixture sends none.
  const response = await request.get(`${apiUrl}/hello?name=World`);
  expect(response.status()).toBe(200);
});
