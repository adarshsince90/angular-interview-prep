# Client-Server Communication

## Why This Topic Exists

Modern frontend applications do not operate in isolation.

Applications need data.

Examples:

```text
Employees

Products

Orders

Reports

Notifications

Messages
```

Question:

```text
Where does this data come from?
```

In most enterprise systems:

```text
Backend Services
```

own the data.

The frontend must:

```text
Request

Receive

Display

Cache

Synchronize
```

that data.

This entire process is called:

```text
Client-Server Communication
```

---

## Learning Objectives

By the end of this chapter you should understand:

```text
Why client-server communication exists

Frontend vs backend responsibilities

How APIs evolved

REST fundamentals

Server state

Loading states

Error states

Caching

Data synchronization

Modern Angular approaches

Modern React approaches

Why React Query/TanStack Query appeared
```

---

# First Principles

Imagine you're building:

```text
Employee Portal
```

Requirements:

```text
Display Employees

Add Employees

Update Employees

Delete Employees
```

Question:

```text
Should employee data live permanently
inside the browser?
```

Answer:

```text
No
```

Because:

```text
Many Users Need It

Data Must Persist

Data Must Be Secure

Data Must Be Shared
```

Data belongs somewhere central.

That "somewhere" is usually:

```text
Backend System
```

---

# Frontend vs Backend Responsibilities

One of the most important architectural concepts.

---

## Frontend Responsibilities

Frontend owns:

```text
Rendering

User Interactions

Client State

Navigation

User Experience
```

---

Examples:

```text
Current Tab

Theme

Modal Open State

Selected Employee
```

---

## Backend Responsibilities

Backend owns:

```text
Business Rules

Persistence

Security

Data Integrity

Auditability
```

---

Examples:

```text
Employees

Products

Orders

Invoices

Reports
```

---

# Historical Evolution

Understanding the evolution explains why modern frontend data libraries exist.

---

## Stage 1 - Static Websites

Early websites:

```text
HTML

CSS
```

---

No API calls.

No dynamic data.

---

Result:

```text
No Client-Server Communication
```

---

## Stage 2 - Dynamic Websites

Servers generated complete HTML pages.

Process:

```text
Browser

↓

Request Page

↓

Server Generates HTML

↓

Browser Displays Page
```

---

Problem:

```text
Every Action

↓

Full Page Reload
```

---

User experience suffered.

---

## Stage 3 - AJAX Revolution

A major milestone.

Instead of:

```text
Reload Entire Page
```

applications could:

```text
Request Small Data Chunks
```

---

Flow:

```text
Browser

↓

AJAX Request

↓

JSON Response

↓

Partial UI Update
```

This fundamentally changed web applications.

---

## Stage 4 - Single Page Applications

Frameworks emerged:

```text
Angular

React

Vue
```

---

Frontend became richer.

Responsibilities expanded:

```text
Routing

State

Caching

Rendering
```

---

The frontend now controlled:

```text
User Experience
```

while the backend exposed:

```text
APIs
```

---

## Stage 5 - API Ecosystem Expansion

Communication patterns evolved.

Examples:

```text
REST

GraphQL

WebSockets

Server-Sent Events (SSE)
```

---

Different communication styles emerged.

---

## Stage 6 - Server State Era

A realization appeared:

```text
Backend Data

Is Different

From Frontend State
```

---

Examples:

```text
Employees

Products

Orders
```

not owned by frontend.

---

This led to:

```text
React Query

TanStack Query

RTK Query
```

and other server-state solutions.

---

# What Is Client-Server Communication?

Definition:

> Communication between a frontend application (client) and a backend system (server) for exchanging information.

---

Common Flow

```text
User Action

↓

Frontend Request

↓

Backend Processing

↓

Response

↓

UI Update
```

---

Example

```text
Search Employee

↓

GET /employees

↓

JSON Response

↓

Display Results
```

---

# Fundamental Building Blocks

## Request

Information sent by the client.

---

Example:

```http
GET /employees
```

---

## Response

Information returned by server.

---

Example:

```json
[
  {
    "id": 1,
    "name": "John"
  }
]
```

---

## Protocol

Rules governing communication.

Most commonly:

```text
HTTP
```

---

# REST Fundamentals

Most enterprise systems still use REST.

---

## GET

Retrieve data.

Example:

```http
GET /employees
```

---

Meaning:

```text
Give Me Employees
```

---

## POST

Create data.

Example:

```http
POST /employees
```

---

Meaning:

```text
Create Employee
```

---

## PUT

Replace resource.

Example:

```http
PUT /employees/1
```

---

Meaning:

```text
Replace Entire Employee
```

---

## PATCH

Partial update.

Example:

```http
PATCH /employees/1
```

---

Meaning:

```text
Update Specific Fields
```

---

## DELETE

Remove resource.

Example:

```http
DELETE /employees/1
```

---

Meaning:

```text
Delete Employee
```

---

# API Design Concepts

## Pagination

Avoid loading everything.

---

Bad:

```text
1,000,000 Employees
```

---

Good:

```http
GET /employees?page=1&pageSize=20
```

---

# Filtering

Example:

```http
GET /employees?department=IT
```

---

# Sorting

Example:

```http
GET /employees?sort=name
```

---

# Versioning

Example:

```text
/api/v1/employees

/api/v2/employees
```

Protects consumers from breaking changes.

---

# Loading States

All network communication has latency.

---

Question:

```text
What Happens While Waiting?
```

---

Typical Flow

```text
Request Started

↓

Loading

↓

Success

OR

Error
```

---

UI often shows:

```text
Spinner

Skeleton

Progress Indicator
```

---

Loading state is part of good UX.

---

# Error States

Networks are unreliable.

---

Examples:

```text
Network Failure

Server Failure

Timeout

Unauthorized Access
```

---

Applications must handle failures gracefully.

---

Typical Flow

```text
Request

↓

Error

↓

Recovery
```

---

Good systems anticipate failure.

---

# Server State

One of the most important modern frontend concepts.

---

Example:

```text
Employees
```

Question:

```text
Who Owns Employees?
```

---

Answer:

```text
Backend
```

---

Frontend does not own:

```text
Employee Truth
```

---

Frontend only:

```text
Requests

Caches

Displays

Synchronizes
```

---

# Client State vs Server State

## Client State

Frontend owns it.

---

Examples:

```text
Theme

Current Tab

Form State

Modal State
```

---

Tools:

```text
Signals

useState

Redux

NgRx
```

---

## Server State

Backend owns it.

---

Examples:

```text
Employees

Products

Orders

Reports
```

---

Tools:

```text
TanStack Query

RTK Query

Custom Data Services
```

---

This distinction changed frontend architecture significantly.

---

# Caching

Question:

```text
Should We Call APIs Repeatedly?
```

Example:

```text
Employee List Viewed

Again

Again

Again
```

Repeated calls waste resources.

---

Solution:

```text
Cache Responses
```

---

Benefits

```text
Improved Performance

Reduced Server Load

Better User Experience
```

---

# Cache Invalidation

One of the hardest problems in software.

---

Question:

```text
Employee Changed

↓

Is Cache Still Valid?
```

---

Possibilities:

```text
Refetch

Invalidate

Refresh

Expire
```

---

Modern query libraries automate much of this.

---

# Request-Response Pattern

Most common communication model.

---

Flow

```text
Client

↓

Request

↓

Server

↓

Response
```

---

Examples:

```text
REST APIs

GraphQL Queries
```

---

# Real-Time Communication

Sometimes data changes continuously.

---

Examples:

```text
Chat

Stock Prices

Live Tracking

Notifications
```

---

Request-response becomes insufficient.

---

Solutions:

```text
WebSockets

Server-Sent Events
```

---

# WebSockets

Persistent two-way communication.

---

Flow

```text
Client

↕

Server
```

---

Use Cases

```text
Chat

Trading

Gaming

Collaboration
```

---

# Server-Sent Events (SSE)

Server pushes updates.

---

Flow

```text
Server

↓

Client
```

---

Use Cases:

```text
Notifications

Live Dashboards

Progress Updates
```

---

# Why React Query Appeared

Before React Query:

Developers repeatedly implemented:

```text
Loading

Errors

Caching

Retries

Refetching
```

for every API.

---

A realization emerged:

```text
Server Data

Needs Dedicated Management
```

---

React Query was created to manage:

```text
Server State
```

---

# What React Query/TanStack Query Does

It automatically manages:

✅ Loading

✅ Errors

✅ Caching

✅ Retries

✅ Background Refresh

✅ Synchronization

✅ Cache Invalidation

✅ Request Deduplication

---

Think:

```text
Server State Management Layer
```

---

# Angular Perspective

Angular traditionally uses:

```text
HttpClient

Services

RxJS

Interceptors
```

---

Example:

```typescript
this.http.get<Employee[]>(
  '/employees'
);
```

---

Angular heavily embraces:

```text
Observables
```

---

Commonly:

```text
API Call

↓

Observable

↓

Component Subscription

↓

UI Update
```

---

Historically many Angular teams implemented caching manually using:

```text
Services

BehaviorSubject

RxJS
```

---

# React Perspective

React ecosystem commonly uses:

```text
fetch()

Axios

TanStack Query

RTK Query
```

---

React embraces:

```text
Promises

async/await
```

more than Observables.

---

Example:

```typescript
async function getEmployees() {
  const response =
    await fetch('/employees');

  return response.json();
}
```

---

# Observables vs Promises

## Angular World

Often:

```text
Observable First
```

---

HTTP:

```typescript
Observable<Employee[]>
```

---

## React World

Often:

```text
Promise First
```

---

HTTP:

```typescript
Promise<Employee[]>
```

---

React can use RxJS.

However:

```text
Promises Are More Common
```

---

# What Stays The Same Across Frameworks?

✅ Requests

✅ Responses

✅ HTTP

✅ APIs

✅ Caching

✅ Errors

✅ Loading States

✅ Data Synchronization

✅ Server State

✅ Data Ownership

---

# What Changes Across Frameworks?

❌ HttpClient

❌ fetch()

❌ Axios

❌ RxJS

❌ Query Libraries

❌ Framework APIs

---

# Angular ↔ React Mapping

## HTTP Communication

Angular

```typescript
HttpClient
```

---

React

```typescript
fetch()

Axios
```

---

## Async Model

Angular

```text
Observable
```

---

React

```text
Promise
```

---

## API Middleware

Angular

```text
Interceptors
```

---

React

```text
Axios Interceptors
```

---

## Cache Layer

Angular

```text
BehaviorSubject

Custom Services

Signal Stores
```

---

React

```text
TanStack Query Cache
```

---

## Server State

Angular

```text
Custom State Layer
```

---

React

```text
TanStack Query
```

---

# Modern Enterprise Recommendations

## Angular

```text
HttpClient

Interceptors

RxJS

Signals

Optional Query Libraries
```

---

## React

```text
TanStack Query

Axios / fetch

TypeScript

Zod (Optional Runtime Validation)
```

---

Modern architectures increasingly separate:

```text
Client State

and

Server State
```

---

# How This Topic Evolves Into Enterprise Architecture

Communication grows with system complexity.

---

Small System

```text
Single API Call
```

---

Feature Application

```text
Feature Data Layer
```

---

Large Application

```text
Shared API Clients
```

---

Enterprise Platform

```text
Caching

Retries

Monitoring

Observability
```

---

Micro Frontends

```text
Shared Communication Standards
```

---

Eventually client-server communication becomes:

```text
Data Access Architecture
```

---

# Common Interview Questions

### What Is REST?

A resource-oriented architectural style using HTTP.

---

### PUT vs PATCH?

PUT:

```text
Replace Entire Resource
```

PATCH:

```text
Partial Update
```

---

### What Is Server State?

Data owned by the backend and consumed by the frontend.

---

### Why Cache API Responses?

Improve performance and reduce unnecessary requests.

---

### What Is Stale Data?

Data that no longer reflects backend reality.

---

### Why Did React Query Appear?

To manage server-state concerns such as loading, caching, retries, and synchronization.

---

### When Should WebSockets Be Used?

For real-time bidirectional communication.

---

### What Is SSE?

Server-pushed updates over HTTP.

---

# Common Interview Traps

## Trap 1

Thinking all application data belongs in Redux or NgRx.

Wrong.

Many datasets are actually:

```text
Server State
```

---

## Trap 2

Confusing client state with server state.

They have different ownership models.

---

## Trap 3

Ignoring loading and error states.

Network communication is never instant.

---

## Trap 4

Treating cache as permanent truth.

Backend remains the authority.

---

# Senior-Level Mental Model

Do not think:

```text
HttpClient

fetch()

Axios

React Query
```

Think:

```text
Who Owns The Data?

How Is It Retrieved?

How Is It Cached?

How Is It Synchronized?

How Fresh Is It?
```

Everything else is implementation detail.

---

# Key Takeaways

1. Client-server communication exists because important data must be shared and persisted.
2. Frontend and backend have different responsibilities.
3. Most enterprise communication is built around HTTP APIs.
4. Server state is different from client state.
5. Loading, caching, and error handling are first-class concerns.
6. Query libraries emerged to solve server-state management problems.
7. Angular favors Observables and HttpClient.
8. React favors Promises and query libraries.
9. Data ownership is more important than tooling.
10. Modern frontend architecture separates client-state management from server-state management.

---

# Revision Sheet

```text
Client State
    = Frontend-Owned

Server State
    = Backend-Owned

REST
    = Request / Response APIs

GET
    = Read

POST
    = Create

PUT
    = Replace

PATCH
    = Partial Update

DELETE
    = Remove

Cache
    = Temporary Data Copy

React Query
    = Server State Management

Angular
    = Observable First

React
    = Promise First

What Changes?
    = Tools

What Stays Same?
    = Data Ownership & Communication
```