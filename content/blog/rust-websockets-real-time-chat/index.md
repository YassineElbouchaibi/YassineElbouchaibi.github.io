---
title: Building a Real-Time Chat Application with Rust and WebSockets
slug: rust-websockets-real-time-chat
date: "2023-03-21T03:19:31.756Z"
tags: rust, web development, real-time chat, WebSockets
description: In this blog post, I'll show you how to build a real-time chat application using Rust and WebSockets. We'll be using the Warp framework to create a Rust web server and the WebSocket protocol to enable real-time communication between the server and the client. By the end of this tutorial, you'll have a functional chat app that you can use to communicate with others in real-time.
author: GPT-3.5-TURBO
---

Real-time chat applications are becoming increasingly popular, and for a good reason: they allow users to communicate with each other in real-time, no matter where in the world they are. In this tutorial, we'll be building a real-time chat application using Rust and WebSockets. We'll be using a Rust web framework called Warp, which makes it easy to build fast and scalable web applications.

## Prerequisites

Before we get started, there are a few prerequisites you'll need to have in place:

- Rust compiler and Cargo package manager installed on your machine.
- Basic knowledge of Rust programming language.
- Familiarity with JavaScript, HTML, and CSS.

## Setting up the project

In this first section, we will be setting up the necessary folders and files that will be used in the project.

Start by creating a new Rust project using Cargo:

```bash
cargo new rust-websocket-chat
```

This initializes a new Rust project with the name `rust-websocket-chat`. Navigate to the project directory by running:

```bash
cd rust-websocket-chat
```

Next, add the following dependencies to the `Cargo.toml` file:

```toml
[dependencies]
warp = "0.3"
tokio = { version = "1.14.0", features = ["full"] }
```

These dependencies are necessary for the project and will be used to create the web server and to handle WebSocket connections.

For convenience, create a new folder called `static` at the root of your project. This folder will contain all of the static files for the chat app, including HTML, CSS, and JavaScript.

In the `static` folder, create three new files: `index.html`, `style.css`, and `script.js`. `index.html` will be the landing page for the application, and it will contain the HTML structure for the chat interface. `style.css` will contain the CSS styles for the chat interface, and `script.js` will contain the JavaScript code for the chat app.

Here is the code for `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Rust WebSocket Chat</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <div class="chat-window">
        <div class="chat-header">
          <h1>Rust WebSocket Chat</h1>
        </div>
        <div class="chat-messages"></div>
        <div class="chat-input">
          <input
            type="text"
            placeholder="Enter your message"
            autofocus
          />
          <button>Send</button>
        </div>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

Here is the code for `style.css`:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #eceff1;
}

.chat-window {
  border-radius: 8px;
  background-color: #fff;
  height: 80vh;
  width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.chat-header {
  background-color: #01579b;
  color: #fff;
  padding: 10px;
  font-size: 24px;
  text-align: center;
}

.chat-messages {
  padding: 10px;
  flex-grow: 1;
  overflow-y: scroll;
}

.chat-input {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.chat-input input {
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  font-size: 16px;
}

.chat-input button {
  padding: 10px;
  font-size: 16px;
  min-width: 100px;
  background-color: #01579b;
  color: #fff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #003d6b;
  transition: background-color 0.2s;
}
```

Here is the code for `script.js`:

```js
const socket = new WebSocket("ws://localhost:8000/ws");

socket.addEventListener("open", (event) => {
  console.log("WebSocket connection open.");
});

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  const chatMessages = document.querySelector(".chat-messages");
  const chatMessage = document.createElement("div");
  chatMessage.innerHTML = `<strong>${message.username}:</strong> ${message.text}`;
  chatMessages.appendChild(chatMessage);
});

document.querySelector(".chat-input button").addEventListener("click", (e) => {
  const input = document.querySelector(".chat-input input");
  const text = input.value;
  const message = { username: "User", text: text };
  socket.send(JSON.stringify(message));
  input.value = "";
  input.focus();
});
```

## Building the server

In this section, we will be building the web server using Warp and defining the endpoint for handling WebSocket connections.

Here is the full code for `main.rs`:

```rust
use std::collections::HashMap;
use std::sync::{Arc, Mutex};

use warp::{Filter, ws::Ws, ws::Message};

type Users = Arc<Mutex<HashMap<usize, String>>>;

async fn chat_handler(ws: Ws, users: Users) -> impl warp::Reply {
    ws.on_upgrade(|websocket| async move {
        let user_id = {
            let mut users = users.lock().unwrap();
            let len = users.len();
            users.insert(len, format!("User{}", len + 1));
            len
        };
        let (tx, rx) = websocket.split();
        let (user_tx, mut user_rx) = tokio::sync::mpsc::channel(10);

        tokio::spawn(async move {
            loop {
                match user_rx.recv().await {
                    Some(msg) => {
                        let message = Message::text(msg);
                        if tx.send(message).await.is_err() {
                            break;
                        }
                    }
                    None => break,
                }
            }
        });

