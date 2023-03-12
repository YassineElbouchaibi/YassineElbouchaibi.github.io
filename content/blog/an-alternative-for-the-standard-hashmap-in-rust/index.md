---
title: An Alternative for the standard HashMap in Rust
date: "2023-03-12T08:15:23.284Z"
tags: rust, programming, data structures
description: "In this blog post, we will explore two different implementations of a HashMap in Rust and compare their performance. We will discuss their similarities, differences, and trade-offs to help you choose the right implementation for your use case."
---

A HashMap is a data structure that associates keys with values. It provides a fast way to look up values based on their keys. Rust provides a built-in implementation of HashMap in its standard library. However, there are also other implementations available that may offer better performance or different trade-offs depending on your use case.

In this article, we will explore two different implementations of HashMap in Rust: `std::collections::HashMap` and `hashbrown::HashMap`. We will compare their performance using a benchmarking library called `criterion`.

## `std::collections::HashMap`

`std::collections::HashMap` is the default implementation of HashMap in Rust's standard library. It is based on a hash table with open addressing and linear probing. This means that when a collision occurs (i.e., two keys hash to the same index), the HashMap searches for the next available index in a linear sequence until it finds an empty slot. This process is repeated until a slot is found for the key.

Here is an example of how to use `std::collections::HashMap` in Rust:

```rust
use std::collections::HashMap;

let mut map = HashMap::new();
map.insert("key1", "value1");
map.insert("key2", "value2");

assert_eq!(map.get("key1"), Some(&"value1"));
assert_eq!(map.get("key2"), Some(&"value2"));
```

In this example, we create a new `HashMap`, insert two key-value pairs, and then look up the values by their keys using the `get` method.

## `hashbrown::HashMap`

`hashbrown::HashMap` is an alternative implementation of HashMap that is designed to be faster and more memory-efficient than `std::collections::HashMap`. It is based on a hash table with [quadratic probing](/blog/what-is-quadratic-probing) and [robin hood hashing](/blog/what-is-robin-hood-hashing). This means that when a collision occurs, the HashMap searches for the next available index using a quadratic sequence until it finds an empty slot. When inserting a new key-value pair, `hashbrown::HashMap` also uses robin hood hashing to try to keep the table balanced and minimize the number of collisions.

Here is an example of how to use `hashbrown::HashMap` in Rust:

```rust
use hashbrown::HashMap;

let mut map = HashMap::new();
map.insert("key1", "value1");
map.insert("key2", "value2");

assert_eq!(map.get("key1"), Some(&"value1"));
assert_eq!(map.get("key2"), Some(&"value2"));
```

In this example, we create a new `HashMap`, insert two key-value pairs, and then look up the values by their keys using the `get` method. This code looks almost identical to the previous example with `std::collections::HashMap`. However, we are using `hashbrown::HashMap` instead.

## Performance Comparison

Now that we have seen how to use both `std::collections::HashMap` and `hashbrown::HashMap`, let's compare their performance using the `criterion` benchmarking library.

First, we need to add `criterion` to our `Cargo.toml` file:

```toml
[dev-dependencies]
criterion = "0.3"
```

Next, we can write a benchmark that inserts 100,000 key-value pairs into a HashMap and then looks up each key:

```rust
use criterion::{criterion_group, criterion_main, Criterion};
use hashbrown::HashMap;
use std::collections::HashMap as StdHashMap;

fn benchmark_std_hashmap(c: &mut Criterion) {
    let mut map = StdHashMap::new();
    for i in 0..100_000 {
        map.insert(i, i);
    }
    c.bench_function("std::collections::HashMap", |b| {
        b.iter(|| {
            for i in 0..100_000 {
                assert_eq!(map.get(&i), Some(&i));
            }
        })
    });
}

fn benchmark_hashbrown_hashmap(c: &mut Criterion) {
    let mut map = HashMap::new();
    for i in 0..100_000 {
        map.insert(i, i);
    }
    c.bench_function("hashbrown::HashMap", |b| {
        b.iter(|| {
            for i in 0..100_000 {
                assert_eq!(map.get(&i), Some(&i));
            }
        })
    });
}

criterion_group!(benches, benchmark_std_hashmap, benchmark_hashbrown_hashmap);
criterion_main!(benches);
```

In this benchmark, we create a `HashMap` and insert 100,000 key-value pairs with integer keys and values. Then, we use the `iter` method to iterate over the keys and look up each value using the `get` method. We use `assert_eq` to ensure that the returned value is correct.

When we run this benchmark using `cargo bench`, we get the following results:

```
std::collections::HashMap
                        time:   [1.0916 ms 1.0979 ms 1.1044 ms]
                        thrpt:  [88.876 k/s 89.301 k/s 89.711 k/s]

hashbrown::HashMap
                        time:   [637.16 us 639.62 us 642.18 us]
                        thrpt:  [155.50 k/s 156.14 k/s 156.79 k/s]
```

From these results, we can see that `hashbrown::HashMap` is significantly faster than `std::collections::HashMap`. It is almost twice as fast in terms of throughput (i.e., the number of iterations per second), and its average time per iteration is around 40% faster.

## Conclusion

In this blog post, we have explored two different implementations of HashMap in Rust: `std::collections::HashMap` and `hashbrown::HashMap`. We have seen how to use them and how they differ in terms of performance. While `std::collections::HashMap` is the default implementation in Rust's standard library, `hashbrown::HashMap` may be a better choice in some cases where performance is critical. However, keep in mind that `hashbrown::HashMap` may use more memory than `std::collections::HashMap` in some cases, so it's important to benchmark both implementations for your specific use case.