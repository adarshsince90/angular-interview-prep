# Angular Mock Interview Questions

## Purpose

This document is intended for rapid interview revision.

Use it:

- Before interviews
- During revision sessions
- For self-assessment
- For mock interview practice

---

# Angular Fundamentals

## Q: What is Angular?

Angular is a TypeScript-based frontend framework used for building Single Page Applications (SPAs).

Key characteristics:

- Component-based architecture
- Dependency Injection
- Reactive programming support
- Routing
- Forms
- HTTP support

---

## Q: SPA vs MPA?

SPA:

- Single HTML page
- Client-side routing
- Faster navigation

MPA:

- Multiple HTML pages
- Server-side navigation
- Full page reloads

---

## Q: What is Bootstrapping?

Process of loading the Angular application and creating the root component.

---

# Components

## Q: What is a Component?

A component controls a portion of the UI.

Contains:

- Template
- Styles
- Logic

---

## Q: Smart vs Dumb Components?

Smart:

- Business logic
- Service interaction
- State management

Dumb:

- Presentation only
- Receives Input
- Emits Output

---

## Q: Lifecycle Hooks Order?

```text
constructor

ngOnChanges

ngOnInit

ngDoCheck

ngAfterContentInit

ngAfterContentChecked

ngAfterViewInit

ngAfterViewChecked

ngOnDestroy
```

---

# Change Detection

## Q: What is Change Detection?

Mechanism Angular uses to synchronize data and UI.

---

## Q: Default vs OnPush?

Default:

- Checks entire tree

OnPush:

- Checks only when:
  - Input changes
  - Event occurs
  - Observable emits
  - Signal updates

---

## Q: Why Use OnPush?

Improves performance by reducing unnecessary checks.

---

# Dependency Injection

## Q: What is DI?

Design pattern for providing dependencies externally.

Benefits:

- Loose coupling
- Testability
- Reusability

---

## Q: Singleton Service?

Service with single instance shared across application.

---

# RxJS

## Q: Observable vs Promise?

Observable:

- Multiple values
- Lazy
- Cancelable

Promise:

- Single value
- Eager
- Not cancelable

---

## Q: switchMap vs mergeMap?

switchMap:

- Cancels previous request

mergeMap:

- Runs requests concurrently

Interview Rule:

```text
Search Box
→ switchMap

Parallel Requests
→ mergeMap
```

---

## Q: concatMap?

Processes requests sequentially.

---

## Q: exhaustMap?

Ignores new requests while current request runs.

Useful:

```text
Login Button
Submit Button
```

---

## Q: shareReplay?

Caches observable results.

Prevents repeated API calls.

---

# Signals

## Q: What Problem Do Signals Solve?

Fine-grained reactivity.

---

## Q: signal vs computed vs effect?

signal

```text
State
```

computed

```text
Derived State
```

effect

```text
Side Effects
```

---

## Q: Signals vs RxJS?

Signals:

```text
State Management
UI Reactivity
```

RxJS:

```text
Streams
Async Programming
```

---

# Routing

## Q: What is Lazy Loading?

Load features only when required.

Benefits:

- Smaller initial bundle
- Faster startup

---

## Q: What Are Route Guards?

Protect routes.

Common types:

```text
CanActivate

CanDeactivate

CanMatch
```

---

# Forms

## Q: Template-Driven vs Reactive Forms?

Template:

```text
Simple Forms
```

Reactive:

```text
Complex Forms
Enterprise Apps
```

---

## Q: Why Reactive Forms?

Better:

- Scalability
- Testability
- Dynamic forms

---

# HTTP

## Q: What Are Interceptors?

Middleware for all HTTP requests/responses.

Use cases:

```text
Auth

Logging

Error Handling
```

---

## Q: What Is HttpClient?

Angular service for backend communication.

---

# Authentication

## Q: Authentication vs Authorization?

Authentication:

```text
Who Are You?
```

Authorization:

```text
What Can You Do?
```

---

## Q: JWT?

Signed token containing identity claims.

---

## Q: Access vs Refresh Token?

Access Token:

```text
Short-lived
```

Refresh Token:

```text
Obtain New Access Tokens
```

---

# State Management

## Q: Local vs Shared vs Global State?

Local:

```text
Component Only
```

Shared:

```text
Feature Level
```

Global:

```text
App Level
```

---

## Q: What Problem Does NgRx Solve?

Enterprise-scale state governance.

---

## Q: What Is An Action?

An event.

---

## Q: What Is dispatch()?

Publishes event into NgRx system.

---

## Q: What Is A Reducer?

Pure function:

```text
Old State + Action
↓
New State
```

---

## Q: Why Are Reducers Pure?

Predictability and testability.

---

## Q: What Is An Effect?

Handles side effects.

Examples:

```text
API Calls
Logging
Navigation
```

---

# Performance

## Q: Performance Optimization Techniques?

```text
OnPush

trackBy

Lazy Loading

Signals

Code Splitting

Memoization
```

---

## Q: Why trackBy?

Avoid unnecessary DOM recreation.

---

# Error Handling

## Q: 401 vs 403?

401

```text
Unauthenticated
```

403

```text
Unauthorized
```

---

## Q: Why Use Global ErrorHandler?

Capture runtime errors.

---

## Q: Where Should HTTP Errors Go?

Interceptor.

---

# Enterprise Architecture

## Q: Core vs Shared vs Feature?

Core

```text
Infrastructure
```

Shared

```text
Reusable Building Blocks
```

Feature

```text
Business Domain
```

---

## Q: Why Organize By Feature?

Improves ownership and scalability.

---

# Micro Frontends

## Q: What Is A Micro Frontend?

Independent frontend applications composed into one product.

---

## Q: Biggest Benefit?

Team autonomy.

---

## Q: Biggest Drawback?

Operational complexity.

---

# Final Rapid Revision

```text
Signal
 = State

Computed
 = Derived State

Interceptor
 = HTTP Middleware

Guard
 = Route Protection

Action
 = Event

Reducer
 = State Transition

Effect
 = Side Effect

JWT
 = Identity Token

Shell
 = Micro Frontend Host
```

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Micro Frontends](../06-senior-architecture/35-micro-frontends.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Frontend System Design](37-frontend-system-design.md)

<br/>
<!-- navigation-end -->
