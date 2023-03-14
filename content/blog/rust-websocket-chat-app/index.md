---
title: Building a Real-Time Chat App with Rust and WebSockets
slug: rust-websocket-chat-app
date: "2023-03-14T00:57:01.704Z"
tags: rust, websockets, chat app, real-time, web development
description: "In this article, we will explore the process of building a real-time chat application using Rust and WebSockets. We will cover the fundamentals of WebSockets, how to integrate them into a Rust backend, and how to use them to build a chat application. By the end of this article, readers will have a solid understanding of how WebSockets work and how to build a real-time chat app using Rust and WebSockets."

---

WebSockets provide a way to enable real-time communication between a client and server. They have become increasingly popular in web development because of their ability to facilitate real-time features such as instant messaging and live feeds. In this article, we will leverage Rust's speed and memory safety to build a real-time chat app using WebSockets.

## Getting Started with Rust and WebSockets

Before we dive into building our chat app, let's first go over what WebSockets are and how they work. WebSockets provide a full-duplex communication channel over a single TCP connection, enabling real-time communication between a client and server. Unlike traditional HTTP connections, WebSockets allow bi-directional communication where data can be sent and received simultaneously.

To build our chat app, we will be using the `ws-rs` crate which is a WebSocket implementation in Rust. The `ws-rs` crate is a high-level API that abstracts away much of the low-level details of WebSockets, allowing us to focus on building our app.

Once you have Rust installed, you can create a new Rust project by running the following command:

```
cargo new rust-websocket-chat-app
```

This command creates a new Rust project with the name `rust-websocket-chat-app`. Next, add the `ws-rs` crate to your project by adding the following line to your `Cargo.toml`:

```
[dependencies]
ws = "0.9"
```

This will download and install the latest version of the `ws-rs` crate, allowing us to use it in our project.

## Building the Backend

Now that we have our project set up and have added the necessary dependencies, let's start building our backend. We'll start off by creating a new file called `main.rs` in our project's root directory. Here's what our `main.rs` file should look like:

```rust
use ws::{listen, CloseCode, Message, Sender};

fn main() {
    env_logger::init();

    listen("127.0.0.1:3012", |out| {
        move |msg| {
            out.broadcast(msg)
        }
    })
    .unwrap();
}
```

Here, we've imported the necessary items from the `ws` crate, and defined our main function. The `listen` method sets up the server to listen for incoming WebSocket connections on port `3012` of the localhost IP address `127.0.0.1`.

The closure that's passed to `listen` gets called each time a new WebSocket connection is established. It takes in a `Sender` as an argument, which is used to send messages back to the client. Here, we're passing in a closure that takes in a `Message` as an argument and broadcasts it to all connected clients using the sender's broadcast method.

That's it! We now have our backend set up and ready to handle incoming WebSocket connections. Next, let's create our frontend.

## Building the Frontend

For the frontend, we'll be using vanilla JavaScript to connect to our WebSocket server and to send and receive messages. Here's what our HTML and JavaScript files should look like:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rust WebSocket Chat App</title>
  </head>
  <body>
    <div id="chatbox"></div>

    <form id="chat-form" action="">
      <input id="chat-input" type="text" placeholder="Enter your message" />
      <button id="send-btn" type="submit">Send</button>
    </form>

    <script>
      // Connect to the WebSocket server
      const ws = new WebSocket("ws://127.0.0.1:3012");

      // Listen for incoming messages
      ws.onmessage = (event) => {
        const chatbox = document.getElementById("chatbox");
        chatbox.innerHTML += `<p>${event.data}</p>`;
      };

      // Send message to server when form is submitted
      const form = document.getElementById("chat-form");
      const input = document.getElementById("chat-input");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const messageText = input.value;
        ws.send(messageText);
        input.value = "";
      });
    </script>
  </body>
</html>
```

Here, we've created a basic HTML template for our chat app. When the page loads, the JavaScript code establishes a WebSocket connection to our server at `ws://127.0.0.1:3012`.

We then listen for incoming messages using the `onmessage` event. When a message is received, it's added to the chat box using the `innerHTML` property.

Finally, when the user submits the form, we take the value of the input field and send it to the server using the `send` method of the WebSocket object. We clear the input field so that the user can enter a new message.

## Running the App

To run our chat app, start by running the server by running the `cargo run` command in the terminal at the root of the project. The server should start listening for incoming WebSocket connections on port `3012`.

Next, open up `index.html` in your browser to open the chat app. You should now be able to see and send messages in real-time!

## Conclusion

In this article, we built a real-time chat app using Rust and WebSockets. We covered the basics of WebSockets, how to integrate them into a Rust backend, and how to use them to build a real-time chat application. We also showed how to create a basic JavaScript frontend to connect to our WebSocket server, send and receive messages, and display them in the browser.

WebSockets have become increasingly popular in web development because of their ability to facilitate real-time features such as instant messaging and live feeds. By using Rust and WebSockets, we can build secure and fast real-time applications that can handle a large number of concurrent users.