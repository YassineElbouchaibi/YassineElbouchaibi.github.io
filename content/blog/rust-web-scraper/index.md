---
title: Writing a Web Scraper with Rust
slug: rust-web-scraper
date: "2023-03-19T01:10:36.356Z"
tags: rust, web scraping, programming, tech
description: "In this tutorial, we will learn how to write a web scraper with Rust, a fast and safe programming language. We will use the reqwest and scraper crates for making HTTP requests and parsing the HTML content respectively. By the end of this post, you will have a good understanding of Rust's web scraping capabilities and be able to write your own scraper for any website."
---

Web scraping is a useful technique for extracting information from websites automatically. With the help of a scraper, you can easily collect data like product prices, job listings, weather forecasts, and more. Rust, a modern system programming language, has been gaining popularity in the web development community due to its performance, safety, and ease of use. In this tutorial, we will demonstrate how to build a web scraper in Rust using the reqwest and scraper crates.

## Setting up the Environment

Before starting, ensure that Rust is installed on your system. If not, head over to the official [Rust website](https://www.rust-lang.org/tools/install) to download and install it. Once installed, create a new Rust project by running the following command:

```bash
$ cargo new rust-web-scraper
```

This creates a new directory named `rust-web-scraper` with some default files and directories.

Next, add the `reqwest` and `scraper` crates to the `Cargo.toml` file's dependencies section. Your `Cargo.toml` should look like this:

```toml
[package]
name = "rust-web-scraper"
version = "0.1.0"
edition = "2018"

[dependencies]
reqwest = { version = "0.11.4", features = ["json"] }
scraper = "0.14.0"
```

The `reqwest` crate is used for making HTTP requests, while the `scraper` crate is used for parsing HTML.

## Making HTTP Requests

Let's make an HTTP request to a website and fetch its content. Replace the `main.rs` file's contents with the following code:

```rust
use std::error::Error;
use reqwest::Client;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let client = Client::new();
    let response = client.get("https://example.com").send().await?;

    let html = response.text().await?;
    println!("{}", html);

    Ok(())
}
```

Here, we first import the `Error` trait from the `std` module, and the `Client` struct from the `reqwest` crate. We then define the `main` function as an asynchronous function that returns a `Result` type with an error type boxed dynamically.

Inside the `main` function, we create a new `Client` instance and use it to make a GET request to `"https://example.com"`. We then call the `text` method on the response object to convert the response body to a string.

Finally, we print the HTML content to the console using the `println` macro.

Run the code with the following command:

```bash
$ cargo run
```

You should see the HTML content of the `example.com` website printed to the console.

## Parsing HTML Content

Now that we can make HTTP requests, we need to parse the HTML content to extract the relevant information. Let's say we want to extract the title of the website from the HTML content. We can use the `scraper` crate for this.

Update the `main` function in the `main.rs` file with the following code:

```rust
use std::error::Error;
use reqwest::Client;
use scraper::{Html, Selector};

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let client = Client::new();
    let response = client.get("https://example.com").send().await?;

    let html = response.text().await?;
    let document = Html::parse_document(&html);

    let title_selector = Selector::parse("title").unwrap();
    let title_element = document.select(&title_selector).next().unwrap();
    let title = title_element.text().collect::<Vec<_>>().join("");

    println!("{}", title);

    Ok(())
}
```

Here, we import the `Html` and `Selector` structs from the `scraper` crate. Inside the `main` function, we first parse the HTML content using the `Html::parse_document` method.

We then define a CSS selector for the `title` element using the `Selector::parse` method. We select the first `title` element from the parsed document and get its text content using the `text` method. Finally, we join the text content into a single string using the `join` method of the `Vec` type.

Run the code with the following command:

```bash
$ cargo run
```

You should see the title of the `example.com` website printed to the console.


## Conclusion

In this tutorial, we learned how to write a web scraper in Rust using the `reqwest` and `scraper` crates. We demonstrated how to make HTTP requests and parse the HTML content to extract relevant information. With Rust's performance and safety, writing web scrapers is fast and efficient. The full code for this tutorial can be found on [GitHub](https://github.com/dev-blog/rust-web-scraper).