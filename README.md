# hello-ui

WSO2 Labs Agentic Engineer playground project hello-ui — a hello API (Go) plus a
simple web UI (React) with a text box and a button that greets the entered name.

## Run locally

- API: `cd hello-api && go run .` → http://localhost:9090
- Web: `cd hello-web && npm install && npm run dev` → http://localhost:5173
  (the dev server proxies `/api` to the API on :9090)

## CI smoke test

This line was appended by the local runner smoke test to verify end-to-end branch → PR flow.
