---
type: webapp
language: React
buildpack: docker
appPath: hello-web
entrypoint: deployment/webapp
---

# hello-web

Implement a minimal React (Vite + TypeScript) single-page app with one page:

- A text box labelled "Name" and a "Say Hello" button.
- Clicking the button calls GET {HELLO_API_URL}/hello?name=<url-encoded name> on the hello-api upstream and displays the `message` field from the JSON response on the page.
- With a blank text box, call the endpoint without a usable name — the API returns the "Hello, World!" default, which is displayed as-is.
- Resolve the upstream URL from `window._env_.HELLO_API_URL`, populated by `env-config.js` loaded before the app bundle. Throw on a missing key — no silent same-origin fallback.
- Local dev: `public/env-config.js` defaults HELLO_API_URL to `/api`, and the Vite dev server proxies `/api` → http://localhost:9090.
- Serve the production build with nginx (Dockerfile). Do not add CORS handling in the backend — cross-origin is handled at the gateway.
