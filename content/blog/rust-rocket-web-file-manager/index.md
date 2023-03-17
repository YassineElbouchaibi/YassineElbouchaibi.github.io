---
title: Building a Web-Based File Manager Using Rust and Rocket
slug: rust-rocket-web-file-manager
date: "2023-03-17T01:05:47.616Z"
tags: rust, rocket, web development, file management, backend
description: "In this blog post, we'll explore how to use Rust and the Rocket web framework to build a web-based file manager. We'll cover the steps involved in creating a backend that can handle file uploads, create folders, delete files, and serve static files. By the end of this post, you'll have a solid understanding of how to build a simple yet powerful file manager using Rust and Rocket."
---

Managing files is an important aspect of many web applications. Whether it's uploading media files for a content management system or allowing users to upload and manage their own files, having a robust file management system in place is essential. In this article, we'll explore how to use Rust and the Rocket web framework to build a web-based file manager.

## Setting up the environment

To get started, we need to set up our development environment. First, we'll need to install Rust and Cargo, the package manager for Rust. You can download Rust and Cargo from the [official Rust website](https://www.rust-lang.org/tools/install).

Once Rust and Cargo are installed, we need to create a new Rust project. Run the following command:

```
cargo new file-manager
```

This will create a new Rust project called `file-manager`. Next, we need to add the Rocket web framework as a dependency. Open the `Cargo.toml` file in the root of the project, and add the following line under `[dependencies]`:

```
rocket = "0.5.0-rc.1"
```

This will add Rocket as a dependency for our project.

## Creating a file upload endpoint

Next, we need to create an endpoint that allows users to upload files. We'll start by creating a basic Rocket application in the `main.rs` file:

```rust
#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[post("/upload", data = "<file>")]
fn upload_file(file: rocket::Data) -> Result<String, String> {
    // We'll implement the file upload logic here
}

fn main() {
    rocket::ignite()
        .mount("/", routes![upload_file])
        .launch();
}
```

This creates a Rocket endpoint that accepts HTTP POST requests to `/upload`. The `data` argument allows us to receive the uploaded file as a stream of bytes.

To receive the file, we can use the following code:

```rust
use std::io::prelude::*;
use std::fs::File;

#[post("/upload", data = "<file>")]
fn upload_file(file: rocket::Data) -> Result<String, String> {
    let mut buffer = Vec::new();
    file.stream_to(&mut buffer).map_err(|e| {
        println!("Error handling file upload: {:?}", e);
        "Failed to handle file upload".to_string()
    })?;

    let filename = file
        .file_name()
        .map(|name| name.to_string())
        .unwrap_or_else(|| "unknown".to_string());
    let mut file = File::create(&filename).map_err(|e| {
        println!("Error creating file: {:?}", e);
        "Failed to create file".to_string()
    })?;

    file.write_all(&buffer).map_err(|e| {
        println!("Error writing file: {:?}", e);
        "Failed to write file to disk".to_string()
    })?;

    Ok(format!("File {} uploaded successfully", filename))
}
```

This code reads the uploaded file into a buffer, creates a new `File` on disk with the same name as the uploaded file, and writes the buffer to the file. We also return a success message to the client.

## Creating a file delete endpoint

Now that we can handle file uploads, let's add an endpoint that allows us to delete files. We'll create a new endpoint called `/delete`, which accepts a file path as an argument. Here's the implementation:

```rust
use std::fs;

#[delete("/delete/<path..>")]
fn delete_file(path: std::path::PathBuf) -> Result<String, String> {
    let path = path.to_str().unwrap_or_default();
    let deleted = fs::remove_file(&path);
    match deleted {
        Ok(_) => Ok(format!("File {} deleted successfully", path)),
        Err(e) => Err(format!("Failed to delete file: {}", e)),
    }
}
```

This code uses the `std::fs` module to delete the file at the specified path.

## Creating a folder creation endpoint

We also need to be able to create folders on the server. We'll create a new endpoint called `/create-folder`, which accepts the name of the new folder as an argument. Here's the implementation:

```rust
use std::fs;

#[post("/create-folder/<name>")]
fn create_folder(name: String) -> Result<String, String> {
    let result = fs::create_dir_all(&name);
    match result {
        Ok(_) => Ok(format!("Folder {} created successfully", name)),
        Err(e) => Err(format!("Failed to create folder: {}", e)),
    }
}
```

This code uses the `std::fs` module to create a new directory with the specified name.

## Serving static files

Finally, we need to be able to serve static files to the client. For this, we'll create an endpoint called `/files`, which accepts a file path as an argument and returns the contents of the file. We'll use the `StaticFiles` handler provided by Rocket to do this:

```rust
use rocket::fs::{FileServer, Relative};
use rocket_contrib::serve::StaticFiles;

fn main() {
    rocket::ignite()
        .mount("/", routes![
            upload_file, delete_file, create_folder
        ])
        .mount("/files", StaticFiles::new("uploads", Relative::Yes))
        .mount("/", FileServer::from("static"))
        .launch();
}
```

This code serves static files from the `uploads` directory, and from the `static` directory for all other requests.

## Conclusion

In this article, we explored how to use Rust and the Rocket web framework to build a simple yet powerful file manager. We covered the steps involved in handling file uploads, creating folders, deleting files, and serving static files. With the knowledge gained here, you should now be able to build your own file management system with Rust and Rocket.