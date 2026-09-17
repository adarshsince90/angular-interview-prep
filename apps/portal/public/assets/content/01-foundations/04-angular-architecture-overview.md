# Angular Architecture Overview

## Interview Priority

**Must Know**

## Interview Frequency

**Very Common**

## Recommended Depth

**Strong Understanding**

## Relevant For

- Mid-Level Interviews
- Senior Developer Interviews
- Lead Developer Interviews
- Architect Discussions

---

# What Is Angular Architecture?

Angular Architecture refers to the overall structure and organization of an Angular application.

Angular is not just a UI library.

It is a complete framework that provides:

- Component-Based UI Development
- Dependency Injection
- Routing
- HTTP Communication
- Forms
- State Management
- Performance Optimization Features

The goal is to help developers build large, maintainable, scalable, and testable Single Page Applications (SPAs).

---

# Why Does Angular Have a Defined Architecture?

Imagine developing an enterprise application with:

- 200 Screens
- 500 Components
- 100+ APIs
- Multiple Development Teams

Without a clear architecture:

- Business logic becomes scattered
- Code duplication increases
- Testing becomes difficult
- Maintenance becomes expensive

Angular provides a structured approach that enforces separation of concerns.

---

# First Principles

Think about a typical ASP.NET Core application.

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

Angular follows a similar layered approach.

```text
Component
    ↓
Service
    ↓
HttpClient
    ↓
Backend API
    ↓
Database
```

Understanding this flow explains most Angular applications.

---

# High-Level Architecture Diagram

```text
User
 │
 ▼
Template (HTML)
 │
 ▼
Component
 │
 ▼
Service
 │
 ▼
HttpClient
 │
 ▼
Backend API
 │
 ▼
Database
```

Supporting Features:

```text
Routing
Dependency Injection
Forms
Signals
RxJS
Guards
Interceptors
Change Detection
```

---

# Core Building Blocks

## Components

Components are the fundamental building blocks of Angular.

Responsibilities:

- Display UI
- Handle user interactions
- Coordinate with services

Examples:

```text
LoginComponent
DashboardComponent
EmployeeListComponent
EmployeeDetailsComponent
```

Think of Components as the Presentation Layer.

---

### Component Responsibilities

Good Components:

- Display data
- Capture user actions
- Call services
- Update UI

Bad Components:

- Complex business rules
- Direct database access
- Excessive API logic
- Heavy processing

Such logic should move into Services.

---

## Templates

Templates define how the UI looks.

Example:

```html
<h2>Employees</h2>
<button>Load Employees</button>
```

Templates are responsible for:

- Rendering data
- Binding events
- Displaying content

Relationship:

```text
Component
    ↓
Template
```

The Component supplies data.

The Template displays it.

---

## Services

Services contain reusable business logic.

Examples:

```text
EmployeeService
AuthService
ReportService
NotificationService
```

Services help keep Components clean and focused.

---

### Why Services Exist

Without services:

```text
Component
 ├── UI Logic
 ├── API Calls
 ├── Validation
 ├── Calculations
 ├── Caching
 └── Business Rules
```

Components become difficult to maintain.

Angular promotes:

```text
Component
    ↓
Service
```

This creates better separation of concerns.

---

## Dependency Injection (DI)

Once Services exist, Components need access to them.

Bad approach:

```typescript
const service = new EmployeeService();
```

Problems:

- Tight coupling
- Hard to test
- Difficult to replace implementations

Angular uses Dependency Injection.

Example:

```typescript
constructor(
  private employeeService: EmployeeService
) {}
```

Angular automatically provides dependencies.

---

### ASP.NET Core Comparison

```csharp
builder.Services.AddScoped<IEmployeeService,
                           EmployeeService>();
```

Very similar concept.

Angular's Injector acts as the DI container.

---

## HttpClient

Angular applications often communicate with APIs.

Examples:

```text
Get Employees
Create Employee
Update Employee
Delete Employee
```

Angular provides HttpClient for this purpose.

Flow:

```text
Component
    ↓
Service
    ↓
HttpClient
    ↓
REST API
```

HttpClient supports:

- GET
- POST
- PUT
- DELETE
- PATCH

---

## Routing

Angular applications are SPAs.

Navigation should happen without page refresh.

Routing connects URLs to Components.

Example:

```text
/employees
```

Displays:

```text
EmployeeListComponent
```

---

```text
/employees/1
```

Displays:

```text
EmployeeDetailsComponent
```

---

High-Level Routing Flow:

```text
URL
 ↓
Router
 ↓
Component
```

---

## Forms

Most applications collect user input.

Examples:

```text
Login
Registration
Search
Employee Creation
```

Angular supports:

### Template-Driven Forms

Simpler approach.

Best for smaller forms.

### Reactive Forms

More scalable.

Commonly used in enterprise applications.

Features:

- Validation
- Dynamic Forms
- Testability

---

## State Management

Applications maintain state.

Examples:

```text
Logged-In User
Shopping Cart
Theme
Selected Employee
Filters
```

State can be stored in:

```text
Component State

Service State

Signals

RxJS

NgRx
```

State management becomes increasingly important as applications grow.

---

# Request Lifecycle Example

Consider:

```text
Open Employee Details Screen
```

Complete flow:

```text
User Clicks Employee

      ↓

EmployeeComponent

      ↓

EmployeeService

      ↓

HttpClient

      ↓

ASP.NET Core API

      ↓

Database
```

Response:

```text
Database

      ↓

API

      ↓

HttpClient

      ↓

EmployeeService

      ↓

EmployeeComponent

      ↓

Template Updates

      ↓

User Sees Data
```

This is one of the most important Angular diagrams to remember.

---

# Modern Angular Architecture

Earlier Angular versions relied heavily on:

```text
NgModules
RxJS
Traditional Control Flow
```

Modern Angular increasingly emphasizes:

```text
Standalone Components
Signals
Improved Template Syntax
Lazy Loading
Performance Improvements
```

Examples:

```text
@if
@for
Signal-Based Reactivity
Standalone Components
```

Interviewers increasingly expect awareness of these newer concepts.

---

# How Future Topics Fit Into Architecture

```text
Angular Application
│
├── Components
│
├── Templates
│   ├── Data Binding
│   └── Directives
│
├── Services
│
├── Dependency Injection
│
├── HttpClient
│
├── Routing
│   ├── Guards
│   └── Lazy Loading
│
├── Forms
│
├── State
│   ├── Signals
│   ├── RxJS
│   └── NgRx
│
└── Performance
    ├── Change Detection
    ├── OnPush
    └── Optimization Techniques
```

This roadmap represents how Angular concepts connect together.

---

# Common Interview Questions

## What are the main building blocks of Angular?

- Components
- Templates
- Services
- Dependency Injection
- Routing
- HttpClient
- Forms
- State Management

---

## What is the role of a Component?

Responsible for presentation and handling user interactions.

---

## Why do Services exist?

To move business and data-access logic out of Components.

---

## Why does Angular use Dependency Injection?

To reduce coupling and improve testability and maintainability.

---

## How does Angular communicate with a backend?

Using HttpClient.

---

## How does Angular navigate without page refresh?

Using Angular Router.

---

## What is the typical Angular request flow?

```text
User
→ Component
→ Service
→ API
→ Database

Database
→ API
→ Service
→ Component
→ User
```

---

# Senior-Level Discussion

A senior engineer should understand Angular as a layered architecture.

```text
Presentation Layer
    ↓
Business Logic Layer
    ↓
Data Access Layer
```

Mapping:

```text
Presentation Layer
→ Components + Templates

Business Layer
→ Services

Infrastructure Layer
→ HttpClient, Interceptors

Navigation Layer
→ Routing

Cross-Cutting Concerns
→ DI, Guards, Error Handling
```

This separation improves:

- Scalability
- Maintainability
- Testability
- Team Productivity

---

# Architecture Considerations

When designing Angular applications:

Ask:

1. Does this belong in a Component or Service?
2. Can this be reused?
3. Is this business logic or UI logic?
4. Is state managed in the right location?
5. Can this be easily tested?

Good Angular architecture prioritizes:

- Separation of concerns
- Reusability
- Predictability
- Maintainability

---

# Complete Architecture Diagram

```text
┌───────────────────┐
│       User        │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│     Template      │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│    Component      │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│     Service       │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│    HttpClient     │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│   Backend API     │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│     Database      │
└───────────────────┘

Supporting Layers:

Routing
Dependency Injection
Forms
Signals
RxJS
Interceptors
Guards
Change Detection
```

---

# Key Takeaways

1. Angular is a complete application framework.
2. Components represent the UI layer.
3. Templates define presentation.
4. Services contain business logic.
5. Dependency Injection manages dependencies.
6. HttpClient communicates with APIs.
7. Routing enables SPA navigation.
8. Forms handle user input.
9. Signals, RxJS, and NgRx help manage state.
10. Most Angular applications follow:

```text
User
→ Component
→ Service
→ API
→ Database
```

---

# Interview Notes (Revision Version)

## Main Building Blocks

- Components
- Templates
- Services
- Dependency Injection
- Routing
- HttpClient
- Forms
- State Management

## Typical Flow

```text
User
→ Component
→ Service
→ API
→ Database
```

## Responsibilities

Components:
- UI
- User interactions

Services:
- Business logic
- API calls

HttpClient:
- Backend communication

Router:
- Navigation

DI:
- Dependency management

## Key Message

Angular follows a layered architecture that separates UI, business logic, navigation, and infrastructure concerns, making enterprise applications easier to maintain and scale.

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Component-Based Architecture](03-component-based-architecture.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [TypeScript Essentials for Angular](05-typescript-essentials-for-angular.md)

<br/>
<!-- navigation-end -->
