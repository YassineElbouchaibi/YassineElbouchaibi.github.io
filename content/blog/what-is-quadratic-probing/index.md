---
title: What is Quadratic Probing?
slug: what-is-quadratic-probing
date: "2023-03-12T10:23:57.284Z"
tags: algorithms, data structures, hash tables
description: "In this blog post, we dive into the world of hash table probing and explore quadratic probing in detail. We compare it with other types of probing and discuss its strengths and weaknesses. By the end of this post, readers will have a better understanding of quadratic probing and when to use it in their code."
---

Hash tables are one of the most commonly used data structures in computer science. They allow us to store and retrieve data quickly, making them ideal for tasks such as caching, indexing, and searching. However, hash tables are not perfect, and sometimes collisions can occur when two or more keys map to the same index. This is where probing comes in.

Probing is the process of finding an empty slot in a hash table when a collision occurs. There are several types of probing techniques, including linear probing, quadratic probing, and double hashing. In this post, we will focus on quadratic probing.

## What is Quadratic Probing?

Quadratic probing is a probing technique that uses a quadratic function to search for an empty slot in a hash table. When a collision occurs, quadratic probing looks for the next empty slot by using the formula:

```
hash(key, i) = (hash(key) + i^2) % table_size
```

where `hash(key)` is the hash value of the key, `i` is the number of collisions that have occurred, and `table_size` is the size of the hash table. Quadratic probing tries to find an empty slot by checking indices that are farther away from the original hash index, which reduces the likelihood of clustering.

Let's take a look at an example. Suppose we have a hash table of size 7 and the following keys:

```
[43, 23, 37, 19, 36, 28]
```

We will use the following hash function:

```
hash(key) = key % 7
```

The initial hash indices for each key are:

```
[1, 2, 2, 5, 1, 0]
```

As you can see, keys 37 and 36 both map to index 2, causing a collision. With quadratic probing, we can search for the next empty slot by using the formula:

```
hash(37, 1) = (hash(37) + 1^2) % 7 = (2 + 1) % 7 = 3
hash(36, 1) = (hash(36) + 1^2) % 7 = (1 + 1) % 7 = 2
hash(37, 2) = (hash(37) + 2^2) % 7 = (2 + 4) % 7 = 6
hash(36, 2) = (hash(36) + 2^2) % 7 = (1 + 4) % 7 = 5
```

The new hash indices for keys 37 and 36 are:

```
[1, 2, 3, 5, 6, 0]
```

As you can see, quadratic probing has successfully found empty slots for both keys.

## Quadratic Probing vs Linear Probing

Quadratic probing is often compared to linear probing, another popular probing technique. With linear probing, we search for the next empty slot by using the formula:

```
hash(key, i) = (hash(key) + i) % table_size
```

where `i` is the number of collisions that have occurred. Linear probing checks indices that are adjacent to the original hash index, which can lead to clustering.

In general, quadratic probing tends to have better performance than linear probing when the load factor (the ratio of filled slots to total slots) is low. However, as the load factor increases, quadratic probing can become less efficient than linear probing.

## When to Use Quadratic Probing

Quadratic probing is a good choice for hash tables when the load factor is low to medium and the hash function distributes keys evenly across the table. In general, quadratic probing can provide better performance than linear probing in these scenarios.

However, when the load factor is high, quadratic probing can lead to a lot of probing, which can slow down the performance of the hash table. In these cases, it may be better to use other probing techniques, such as double hashing.

## Conclusion

In this post, we have explored quadratic probing, a popular probing technique used in hash tables. We have compared it to linear probing and discussed its strengths and weaknesses. We have also discussed when it is appropriate to use quadratic probing in your code. With this knowledge, you can make better decisions when designing and implementing hash tables in your programs.