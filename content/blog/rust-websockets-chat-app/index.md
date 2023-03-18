---
title: Building a Real-Time Chat Application with Rust and WebSockets
slug: rust-websockets-chat-app
date: "2023-03-18T12:22:50.591Z"
tags: rust, websockets, chat app, realtime, web development
description: "In this tutorial, we will build a real-time chat application with Rust and WebSockets. We will use Rust for the server-side application and JavaScript for the client-side application. This tutorial will cover the basics of WebSockets, how to set up a Rust server, and how to handle WebSockets connections. By the end of the tutorial, you will have a fully functioning chat application that can be used by multiple users at the same time."
---

Real-time applications have become increasingly popular in recent years with the rise of technologies such as WebSockets, which allow for real-time, bi-directional communication between the client and the server. In this tutorial, we will explore how to build a real-time chat application using Rust for the server-side application, and JavaScript for the client-side application. 

## Prerequisites 

Before we begin, ensure that you have the following installed: 

- Rust: https://www.rust-lang.org/tools/install 
- Node.js: https://nodejs.org/en/download/ 

## Setting up the Project

The first step in building our chat application is to set up our project. We will be using Rust for the server-side application and JavaScript for the client-side application. 

### Server-Side Application

Create a new Rust project using the following command: 

```sh
$ cargo new rust-websockets-chat-app
$ cd rust-websockets-chat-app
```

Add the following dependencies to your `Cargo.toml` file: 

```toml
[dependencies]
ws = "0.10.1"
```

- **ws**: The `ws` crate is a WebSocket library for Rust. 

Create a new file named `server.rs` in your project directory, and add the following code: 

```rust
use std::env;
use ws::{listen, CloseCode, Handler, Handshake, Message, Result};

struct Server {
    out: ws::Sender,
}

impl Handler for Server {
    fn on_open(&mut self, _: Handshake) -> Result<()> {
        Ok(())
    }

    fn on_message(&mut self, msg: Message) -> Result<()> {
        self.out.broadcast(msg)
    }
}

fn main() -> Result<()> {
    let addr = format!("127.0.0.1:{}", env::var("PORT").unwrap_or_else(|_| String::from("8080")));
    println!("Listening on {}", addr);

    listen(addr, |out| {
        Server { out }
    })
}
```

This code sets up a WebSocket server using the `ws` crate. The `Server` struct implements the `Handler` trait, which provides methods for handling WebSocket events such as `on_open` and `on_message`. The `on_open` method is called when a WebSocket connection is opened and the `on_message` method is called when a message is received. In the `on_message` method, we use `self.out` to broadcast the message to all connected WebSocket clients. 

### Client-Side Application

Create a new directory named `client` in your project directory, and navigate into it: 

```sh
$ mkdir client
$ cd client
```

Initialize a new Node.js project in the `client` directory using the following command: 

```sh
$ npm init -y
```

Install the `websocket` package using the following command: 

```sh
$ npm install websocket
```

Create a new file named `client.js` in the `client` directory, and add the following code: 

```js
const WebSocket = require('websocket').w3cwebsocket;

const client = new WebSocket('ws://localhost:8080/');

client.onopen = function() {
  console.log('WebSocket Client Connected');
};

client.onerror = function() {
  console.log('WebSocket Connection Error');
};

client.onmessage = function(event) {
  console.log('Received: ', event.data);
};
```

This code sets up a WebSocket client using the `websocket` package. The `client` object connects to the WebSocket server via the `ws://localhost:8080/` URL, logs a message when the WebSocket client is connected, logs an error message if there is an error connecting to the WebSocket server, and logs a message when a message is received. 

## Running the Application

Now that our project is set up, we can run the chat application. 

### Server-Side Application

To run the server-side application, enter the following command in your project directory: 

```sh
$ cargo run
```

This command will start a WebSocket server on port 8080. 

### Client-Side Application

To run the client-side application, open a new terminal window and navigate to your `client` directory. Then, enter the following command: 

```sh
$ node client.js
```

This command will start the WebSocket client and connect to the WebSocket server. 

## Testing the Application 

To test the chat application, open two or more terminal windows and run the client-side application in each window. You should see a message in each window stating that the WebSocket client has connected to the WebSocket server. 

To send a message in the chat application, type a message in one of the windows and press Enter. The message should be received by all connected WebSocket clients, and you should see the message displayed in each window. 

## Conclusion 

In this tutorial, we explored how to build a real-time chat application using Rust for the server-side application, and JavaScript for the client-side application. We covered the basics of WebSockets, how to set up a Rust server, and how to handle WebSockets connections. By the end of the tutorial, you should have a fully functioning chat application that can be used by multiple users at the same time.