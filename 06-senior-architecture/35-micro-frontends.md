# Micro Frontends

## Interview Priority

**Advanced / Architect Level**

## Interview Frequency

**Medium to High (Senior, Lead, Architect Roles)**

## Recommended Depth

**Conceptual + Architectural Understanding**

## Relevant For

- Large Enterprise Applications
- Multi-Team Development
- Platform Engineering
- Enterprise Architecture
- Organizational Scalability
- Angular Architecture
- Technical Leadership

---

# First Principles

Before discussing Module Federation, Shell Applications, or Shared State, understand the problem.

Imagine an Angular application:

```text
Employee Portal
```

Features:

```text
Employees

Projects

Reports

Dashboard

Administration
```

Everything lives inside:

```text
One Angular Application
```

---

Initial Team

```text
2 Developers

10 Screens
```

Works perfectly.

---

After several years:

```text
50 Developers

10 Teams

150 Screens

Independent Release Cycles
```

Problems begin appearing.

---

# Problem 1: Build Size

A small change requires:

```text
Build Entire Application
```

---

Example

```text
Employee Team
Changes One Component

↓

Entire Application Rebuilt
```

---

As the application grows:

```text
Build Times Increase

Deployment Complexity Increases
```

---

# Problem 2: Deployment Coupling

Example

```text
Employee Feature Ready

Reports Feature Not Ready
```

---

Question

```text
Can Employee Team Deploy?
```

Sometimes:

```text
No
```

because all features ship together.

---

# Problem 3: Team Coupling

Example

```text
Team A Changes Shared Code

↓

Team B Breaks

↓

Team C Breaks
```

---

Productivity decreases.

---

# Problem 4: Upgrade Pressure

Example

```text
Entire Product Uses Angular 18
```

Team wants Angular 20.

---

Result:

```text
Large Coordinated Migration
```

---

# Problem 5: Ownership

Question:

```text
Who Owns Reports?

Who Owns Employees?

Who Owns Administration?
```

---

Ownership becomes unclear.

---

# What Are Micro Frontends?

Micro Frontends apply:

```text
Microservice Principles
```

to:

```text
Frontend Applications
```

---

Definition

> An architectural style where multiple independently developed and independently deployed front-end applications are composed together to form a single user experience.

---

Think:

```text
Microservices

For The Frontend
```

---

# Monolith vs Micro Frontend

## Traditional Frontend Monolith

```text
Angular App

├─ Employees
├─ Projects
├─ Reports
├─ Dashboard
└─ Admin
```

Characteristics:

```text
Single Repo

Single Build

Single Deployment

Single Runtime
```

---

## Micro Frontend Architecture

```text
Shell Application

├─ Employees App
├─ Projects App
├─ Reports App
└─ Admin App
```

Characteristics:

```text
Independent Teams

Independent Builds

Independent Deployments

Independent Ownership
```

---

# Core Objective

Users experience:

```text
One Product
```

Teams build:

```text
Many Applications
```

---

# Architectural Overview

```text
Shell Application

      ↓

Employees MFE

Projects MFE

Reports MFE

Admin MFE
```

---

Every Micro Frontend:

```text
Owns Its Domain

Owns Its Deployment

Owns Its Complexity
```

---

# Conway's Law

Important architect-level concept.

---

Conway's Law:

> Systems tend to mirror the communication structure of the organization.

---

Example

```text
Employee Team

Projects Team

Reports Team
```

---

Micro Frontends often align naturally with those team boundaries.

---

# Domain-Based Ownership

Boundaries should follow:

```text
Business Domains
```

Not technical concerns.

---

Good

```text
Employees

Projects

Reports

Payroll

Administration
```

---

Bad

```text
Buttons App

Forms App

Tables App
```

---

Business capabilities provide stable boundaries.

---

# Shell Application

The shell acts as:

```text
Host Application
```

---

Responsibilities

```text
Authentication

Global Navigation

Application Layout

Loading Micro Frontends

Global Configuration

Shared Context
```

---

Visual

```text
Shell

↓

Loads Employees

↓

Loads Reports

↓

Loads Projects
```

---

Think of Shell as:

```text
Orchestrator
```

---

# Remote Applications

Each domain becomes an independent application.

---

Examples

```text
employees-app

projects-app

reports-app

admin-app
```

---

Each team owns:

```text
Development

Testing

Build Pipeline

Deployment
```

---

# Independent Deployments

One of the biggest business benefits.

---

Without Micro Frontends

```text
Deploy Entire Product
```

---

With Micro Frontends

```text
Deploy Employees App Only
```

---

Benefits

```text
Lower Risk

Faster Releases

Higher Team Autonomy
```

---

# Independent Technology Evolution

Potentially:

```text
Employees

Angular 20

Projects

Angular 19
```

---

Because applications are isolated.

---

Architectural governance is still recommended.

---

# Runtime Composition

Micro Frontends are generally assembled:

```text
At Runtime
```

rather than:

```text
At Build Time
```

---

This allows:

```text
Independent Deployment

Independent Versioning
```

---

# Module Federation

Most common Angular implementation mechanism.

---

Introduced through:

```text
Webpack Module Federation
```

---

Core Idea

```text
Application A

↓

Loads Code From

↓

Application B

At Runtime
```

---

Without rebuilding Application A.

---

# Traditional Import

```typescript
import {
  EmployeeModule
} from './employees';
```

---

Dependency exists:

```text
At Build Time
```

---

# Module Federation Import

```typescript
loadRemoteModule(...)
```

---

Dependency resolved:

```text
At Runtime
```

---

This is the key difference.

---

# Runtime Loading Flow

Example

```text
shell.company.com

employees.company.com
```

---

User navigates:

```text
/employees
```

---

Shell detects route.

---

Shell loads:

```text
remoteEntry.js
```

from:

```text
employees.company.com
```

---

Employee application gets rendered.

---

Result

```text
Independent Deployment

Single User Experience
```

---

# How Module Federation Shares Libraries

Without sharing:

```text
Angular Downloaded

Employees App

Projects App

Reports App
```

independently.

---

Result:

```text
Large Downloads

Memory Waste
```

---

Module Federation supports:

```typescript
shared: {
  '@angular/core': {
     singleton: true
  }
}
```

---

Meaning:

```text
One Angular Runtime

Shared Across Applications
```

---

# Common Shared Dependencies

```text
Angular Core

Angular Router

RxJS

Design System
```

---

Benefits

```text
Smaller Downloads

Improved Performance

Reduced Duplication
```

---

# Version Governance

One of the biggest enterprise challenges.

---

Scenario

```text
Shell

Angular 20
```

---

And

```text
Employee App

Angular 15
```

---

Potential:

```text
Compatibility Problems
```

---

Large organizations frequently define:

```text
Supported Version Policies
```

---

# Micro Frontend Communication

A critical architectural topic.

---

Question

```text
Employee App Selected Employee

↓

How Does Reports App Know?
```

---

Several patterns exist.

---

# Pattern 1: Browser Events

Simple approach.

---

Producer

```typescript
window.dispatchEvent(
  new CustomEvent(
    'employee-selected',
    {
      detail: employee
    }
  )
);
```

---

Consumer

```typescript
window.addEventListener(
  'employee-selected',
  handler
);
```

---

Flow

```text
Publisher

↓

Browser Event

↓

Subscriber
```

---

Advantages

```text
Simple

Loose Coupling
```

---

Challenges

```text
Not Typed

Harder To Govern
```

---

# Pattern 2: Shared Event Bus

Enterprise favorite.

---

Example

```typescript
eventBus.publish(
  'employee-selected',
  employee
);
```

---

Consumer

```typescript
eventBus.subscribe(
  'employee-selected'
);
```

---

Flow

```text
App A

↓

Event Bus

↓

App B
```

---

Benefits

```text
Centralized

Testable

Decoupled
```

---

Think:

```text
Platform-Level RxJS
```

---

# Pattern 3: Shell Mediation

Very common.

---

Example

```text
Employee App

↓

Shell

↓

Reports App
```

---

Employee App sends:

```text
Selected Employee
```

---

Shell updates:

```text
Shared Context
```

---

Reports reads.

---

Benefits

```text
Controlled

Centralized

Observable
```

---

# Pattern 4: Backend Communication

Preferred for business workflows.

---

Example

```text
Employee Updated
```

---

Instead of direct frontend communication:

```text
Employee App

↓

API

↓

Database

↓

Reports App Reads
```

---

Most scalable strategy.

---

# Communication Guideline

Use:

```text
Events
```

for UI collaboration.

---

Use:

```text
Backend APIs
```

for business data.

---

Avoid:

```text
Direct App To App Calls
```

---

Bad

```typescript
employeeApp.callReports()
```

---

Creates tight coupling.

---

# Shared State Management

One of the most debated micro frontend topics.

---

Question

```text
Should Every MFE Use One Shared NgRx Store?
```

---

Generally:

```text
No
```

---

Why?

Micro Frontends exist to achieve:

```text
Independence
```

---

Shared store introduces:

```text
Coupling

Coordination Costs

Shared Ownership Problems
```

---

Eventually:

```text
Distributed Monolith
```

appears.

---

# State Ownership Principle

A business domain should own its own state.

---

Example

```text
Employees App

Owns Employees State
```

---

```text
Projects App

Owns Projects State
```

---

```text
Reports App

Owns Reports State
```

---

Ownership remains clear.

---

# What SHOULD Be Shared?

Only genuinely global concerns.

---

# Shared User Context

Example

```typescript
{
  id: 1,
  name: 'Adarsh',
  role: 'Admin'
}
```

---

Every application needs this.

---

Candidate:

✅ Shared

---

Typically owned by:

```text
Shell
```

---

# Shared Authentication

Examples

```text
Access Token

Refresh Token

Current User

Permissions
```

---

Usually owned by:

```text
Shell
```

---

Micro Frontends consume.

---

# Shared Theme

Examples

```text
Light Theme

Dark Theme
```

---

User changes theme once.

Entire platform updates.

---

Excellent shared concern.

---

# Shared Localization

Examples

```text
en-US

fr-FR

de-DE
```

---

All applications should remain consistent.

---

Good candidate for shared context.

---

# Shared Feature Flags

Example

```text
New Dashboard Enabled
```

---

Every application should evaluate the same flag values.

---

Good candidate for sharing.

---

# Shared Tenant Context

Multi-tenant applications often share:

```text
Current Tenant

Current Organization
```

---

Useful platform-level context.

---

# Recommended Shared Context Model

```typescript
{
  currentUser,
  permissions,
  theme,
  locale,
  tenant,
  featureFlags
}
```

---

Usually nothing more.

---

# What Should NOT Be Shared?

Avoid:

```text
Employee State

Project State

Report State

Business Feature Data
```

---

Example

```text
Global Employee Store
```

owned by everyone.

---

Problems

```text
Coupling

Coordination

Loss Of Independence
```

---

# Design Systems

Almost every successful Micro Frontend platform introduces:

```text
Shared Design System
```

---

Examples

```text
Buttons

Tables

Forms

Typography

Spacing

Icons
```

---

Benefits

```text
Consistent User Experience
```

while preserving:

```text
Independent Teams
```

---

# Routing Strategy

Usually:

```text
Shell Owns Top-Level Routes
```

---

Examples

```text
/employees

/projects

/reports

/admin
```

---

Feature applications own local routes.

---

Examples

```text
/employees/list

/employees/edit

/employees/details
```

---

# Authentication Strategy

Recommended ownership:

```text
Shell
```

---

Shell responsibilities:

```text
Login

Logout

Token Refresh

Session Management
```

---

MFEs consume authentication state.

---

Avoid

```text
Each MFE Logs In Separately
```

---

# Observability

Micro Frontends increase operational complexity.

---

Need:

```text
Centralized Logging

Monitoring

Tracing

Analytics
```

---

Questions become:

```text
Which MFE Failed?

Why?

When?

Impact?
```

---

# Testing Strategy

Multiple testing layers remain necessary.

---

Unit Tests

```text
Individual MFE
```

---

Integration Tests

```text
Cross-MFE Integration
```

---

E2E Tests

```text
Entire User Journey
```

---

Examples

```text
Login

Employee Search

Report Generation
```

---

# Advantages

## Team Autonomy

```text
Independent Teams
```

---

## Independent Deployment

```text
Release Faster
```

---

## Scalability

```text
Large Organizations Scale Better
```

---

## Clear Ownership

```text
Domain Ownership
```

---

## Technology Flexibility

```text
Independent Upgrades
```

---

# Disadvantages

## Operational Complexity

```text
More Pipelines

More Deployments

More Infrastructure
```

---

## Communication Complexity

```text
Harder State Coordination
```

---

## Governance Challenges

Need standards around:

```text
Security

UX

Versioning

Monitoring
```

---

## Potential Performance Issues

Too many MFEs may create:

```text
Extra Requests

Extra Downloads
```

---

# When NOT To Use Micro Frontends

Avoid if:

```text
Small Team

Small Product

Few Features

Simple Domain
```

---

Example

```text
10 Developers

20 Screens
```

---

The complexity is rarely justified.

---

# When Micro Frontends Make Sense

Strong candidates:

```text
Large Organizations

Multiple Independent Teams

Independent Release Cycles

Distinct Business Domains

Long Product Lifecycles
```

---

Examples

```text
Banking Platforms

Large SaaS Products

Enterprise Portals

Developer Platforms

E-Commerce Ecosystems
```

---

# Micro Frontends vs Enterprise Architecture

Enterprise Architecture:

```text
One Application

Many Features
```

---

Micro Frontends:

```text
Many Applications

One Product
```

---

Micro Frontends are essentially:

```text
Enterprise Architecture

At Organizational Scale
```

---

# Common Interview Questions

## What Is A Micro Frontend?

Independent frontend applications composed into a unified product.

---

## Why Use Micro Frontends?

Team autonomy, independent deployment, organizational scalability.

---

## What Is Module Federation?

Runtime loading and sharing of modules between independent applications.

---

## What Is A Shell Application?

Host application responsible for orchestration and shared platform concerns.

---

## Should MFEs Share State?

Only truly global concerns.

Business state should remain local.

---

## How Should MFEs Communicate?

Events for UI interactions.

APIs for business data.

---

## What Should Be Shared?

```text
Authentication

User Context

Theme

Localization

Feature Flags

Tenant Context
```

---

## Biggest Benefit?

```text
Team Independence
```

---

## Biggest Drawback?

```text
Operational Complexity
```

---

# Architecture Blueprint

```text
Shell
 ├─ Authentication
 ├─ Theme
 ├─ Localization
 ├─ Feature Flags
 └─ Navigation

        ↓

 Employees MFE
 Projects MFE
 Reports MFE
 Admin MFE

        ↓

 Backend APIs
```

Communication:

```text
UI Events
    ↓
Event Bus

Business Data
    ↓
Backend APIs

Global Context
    ↓
Shell
```

---

# Key Takeaways

1. Micro Frontends are primarily an organizational scaling strategy.
2. Module Federation is the most common Angular implementation mechanism.
3. The shell owns platform concerns.
4. Business domains define micro frontend boundaries.
5. Runtime loading enables independent deployment.
6. Shared state should be minimal.
7. Business state should remain owned by the responsible micro frontend.
8. Communication should be event-driven and loosely coupled.
9. Authentication, theme, locale, and feature flags are good shared concerns.
10. Team autonomy is the primary benefit; operational complexity is the primary cost.

---

# Interview Revision Sheet

```text
Micro Frontend
   = Independent UI Application

Shell
   = Host / Platform Layer

Remote
   = Feature Application

Module Federation
   = Runtime Module Loading

Event Bus
   = UI Communication

Backend APIs
   = Business Communication

Shared State
   = Minimal

State Ownership
   = Per Domain

Main Benefit
   = Team Autonomy

Main Cost
   = Complexity
```