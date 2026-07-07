import { useState } from "react";
import { env } from "./env";

export default function App() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [error, setError] = useState("");

  async function sayHello() {
    setError("");
    try {
      const url = `${env("HELLO_API_URL")}/hello?name=${encodeURIComponent(name.trim())}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const body: { message: string } = await res.json();
      setGreeting(body.message);
    } catch (e) {
      setGreeting("");
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 420, margin: "4rem auto" }}>
      <h1>Hello UI</h1>
      <label>
        Name{" "}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </label>{" "}
      <button onClick={sayHello}>Say Hello</button>
      {greeting && <p className="greeting">{greeting}</p>}
      {error && <p role="alert">{error}</p>}
    </main>
  );
}
