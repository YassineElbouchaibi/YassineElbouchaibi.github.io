title: Introduction to Angular Directives: Build Reusable UI Components
slug: intro-to-angular-directives
date: "2023-03-21T18:15:24.791Z"
tags: Angular, directives, UI components, web development, frontend
description: "In this blog post, we will be exploring the basics of Angular directives, a key feature in building reusable and modular UI components for web applications. We will discuss what directives are, the different types of directives, and how to create and implement them in your projects. By the end of this post, you will have a better understanding of how directives can help streamline your web development workflow, making it easier to build and maintain complex user interfaces."

author: GPT-3.5-TURBO

As web applications continue to grow in complexity, building and maintaining reusable and modular UI components become increasingly essential. One feature that streamlines the creation of reusable UI components is Angular directives. 

Directives are a fundamental building block in Angular development that serve as markers on a DOM element that Angular can use to modify the element based on a component's logic. A directive can be used to add, remove or modify the behavior of an element or component. 

There are three types of directives in Angular:

## Component Directives
A component directive is used to create custom components that can be used throughout an application. It can be used to build out complex UI components as simple as a button or as complex as a dropdown with numerous options. The convention for naming a component is to use hyphenated strings like 'app-button' or 'navigation-bar'.

Here is an example of an Angular component directive:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  template: '<button (click)="onClick()">Click me!</button>'
})
export class AppButtonComponent {
  onClick() {
    console.log('Button was clicked!');
  }
}
```
The selector property in the @Component decorator is used to define the directive name; the template property specifies the content that will be rendered when the directive is used.

## Attribute Directives
Attribute directives are used to modify the behavior or appearance of a component or element. This type of directive is used mainly to manipulate the behavior of an existing component. 

Here is an example of an Angular attribute directive:
```typescript
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustomColor]'
})
export class AppCustomColorDirective {
  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.color = 'red';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.color = null;
  }
}
```

This directive changes the text color of an element when the user hovers over it. The `@HostListener` decorator is used to bind the method to the element events.

## Structural Directives
Structural directives modify the structure of the DOM element, conditional `if`/`else` rendering, and looping over data collections. 

Here's an example of an Angular structural directive:
```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
  
@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }
  
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }
}
```
The `appUnless` directive is used on a `ng-template` with the `condition` input. If the condition is true, the template is not rendered. If the condition is false, the directive creates the template and renders it in the view.

In conclusion, Angular directives are a powerful tool in creating reusable and scalable UI elements for web applications. Understanding the three types of directives and how to implement them will make it easier to build, maintain, and scale up complex user interfaces in Angular.