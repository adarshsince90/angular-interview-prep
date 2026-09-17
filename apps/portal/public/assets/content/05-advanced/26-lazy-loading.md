# Lazy Loading

## Interview Priority

**Must Know**

## Interview Frequency

**Very High**

## Recommended Depth

**Expert Level Understanding**

## Relevant For

- Enterprise Applications
- Performance Optimization
- Large Angular Applications
- SaaS Platforms
- Admin Portals
- Senior Angular Interviews

---

# First Principles

Before understanding Lazy Loading, let's understand the problem it solves.

Imagine an Angular application contains:

```text
Login

Dashboard

Employees

Projects

Reports

Admin

Analytics

Audit
```

Each feature contains:

```text
Components

Services

Routes

Templates

Styles
```

---

# The Problem

When a user opens:

```text
/login
```

should Angular download code for:

```text
Employees

Projects

Reports

Admin

Analytics
```

immediately?

Probably not.

The user only needs:

```text
Login Screen
```

at that moment.

---

# Without Lazy Loading

Angular bundles everything together.

---

# Application Startup

```text
User Opens App

↓

Download Entire Application

↓

Parse Entire Application

↓

Initialize Entire Application

↓

Show Login Screen
```

---

# Visual

```text
App

├── Login
├── Dashboard
├── Employees
├── Projects
├── Reports
├── Admin
└── Analytics
```

All downloaded immediately.

---

# Problems

```text
Large Initial Bundle

Longer Startup Time

More Memory Usage

Slower First Load

Poor User Experience
```

---

# Mental Model

Without Lazy Loading:

```text
Download Everything

↓

Use Small Portion
```

---

# What Is Lazy Loading?

Lazy Loading is a technique where Angular loads application features only when they are needed.

---

# Mental Model

With Lazy Loading:

```text
Download Only What Is Needed

When It Is Needed
```

---

# Startup Flow

```text
User Opens Application

↓

Download Login Feature

↓

Show Login

↓

User Opens Employees

↓

Download Employees Feature

↓

Render Employees
```

---

# Comparison

## Without Lazy Loading

```text
Application Start

↓

10 MB Download

↓

User Uses 1 MB
```

---

## With Lazy Loading

```text
Application Start

↓

1 MB Download

↓

Load Additional Features Later
```

---

# Why Lazy Loading Exists

Benefits:

```text
Smaller Initial Bundle

Faster Startup

Reduced Memory Usage

Better User Experience

Improved Scalability
```

---

# What Can Be Lazy Loaded?

Most commonly:

```text
Feature Routes

Feature Areas

Standalone Components

Standalone Route Trees
```

---

# Modern Angular Lazy Loading

Modern Angular typically uses:

```typescript
loadComponent()
```

and

```typescript
loadChildren()
```

---

# loadComponent()

Used for lazy loading a single standalone component.

---

Example

```typescript
{
  path: 'employees',

  loadComponent: () =>
    import(
      './employees/employees.component'
    ).then(
      m => m.EmployeesComponent
    )
}
```

---

# What Happens?

At startup:

```text
EmployeesComponent Not Loaded
```

---

When user visits:

```text
/employees
```

Angular:

```text
Downloads Component

Creates Component

Renders Component
```

---

# Understanding Dynamic Imports

Lazy Loading relies on:

```typescript
import()
```

---

Example

```typescript
import(
  './employees.component'
)
```

---

This is called:

```text
Dynamic Import
```

---

Meaning:

```text
Load Later
```

instead of:

```text
Load Immediately
```

---

# Static Import

```typescript
import {
  EmployeesComponent
} from './employees.component';
```

---

Result

```text
Included In Initial Bundle
```

---

# Dynamic Import

```typescript
import(
  './employees.component'
)
```

---

Result

```text
Separate Bundle

Loaded On Demand
```

---

# loadChildren()

Most common enterprise approach.

---

Used to lazy load an entire feature area.

---

Example

```typescript
{
  path: 'employees',

  loadChildren: () =>
     import(
        './employees/routes'
     ).then(
        m => m.employeeRoutes
     )
}
```

---

# Difference

## loadComponent()

Loads:

```text
One Component
```

---

## loadChildren()

Loads:

```text
Entire Route Tree

Entire Feature Area
```

---

# Example Feature

Employee Feature

```text
Employee List

Employee Details

Employee Edit

Employee Reports
```

---

Employee Routes

```typescript
export const employeeRoutes:
Routes = [

   {
      path: '',
      component:
         EmployeeListComponent
   }

];
```

---

Main Route

```typescript
{
  path: 'employees',

  loadChildren: () =>
      import(
        './employees/routes'
      )
      .then(
        m => m.employeeRoutes
      )
}
```

---

# Startup Behavior

Initially:

```text
Employee Feature Not Loaded
```

---

User Opens:

```text
/employees
```

Angular:

```text
Downloads Employee Bundle

Loads Routes

Loads Components
```

---

# Enterprise Route Structure

```text
features

├── dashboard
├── employees
├── projects
├── reports
└── admin
```

---

Routes

```typescript
{
  path:'dashboard',
  loadChildren: ...
}

{
  path:'employees',
  loadChildren: ...
}

{
  path:'projects',
  loadChildren: ...
}

{
  path:'reports',
  loadChildren: ...
}
```

---

# Build Output

Angular creates separate bundles.

---

Example

```text
main.js

dashboard.chunk.js

employees.chunk.js

projects.chunk.js

reports.chunk.js

admin.chunk.js
```

---

# Startup

Only:

```text
main.js
```

downloads initially.

---

Other chunks download later.

---

# Router Lifecycle With Lazy Loading

When navigating to a lazy route:

```text
User Navigates

↓

Route Match

↓

Download Bundle

↓

Guards

↓

Resolvers

↓

Route Activation

↓

Component Creation

↓

Rendering
```

---

# Important Interview Point

For lazy routes:

```text
Angular Must Download
The Feature Bundle

Before It Can Create
The Component
```

---

# Lazy Loading And Route Guards

Very common enterprise pattern.

---

Example

```typescript
{
  path:'admin',

  canActivate:[
      authGuard
  ],

  loadChildren: () =>
      import(
          './admin/routes'
      )
      .then(
          m => m.routes
      )
}
```

---

# The Problem

Even unauthorized users may trigger bundle downloads.

---

# Modern Solution

Use:

```typescript
CanMatch
```

---

Example

```typescript
{
  path:'admin',

  canMatch:[
      adminGuard
  ],

  loadChildren: () =>
      import(
        './admin/routes'
      )
      .then(
        m => m.routes
      )
}
```

---

# Why CanMatch Is Useful

CanMatch executes during route matching.

---

Result:

```text
Unauthorized User

↓

Route Not Matched

↓

Bundle Never Downloaded
```

---

# CanMatch vs CanActivate

## CanActivate

```text
Route Already Matched
```

---

## CanMatch

```text
Route Matching Prevented
```

---

For lazy loading:

```text
CanMatch Is Preferred
```

for feature protection.

---

# Lazy Loading And Nested Routes

Very common pattern.

---

Parent Route

```typescript
{
  path:'employees',

  loadChildren: () =>
      import(
         './employees/routes'
      )
      .then(
         m => m.employeeRoutes
      )
}
```

---

Employee Routes

```typescript
[
  {
    path:'',

    component:
       EmployeeShellComponent,

    children:[

      {
        path:':id',
        component:
           EmployeeDetailComponent
      }

    ]
  }
]
```

---

# Lazy Loading And Resolvers

Works naturally.

---

Example

```typescript
{
  path:':id',

  resolve:{
      employee:
         employeeResolver
  },

  component:
      EmployeeDetailComponent
}
```

---

Flow

```text
Download Feature

↓

Execute Resolver

↓

Create Component

↓

Render UI
```

---

# What Is Preloading?

Common interview topic.

---

Problem:

```text
First Visit To Route

↓

Chunk Download

↓

Small Delay
```

---

Angular allows:

```text
Preloading
```

---

# PreloadAllModules

```typescript
provideRouter(

  routes,

  withPreloading(
      PreloadAllModules
  )

)
```

---

# Behavior

```text
Application Starts

↓

Critical Routes Loaded

↓

Background Downloads Begin

↓

Future Navigation Faster
```

---

# Lazy Loading vs Preloading

## Lazy Loading

```text
Load When Needed
```

---

## Preloading

```text
Load In Background
After Startup
```

---

# Route-Based Code Splitting

One of the biggest advantages of Lazy Loading.

---

Without Lazy Loading

```text
main.js
```

contains:

```text
Everything
```

---

With Lazy Loading

```text
main.js

employees.chunk.js

reports.chunk.js

admin.chunk.js

settings.chunk.js
```

---

# Why Is This Valuable?

Benefits:

```text
Smaller Startup Download

Faster Initial Render

Better Performance Scores

Improved Scalability
```

---

# When Should Lazy Loading Be Used?

Ideal candidates:

```text
Admin

Reports

Employees

Analytics

Projects

Settings
```

---

Usually:

```text
Large Feature Areas
```

---

# When Is Lazy Loading Less Useful?

Very small applications.

Example:

```text
Login

Dashboard

Profile
```

with only a few screens.

---

Overhead may outweigh benefits.

---

# Common Enterprise Architecture

```text
App

├── Core
├── Shared

├── Dashboard
├── Employees
├── Projects
├── Reports
├── Settings
└── Admin
```

Each feature becomes:

```text
Independent Bundle
```

loaded on demand.

---

# Common Interview Questions

## What Is Lazy Loading?

A technique that loads code only when it is required.

---

## Why Use Lazy Loading?

```text
Reduce Bundle Size

Improve Startup Performance

Improve Scalability
```

---

## Most Common APIs?

```typescript
loadComponent()

loadChildren()
```

---

## Difference Between loadComponent And loadChildren?

loadComponent:

```text
Single Component
```

---

loadChildren:

```text
Feature Area
```

---

## What Is Dynamic Import?

```typescript
import(...)
```

Loads code on demand.

---

## What Is Code Splitting?

Breaking one large bundle into multiple smaller bundles.

---

## Can Lazy Routes Have Guards?

Yes.

```typescript
CanActivate

CanMatch

CanDeactivate

Resolvers
```

all work.

---

## Why Is CanMatch Important?

Because Angular can prevent loading an entire feature bundle for unauthorized users.

---

## What Is Preloading?

Background downloading of lazy-loaded bundles after startup.

---

# Common Interview Traps

## Trap 1

Thinking

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Route Resolvers](25-route-resolvers.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [HTTP Interceptors](27-http-interceptors.md)

<br/>
<!-- navigation-end -->
