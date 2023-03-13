---
title: Distributed Systems - Handling Failures in a World of Asynchrony
slug: distributed-systems-handling-failures-in-a-world-of-asynchrony
date: "2022-11-23T14:36:12.284Z"
tags: distributed systems, failure handling, asynchronous programming
description: "In this blog post, we explore how distributed systems handle failures, and specifically, how to handle failure in a world of asynchrony. We cover techniques such as retries, circuit breakers, load shedding, and more, providing insight into their strengths and weaknesses. By the end of this post, readers will have a better understanding of how to write resilient, fault-tolerant distributed systems."

---

A distributed system is a collection of separate, independent computers that work together to solve a single problem. These computers communicate with each other through a network, where messages are passed between them asynchronously. Handling failures in such systems presents a unique set of challenges, especially in a world of asynchrony. In this post, we explore how to handle failure in a distributed system and specifically, how to handle failure in an asynchronous world.

# Why failure is inevitable

Failures are inevitable in distributed systems. One machine may fail, a network connection may become unreliable, or even a software bug may cause unexpected behaviour. Hence, it's important to build systems that are resilient to failures. But designing resilient distributed systems is easier said than done. Asynchrony, an essential characteristic of distributed systems, introduces new challenges in handling failures.

# Handling failures with retries

Retries are a common technique used to handle failures in distributed systems. In a world of asynchrony, retries are especially useful because they allow us to retry a failed operation without holding up the execution of the entire system.

Here's an example of how to use the `retry` crate in Rust to implement retries:

```rust
use retry::{delay::Fixed, retry, retry_if, ErrorKind};

fn perform_operation() -> Result<(), ()> {
    // Some operation that may fail
    // ...
    
    Err(())
}

fn main() {
    let result = retry(Fixed::from_millis(1000).take(3), || {
        perform_operation().map_err(|_| ErrorKind::Temporary)
    });
    
    match result {
        Ok(_) => println!("Operation succeeded!"),
        Err(_) => println!("All retries failed!"),
    }
}
```

In this example, we use the `retry` function from the `retry` crate to retry the `perform_operation` function up to three times, with a delay of one second between each try.

# Circuit breakers and load shedding

While retries can be effective in simple cases, in more complex cases, retries may not be the best solution to handle failures. Circuit breakers are a technique used to prevent disastrous cascading failures in a distributed system. The basic idea is to monitor the health of downstream services and cut off requests when they're not responding, thereby protecting your system from becoming overwhelmed by incoming traffic.

Load shedding is another strategy you can use in situations where your system is overloaded. It involves identifying critical services and prioritizing requests that access these services while delaying or even ignoring requests that don't access them. This technique helps ensure that the most important services remain available even during times of high traffic.

# Conclusion

Handling failures in distributed systems is essential for building resilient, fault-tolerant systems. Retries, circuit breakers, and load shedding are just a few of the techniques you can use to handle failures. Although there's no silver bullet to building distributed systems, these techniques provide a good starting point to build a more robust and reliable system.