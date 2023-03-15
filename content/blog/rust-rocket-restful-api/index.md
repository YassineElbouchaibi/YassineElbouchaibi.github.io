---
title: Building a RESTful API with Rust and Rocket
slug: rust-rocket-restful-api
date: "2023-03-15T12:27:20.512Z"
tags:
- Rust 
- API
- RESTful
- Rocket
description: "In this tutorial, we will build a RESTful API using Rust and the Rocket web framework. We will go step by step in creating an API that can perform CRUD operations on a mock database of users. By the end of the tutorial, you will have a basic understanding of how to create an API using Rust and Rocket."

---

If you're a Rust developer, you know how great Rust is when it comes to web development. You can do almost anything you could with other web programming languages, and sometimes even better. Today we're going to build a simple RESTful API with Rust and Rocket.

Rocket is a web framework for Rust that makes building web applications simple, fast, and secure. Rocket provides beautiful abstractions for writing web code, making it easy to get up and running with little configuration.

## Prerequisites

To follow this tutorial, you should first have Rust and Cargo installed on your computer. If you haven't installed Rust yet, you can download it from the [official website](https://www.rust-lang.org/). Once installed, use the command below to ensure you have the latest version of Cargo installed:

```
cargo install cargo-watch
```

You should also have a basic understanding of Rust and its syntax.

## Setting up the Project

Let's start by creating a new Rust project using the Cargo command-line tool. From your terminal, run the following commands:

```
$ cargo new rust-rocket-restful-api
$ cd rust-rocket-restful-api
```

This will create a new Rust project in the `rust-rocket-restful-api` directory. We'll start by adding Rocket to our project's dependencies. First, let's open the `Cargo.toml` file and add the following two dependencies:

```toml
[dependencies]
rocket = "0.5.1"
serde = { version = "1.0", features = ["derive"] }
```

As you can see, we're using Rocket version `0.5.1` and the Serde library is used for serialization and deserialization of JSON data.

Now let's open up the `main.rs` file and add the following imports:

```rust
#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct User {
    id: Option<i32>,
    name: String,
    email: String,
}
```

Here, we've enabled proc_macro_hygiene and declared the `rocket` macro. We've also imported the `serde` crate and added a `User` struct that we'll use to define our user model.

## Defining API Endpoints

Now that we have the basics of our API in place, let's move on to defining our API endpoints. We'll be creating endpoints for creating, reading, updating, and deleting users.

We'll start by defining the endpoint for reading all users from the mock database. Here's what the main `GET` route will look like:

```rust
#[get("/users")]
fn get_users() -> String {
    let users = vec![
        User { id: Some(1), name: String::from("Alice"), email: String::from("alice@example.com") },
        User { id: Some(2), name: String::from("Bob"), email: String::from("bob@example.com") },
    ];
    serde_json::to_string(&users).unwrap()
}
```

Here, we're using the `get` attribute macro provided by Rocket to define the HTTP method and path. We then define the `get_users` function that returns a JSON string of our users. In a real application, you would retrieve your data from a database instead of creating a hardcoded set like we did here.

Since we're using the Serde library, we can easily serialize our `users` vector into a JSON string using the `to_string` method.

Next, let's define the endpoint for reading a single user from the mock database. Here's what the `GET` route will look like:

```rust
#[get("/users/<id>")]
fn get_user(id: i32) -> String {
    let users = vec![
        User { id: Some(1), name: String::from("Alice"), email: String::from("alice@example.com") },
        User { id: Some(2), name: String::from("Bob"), email: String::from("bob@example.com") },
    ];
    
    let user = users.iter().find(|user| user.id == Some(id)).unwrap();
    serde_json::to_string(user).unwrap()
}
```

Here, we're using the `id` parameter to find the user from our `users` vector. We use the `unwrap` function to handle the case where the user isn't found, but in a real-world scenario, we would need to return a 404 status code for this endpoint.

The `get_user` function then returns a JSON string of the found user struct.

Next, let's define the endpoint for creating a new user in the mock database. Here's what the `POST` route will look like:

```rust
#[post("/users", data = "<user>")]
fn create_user(user: String) -> String {
    let mut users = vec![
        User { id: Some(1), name: String::from("Alice"), email: String::from("alice@example.com") },
        User { id: Some(2), name: String::from("Bob"), email: String::from("bob@example.com") },
    ];
    
    let new_user: User = serde_json::from_str(&user).unwrap();
    users.push(new_user);
    
    serde_json::to_string(&users).unwrap()
}
```

Here, we're using the `post` attribute macro to define the HTTP method and path. We're also taking in a `user` parameter that will contain the JSON string of the new user.

We start by deserializing the `user` parameter to a `User` struct using the `from_str` method provided by Serde. We then push the new user to our `users` vector and serialize the vector to a JSON string, which is returned by the function.

Finally, let's define the endpoints for updating and deleting a user in the mock database. Here's what the `PUT` route will look like:

```rust
#[put("/users/<id>", data = "<user>")]
fn update_user(id: i32, user: String) -> String {
    let mut users = vec![
        User { id: Some(1), name: String::from("Alice"), email: String::from("alice@example.com") },
        User { id: Some(2), name: String::from("Bob"), email: String::from("bob@example.com") },
    ];
    
    let update_user: User = serde_json::from_str(&user).unwrap();
    let index = users.iter().position(|user| user.id == Some(id)).unwrap();
    users[index] = update_user;

    serde_json::to_string(&users).unwrap()
}

#[delete("/users/<id>")]
fn delete_user(id: i32) -> String {
    let mut users = vec![
        User { id: Some(1), name: String::from("Alice"), email: String::from("alice@example.com") },
        User { id: Some(2), name: String::from("Bob"), email: String::from("bob@example.com") },
    ];
    
    let index = users.iter().position(|user| user.id == Some(id)).unwrap();
    users.remove(index);
    
    serde_json::to_string(&users).unwrap()
}
```

Here, we're using the `put` and `delete` attribute macros to define the HTTP methods and paths. We're taking in the `id` and `user` parameters for these endpoints, which represent the user we want to update or delete and the updated user data.

In the `update_user` function, we first deserialize the `user` parameter to a `User` struct using the `from_str` method provided by Serde. We then use the `position` method to find the index of the user we want to update and replace it with the updated user.

In the `delete_user` function, we use the `position` method to find the index of the user we want to delete and remove it from the `users` vector.

## Running the API

Finally, we're ready to run our API. We'll use the `Rocket::ignite` function to create a new instance of the Rocket web application and mount our routes. Here's what the main `main` function will look like:

```rust
fn main() {
    rocket::ignite()
        .mount("/", routes![
            get_users,
            get_user,
            create_user,
            update_user,
            delete_user
        ])
        .launch();
}
```

Here, we're mounting our defined routes to the root path of our web application.

To start the API, run the following command in your terminal:

```
$ cargo run
```

This should start a local web server, and the API should be available at `http://localhost:8000`. You can now use Postman or any other API testing tool to test your endpoints.

## Conclusion

In this tutorial, we've learned how to build a RESTful API using Rust and the Rocket web framework. We went through how to define our API endpoints and create our basic CRUD functionality. Rust's fast, safe, and concurrent characteristics are of great benefits in building an API, especially in massive and scalable web applications as its immense performance will be a great advantage. 

We hope you found this tutorial useful, and you can now go on and build more advanced and robust web applications with Rust and Rocket.  Happy coding!