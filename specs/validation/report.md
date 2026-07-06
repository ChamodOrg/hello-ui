# Validation report

- **Issue:** #1
- **Commit:** 20466ab105f5291c312ade2052319f8f9e179af1
- **Generated:** 2026-07-06T18:05:33.635Z
- **Playwright:** 1.61.1

## Summary

| Method | Total | Pass | Fail | Not run |
|---|---|---|---|---|
| e2e | 10 | 9 | 1 | 0 |
| manual (human checklist) | 0 | — | — | — |
| scenario (not validated) | 0 | — | — | — |

## E2E results

| Criterion | Must | Status | Spec | Notes |
|---|---|---|---|---|
| AC-001-a | A text box for entering a name is visible on the web page | ✅ pass | `tests/e2e/specs/AC-001-a.spec.ts` | — |
| AC-001-b | A 'Say Hello' button is visible on the web page | ✅ pass | `tests/e2e/specs/AC-001-b.spec.ts` | — |
| AC-002-a | Clicking the 'Say Hello' button triggers a request to the API with the entered name | ✅ pass | `tests/e2e/specs/AC-002-a.spec.ts` | — |
| AC-003-a | The API returns a response containing 'Hello, <name>!' where <name> is the provided name | ✅ pass | `tests/e2e/specs/AC-003-a.spec.ts` | — |
| AC-004-a | The API response is valid JSON | ✅ pass | `tests/e2e/specs/AC-004-a.spec.ts` | — |
| AC-004-b | The API response contains a 'message' field | ✅ pass | `tests/e2e/specs/AC-004-b.spec.ts` | — |
| AC-005-a | The greeting from the API response is displayed on the web page | ✅ pass | `tests/e2e/specs/AC-005-a.spec.ts` | — |
| AC-006-a | Clicking the button with an empty text box results in a greeting of 'Welcome, Stranger!' | ❌ fail | `tests/e2e/specs/AC-006-a.spec.ts` | — |
| AC-007-a | The API provides a single endpoint for greeting requests | ✅ pass | `tests/e2e/specs/AC-007-a.spec.ts` | — |
| AC-008-a | API requests succeed without providing authentication credentials | ✅ pass | `tests/e2e/specs/AC-008-a.spec.ts` | — |

## Failures

### AC-006-a — Clicking the button with an empty text box results in a greeting of 'Welcome, Stranger!'

Spec: `tests/e2e/specs/AC-006-a.spec.ts`
Location: `AC-006-a.spec.ts:4`

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByRole('status')
Expected: "Welcome, Stranger!"
Received: "Hello, World!"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByRole('status')
    24 × locator resolved to <p role="status">Hello, World!</p>
       - unexpected value "Hello, World!"

```

## Warnings

- AC-001-a: raw locator() usage in tests/e2e/specs/AC-001-a.spec.ts — prefer getByRole/getByLabel/getByPlaceholder
- AC-002-a: raw locator() usage in tests/e2e/specs/AC-002-a.spec.ts — prefer getByRole/getByLabel/getByPlaceholder
- AC-005-a: raw locator() usage in tests/e2e/specs/AC-005-a.spec.ts — prefer getByRole/getByLabel/getByPlaceholder

