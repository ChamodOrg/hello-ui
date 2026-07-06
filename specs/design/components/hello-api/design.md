---
type: service
language: Go
buildpack: docker
appPath: hello-api
entrypoint: deployment/service
---

# hello-api

Implement a simple Go HTTP service on port 9090 using net/http. Expose GET /hello that accepts an optional `name` query parameter and returns {"message": "Hello, <name>!"} with Content-Type: application/json; when `name` is missing or blank, return {"message": "Hello, World!"}. Include GET /health returning 200 OK for liveness probes. This is a public API — no authentication required, no X-User-Id checks. Do not add CORS middleware — cross-origin is handled at the gateway. Use the standard net/http router (no external dependencies needed). Dockerfile builder base image: FROM golang:1.25-alpine AS builder. This is a stdlib-only service so there will be no go.sum file after go mod tidy — that is expected and correct.
