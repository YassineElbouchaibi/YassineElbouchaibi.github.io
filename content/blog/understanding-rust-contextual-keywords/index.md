---
title: Understanding Rust Contextual Keywords
slug: understanding-rust-contextual-keywords
date: "2023-03-13T01:36:00.090Z"
tags: rust, programming languages, software development, tech
description: "In this blog post, we explore the concept of Rust contextual keywords, which appear as regular identifiers until they are used in a specific context. We cover examples of contextual keywords such as 'self', 'super', and 'return', showing how they operate differently depending on where they are used in a Rust program. By the end of this post, readers will have a better understanding of how to identify and use Rust contextual keywords in their own code."

---

Rust is a relatively new programming language that has been gaining popularity in recent years due to its powerful type system, memory safety, and concurrency features. While Rust has its own set of keywords that are unique to the language, there are also contextual keywords that appear as regular identifiers until they are used in a specific context. In this blog post, we will explore these contextual keywords in more detail, showing how they operate differently depending on where they are used in a Rust program.

## What are Contextual Keywords?

In Rust, a contextual keyword is a regular identifier that is given special meaning when it is used in a specific context. For example, the identifier `self` is a contextual keyword in Rust, which means that it is treated as a keyword when it appears in certain contexts, such as method declarations or implementations of traits.

Other examples of Rust contextual keywords include `super` and `return`. These identifiers are used in different ways depending on their context, and can significantly affect the behavior of a Rust program if used incorrectly.

## Examples of Rust Contextual Keywords

Let's take a look at some examples of Rust contextual keywords to better understand how they are used in different contexts.

### Self

`Self` is a Rust contextual keyword that is used to refer to the current type when defining methods or associated functions in a struct or enum. When used in this context, `Self` refers to the type itself, rather than an instance of the type.

Here's an example:

```
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}
```

In this example, the `impl` block for the `Rectangle` struct defines a method called `area` that takes a reference to `self` and returns the area of the rectangle. The `self` parameter is defined as `&self`, which means that it is a reference to the `Rectangle` instance that the method is called on. Within the method, the `width` and `height` fields of the `Rectangle` instance are accessed using the `self.width` and `self.height` syntax.

### Super

`super` is a Rust contextual keyword that is used to refer to the parent module of the current module. This is useful when you want to access items that are defined in a parent module, such as a trait or a struct.

Here's an example:

```
mod shapes {
    pub struct Rectangle {
        pub width: u32,
        pub height: u32,
    }
}

mod graphics {
    use super::shapes::Rectangle;

    pub struct Screen {
        pub rect: Rectangle,
        pub pixels: Vec<u8>,
    }
}
```

In this example, the `shapes` module defines a `Rectangle` struct that is used in the `graphics` module. To access the `Rectangle` struct from the `graphics` module, the `super::` syntax is used to refer to the parent module (`shapes`). The `use` statement is then used to bring the `Rectangle` struct into scope so that it can be used in the `Screen` struct.

### Return

`return` is a Rust contextual keyword that is used to return a value from a function or closure. When used in this context, `return` exits the function or closure and returns the specified value to the caller.

Here's an example:

```
fn add(a: i32, b: i32) -> i32 {
    return a + b;
}
```

In this example, the `add` function takes two `i32` parameters and returns their sum using the `return` keyword. If the `return` keyword were not used, the function would implicitly return the value of the last expression in the function (which in this case would also be `a + b`).

## Conclusion

In this post, we explored the concept of Rust contextual keywords and showed how they are used in different contexts. By understanding how contextual keywords work, you can write more effective Rust programs that take advantage of Rust's powerful memory safety and concurrency features. So, be sure to keep these contextual keywords in mind as you continue to develop your Rust skills!