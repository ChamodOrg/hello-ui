import { test, expect } from "@playwright/test";

test("AC-008-a: API requests succeed without providing authentication credentials", async ({ request }) => {
  // Make a request to the /hello endpoint with no Authorization header or credentials
  const response = await request.get("http://localhost:9090/hello?name=NoAuth", {
    headers: {
      // Explicitly no Authorization header
    },
  });
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.message).toBe("Hello, NoAuth!");
});
