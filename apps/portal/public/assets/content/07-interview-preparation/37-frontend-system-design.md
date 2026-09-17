# Frontend System Design

## Purpose

Move from:

```text
How Does Angular Work?
```

to:

```text
How Do We Design Large Applications?
```

---

# Design Interview Mindset

Interviewers care less about:

```text
Syntax
```

and more about:

```text
Trade-offs

Architecture

Scalability

Maintainability
```

---

# Design Framework

Whenever given a system design question:

## Step 1

Understand Requirements

Functional

```text
What Must It Do?
```

Non-Functional

```text
Performance

Security

Scalability
```

---

## Step 2

Identify Domains

Example:

```text
Users

Products

Orders

Notifications
```

---

## Step 3

Define Architecture

```text
Pages

Routes

Stores

Services

APIs
```

---

## Step 4

State Strategy

Decide:

```text
Local State

Shared State

Global State
```

---

## Step 5

Performance Strategy

Consider:

```text
Lazy Loading

OnPush

Signals

Caching
```

---

# Design: Dashboard

Architecture

```text
Dashboard Page

├─ Metrics Widget

├─ Chart Widget

├─ Notifications Widget
```

State

```text
Signals Store
```

Performance

```text
Lazy Widgets

Caching
```

---

# Design: E-Commerce

Domains

```text
Products

Cart

Orders

Payments

Users
```

Global State

```text
Current User

Cart
```

---

# Design: Chat Application

Challenges

```text
Real-Time Updates

Offline Support

Large Message Lists
```

Architecture

```text
WebSocket

Store

Message Cache

Virtual Scrolling
```

---

# Design: Enterprise Portal

Features

```text
Employees

Projects

Reports

Admin
```

Architecture

```text
Core

Shared

Features
```

Potential Future:

```text
Micro Frontends
```

---

# Frontend System Design Questions

1. Design Employee Portal
2. Design E-Commerce Frontend
3. Design Notification System
4. Design Analytics Dashboard
5. Design Real-Time Chat
6. Design Large SaaS Platform
7. Design Micro Frontend Platform

---

# Architecture Discussion Areas

```text
State Management

Authentication

Authorization

Caching

Offline Mode

Error Handling

Performance

Observability

Deployment
```

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Angular Mock Interview Questions](36-mock-interview-questions.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Angular Testing Deep Dive](38-angular-testing-deep-dive.md)

<br/>
<!-- navigation-end -->
