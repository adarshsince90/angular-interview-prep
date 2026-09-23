# Routing & Navigation

## Why This Topic Exists

As applications grow, users need a way to move between different areas of the system.

Examples:

```text
Dashboard

Employees

Reports

Settings

Administration

User Profile
```

Question:

```text
How does the application know
which screen should be displayed?
```

Early websites relied on:

```text
Browser

↓

Server

↓

New HTML Page
```

Modern applications rely on:

```text
URL

↓

Router

↓

Component Tree
```

This chapter explains the architectural concepts behind routing before discussing Angular Router or React Router.

---

## Learning Objectives

By the end of this chapter you should understand:

```text
Why routing exists

Evolution from MPA to SPA

Browser History API

Routes

Navigation

Route Parameters

Query Parameters

Nested Routes

Deep Linking

Route Guards

Lazy Loading

Code Splitting

Angular Router

React Router

Enterprise Routing Patterns
```

---

# First Principles

Imagine building:

```text
Employee Management Portal
```

Features:

```text
Dashboard

Employees

Reports

Analytics

Settings
```

Question:

```text
Should all screens
be rendered simultaneously?
```

Technically:

```text
Yes
```

Practically:

```text
No
```

The user should only see:

```text
One Logical Screen

At A Time
```

Therefore we need:

```text
URL

↓

Screen Mapping
```

This is the Routing problem.

---

# Historical Evolution

Understanding routing history explains why modern routers exist.

---

## Stage 1 - Static Websites

Early websites consisted of:

```text
home.html

about.html

contact.html
```

Navigation looked like:

```text
Click Link

↓

Browser Requests New Page

↓

Entire HTML Reloaded
```

---

Advantages:

```text
Simple

Easy To Understand

SEO Friendly
```

---

Disadvantages:

```text
Full Page Refresh

Slow Navigation

Poor User Experience
```

---

## Stage 2 - Dynamic Server Applications

Applications became more complex.

Examples:

```text
Banking Systems

E-Commerce

Employee Portals
```

Flow:

```text
Browser

↓

Request

↓

Server Generates HTML

↓

Browser Displays Page
```

Still:

```text
Every Navigation

↓

Full Refresh
```

---

## Stage 3 - AJAX Revolution

AJAX changed web development.

Instead of requesting:

```text
Entire HTML Pages
```

applications could request:

```text
Small Data Packets
```

Example:

```text
JSON
```

---

Flow:

```text
Browser

↓

AJAX Request

↓

JSON

↓

Partial UI Update
```

---

Applications became more responsive.

---

## Stage 4 - SPA Revolution

Frameworks emerged:

```text
Angular

React

Vue
```

New idea:

```text
Download App Once

↓

Navigate Internally
```

---

Instead of:

```text
Reload Whole Page
```

applications now:

```text
Update View
```

inside the same page.

---

This created a new problem:

```text
Who Handles Navigation?
```

Server no longer controlled navigation.

The browser application now needed:

```text
Client-Side Router
```

---

## Stage 5 - Enterprise SPA Era

Applications became very large.

Examples:

```text
Thousands Of Screens

Large Teams

Feature Modules

Micro Frontends
```

Routing evolved beyond navigation:

```text
Navigation

Access Control

Lazy Loading

Feature Composition

Application Architecture
```

---

# Problem Statement

User opens:

```text
/employees
```

Question:

```text
Which Screen Should Render?
```

---

User opens:

```text
/reports
```

Question:

```text
Which Component Tree Should Render?
```

---

Need:

```text
URL

↓

Application Behavior
```

Mapping.

---

# What Is Routing?

Definition:

> Routing is the process of mapping a URL to application behavior, application state, and user interface.

---

Examples:

```text
/
    → Home Page

/employees
    → Employee List

/employees/123
    → Employee Details

/reports
    → Reports Page
```

---

A Router is responsible for:

```text
URL Matching

Screen Selection

Navigation

History Management

Access Rules

Lazy Loading
```

---

# Browser Fundamentals

Before Angular Router or React Router, there is:

```text
The Browser
```

Users expect:

```text
Back Button

Forward Button

Bookmarking

Refresh

Deep Links
```

to function correctly.

---

A router must preserve these expectations.

---

# Browser History API

The foundation of modern routing.

Browsers provide:

```javascript
history.pushState()

history.replaceState()
```

These APIs allow:

```text
URL Changes

Without Page Refresh
```

---

Flow:

```text
Current URL

↓

pushState()

↓

New URL

↓

No Reload
```

---

Modern routers are built on top of:

```text
Browser History API
```

---

# Core Routing Concepts

---

# Route

A route maps:

```text
URL

↓

Screen
```

Example:

```text
/employees
```

↓

```text
Employee Page
```

---

# Navigation

Moving between routes.

Example:

```text
Dashboard

↓

Employee List

↓

Employee Details

↓

Reports
```

---

# Route Parameters

Used to identify resources.

Example:

```text
/employees/123
```

Meaning:

```text
Employee Id
=
123
```

---

Angular:

```text
/employees/:id
```

React:

```text
/employees/:id
```

Same concept.

---

# Query Parameters

Additional information attached to URL.

Example:

```text
/employees?page=2
```

---

Or:

```text
/employees?department=IT
```

---

Common Uses:

```text
Filtering

Sorting

Searching

Paging
```

---

# Route Parameters vs Query Parameters

## Route Parameter

Identifies:

```text
Which Resource
```

Example:

```text
/employees/123
```

Meaning:

```text
Employee 123
```

---

## Query Parameter

Modifies:

```text
How Resource Is Displayed
```

Example:

```text
/employees?page=2
```

Meaning:

```text
Display Page 2
```

---

# URL As Application State

One of the most important senior-level concepts.

Question:

```text
Where Should State Live?
```

---

Example:

```text
Current Page

Current Filters

Current Search
```

---

Option 1:

```text
Memory Only
```

---

Problem:

```text
Lost On Refresh
```

---

Option 2:

```text
URL
```

---

Benefits:

```text
Bookmarkable

Shareable

Refresh Safe

Deep Link Friendly
```

---

Good Example:

```text
/employees?page=2&department=IT
```

represents application state.

---

# Deep Linking

Definition:

> Opening a specific application view directly through URL.

---

Example:

```text
/employees/123
```

User directly opens:

```text
Employee Details
```

without navigating through the application.

---

Benefits:

```text
Bookmarks

Sharing

Notifications

Emails
```

---

Most enterprise applications require:

```text
Deep Linking
```

---

# Nested Routes

Applications naturally contain hierarchy.

Example:

```text
/settings

/settings/profile

/settings/security

/settings/preferences
```

Visual:

```text
Settings

├── Profile

├── Security

└── Preferences
```

---

Routers support:

```text
Parent Route

↓

Child Routes
```

---

This mirrors:

```text
Component Trees
```

---

# Route Guards

Question:

```text
Can Everyone Access
/Admin?
```

Answer:

```text
No
```

---

Guard evaluates:

```text
Authenticated?

Authorized?
```

---

Result:

```text
Allow Navigation

OR

Redirect User
```

---

Common Examples:

```text
Admin Routes

Premium Features

Authenticated Pages
```

---

# Route Guards And Security

Extremely important interview topic.

---

Wrong:

```text
Route Guard

Provides Security
```

---

Correct:

```text
Route Guard

Provides Better User Experience
```

---

Why?

Because:

```text
Frontend Can Be Manipulated
```

---

Real security always exists in:

```text
Backend Authorization
```

---

# Routing And Authentication

A common enterprise workflow.

---

User opens:

```text
/admin
```

---

Application checks:

```text
Authenticated?
```

---

If No:

```text
Redirect

↓

/login
```

---

User logs in:

```text
Redirect Back

↓

/admin
```

---

Called:

```text
Return URL

Redirect Flow
```

---

# Route Resolvers & Data Prefetching

Sometimes screens need data before rendering.

---

Example:

```text
Employee Details Page
```

Needs:

```text
Employee Data
```

first.

---

Strategies:

```text
Navigate Then Fetch

OR

Fetch Then Navigate
```

---

Enterprise applications frequently use:

```text
Prefetching
```

for better UX.

---

# Lazy Loading

A major performance optimization.

---

Question:

```text
Should Users Download
Entire Application
Immediately?
```

---

Example:

```text
Dashboard

Reports

Analytics

Settings

Admin
```

---

User may never visit:

```text
Analytics
```

---

Solution:

```text
Load Features

Only When Needed
```

---

This is:

```text
Lazy Loading
```

---

Benefits:

```text
Smaller Bundle

Faster Start

Improved Performance
```

---

# Code Splitting

Related concept.

Instead of:

```text
app.js
(15MB)
```

create:

```text
dashboard.js

reports.js

admin.js
```

---

Navigation:

```text
Route Change

↓

Download Needed Bundle
```

---

Modern frontend applications heavily rely on route-level code splitting.

---

# Routing And Feature Architecture

Modern routing often mirrors:

```text
Business Domains
```

Example:

```text
/employees

/reports

/inventory

/orders
```

---

Each route becomes:

```text
Feature Boundary
```

---

Eventually:

```text
Routing

↓

Feature Architecture
```

---

# Angular Perspective

Angular Router is integrated into the framework.

Provides:

```text
Router

Routes

Guards

Resolvers

Lazy Loading
```

Example:

```typescript
{
  path: 'employees',
  component: EmployeeComponent
}
```

---

Angular emphasizes:

```text
Configuration Driven Routing
```

---

# React Perspective

React Router is typically used.

Provides:

```text
Routes

Navigation

Nested Routes

Loaders

Protected Routes
```

Example:

```tsx
<Route
  path="/employees"
  element={<EmployeesPage />}
/>
```

---

React emphasizes:

```text
Component-Oriented Routing
```

---

# Angular vs React Philosophy

Angular:

```text
Routing Is Framework Capability
```

---

React:

```text
Routing Is Library Capability
```

---

Both solve:

```text
URL

↓

Application Behavior
```

---

# What Stays The Same Across Frameworks?

✅ URLs

✅ Navigation

✅ Browser History

✅ Route Parameters

✅ Query Parameters

✅ Deep Linking

✅ Lazy Loading

✅ Route Protection

✅ Code Splitting

✅ Feature Composition

---

# What Changes Across Frameworks?

❌ Router APIs

❌ Configuration Syntax

❌ Navigation Methods

❌ Hook Names

❌ Guard Implementations

---

# Angular ↔ React Mapping

## Route Definition

Angular

```typescript
{
  path: 'employees',
  component: EmployeeComponent
}
```

React

```tsx
<Route
  path="/employees"
  element={<EmployeesPage />}
/>
```

---

## Route Parameters

Angular

```typescript
:id
```

React

```typescript
:id
```

Same concept.

---

## Query Parameters

Angular

```typescript
ActivatedRoute.queryParams
```

React

```typescript
useSearchParams()
```

---

## Navigation

Angular

```typescript
router.navigate()
```

React

```typescript
navigate()
```

---

## Route Guard

Angular

```typescript
CanActivate
```

React

```text
Protected Route Pattern
```

---

## Lazy Loading

Angular

```typescript
loadChildren()
```

React

```tsx
React.lazy()
```

---

# Routing Design Trade-Offs

## URL Driven State

Advantages:

```text
Bookmarkable

Shareable

Refresh Safe

Deep Link Friendly
```

---

Disadvantages:

```text
Can Become Complex

Long URLs
```

---

## Memory Driven State

Advantages:

```text
Simple
```

---

Disadvantages:

```text
Lost On Refresh

Cannot Share
```

---

Senior engineers typically prefer:

```text
Important State

↓

URL
```

when practical.

---

# Enterprise Routing Patterns

---

## Pattern 1

Feature-Based Routing

```text
/employees

/reports

/orders
```

---

## Pattern 2

Authenticated Areas

```text
/login

/app/*
```

---

## Pattern 3

Admin Separation

```text
/admin/*
```

---

## Pattern 4

Lazy-Loaded Domains

```text
/employees

/reports

/analytics
```

loaded independently.

---

## Pattern 5

Micro Frontend Routing

```text
/app1/*

/app2/*

/app3/*
```

Each route may belong to different teams.

---

# Common Interview Questions

## Why Do Routers Exist?

To map URLs to application behavior and views.

---

## MPA vs SPA?

MPA:

```text
Server Controls Navigation
```

---

SPA:

```text
Client Controls Navigation
```

---

## What Is Deep Linking?

Direct navigation to a specific route using URL.

---

## Why Are Query Parameters Useful?

Represent application state such as:

```text
Filters

Search

Paging
```

---

## What Is Lazy Loading?

Loading code only when needed.

---

## Route Parameters vs Query Parameters?

Route Parameters:

```text
Identify Resource
```

---

Query Parameters:

```text
Modify View
```

---

## Are Route Guards Security?

No.

They improve UX.

Backend remains responsible for security.

---

## What Is Code Splitting?

Breaking application code into smaller route-based bundles.

---

# Common Interview Traps

## Trap 1

Thinking routers are framework-specific.

Reality:

```text
Routing Is A Universal Frontend Concept
```

---

## Trap 2

Believing route guards provide security.

They do not.

---

## Trap 3

Ignoring deep linking.

Enterprise applications should support direct navigation.

---

## Trap 4

Keeping too much application state in memory instead of URLs.

---

## Trap 5

Loading entire applications upfront instead of lazy loading.

---

# How This Topic Evolves Into Enterprise Architecture

Routing evolves through stages:

```text
Pages

↓

Routes

↓

Features

↓

Feature Modules

↓

Lazy Loaded Domains

↓

Micro Frontends
```

---

Eventually routing becomes:

```text
Application Composition Architecture
```

because routes define:

```text
Feature Boundaries

Ownership Boundaries

Team Boundaries
```

---

# Senior-Level Mental Model

Do not think:

```text
Angular Router

React Router
```

Think:

```text
URL

↓

Application State

↓

Navigation

↓

Feature Composition

↓

User Experience
```

A router is fundamentally a coordination layer between:

```text
Browser

URL

Application

User
```

Frameworks simply provide different implementations.

---

# Key Takeaways

1. Routing exists to map URLs to application behavior and UI.
2. SPAs require client-side routing because the server no longer controls view navigation.
3. Modern routers are built on the Browser History API.
4. Route parameters identify resources.
5. Query parameters often represent view state.
6. Deep linking is essential for enterprise applications.
7. Route guards improve UX but do not provide security.
8. Lazy loading and code splitting are critical performance optimizations.
9. Angular and React routers differ syntactically but solve the same architectural problem.
10. Routing ultimately evolves into feature composition and enterprise application architecture.

---

# Revision Sheet

```text
Routing
    = URL → View Mapping

Route
    = URL Definition

Navigation
    = Move Between Screens

Route Param
    = Resource Identifier

Query Param
    = View State

Deep Link
    = Direct URL Navigation

Guard
    = Navigation Rule

History API
    = Foundation Of SPA Routing

Lazy Loading
    = Load When Needed

Code Splitting
    = Smaller Bundles

Angular
    = Framework Router

React
    = Router Library

What Changes?
    = APIs & Syntax

What Stays Same?
    = Navigation Principles
```