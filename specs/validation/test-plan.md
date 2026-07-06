# Test Plan — Issue #1 (hello-ui validation)

Generated for: 10 e2e criteria (AC-001-a through AC-008-a), 0 manual, 0 scenario.

## AC-001-a

- **Must:** A text box for entering a name is visible on the web page
- **Target:** hello-web (http://localhost:5173)
- **Steps:**
  1. Navigate to the primary URL (baseURL = http://localhost:5173).
  2. Query for an `<input>` element.
- **Expected:** The input element is visible on the page.

## AC-001-b

- **Must:** A 'Say Hello' button is visible on the web page
- **Target:** hello-web (http://localhost:5173)
- **Steps:**
  1. Navigate to the primary URL.
  2. Query for a `<button>` with text "Say Hello".
- **Expected:** The button is visible on the page.

## AC-002-a

- **Must:** Clicking the 'Say Hello' button triggers a request to the API with the entered name
- **Target:** hello-web (http://localhost:5173)
- **Steps:**
  1. Navigate to the primary URL.
  2. Register a route interceptor for `**/hello*`.
  3. Type "Alice" into the name input.
  4. Click the "Say Hello" button.
  5. Await the intercepted request.
- **Expected:** The intercepted URL includes `name=Alice` as a query parameter.

## AC-003-a

- **Must:** The API returns a response containing 'Hello, <name>!' where <name> is the provided name
- **Target:** hello-api (http://localhost:9090)
- **Steps:**
  1. Use the `request` fixture to GET `/hello?name=Ada` on the API base URL.
  2. Parse response body as JSON.
- **Expected:** `body.message` equals `"Hello, Ada!"`.

## AC-004-a

- **Must:** The API response is valid JSON
- **Target:** hello-api (http://localhost:9090)
- **Steps:**
  1. Use the `request` fixture to GET `/hello?name=Test` on the API base URL.
  2. Assert `response.ok()` is true.
  3. Assert `Content-Type` header contains `application/json`.
  4. Call `response.json()` (throws on invalid JSON).
- **Expected:** No error thrown; body parses as JSON.

## AC-004-b

- **Must:** The API response contains a 'message' field
- **Target:** hello-api (http://localhost:9090)
- **Steps:**
  1. Use the `request` fixture to GET `/hello?name=Test` on the API base URL.
  2. Parse response as JSON.
- **Expected:** The parsed object has a `message` property that is a string.

## AC-005-a

- **Must:** The greeting from the API response is displayed on the web page
- **Target:** hello-web (http://localhost:5173)
- **Steps:**
  1. Navigate to the primary URL.
  2. Type "Bob" into the name input.
  3. Click the "Say Hello" button.
  4. Wait for the `[role="status"]` element to appear.
- **Expected:** The element with `role="status"` contains the text "Hello, Bob!".

## AC-006-a

- **Must:** Clicking the button with an empty text box results in a greeting of 'Hello, World!'
- **Target:** hello-web (http://localhost:5173)
- **Steps:**
  1. Navigate to the primary URL.
  2. Ensure the name input is empty.
  3. Click the "Say Hello" button.
  4. Wait for the `[role="status"]` element to appear.
- **Expected:** The element with `role="status"` contains the text "Hello, World!".

## AC-007-a

- **Must:** The API provides a single endpoint for greeting requests
- **Target:** hello-api (http://localhost:9090)
- **Steps:**
  1. Use the `request` fixture to GET `/hello` — assert 200.
  2. GET `/greet` — assert status is not 200 (i.e., no second greeting endpoint).
  3. GET `/api/hello` — assert status is not 200 (no path prefix variant).
- **Expected:** Only `/hello` returns a valid greeting; alternative paths return non-200 status.

## AC-008-a

- **Must:** API requests succeed without providing authentication credentials
- **Target:** hello-api (http://localhost:9090)
- **Steps:**
  1. Use the `request` fixture to GET `/hello?name=NoAuth` on the API base URL — no Authorization/Cookie headers.
  2. Assert `response.ok()` is true (status 200).
- **Expected:** Response is 200 OK with a greeting; no auth required.
