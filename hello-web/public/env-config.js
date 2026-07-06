// Runtime environment for the SPA. In-cluster this file is overwritten via
// the component's ReleaseBinding; the local default keeps the app same-origin
// behind the Vite dev proxy (/api -> http://localhost:9090).
window._env_ = {
  HELLO_API_URL: "/api",
};
