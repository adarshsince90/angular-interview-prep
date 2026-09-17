# Dependency Injection (DI)

## Interview Priority

**Must Know**

## Interview Frequency

**Extremely Common**

## Recommended Depth

**Expert Level Understanding**

## Relevant For

- Mid-Level Interviews
- Senior Developer Interviews
- Lead Developer Interviews
- Architect Discussions

---

# What is Dependency Injection?

Dependency Injection (DI) is a design pattern where an object receives its dependencies from an external source instead of creating them itself.

Simple definition:

```text
Don't create dependencies.

Receive dependencies.
```

---

# Why Does Dependency Injection Exist?

Consider a Component that needs a Service.

Without DI:

```typescript
export class EmployeeComponent {

  private employeeService =
      new EmployeeService();
}
```

Initially this appears simple.

However, over time:

```text
EmployeeService
    ↓
HttpClient
    ↓
Logger
    ↓
Configuration
    ↓
Cache
```

Object creation becomes increasingly complex.

---

# First Principles

The Component now has two responsibilities:

```text
Use EmployeeService

Create EmployeeService
```

This violates the Single Responsibility Principle.

The component should only be responsible for:

```text
Using EmployeeService
```

Dependency Injection solves this problem.

---

# The Core Idea

Instead of:

```typescript
new EmployeeService()
```

Angular allows:

```typescript
constructor(
  private employeeService: EmployeeService
) {}
```

The Component declares:

```text
I need EmployeeService.
```

Angular responds:

```text
I'll provide it.
```

---

# Restaurant Analogy

Without DI:

```text
Customer wants food.

Customer enters kitchen.
Customer cooks food.
Customer serves food.
```

---

With DI:

```text
Customer places order.

Food is delivered.
```

The customer focuses only on consuming the service.

The kitchen handles creation.

---

# Key Terminology

Angular DI discussions often involve four core terms:

```text
Dependency
Injection
Provider
Injector
```

---

# Dependency

A dependency is anything a class requires to function.

Example:

```typescript
EmployeeService
```

inside:

```typescript
EmployeeComponent
```

The service is the dependency.

---

# Injection

Providing the dependency to the consumer.

Example:

```typescript
constructor(
  private employeeService:
      EmployeeService
)
{}
```

Angular injects the dependency.

---

# Provider

A Provider tells Angular:

```text
How to create an object.
```

Example:

```typescript
@Injectable({
  providedIn: 'root'
})
```

Provider registration.

---

# Injector

The Injector is Angular's Dependency Injection container.

Responsibilities:

```text
Create Dependencies
Store Dependencies
Manage Dependencies
Provide Dependencies
```

Think of it as Angular's object factory.

---

# ASP.NET Core Comparison

Angular:

```typescript
@Injectable({
  providedIn: 'root'
})
```

ASP.NET Core:

```csharp
builder.Services.AddSingleton<
     IEmployeeService,
     EmployeeService>();
```

---

Angular:

```typescript
constructor(
 private employeeService:
 EmployeeService
)
{}
```

ASP.NET Core:

```csharp
public EmployeeController(
    IEmployeeService employeeService
)
{
}
```

Conceptually identical.

---

# High-Level Flow

```text
Component

     ↓

Requests Dependency

     ↓

Injector

     ↓

Creates / Retrieves Dependency

     ↓

Dependency Provided
```

---

# Angular Example

Service:

```typescript
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
}
```

---

Component:

```typescript
@Component({...})
export class EmployeeComponent {

  constructor(
    private employeeService:
        EmployeeService
  ) {
  }

}
```

Angular handles creation automatically.

---

# What Actually Happens Internally?

Angular detects:

```typescript
EmployeeService
```

inside constructor parameters.

Then:

```text
Step 1
Look inside Injector

Step 2
Check whether EmployeeService exists

Step 3
If found
  Return existing instance

Step 4
If not found
  Create instance

Step 5
Store instance

Step 6
Provide to component
```

---

# Why Dependency Injection Matters

## Loose Coupling

Without DI:

```typescript
new EmployeeService()
```

The component directly controls dependency creation.

Strong coupling.

---

With DI:

```typescript
constructor(
  private employeeService:
      EmployeeService
)
```

The component depends only on the contract.

---

# Better Testability

Without DI:

```typescript
new EmployeeService()
```

Very difficult to replace.

---

With DI:

```typescript
MockEmployeeService
```

can easily be substituted.

This is one of the biggest advantages.

---

# Better Reusability

Different implementations become possible.

Examples:

```text
Real Service

Mock Service

Cached Service

Offline Service
```

The component remains unchanged.

---

# Centralized Dependency Management

Angular manages:

```text
Object Creation
Object Sharing
Object Lifetime
Memory Usage
Configuration
```

centrally.

---

# Dependency Injection Workflow

```text
EmployeeComponent

        ↓

Needs EmployeeService

        ↓

Injector

        ↓

Creates or Retrieves Instance

        ↓

Returns EmployeeService

        ↓

Component Uses Service
```

---

# The @Injectable Decorator

Services that participate in DI commonly use:

```typescript
@Injectable()
```

Example:

```typescript
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
}
```

Purpose:

```text
Marks class as participating
in Angular DI.
```

---

# What Does providedIn: 'root' Mean?

Example:

```typescript
@Injectable({
  providedIn: 'root'
})
```

Angular registers the service in the:

```text
Root Injector
```

Result:

```text
Single Service Instance

Shared Across Application
```

This is effectively application-wide singleton behavior.

---

# Root Injector

Most commonly used injector.

```text
Application
      ↓
Root Injector
      ↓
Services
```

All components can access services registered here.

---

# Hierarchical Injectors

Angular uses a hierarchy.

```text
Root Injector
      │
      ├── Component Injector
      │
      └── Child Component Injector
```

Dependencies can be registered at different levels.

---

# Component-Level Provider

Example:

```typescript
@Component({
  providers: [EmployeeService]
})
```

This changes behavior.

Instead of:

```text
One Shared Instance
```

Angular creates:

```text
One Instance Per Component
```

---

# Interview Question

## Root Service vs Component Service?

Root:

```typescript
providedIn: 'root'
```

Result:

```text
Shared Singleton
```

---

Component-Level:

```typescript
providers:[EmployeeService]
```

Result:

```text
Independent Instance
Per Component
```

Very common interview question.

---

# Service Lifetime Examples

## Root

```typescript
@Injectable({
 providedIn:'root'
})
```

Typical use cases:

```text
Authentication

User Session

Configuration

Theme
```

---

## Component Scoped

```typescript
@Component({
 providers:[EmployeeService]
})
```

Typical use cases:

```text
Feature-specific state

Independent form instances

Isolated behavior
```

---

# Modern Angular (16+)

Angular introduced:

```typescript
inject()
```

as an alternative to constructor injection.

---

# Traditional Constructor Injection

```typescript
constructor(
 private employeeService:
     EmployeeService
)
{}
```

Most common pattern.

---

# Modern inject()

```typescript
private employeeService =
   inject(EmployeeService);
```

Benefits:

```text
Cleaner Syntax

Works Outside Constructors

Useful For Functional APIs
```

---

# Why Angular Added inject()

Modern Angular introduced:

- Functional Guards
- Functional Interceptors
- Functional Providers

These often lack constructors.

`inject()` solves this problem.

---

# Constructor Injection vs inject()

## Constructor Injection

Advantages:

```text
Explicit

Widely Used

Easy To Read
```

---

## inject()

Advantages:

```text
Modern

Flexible

Required In Some Functional APIs
```

---

# Interview Guidance

Understand both.

Enterprise applications still heavily use:

```typescript
constructor injection
```

while modern Angular increasingly uses:

```typescript
inject()
```

---

# Dependency Injection and Testing

One of DI's biggest benefits is unit testing.

Example:

```text
EmployeeComponent
```

depends on:

```text
EmployeeService
```

During testing:

```typescript
MockEmployeeService
```

can be injected instead.

Benefits:

```text
Faster Tests

Predictable Tests

Isolated Tests
```

---

# Common Interview Questions

## What is Dependency Injection?

A design pattern where objects receive dependencies from an external source rather than creating them directly.

---

## Why is DI important?

Because it improves:

- Maintainability
- Testability
- Reusability
- Loose Coupling

---

## What is a Dependency?

An object required by another object.

---

## What is an Injector?

Angular's container responsible for creating and providing dependencies.

---

## What is a Provider?

Configuration that tells Angular how to create a dependency.

---

## What does providedIn: 'root' mean?

Registers the service at application level and generally creates a singleton instance.

---

## What is @Injectable()?

A decorator indicating that a class participates in Angular's Dependency Injection system.

---

## Constructor Injection vs inject()?

Constructor injection is the traditional approach.

`inject()` is the modern approach and useful in functional APIs.

---

## Why is DI better than new?

Because it reduces coupling and improves testing and maintainability.

---

# Common Interview Traps

## Trap 1

Thinking:

```text
Service = DI
```

Wrong.

Service:

```text
Dependency
```

DI:

```text
Mechanism Providing Dependency
```

---

## Trap 2

Thinking Angular DI only works with Services.

Angular can inject:

```text
Services

Tokens

Configurations

Framework Dependencies
```

---

## Trap 3

Memorizing syntax only.

The important concept is:

```text
Separate Object Usage

From

Object Creation
```

---

# Senior-Level Discussion

Dependency Injection is an implementation of the Dependency Inversion Principle.

Instead of high-level modules creating low-level dependencies directly:

```text
Component
   creates
Service
```

Angular introduces:

```text
Component
     ↓
Requests Dependency

Injector
     ↓
Provides Dependency
```

This architecture:

- Reduces coupling
- Improves testability
- Simplifies maintenance
- Enables framework-managed lifecycles

For enterprise applications, DI becomes a foundational architectural capability rather than merely a convenience feature.

---

# Architecture Considerations

When using DI:

Ask:

1. Should this service be shared?
2. Does it need singleton behavior?
3. Does it belong at root level?
4. Should each component receive its own instance?
5. Will this improve testability?

Good DI usage promotes:

```text
Loose Coupling

Maintainability

Testability

Scalability
```

---

# Diagram

```text
EmployeeComponent
          │
          ▼

   Requests Service

          │
          ▼

       Injector

          │
          ▼

   EmployeeService

          │
          ▼

     Shared Instance
     (Root Injector)
```

---

# Key Takeaways

1. Dependency Injection means receiving dependencies rather than creating them.
2. DI solves tight coupling problems.
3. Angular uses an Injector to create and manage dependencies.
4. Providers tell Angular how to create dependencies.
5. `providedIn: 'root'` typically creates application-wide singleton services.
6. Angular supports both constructor injection and `inject()`.
7. DI improves maintainability, testability, and reusability.
8. Angular DI is conceptually very similar to ASP.NET Core DI.

---

# Interview Notes (Revision Version)

## DI Definition

Receive dependencies instead of creating them directly.

---

## Core Concepts

```text
Dependency

Injection

Provider

Injector
```

---

## Typical Flow

```text
Component
    ↓
Injector
    ↓
Service
```

---

## Root Registration

```typescript
@Injectable({
  providedIn: 'root'
})
```

Application-wide singleton.

---

## Modern Angular

```typescript
inject(EmployeeService)
```

Supported and increasingly common.

---

## Traditional Angular

```typescript
constructor(
  private service: EmployeeService
)
{}
```

Still heavily used.

---

## Key Message

Dependency Injection separates object creation from object usage, improving maintainability, testability, and scalability in Angular applications.


---

---

# Practical Examples

## Example 1: Simple Service Registration and Injection

### Service

```typescript
// employee.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  getEmployees(): string[] {
    return [
      'Adarsh',
      'John',
      'Mary'
    ];
  }

}
```

### Component

```typescript
// employee.component.ts

import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  templateUrl: './employee.component.html'
})
export class EmployeeComponent {

  employees: string[] = [];

  constructor(
    private employeeService: EmployeeService
  ) {
  }

  ngOnInit(): void {
    this.employees =
      this.employeeService.getEmployees();
  }

}
```

### Template

```html
<h2>Employees</h2>

<ul>
  <li *ngFor="let employee of employees">
  * {{ employee }}
  </li>
</ul>
```

### What Angular Does Internally

Conceptually:

```typescript
const service =
    injector.get(EmployeeService);

component.employeeService =
    service;
```
*Angular performs this automatically.*

---

# Example 2: Modern inject() API

Starting with newer Angular versions, dependencies can also be obtained using the `inject()` function.

### Service

```typescript
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  getEmployees(): string[] {
   return ['Adarsh', 'John', 'Mary'];
  }

}
```

### Component

```typescript
import {
  Component,
  inject } from '@angular/core';

@Component({
  selector: 'app-employee',
  standalone: true,
  template: `<h2>Employees</h2>`
})
export class EmployeeComponent {

  private employeeService =
      inject(EmployeeService);

}
```

## Why Angular Introduced inject()

Benefits:

```text
Cleaner Code

Works Outside Constructors

Useful For Functional Guards

Useful For Functional Interceptors

Useful For Standalone APIs
```

---

# Example 3: Service Depending On Another Service

Services themselves can have dependencies.
### Service

```typescript
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
*  constructor(
      private http: HttpClient
  ) {
  }

  getEmployees() {
*   return this.http.get<Employee[]*(
      '/api/employees'
    );

}
```

### Dependency Chain

```text
EmployeeComponent
           │           ▼

EmployeeService
           │
           ▼

HttpClient            │           ▼

Backend API
```

Angular resolves the entire dependency chain automatically.

This is one of the key reasons DI exists.

---

# Example 4: Multiple Dependencies

A Component can receive multiple dependencies.

```typescript
constructor(
  private employeeService: EmployeeService,
  private authService: AuthService,
* private notificationService: NotificationService
) {
}
```

Angular resolves all dependencies automatically.

### Visual Representation

```text
EmployeeComponent

     │
     ├── EmployeeService
     │
     ├── AuthService
     │
     └── NotificationService
```

---

# Example 5: Component-Level Provider

Most applications use:

```typescript
providedIn: 'root'
```

Sometimes we want a separate Service instance per Component.

### Component

```typescript
@Component({
  selector: 'app-employee',
  standalone: true,
  providers: [EmployeeService],
  template: `<h2>Employees</h2>`
})
export class EmployeeComponent {
}
```

### Result

```text
EmployeeComponent #1
        │
        ▼
EmployeeService #1

-----------------*
EmployeeComponent #2
        │
  *     ▼
EmployeeService #2
```

Each Component receives its own Service instance.

---

# Root Provider vs Component Provider

## Root Provider

```typescript
@Injectable({
  providedIn: 'root'
})
```

Result:

```text
Single Shared Instance
Across Entire Application
```

Use Cases:

```text
Authentication

Current User
Theme

Configuration

Application State
```

---

## Component Provider

```typescript
@Component({
  providers: [EmployeeService]
})
```
Result:

```text
Separate Instance Per Component
```

Use Cases:

```text
Independent Forms

Draft State
Wizard Screens

Feature-Specific Context
```

---

# Complete Dependency Resolution Flow

```text
User
* │

 ▼

EmployeeComponent
 │
 │ requests ▼

EmployeeService

 │
 │ depends on
 ▼

HttpClient

 │
 │ performs request
 ▼

Backend API

 │
 ▼

Database

─────────────────────────

Response Flow

Database

 │

 ▼

Backend API

 │

 ▼

HttpClient

 │

 ▼

EmployeeService

 │

 ▼

EmployeeComponent

 │

 ▼

Template
 │

 ▼

User
```

This is the most important Angular architecture diagram to remember.

---

# Angular vs ASP.NET Core DI

Angular

### Registration

```typescript
@Injectable({
  providedIn: 'root'
})
```

## Consumption

```typescript
constructor(
  private employeeService: EmployeeService
)
{
}
```

*--

ASP.NET Core

### Registration
```csharp
builder.Services
      .AddSingleton<EmployeeService>();
```

### Consumption

```csharp
public EmployeeController(
  * EmployeeService service)
{
}
```
Conceptually both frameworks use the same Dependency Injection pattern.

---

## Interview Visualization

```text
Component

     *│

      ▼

Requests Dependency
      │

      ▼

Injector

     *│

      ▼

Creates Or Resolves

     *│

      ▼

Dependency Returned

 *    │

      ▼

Component Uses Dependency
```

Key idea:

```text
Component Uses Dependency

Angular Creates Dependency
```

That separation is the entire purpose of Dependency Injection.

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Services](09-services.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [HttpClient](11-http-client.md)

<br/>
<!-- navigation-end -->
