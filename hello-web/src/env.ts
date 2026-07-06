declare global {
  interface Window {
    _env_?: Record<string, string>;
  }
}

// Runtime config lookup. Throws on a missing key — a silent same-origin
// fallback turns every fetch into a relative URL and masks misconfiguration.
export function env(key: string): string {
  const value = window._env_?.[key];
  if (!value) {
    throw new Error(`Missing window._env_.${key} — check env-config.js`);
  }
  return value;
}
