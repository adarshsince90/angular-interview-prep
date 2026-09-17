# Enterprise Architecture

## Interview Priority

**Must Know For Senior Engineers**

## Interview Frequency

**Very High (Senior / Lead / Architect Roles)**

## Recommended Depth

**Architectural Understanding**

## Relevant For

- Enterprise Applications
- Large Teams
- Angular Architecture
- System Design Discussions
- Technical Leadership
- Senior Angular Interviews

---

# First Principles

Before discussing Angular architecture, we should answer:

```text
Why Does Architecture Exist?
```

---

Imagine two applications.

---

Application A

```text
5 Screens

2 Developers

6 Months Lifetime
```

---

Application B

```text
120 Screens

50 Developers

10 Teams

5 Years Of Development

Monthly Releases
```

---

Will both applications need the same structure?

```text
No
```

---

Small applications optimize for:

```text
Speed Of Development
```

---

Enterprise applications optimize for:

```text
Scalability

Maintainability

Predictability

Testability

Team Productivity
```

---

# Definition

Enterprise Architecture is:

> The set of structural decisions that define how an application is organized, scaled, secured, maintained, tested, monitored, and evolved over time.

---

# Architecture vs Implementation

Junior developers often focus on:

```typescript
How To Build A Component
```

---

Senior engineers focus on:

```text
Where Should Components Live?

How Should Teams Organize?

How Will New Features Be Added?

How Will We Prevent Architectural Decay?
```

---

# What Problems Does Enterprise Architecture Solve?

Without architecture:

```text
Huge Components

Code Duplication

Tight Coupling

Slow Development

Frequent Bugs

Difficult Onboarding
```

---

Good architecture provides:

```text
Clear Boundaries

Consistent Structure

Reusable Components

Independent Teams

Predictable Growth
```

---

# Core Architectural Principles

Everything else builds on these principles.

---

# Principle 1: Separation Of Concerns

Most important architectural principle.

---

Every layer should have a clear responsibility.

---

Bad

```typescript
EmployeeComponent
```

contains:

```text
UI Logic

API Calls

Validation

Business Rules

State Management

Error Handling
```

---

Results:

```text
Hard To Maintain

Hard To Test

Hard To Reuse
```

---

Good

```text
Component
     ↓
Store
     ↓
Service
     ↓
HTTP
```

---

Each layer owns a single concern.

---

# Principle 2: Single Responsibility Principle

Every unit should have one reason to change.

---

Bad

```typescript
AuthService
```

does:

```text
Authentication

Employee APIs

Logging

Notifications

Configuration
```

---

Good

```text
AuthService

EmployeeService

LoggerService

NotificationService
```

---

Responsibilities remain focused.

---

# Principle 3: High Cohesion

Things that belong together should stay together.

---

Example

All employee-related code should live together.

---

Good

```text
employees/

  components/

  services/

  models/

  store/
```

---

Bad

```text
components/

services/

models/
```

with employee code scattered everywhere.

---

# Principle 4: Low Coupling

Systems should depend on each other as little as possible.

---

Bad

```text
Employee Module
      ↓
Project Module
      ↓
Report Module
      ↓
Notification Module
```

---

Everything depends on everything.

---

Good

```text
Shared Contracts

↓

Independent Features
```

---

Features evolve independently.

---

# Angular Architecture Evolution

Most Angular applications evolve through stages.

---

Stage 1

```text
Everything In AppComponent
```

---

Stage 2

```text
Multiple Components
```

---

Stage 3

```text
Services
```

---

Stage 4

```text
Feature Modules
```

---

Stage 5

```text
Standalone Components
```

---

Stage 6

```text
Enterprise Architecture
```

---

# Modern Angular Architecture

Today most large applications follow:

```text
Core Layer

↓

Shared Layer

↓

Feature Layer
```

---

# High-Level Structure

```text
src/

  app/

    core/

    shared/

    features/
```

---

This is one of the most common enterprise approaches.

---

# Core Layer

Core contains:

```text
Application-Wide Concerns
```

---

Question:

```text
Would Multiple Features Need This?
```

If yes:

```text
Core Candidate
```

---

Typical Core Contents

```text
Authentication

Authorization

Interceptors

Guards

Logging

Configuration

Error Handling

API Infrastructure
```

---

Example Structure

```text
core/

  auth/

  guards/

  interceptors/

  services/

  configuration/

  logging/
```

---

# Core Layer Rules

Core should contain:

✅ Application-wide services

✅ Cross-cutting concerns

✅ Infrastructure

---

Core should NOT contain:

❌ Employee business logic

❌ Project business logic

❌ Report business logic

---

# Shared Layer

Shared contains reusable UI building blocks.

---

Examples

```text
Button

Modal

Table

Dropdown

Date Pipe

Skeleton Loader
```

---

Question:

```text
Can This Be Reused
Across Features?
```

If yes:

```text
Shared Candidate
```

---

Example Structure

```text
shared/

  components/

  directives/

  pipes/

  ui/

  utilities/
```

---

# Shared Layer Rules

Shared should contain:

✅ Generic components

✅ Generic directives

✅ Generic pipes

✅ Generic utilities

---

Shared should NOT contain:

❌ Employee Rules

❌ Payroll Logic

❌ Domain-Specific Behavior

---

# Feature Layer

Feature layer contains business capabilities.

---

Examples

```text
Employees

Projects

Reports

Admin

Payroll
```

---

Everything related to a business domain stays together.

---

Example

```text
features/

  employees/

  projects/

  reports/
```

---

# Employee Feature Structure

```text
employees/

  pages/

  components/

  services/

  store/

  models/

  routes.ts
```

---

Benefits

```text
Feature Isolation

Team Ownership

Easy Maintenance
```

---

# Feature-Based Architecture

One of the most common interview topics.

---

Bad

```text
components/

services/

models/

pipes/
```

---

Problem

Employee code exists everywhere.

---

Good

```text
features/

  employees/

  projects/

  reports/
```

---

Everything related to a domain lives together.

---

Benefits

```text
Discoverability

Scalability

Team Independence
```

---

# Layered Architecture

A common enterprise pattern.

---

```text
Presentation Layer

↓

State Layer

↓

Service Layer

↓

API Layer
```

---

Each layer has one responsibility.

---

# Presentation Layer

Contains:

```text
Pages

Components

Templates
```

---

Responsibilities

```text
Display Data

Capture User Interaction
```

---

Should not contain:

```text
Complex Business Rules

Direct API Calls
```

---

# Service Layer

Contains:

```text
Business Logic

API Interaction

Workflows
```

---

Example

```typescript
EmployeeService
```

---

Responsibilities

```text
Load Employees

Create Employee

Delete Employee
```

---

# State Layer

Contains:

```text
Signals

Stores

NgRx
```

---

Responsibilities

```text
Store State

Expose State

Manage Updates
```

---

Example

```typescript
EmployeeStore
```

---

# API Layer

Responsible for:

```text
Backend Communication
```

---

Example

```typescript
HttpClient
```

---

Components should rarely call APIs directly.

---

Bad

```typescript
EmployeeComponent

↓

http.get(...)
```

---

Good

```text
EmployeeComponent

↓

EmployeeStore

↓

EmployeeService

↓

HttpClient
```

---

# Container vs Presentational Components

Very common enterprise pattern.

---

# Presentational Components

Responsible for:

```text
Rendering
```

---

Example

```typescript
EmployeeCardComponent
```

---

Inputs

```typescript
@Input()
employee
```

---

Outputs

```typescript
@Output()
selected
```

---

Characteristics

```text
Reusable

Simple

No API Calls
```

---

# Container Components

Responsible for:

```text
Coordination

Workflows

State Interaction
```

---

Example

```typescript
EmployeePageComponent
```

---

Responsibilities

```text
Call Store

Load Data

Handle Events
```

---

Pattern

```text
Container

↓

Presentational Components
```

---

# Routing Architecture

Each feature owns its routes.

---

Example

```text
employees/routes.ts

projects/routes.ts

reports/routes.ts
```

---

Benefits

```text
Feature Independence
```

---

# Lazy Loading Strategy

Enterprise applications should lazy-load large features.

---

Example

```typescript
{
  path: 'employees',

  loadChildren: () =>
    import('./employees/routes')
}
```

---

Benefits

```text
Smaller Bundles

Faster Startup

Better UX
```

---

# State Management Architecture

Not all state is equal.

---

# Local State

Examples

```text
Modal Open

Selected Tab

Accordion
```

Keep local.

---

# Feature State

Examples

```text
Employees

Projects

Reports
```

Use:

```text
Signals

Service Stores
```

---

# Global State

Examples

```text
Current User

Theme

Permissions

Language
```

Use:

```text
App Store

Signal Store

NgRx
```

when complexity requires.

---

# Recommended Modern Approach

```text
Local State

↓

Signals

↓

Service Store Pattern

↓

NgRx Only If Necessary
```

---

# Security Architecture

Enterprise architecture includes:

```text
Authentication

Authorization

Token Management

Route Protection
```

---

Typical Components

```text
AuthService

AuthStore

AuthInterceptor

AuthGuard

PermissionGuard
```

---

Flow

```text
Login

↓

Store User

↓

Attach Token

↓

Secure APIs

↓

Validate Permissions
```

---

# Error Handling Architecture

Errors should be layered.

---

Architecture

```text
Component

↓

Service

↓

Interceptor

↓

Global Error Handler
```

---

Benefits

```text
Centralized Logic

Consistent UX

Observability
```

---

# Observability Architecture

Senior-level topic.

---

Enterprise applications require:

```text
Logging

Metrics

Tracing

Monitoring
```

---

Questions Architecture Should Answer

```text
What Failed?

When Did It Fail?

How Often?

Who Was Affected?
```

---

Tools

```text
Application Insights

Datadog

Sentry

Elastic

OpenTelemetry
```

---

# Configuration Architecture

Never hardcode environment values.

---

Bad

```typescript
const apiUrl =
 'https://prod-api';
```

---

Good

```text
Configuration Service

Environment Files

Runtime Configuration
```

---

Benefits

```text
Deployment Flexibility

Environment Independence
```

---

# Testing Architecture

Enterprise applications require multiple testing levels.

---

# Unit Testing

Test:

```text
Components

Services

Stores
```

---

# Integration Testing

Test:

```text
Feature Interactions
```

---

# End-To-End Testing

Test:

```text
Entire User Journeys
```

Examples:

```text
Login

Create Employee

Generate Report
```

---

# Dependency Injection Architecture

DI becomes increasingly important at scale.

---

Benefits

```text
Loose Coupling

Easy Testing

Replaceable Implementations
```

---

Example

```typescript
AuthService
```

can easily be mocked.

---

# Cross-Cutting Concerns

Very important architecture term.

---

Definition

```text
Concerns Affecting
Multiple Parts Of The Application
```

---

Examples

```text
Authentication

Authorization

Logging

Caching

Monitoring

Error Handling
```

---

These belong in:

```text
Core Services

Interceptors

Infrastructure Layers
```

---

Not inside business features.

---

# Enterprise Folder Structure

Angular Standalone Example

```text
src/

  app/

    core/

      auth/

      guards/

      interceptors/

      logging/

      configuration/

    shared/

      ui/

      pipes/

      directives/

      utilities/

    features/

      employees/

        pages/

        components/

        services/

        store/

        models/

        routes.ts

      projects/

      reports/

      admin/
```

---

# Architecture Decision Framework

When adding functionality ask:

```text
Is It Reusable?

↓

Shared
```

---

```text
Is It Application-Wide?

↓

Core
```

---

```text
Does It Belong To A Business Domain?

↓

Feature
```

---

# Common Interview Questions

## What Is Enterprise Architecture?

A set of structural decisions enabling long-term scalability, maintainability, and team productivity.

---

## Why Organize By Feature?

Keeps related code together and improves ownership.

---

## What Belongs In Core?

```text
Auth

Guards

Interceptors

Logging

Configuration

Error Handling
```

---

## What Belongs In Shared?

```text
Reusable Components

Pipes

Directives

Utilities
```

---

## Why Use Lazy Loading?

Reduce bundle size and improve startup performance.

---

## Container vs Presentational Components?

Container:

```text
Behavior & State
```

Presentational:

```text
Rendering
```

---

## Where Should API Calls Live?

Services.

Not components.

---

## What Are Cross-Cutting Concerns?

Concerns affecting multiple features and layers