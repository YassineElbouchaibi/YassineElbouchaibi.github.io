---
title: A Complete Guide to Concurrency in Rust
slug: guide-to-concurrency-in-rust
date: "2023-03-13T12:26:40.986Z"
tags: rust, concurrency, multi-threading, async programming
description: "In this blog post, we will explore the principles and techniques of concurrency in Rust programming. We will cover the basic concepts of concurrency, the different types of threads used in Rust for concurrent programming, synchronization primitives, and best practices for writing highly concurrent programs."
---

## Introduction

Programming languages that support concurrency enable developers to write efficient programs that can perform multiple tasks simultaneously. Rust is one such language that provides excellent concurrency support. It uses a variety of powerful concurrency primitives that make writing concurrent programs easier and safer.

In this guide, we will dive deep into the topic of concurrency in Rust programming. We will start by examining some of the fundamental concepts of concurrency, then explore Rust's threading model, synchronization primitives, and finally discuss some concurrency best practices.

## Understanding Concurrency

Concurrency is the concept of a program performing multiple tasks simultaneously. Modern processors tend to have multiple cores, which can execute multiple tasks in parallel. Concurrency is essential for programs that need to perform multiple tasks simultaneously, for instance, network servers, GUI applications, and game engines.

Concurrency in Rust revolves around the concept of threads. A thread is an execution context capable of running code independently of other threads running in the same program. In Rust, each thread represents an independent task available to the programmer. Rust provides a multi-threading ability allowing programs to utilize multiple threads simultaneously.

## Rust's Threading Model

Rust provides a simple and safe interface for creating threads. It achieves this by wrapping the underlying operating system's threading APIs with higher-level abstractions. Thread creation in Rust is relatively cheap, and the libraries offer several synchronization primitives to coordinate work between threads.

To create a new thread in Rust, use the `std::thread::spawn` function as shown below:

```rust
use std::thread;

fn main() {
  let new_thread = thread::spawn(|| {
    // code to be executed by the new thread
  });

  // Wait for the newly created thread to finish
  new_thread.join().unwrap();
}
```

In the example, we create a new thread using the `std::thread::spawn` function. The code to be executed by the new thread is passed in the form of a closure. The `join` method is used to wait for the thread to finish execution.

## Thread Synchronization in Rust

In concurrent programs, it's often necessary to synchronize access to shared data to prevent undefined behavior. Rust provides several primitives for thread synchronization, including locks, semaphores, and channels.

### Locks

Locks are primitives used to ensure mutual exclusion when accessing shared data. Rust provides two types of locks, the `Mutex` and `RwLock`. The `Mutex` provides exclusive access to a shared resource by one thread at a time, while the `RwLock` provides readers shared access while only allowing one writer at a time.

```rust
use std::sync::{Mutex, Arc};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = counter.clone();
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Counter: {}", *counter.lock().unwrap());
}
```

In the example above, we use Mutex to ensure that only one thread can update the counter at a time.

### Channels

Channels are a mechanism that allows threads to communicate by passing values between them. Rust provides channels as a built-in concurrency primitive. They are similar to pipes in Unix-like operating systems and can be used for one- or two-way communication.

```rust
use std::sync::mpsc::{channel, Receiver, Sender};
use std::thread;

type Job = Box<dyn FnOnce() + Send + 'static>;

enum ThreadMessage {
    NewJob(Job),
    Terminate,
}

fn start_dispatcher(
    mut job_receiver: Receiver<ThreadMessage>,
    thread_count: usize,
) -> Vec<thread::JoinHandle<()>> {
    let mut thread_handles = Vec::with_capacity(thread_count);

    for i in 0..thread_count {
        let receiver = job_receiver.clone();
        let thread_handle = thread::spawn(move || {
            loop {
                let message = receiver.recv().unwrap();

                match message {
                    ThreadMessage::NewJob(job) => {
                        job();
                    }
                    ThreadMessage::Terminate => {
                        break;
                    }
                }
            }
        });
        thread_handles.push(thread_handle);
    }

    thread_handles
}

fn main() {
    let (job_sender, job_receiver): (Sender<ThreadMessage>, Receiver<ThreadMessage>) = channel();

    let dispatcher_threads = start_dispatcher(job_receiver, 5);

    for i in 0..100 {
        let sender = job_sender.clone();
        let job = Box::new(move || {
            println!("I am job {}", i);
        }) as Job;

        sender.send(ThreadMessage::NewJob(job)).unwrap();
    }

    for _ in 0..5 {
        job_sender.send(ThreadMessage::Terminate).unwrap();
    }

    for thread_handle in dispatcher_threads {
        thread_handle.join().unwrap();
    }
}
```

In the example, we create a simple job dispatcher that accepts jobs from some other part of the program and delegates them to a pool of threads. The job dispatcher uses a channel to communicate jobs to the pool of threads.

## Async Programming in Rust

Rust also provides excellent support for async programming. The core primitive for async programming in Rust is the `async` keyword. When you mark a function as `async`, Rust automatically converts it into a state machine that can be used with the `await` keyword.

```rust
use std::error::Error;
use reqwest::Client; // you may have to include this dependency in your Cargo.toml file

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let client = Client::new();
    let resp = client.get("https://www.google.com").send().await?;
    println!("{}", resp.text().await?);
    Ok(())
}
```

In the example above, we demonstrate how to make an HTTP GET request asynchronously using the `reqwest` library. This is done by making the `main` function `async` and using the `await` keyword to wait for the response to finish downloading.

## Conclusion

Concurrency is a vital concept in computer science and programming. Rust provides excellent support for concurrency, with powerful primitives like threads, locks, and channels. In this guide, we have covered some of the basic concepts of concurrency and explored Rust's threading model, synchronization primitives, and async programming. I hope this guide has been helpful to you, and good luck with your future concurrent programming endeavors!