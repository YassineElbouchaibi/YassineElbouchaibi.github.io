---
title: Building a Real-Time Chat Application with Rust and WebSockets
slug: rust-websockets-real-time-chat
date: "2023-03-20T12:26:40.530Z"
tags: rust, web development, real-time chat, WebSockets
description: In this blog post, I'll show you how to build a real-time chat application using Rust and WebSockets. We'll be using the Warp framework to create a Rust web server and the WebSocket protocol to enable real-time communication between the server and the client. By the end of this tutorial, you'll have a functional chat app that you can use to communicate with others in real-time.
---

Real-time chat applications are becoming increasingly popular, and for a good reason: they allow users to communicate with each other in real-time, no matter where in the world they are. In this tutorial, we'll be building a real-time chat application using Rust and WebSockets. We'll be using a Rust web framework called Warp, which makes it easy to build fast and scalable web applications.

## Prerequisites

Before we get started, there are a few prerequisites you'll need to have in place:

- Rust compiler and Cargo package manager installed on your machine.
- Basic knowledge of Rust programming language.
- Familiarity with JavaScript, HTML, and CSS.

## Setting up the project

Let's start by setting up the project. Open up your terminal and create a new Rust project using Cargo:

```
cargo new rust-websocket-chat
```

This will create a new Rust project with the name `rust-websocket-chat`. Navigate into the project directory using `cd rust-websocket-chat`.

Next, we will add the Warp and Tokio and dependencies to our project. We'll use Tokio as the asynchronous runtime to power the WebSocket connections, and Warp as our web framework.

Add the following lines to your `Cargo.toml` file:

```toml
[dependencies]
warp = "0.3"
tokio = { version = "1.14.0", features = ["full"] }
```

Next, let's create a new folder called `static` at the root of your project. This folder will contain all of the static files for the chat app, including HTML, CSS, and JavaScript.

Inside the static folder, create a new file called `index.html`. This will be the landing page for our application, and it will contain the HTML structure for the chat interface.

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

Next, create a new file called `style.css` inside the static folder. This will contain the CSS styles for the chat interface.

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

Finally, create a new file called `script.js` inside the static folder. This will contain the JavaScript code for the chat app.

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

Now that we have the static files for our chat interface set up, let's build the server using Warp.

Create a new file called `main.rs` at the root of your project directory, and add the following code:

```rust
use std::collections::HashMap;
use std::sync::Arc;

use tokio::sync::Mutex;
use warp::{Filter, ws::Ws, ws::Message};

type Users = HashMap<usize, String>;

async fn chat_handler(ws: Ws, users: Arc<Mutex<Users>>) -> impl warp::Reply {
    ws.on_upgrade(|websocket| async move {
        let user_id = users.lock().await.len();
        let username = format!("User{}", user_id + 1);
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
                    },
                    None => break,
                }
            }
        });

        let mut users = users.lock().await;
        users.insert(user_id, username.clone());

        let new_user_msg = format!("{} joined the chat", username);
        broadcast_message(&users, &new_user_msg).await;

        loop {
            match rx.recv().await {
                Ok(msg) => {
                    users.remove(&user_id);
                    let exit_msg = format!("{} left the chat", username);
                    broadcast_message(&users, &exit_msg).await;
                    break;
                },
                Err(_) => break,
            }
        }
    })
}

async fn broadcast_message(users: &Users, message: &str) {
    for (user_id, _) in users.iter() {
        let user_tx = user_tx_for_id(&users, user_id).await;
        if let Some(user_tx) = user_tx {
            let _ = user_tx.send(message.to_owned()).await;
        }
    }
}

async fn user_tx_for_id(users: &Users, user_id: &usize) -> Option<tokio::sync::mpsc::Sender<String>> {
    users.get(user_id).map(|_| {
        let (user_tx, _) = tokio::sync::mpsc::channel(10);
        user_tx
    })
}

#[tokio::main]
async fn main() {
    let users: Users = HashMap::new();
    let users = Arc::new(Mutex::new(users));

    let chat_route = warp::path("ws")
        .and(warp::ws())
        .and(warp::any().map(move || Arc::clone(&users)))
        .map(|ws: warp::ws::Ws, users| chat_handler(ws, users));

    let routes = warp::fs::dir("static/")
        .or(chat_route);

    warp::serve(routes)
        .run(([127, 0, 0, 1], 8000))
        .await;
}
```

## Running the application

Now that we have the server and the static files set up, let's start the Rust application. Run the following command in your terminal:

```
cargo run
```

You should see output logs indicating a successful server start on `http://localhost:8000`.

Next, open up your web browser and navigate to `http://localhost:8000`. You should see the chat interface we defined earlier.

Open another browser window and navigate to the same URL. You should now be able to send messages between the two browsers in real-time using the chat interface.

## Conclusion

In this tutorial, we've seen how to build a real-time chat application using Rust and WebSockets. We've used the Warp framework to create a Rust web server and the WebSocket protocol to enable real-time communication between the server and the client.

Real-time chat applications are a great way to enable real-time communication between users, and they're only going to become more prevalent in the future. By leveraging Rust and WebSockets, we can build fast and scalable chat applications that work across multiple devices and platforms.