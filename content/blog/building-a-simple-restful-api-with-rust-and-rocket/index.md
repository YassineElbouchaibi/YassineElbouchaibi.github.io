---
title: Building a Simple RESTful API with Rust and Rocket
slug: building-a-simple-restful-api-with-rust-and-rocket
date: "2023-03-11T11:12:03.284Z"
tags: rust, rocket, api, restful, web development
description: "In this blog post, we will walk through the process of building a simple RESTful API with Rust and the Rocket web framework. We'll cover topics such as request handling, routing, database integration, and error handling, providing a solid foundation for creating a scalable and reliable API. By the end of this post, you'll have a clear understanding of how to leverage Rust and Rocket to build powerful web applications."

---

Rust is a modern and highly performant programming language that has seen rapid adoption for building complex systems, including web applications. When paired with the Rocket web framework, Rust can be used to build powerful and scalable APIs quickly.

In this tutorial, we will walk through building a simple RESTful API with Rust and Rocket. We'll start by setting up a new Rocket project, defining routes to handle requests, integrating with a database, and handling errors. 

### Setting Up the Project

Before we dive into defining our routes, we need to set up a new Rocket project. We'll start by installing Rust on our machine and creating a new Rust project using Cargo, Rust's package manager.

```
$ cargo new rest-api
```

Next, we'll add the Rocket dependency to our `Cargo.toml` file.

```toml
[dependencies]
rocket = "0.5.0-rc.1"
```
We're now ready to start building our API with Rocket.

### Defining Routes
Routes are the entry points for our RESTful API, and in Rocket, defining routes is straightforward. We'll define a simple route that returns a static message when a GET request is made to the root of our API.

```rust
#[get("/")]
fn index() -> &'static str {
    "Welcome to our API!"
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index])
}
```
In the above code snippet, we define an index function that returns a static message. We also define the `rocket` function, which is where we create an instance of our Rocket web application and mount our `index` route to the root of our API.

### Request Handling

Next, let's look at how we can handle requests with Rocket. We'll define a route that takes a query parameter, `name`, and returns a personalized message.

```rust
#[get("/hello/<name>")]
fn hello(name: String) -> String {
    format!("Hello, {}!", name)
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index, hello])
}
```

In the above code, we define a `hello` route that takes in a `name` parameter and returns a personalized message. We use the `String` type to define the `name` parameter and format a message that includes the `name` parameter. We then mount our `hello` route to our Rocket instance.

### Database Integration

Our API is now responding to requests, but we haven’t yet integrated with a database. Rocket makes it easy to integrate with databases using its `rocket_contrib` library.

We'll use the `diesel` crate, an ORM for Rust, and `rocket_sync_db_pools` crate, a synchronous database pooling executor for Rocket and Rust.

```toml
[dependencies]
rocket_sync_db_pools = "0.4.4"
serde = "1.0"
serde_derive = "1.0"
diesel = { version = "1.4.7", features = ["sqlite"] }
```
Then, let's create a new file `db.rs`

```rust
use dotenv::dotenv;
use std::env;
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use rocket::State;
use rocket_sync_db_pools::{database, diesel::MysqlConnection, r2d2::ConnectionPool};

database("mysql_db")
pub struct DbConn(pub ConnectionPool<MysqlConnection>);

pub fn init_pool() -> DbConn {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("set DATABASE_URL");
    let manager = ConnectionManager::<MysqlConnection>::new(database_url);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");
    DbConn(pool)
}
```
In the code block above, we use the `diesel` crate to define our connection to the database. We also use the `rocket_sync_db_pools` crate and its `database` macro to define a database connection pool.

### Error Handling

Finally, let's look at how we can handle errors in our API. Rocket provides a built-in error handling system that allows us to define custom error types and easily return them to clients.

```rust
#[catch(404)]
fn not_found(req: &Request) -> Json<Value> {
    Json(json!({
        "status": 404,
        "reason": "Resource Not Found",
        "requested_path": req.uri().to_string()
    }))
}

#[catch(500)]
fn internal_error() -> Json<Value> {
    Json(json!({
        "status": 500,
        "reason": "Internal Server Error",
    }))
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(DbConn::fairing())
        .mount("/", routes![index, hello])
        .register("/", catchers![not_found, internal_error])
}
```

In the code snippet above, we define two error handler functions, `not_found` and `internal_error`, to handle 404 and 500 errors respectively. We then register these handlers with the API using the `register` method.

### Conclusion

We've covered a lot of ground in this tutorial! By leveraging Rust and Rocket, we were able to build a simple RESTful API that can handle requests, integrate with a database, and handle errors. 

While this tutorial only scratches the surface of what's possible with Rust and Rocket, it should give you a solid foundation for building more complex APIs in the future. With its performance, safety, and ease-of-use, Rust is an excellent choice for web development, and Rocket makes it easy to build powerful web applications quickly.
