# Test Plan — hello-ui validation (issue #1)

Generated: 2026-07-06

## Targets

| Component | URL |
|---|---|
| hello-web | http://localhost:5173 |
| hello-api | http://localhost:9090 |

## Observations

- The API (hello-api) exposes GET /hello?name=<name> and returns {"message":"Hello, <name>!"}.
- When name is empty or missing the API returns {"message":"Hello, World!"} (not "Welcome, Stranger!").
- AC-006-a expects "Welcome, Stranger!" — this will fail against the live implementation.
- The web UI renders an `<input>` for the name, a `<button>` labelled "Say Hello", and a `<p role="status">` for the greeting.
- The web proxies /api/* to http://localhost:9090 via the Vite dev server.

---

## AC-001-a

**Must:** A text box for entering a name is visible on the web page.
**Target:** hello-web (browser)
**Steps:**
1. Navigate to http://localhost:5173.
2. Locate the `<input>` element on the page.
**Expected assertion:** The input is visible.

---

## AC-001-b

**Must:** A 'Say Hello' button is visible on the web page.
**Target:** hello-web (browser)
**Steps:**
1. Navigate to http://localhost:5173.
2. Locate the button with text "Say Hello".
**Expected assertion:** The button is visible.

---

## AC-002-a

**Must:** Clicking the 'Say Hello' button triggers a request to the API with the entered name.
**Target:** hello-web (browser)
**Steps:**
1. Navigate to http://localhost:5173.
2. Intercept network requests to `**/hello**`.
3. Type "Alice" into the name input.
4. Click the "Say Hello" button.
5. Wait for the intercepted request.
**Expected assertion:** The captured request URL contains `name=Alice`.

---

## AC-003-a

**Must:** The API returns a response containing 'Hello, <name>!' where <name> is the provided name.
**Target:** hello-api (request fixture)
**Steps:**
1. Send GET http://localhost:9090/hello?name=Alice via the Playwright request fixture.
2. Parse the response body as JSON.
**Expected assertion:** response.message === "Hello, Alice!"

---

## AC-004-a

**Must:** The API response is valid JSON.
**Target:** hello-api (request fixture)
**Steps:**
1. Send GET http://localhost:9090/hello?name=Alice.
2. Check Content-Type header.
3. Parse response body.
**Expected assertion:** Content-Type includes "application/json" and body parses without error.

---

## AC-004-b

**Must:** The API response contains a 'message' field.
**Target:** hello-api (request fixture)
**Steps:**
1. Send GET http://localhost:9090/hello?name=Alice.
2. Parse the JSON response body.
**Expected assertion:** The parsed object has a "message" key whose value is a string.

---

## AC-005-a

**Must:** The greeting from the API response is displayed on the web page.
**Target:** hello-web (browser)
**Steps:**
1. Navigate to http://localhost:5173.
2. Type "Alice" into the name input.
3. Click the "Say Hello" button.
4. Wait for the element with role "status" to appear.
**Expected assertion:** The element with role "status" contains "Hello, Alice!".

---

## AC-006-a

**Must:** Clicking the button with an empty text box results in a greeting of 'Welcome, Stranger!'.
**Target:** hello-web (browser)
**Steps:**
1. Navigate to http://localhost:5173.
2. Leave the name input empty.
3. Click the "Say Hello" button.
4. Wait for the element with role "status".
**Expected assertion:** The element with role "status" contains "Welcome, Stranger!".
**Note:** The live API returns "Hello, World!" when name is empty — this test is expected to FAIL.

---

## AC-007-a

**Must:** The API provides a single endpoint for greeting requests.
**Target:** hello-api (request fixture)
**Steps:**
1. Send GET http://localhost:9090/hello?name=World.
2. Verify a 200 OK response.
3. Attempt GET http://localhost:9090/greet (a different path) and verify it does not return 200.
**Expected assertion:** /hello returns 200; no other greeting endpoint responds 200.

---

## AC-008-a

**Must:** API requests succeed without providing authentication credentials.
**Target:** hello-api (request fixture)
**Steps:**
1. Send GET http://localhost:9090/hello?name=World with no Authorization header.
**Expected assertion:** Response status is 200.

---
