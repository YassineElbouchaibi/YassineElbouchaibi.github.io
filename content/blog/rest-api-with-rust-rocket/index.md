---
title: Building a REST API with Rust and Rocket
slug: rest-api-with-rust-rocket
date: "2022-11-13T08:12:03.284Z"
tags:
  - rust
  - rocket
  - api
  - rest
description: "In this article, we will walk through how to build a REST API using Rust and the Rocket web framework. We will cover the basics of REST and then dive into how to use Rocket to create endpoints, handle requests and responses, and interact with a database. By the end of this article, you will have a solid understanding of how to build a REST API with Rust and Rocket."
---

## Introduction

REST (Representational State Transfer) has become the standard architecture for building web applications. It provides a simple and consistent way for clients to interact with server resources. Rust is a fast, reliable, and highly efficient programming language that provides high performance to web applications. Rocket is a web framework written in Rust that provides an expressive, easy-to-use, and secure way to build web applications. In this article, we will build a REST API with Rust and Rocket.

## Prerequisites

Before we get started, you need to have Rust and Cargo installed. If you don't have them installed, follow the instructions provided on the Rust documentation website to download them for your operating system. Also, we will be using PostgreSQL as our database, so you will need to have it installed and running on your machine.

## Understanding REST

REST is a client-server architecture that was designed to be scalable and flexible in the way resources are represented and accessed. It is based on the HTTP protocol and uses standard methods like GET, POST, PUT, and DELETE, for CRUD (Create-Read-Update-Delete) operations. RESTful APIs use JSON or XML to serialize data, and they use URLs to identify resources.

## Setting up the Project

To create a new Rust project, open a terminal and type the following command:

```
cargo new rest-api
```

This will create a new Rust project named rest-api. Next, add the Rocket dependency to the Cargo.toml file:

```toml
[dependencies]
rocket = "0.5.0-rc.1"
rocket_codegen = "0.5.0-rc.1"
```

## Creating Endpoints

Rocket makes it easy to create RESTful endpoints. Let's create a simple endpoint that returns a JSON response. In the src/main.rs file, add the following code:

```rust
#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, World!"
}

fn main() {
    rocket::ignite().mount("/", routes![index]).launch();
}
```

This creates a new endpoint that returns a string when accessed. You can start the server with the following command:

```
cargo run
```

Now you can access the endpoint by navigating to `http://localhost:8000` in your web browser.

## Handling Requests and Responses

Rocket provides a powerful set of tools for handling requests and responses. Let's look at how we can handle JSON data.

```rust
use serde::{Serialize, Deserialize};
use rocket::http::Status;
use rocket::request::{self, FromRequest};
use rocket::{Request, State};
use rocket_contrib::json::{Json, JsonValue};
use uuid::Uuid;

#[derive(Deserialize)]
struct UserRequest {
    name: String,
    email: String,
    password: String,
}

#[derive(Serialize)]
struct UserResponse {
    id: Uuid,
    name: String,
    email: String,
}

struct DbConn(postgres::Client);

impl<'a, 'r> FromRequest<'a, 'r> for DbConn {
    type Error = ();

    fn from_request(request: &'a Request<'r>) -> request::Outcome<Self, Self::Error> {
        if let Some(pool) = request.guard::<State<DbPool>>().succeeded() {
            match pool.get() {
                Ok(client) => Outcome::Success(DbConn(client)),
                Err(_) => Outcome::Failure((Status::ServiceUnavailable, ())),
            }
        } else {
            Outcome::Failure((Status::InternalServerError, ()))
        }
    }
}

#[post("/users", format = "json", data = "<user_request>")]
fn create_user(conn: DbConn, user_request: Json<UserRequest>) -> Result<Json<UserResponse>, Status> {
    let UserRequest { name, email, password } = user_request.into_inner();
    let id = Uuid::new_v4();

    match conn.0.execute("
            INSERT INTO users
            (id, name, email, password_hash)
            VALUES ($1, $2, $3, crypt($4, gen_salt('bf')))
        ", &[&id, &name, &email, &password]) {
        Ok(_) => Ok(Json(UserResponse { id, name, email })),
        Err(_) => Err(Status::InternalServerError),
    }
}
```

This code defines a couple of things – the UserRequest struct and the UserResponse struct. We create a new endpoint named create_user that accepts a POST request with JSON data. The create_user endpoint takes in a Json<UserRequest> argument, which is automatically deserialized from the JSON data when a request is made.

The endpoint then inserts the data into the database and returns a JSON response with the newly created user. Notice that we are using the DbConn struct to make database connections. This is a simple way to handle connections to the database.

## Conclusion

In this article, we have walked through how to build a RESTful API using Rust and the Rocket web framework. We started by discussing the basics of REST and then dove into how to use Rocket to create endpoints, handle requests and responses, and interact with a database. By following the steps outlined in this article, you can build your own RESTful APIs using Rust and Rocket.