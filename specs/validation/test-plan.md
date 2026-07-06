# Validation test plan — Issue #1

Generated for `hello-ui` acceptance criteria (AC-001-a through AC-008-a).
All 10 criteria have `covered: false`; specs are authored fresh for this run.

---

## AC-001-a: Text box for entering a name is visible on the web page

- **Must:** A text box for entering a name is visible on the web page
- **Target:** hello-web (http://localhost:5173)
- **Steps:**
  1. Navigate to the root page (`/`)
  2. Locate the `<input>` element with placeholder `"Your name"`
- **Expected assertion:** `await expect(page.getByPlaceholder('Your name')).toBeVisible()`

---

## AC-001-b: 'Say Hello' button is visible on the web page

- **Must:** A 'Say Hello' button is visible on the web page
- **Target:** hello-web (http://localhost:5173)
- **Steps:**
  1. Navigate to the root page (`/`)
  2. Locate the `<button>` element with text `"Say Hello"`
- **Expected assertion:** `await expect(page.getByRole('button', { name: 'Say Hello' })).toBeVisible()`

---

## AC-002-a: Clicking 'Say Hello' sends request to the API with the entered name

- **Must:** Clicking the 'Say Hello' button triggers a request to the API with the entered name
- **Target:** hello-web (http://localhost:5173)
- **Steps:**
  1. Navigate to the root page
  2. Register a route waiter for `**/hello*` to capture the outgoing request URL
  3. Fill the name input with `"Alice"`
  4. Click the "Say Hello" button
  5. Wait for the matched request
- **Expected assertion:** Captured request URL contains `name=Alice`

---

## AC-003-a: API returns 'Hello, <name>!' in response body

- **Must:** The API returns a response containing 'Hello, <name>!' where <name> is the provided name
- **Target:** hello-api (http://localhost:9090)
- **Steps:**
  1. `GET /hello?name=Alice` via Playwright `request` fixture
  2. Parse response body as JSON
- **Expected assertion:** `body.message === 'Hello, Alice!'`

---

## AC-004-a: API response is valid JSON

- **Must:** The API response is valid JSON
- **Target:** hello-api (http://localhost:9090)
- **Steps:**
  1. `GET /hello?name=Test` via Playwright `request` fixture
  2. Attempt `response.json()` (throws on invalid JSON)
  3. Check `Content-Type` header contains `application/json`
- **Expected assertion:** `response.json()` resolves without error; Content-Type is `application/json`

---

## AC-004-b: API response contains 'message' field

- **Must:** The API response contains a 'message' field
- **Target:** hello-api (http://localhost:9090)
- **Steps:**
  1. `GET /hello?name=Test` via Playwright `request` fixture
  2. Parse response JSON
- **Expected assertion:** `typeof body.message === 'string'`

---

## AC-005-a: Greeting from API is displayed on the web page

- **Must:** The greeting from the API response is displayed on the web page
- **Target:** hello-web (http://localhost:5173)
- **Steps:**
  1. Navigate to the root page
  2. Fill the name input with `"Alice"`
  3. Click the "Say Hello" button
  4. Wait for the `[role="status"]` element to become visible
- **Expected assertion:** `await expect(page.getByRole('status')).toHaveText('Hello, Alice!')`

---

## AC-006-a: Empty name defaults to 'Hello, World!'

- **Must:** Clicking the button with an empty text box results in a greeting of 'Hello, World!'
- **Target:** hello-web (http://localhost:5173)
- **Steps:**
  1. Navigate to the root page
  2. Leave the name input empty (default state)
  3. Click the "Say Hello" button
  4. Wait for the `[role="status"]` element to become visible
- **Expected assertion:** `await expect(page.getByRole('status')).toHaveText('Hello, World!')`

---

## AC-007-a: The API provides a single endpoint for greeting requests

- **Must:** The API provides a single endpoint for greeting requests
- **Target:** hello-api (http://localhost:9090)
- **Steps:**
  1. `GET /hello?name=Test` — expect 200 with a greeting
  2. `GET /greet?name=Test` — expect non-200 (the path does not exist)
  3. `GET /api?name=Test` — expect non-200 (the path does not exist)
- **Expected assertion:** Only `/hello` returns HTTP 200 with `message`; alternative paths return non-200

---

## AC-008-a: API requests succeed without authentication

- **Must:** API requests succeed without providing authentication credentials
- **Target:** hello-api (http://localhost:9090)
- **Steps:**
  1. `GET /hello?name=Test` without any `Authorization` header
  2. Verify HTTP 200 and valid greeting body
- **Expected assertion:** Status 200, `body.message === 'Hello, Test!'`
