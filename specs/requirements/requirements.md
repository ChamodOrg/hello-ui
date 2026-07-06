# Overview

A simple web application where a visitor types their name into a text box, clicks a button, and sees a personalized hello greeting. The greeting is produced by a small API.

# Personas

- Visitor — enters a name on the web page to receive a personalized greeting.
- Developer — calls the API directly to get a greeting.

# Features

- The web page shows a text box for entering a name and a "Say Hello" button.
- Clicking the button sends the entered name to the API.
- The API responds with "Hello, <name>!" in the response body.
- The response is in JSON format with a message field.
- The web page displays the greeting returned by the API.
- When no name is entered, the greeting defaults to "Hello, World!".
- The API is accessible via a single endpoint.
- Requests work without requiring authentication.
