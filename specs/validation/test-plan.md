# Test Plan — hello-ui validation (issue #1)

Target deployment:
- `hello-web` → http://localhost:5173 (Vite dev server; proxies `/api` → API)
- `hello-api` → http://localhost:9090 (Go HTTP server)

Source reference: `hello-web/src/App.tsx` (React); `hello-api/main.go` (Go).

---

## AC-001-a: A text box for entering a name is visible on the web page

- **Method:** e2e (browser)
- **Must:** A text box for entering a name is visible on the web page
- **Target:** hello-web

### Steps
1. Navigate to `http://localhost:5173`.
2. Locate the text input (by label "Name" or placeholder "Your name").
3. Assert it is visible.

### Expected assertion
`expect(page.getByPlaceholder('Your name')).toBeVisible()`

---

## AC-001-b: A 'Say Hello' button is visible on the web page

- **Method:** e2e (browser)
- **Must:** A 'Say Hello' button is visible on the web page
- **Target:** hello-web

### Steps
1. Navigate to `http://localhost:5173`.
2. Locate the button with name "Say Hello".
3. Assert it is visible.

### Expected assertion
`expect(page.getByRole('button', { name: 'Say Hello' })).toBeVisible()`

---

## AC-002-a: Clicking the 'Say Hello' button triggers a request to the API with the entered name

- **Method:** e2e (browser)
- **Must:** Clicking the 'Say Hello' button triggers a request to the API with the entered name
- **Target:** hello-web

### Steps
1. Navigate to `http://localhost:5173`.
2. Register a request listener for `/api/hello` (the Vite proxy path).
3. Fill the name input with "Alice".
4. Click the "Say Hello" button.
5. Assert the captured request URL contains `name=Alice`.

### Expected assertion
Captured request URL includes `name=Alice`

---

## AC-003-a: The API returns a response containing 'Hello, <name>!' where <name> is the provided name

- **Method:** e2e (API request)
- **Must:** The API returns a response containing 'Hello, <name>!' where <name> is the provided name
- **Target:** hello-api

### Steps
1. Send `GET http://localhost:9090/hello?name=Alice` via request fixture.
2. Assert response body text includes `Hello, Alice!`.

### Expected assertion
Response body includes `"Hello, Alice!"`

---

## AC-004-a: The API response is valid JSON

- **Method:** e2e (API request)
- **Must:** The API response is valid JSON
- **Target:** hello-api

### Steps
1. Send `GET http://localhost:9090/hello?name=Test` via request fixture.
2. Call `response.json()` and assert no parse error.
3. Assert Content-Type header contains `application/json`.

### Expected assertion
`response.json()` resolves without error; Content-Type is `application/json`

---

## AC-004-b: The API response contains a 'message' field

- **Method:** e2e (API request)
- **Must:** The API response contains a 'message' field
- **Target:** hello-api

### Steps
1. Send `GET http://localhost:9090/hello?name=Test` via request fixture.
2. Parse the JSON body.
3. Assert the parsed object has a `message` property.

### Expected assertion
`expect(body).toHaveProperty('message')`

---

## AC-005-a: The greeting from the API response is displayed on the web page

- **Method:** e2e (browser)
- **Must:** The greeting from the API response is displayed on the web page
- **Target:** hello-web

### Steps
1. Navigate to `http://localhost:5173`.
2. Fill the name input with "Alice".
3. Click the "Say Hello" button.
4. Wait for `[role="status"]` to appear.
5. Assert its text is "Hello, Alice!".

### Expected assertion
`expect(page.getByRole('status')).toHaveText('Hello, Alice!')`

---

## AC-006-a: Clicking the button with an empty text box results in a greeting of 'Hello, World!'

- **Method:** e2e (browser)
- **Must:** Clicking the button with an empty text box results in a greeting of 'Hello, World!'
- **Target:** hello-web

### Steps
1. Navigate to `http://localhost:5173`.
2. Leave the name input empty (default state).
3. Click the "Say Hello" button.
4. Wait for `[role="status"]` to appear.
5. Assert its text is "Hello, World!".

### Expected assertion
`expect(page.getByRole('status')).toHaveText('Hello, World!')`

---

## AC-007-a: The API provides a single endpoint for greeting requests

- **Method:** e2e (API request)
- **Must:** The API provides a single endpoint for greeting requests
- **Target:** hello-api

### Steps
1. Send `GET http://localhost:9090/hello` via request fixture.
2. Assert status 200.
3. Confirm this is the sole greeting path (verify `/greet` and `/greeting` return non-200 or non-greeting responses).

### Expected assertion
`/hello` returns 200; other plausible paths do not return greeting responses

---

## AC-008-a: API requests succeed without providing authentication credentials

- **Method:** e2e (API request)
- **Must:** API requests succeed without providing authentication credentials
- **Target:** hello-api

### Steps
1. Send `GET http://localhost:9090/hello?name=World` via request fixture with no Authorization header.
2. Assert status 200 and valid greeting body.

### Expected assertion
`expect(response.status()).toBe(200)`
