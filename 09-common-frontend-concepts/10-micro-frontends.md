# Micro Frontends

## Why This Topic Exists

As organizations grow, frontend applications become enormous.

Examples:

```text
Banking Platforms

ERP Systems

Healthcare Systems

E-Commerce Platforms
```

Often developed by:

```text
Dozens

Or

Hundreds Of Engineers
```

---

Question:

```text
Can One Team Own Everything?
```

Eventually:

```text
No
```

---

Micro Frontends emerged to solve:

```text
Frontend Scalability

Team Scalability
```

---

## Learning Objectives

By the end of this chapter you should understand:

```text
Why Micro Frontends Exist

Benefits

Challenges

Architectural Models

Team Ownership

Deployment Strategies

Communication Patterns

Shared Libraries

State Sharing

Routing

Performance Tradeoffs
```

---

# First Principles

Consider:

```text
Massive Enterprise Platform
```

Features:

```text
Employees

Payroll

Leave

Inventory

Reports

Administration
```

---

Question:

```text
Can One Team Build
All Of This?
```

Eventually:

```text
No
```

---

Problem becomes:

```text
Team Scale
```

not technology.

---

# Historical Evolution

---

## Stage 1

Monolithic Frontend

```text
One App

One Repository

One Deployment
```

---

## Stage 2

Large Enterprise SPA

```text
Huge Angular App

Huge React App
```

---

Problems appear:

```text
Long Builds

Deployment Coordination

Ownership Confusion
```

---

## Stage 3

Feature-Based Architecture

Teams own features.

---

## Stage 4

Micro Frontends

Teams own:

```text
Code

Deployment

Release
```

independently.

---

# What Is A Micro Frontend?

Definition:

> A micro frontend is an independently developed, independently deployed frontend application that forms part of a larger user experience.

---

Think:

```text
Microservices

For Frontends
```

---

# The Core Idea

Instead of:

```text
One Giant Application
```

Use:

```text
Many Smaller Frontend Applications
```

---

Example:

```text
Portal

├── Employee App

├── Payroll App

├── Reports App

└── Admin App
```

---

Each owned by separate teams.

---

# Why Micro Frontends Exist

Not because:

```text
Technology Requires It
```

---

Because:

```text
Organizations Grow
```

---

Typical drivers:

```text
Independent Teams

Autonomous Releases

Scalability

Ownership
```

---

# Team Ownership

The most important concept.

---

Example:

```text
Employee Team

↓

Employee Frontend
```

---

Payroll Team:

```text
Payroll Frontend
```

---

Ownership becomes clear.

---

# Benefits

## Independent Development

Teams move faster.

---

## Independent Deployment

Deploy one feature without deploying everything.

---

## Team Autonomy

Reduced coordination.

---

## Technology Flexibility

Potentially mix:

```text
Angular

React

Vue
```

---

Though this is often overused.

---

# Challenges

Micro Frontends are not free.

---

## Increased Complexity

Now many applications exist.

---

## Shared State

Question:

```text
How Do Apps Share Data?
```

---

## Shared Authentication

Question:

```text
How Does SSO Work?
```

---

## Routing

Question:

```text
Who Controls Navigation?
```

---

## Consistency

Question:

```text
How Do We Maintain UX Consistency?
```

---

# Architectural Models

---

# Build-Time Integration

Applications combined during build.

---

Benefits:

```text
Simple
```

---

Limitations:

```text
Requires Coordinated Releases
```

---

# Runtime Integration

Applications loaded dynamically.

---

Popular approach.

---

Examples:

```text
Module Federation

Import Maps
```

---

# Composition Patterns

---

## Route-Based Composition

Example:

```text
/employees

/payroll

/reports
```

Each route belongs to different frontend.

---

Most common.

---

## Widget Composition

Single screen contains:

```text
Widgets

Owned By Different Teams
```

---

More difficult.

---

# Routing In Micro Frontends

Highly important.

---

Examples:

```text
/employees/*

/reports/*

/admin/*
```

---

Each route owned independently.

---

Routing often becomes:

```text
Ownership Boundary
```

---

# Authentication

Usually centralized.

---

Example:

```text
Entra ID

Auth0

Okta
```

---

All micro frontends trust:

```text
Same Identity Provider
```

---

Enables:

```text
SSO
```

---

# State Management

A famous challenge.

---

Question:

```text
Should State Be Shared?
```

Often:

```text
As Little As Possible
```

---

Preferred:

```text
Independent Ownership
```

---

Shared state introduces:

```text
Coupling
```

---

# Communication Patterns

Micro frontends may communicate using:

```text
Events

Shared APIs

Message Buses
```

---

Goal:

```text
Loose Coupling
```

---

# Shared Design Systems

Critical for consistency.

---

Example:

```text
Common Buttons

Typography

Forms

Themes
```

---

Without this:

```text
Application Feels Fragmented
```

---

# Performance Considerations

Micro frontends may introduce:

```text
More Downloads

More Frameworks

More Runtime Cost
```

---

Must manage carefully.

---

# Conway's Law

Extremely relevant.

---

Teams:

```text
Employees Team

Reports Team

Payroll Team
```

---

System reflects:

```text
Team Structure
```

---

Micro frontends are often organizational architecture more than technical architecture.

---

# Angular Perspective

Common tooling:

```text
Nx

Module Federation

Libraries
```

---

Angular works very well for micro frontend platforms.

---

# React Perspective

Common tooling:

```text
Module Federation

Single-SPA

Vite Federation
```

---

React is frequently used in distributed frontend architectures.

---

# What Stays The Same Across Frameworks?

✅ Ownership

✅ Domain Boundaries

✅ Independent Teams

✅ Independent Deployments

✅ Communication Problems

✅ Shared Design Systems

---

# What Changes Across Frameworks?

❌ Router Implementations

❌ Module Loading

❌ Build Tooling

❌ Runtime Integration Strategy

---

# When NOT To Use Micro Frontends

Avoid when:

```text
Small Team

Small Application

Simple Product
```

---

Micro frontends introduce complexity.

---

# Common Interview Questions

### What Is A Micro Frontend?

Independently developed and deployed frontend application.

---

### Why Use Micro Frontends?

Team and organizational scalability.

---

### Biggest Challenge?

Coordination and complexity.

---

### How Do They Communicate?

Events, APIs, shared contracts.

---

### How Is Authentication Managed?

Usually centrally through a shared Identity Provider.

---

### Can Angular And React Coexist?

Yes.

Though organizational benefits matter more than framework diversity.

---

# Common Interview Traps

## Trap 1

Micro Frontends Are About Technology.

Wrong.

Mainly about:

```text
Team Scalability
```

---

## Trap 2

Sharing Lots Of State.

---

## Trap 3

Ignoring UX Consistency.

---

## Trap 4

Using Micro Frontends Too Early.

---

# Monolith vs Micro Frontends

Monolith Optimizes:

```text
Simplicity
```

---

Micro Frontends Optimize:

```text
Scale
```

---

Trade-off:

```text
Simple

vs

Scalable
```

---

# Evolution Of Frontend Architecture

```text
Pages

↓

Components

↓

Features

↓

Domains

↓

Platform

↓

Micro Frontends
```

---

# Senior-Level Mental Model

Do not think:

```text
Module Federation

Single-SPA

Webpack
```

Think:

```text
Ownership

Autonomy

Independent Deployment

Team Scalability
```

Micro Frontends are fundamentally:

```text
An Organizational Scaling Strategy
```

implemented through software architecture.

---

# Key Takeaways

1. Micro Frontends solve organizational scaling problems.
2. Team ownership is the core idea.
3. Independent deployment is a major benefit.
4. Shared state should be minimized.
5. Authentication is usually centralized.
6. Design systems become critical.
7. Routing often reflects ownership boundaries.
8. Micro Frontends introduce significant complexity.
9. Not every application needs them.
10. Organizational concerns often drive architecture decisions more than technology concerns.