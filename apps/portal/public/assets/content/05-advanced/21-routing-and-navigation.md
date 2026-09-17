# Routing & Navigation

## Interview Priority

**Must Know**

## Interview Frequency

**Extremely Common**

## Recommended Depth

**Expert Level Understanding**

## Relevant For

- Angular Applications
- Enterprise Applications
- Dashboard Applications
- Admin Portals
- E-commerce Applications
- Senior Developer Interviews

---

# First Principles

Before understanding Angular Routing, let's understand why routing exists.

---

# Traditional Web Applications

Before Single Page Applications (SPAs), websites worked like this:

```text
Home Page
    ↓
Request Home.html

Employees Page
    ↓
Request Employees.html

Reports Page
    ↓
Request Reports.html
```

Every navigation caused:

```text
Full Page Refresh

HTML Reload

CSS Reload

JavaScript Reload
```

---

# The Problem

Imagine an application with:

```text
Dashboard

Employees

Projects

Reports

Settings

Profile
```

Every navigation would:

```text
Reload Entire Application
```

Result:

```text
Slower User Experience

Lost State

Network Overhead
```

---

# Angular SPA Solution

Angular applications typically load once.

After that:

```text
URL Changes

↓

Angular Router Processes URL

↓

Component Changes

↓

No Full Page Reload
```

---

# Mental Model

Think of Angular Routing as:

```text
URL

↓

Route Configuration

↓

Component

↓

Displayed In router-outlet
```

Example:

```text
/employees

↓

EmployeeListComponent
```

---

# What Is Angular Router?

Angular Router is a framework service responsible for:

```text
URL Management

Navigation

Route Matching

Lazy Loading

Route Parameters

Query Parameters

Guards

Resolvers
```

---

# High-Level Architecture

```text
Browser URL

      ↓

Angular Router

      ↓

Route Configuration

      ↓

Matched Component

      ↓

router-outlet
```

---

# Core Routing Concepts

Almost every routing discussion involves:

```typescript
Routes
```

```typescript
Router
```

```typescript
ActivatedRoute
```

```html
<router-outlet>
```

```html
routerLink
```

---

# Modern Angular Routing

Standalone Angular uses:

```typescript
provideRouter()
```

---

# Route Configuration

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'employees',
    component: EmployeeListComponent
  }

];
```

---

# Understanding Routes

Each route maps:

```text
URL

↓

Component
```

---

Example

```typescript
{
  path: 'employees',
  component: EmployeeListComponent
}
```

Meaning:

```text
/employees

↓

EmployeeListComponent
```

---

# Route Matching

Suppose routes:

```typescript
const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'employees',
    component: EmployeeListComponent
  }

];
```

URLs:

```text
/
```

loads:

```typescript
HomeComponent
```

---

URL:

```text
/employees
```

loads:

```typescript
EmployeeListComponent
```

---

# Bootstrapping Routing

Modern Angular:

```typescript
bootstrapApplication(
  AppComponent,
  {
    providers: [
      provideRouter(routes)
    ]
  }
);
```

---

# Why provideRouter()?

Registers Angular Router and route configuration.

Think:

```text
Enable Routing

Register Routes
```

---

# router-outlet

One of the most important routing concepts.

---

# Problem

When a route matches:

```typescript
EmployeeListComponent
```

Where should Angular display it?

---

# Solution

```html
<router-outlet>
</router-outlet>
```

---

# Example

App Component

```html
<header>

  Company Portal

</header>

<router-outlet>
</router-outlet>
```

---

# Visual

```text
Header

↓

router-outlet

↓

Current Route Component
```

---

# Navigation Using routerLink

Most navigation starts from templates.

---

# Traditional HTML

```html
/employees
  Employees
</a>
```

Problem:

```text
Full Browser Refresh
```

---

# Angular Navigation

```html
<a routerLink="/employees">
  Employees
</a>
```

---

# Benefits

```text
SPA Navigation

No Full Reload

Faster Experience
```

---

# Real Enterprise Example

```html
<nav>

  <a routerLink="/dashboard">
      Dashboard
  </a>

  <a routerLink="/employees">
      Employees
  </a>

  <a routerLink="/projects">
      Projects
  </a>

  <a routerLink="/reports">
      Reports
  </a>

</nav>
```

---

# How routerLink Works

```text
User Clicks Link

↓

Angular Intercepts Click

↓

URL Changes

↓

Router Finds Route

↓

Component Loads

↓

router-outlet Updates
```

---

# Programmatic Navigation

Navigation can also happen from TypeScript.

---

# Why?

Sometimes navigation depends on application logic.

Examples:

```text
Login Success

Save Employee

Delete Employee

Wizard Completion
```

---

# Inject Router

```typescript
constructor(
  private router: Router
) {}
```

---

# Navigate

```typescript
this.router.navigate([
  '/employees'
]);
```

---

# Example: Login

```typescript
login() {

  this.authService.login();

  this.router.navigate([
     '/dashboard'
  ]);

}
```

---

# Example: Save Employee

```typescript
save() {

  this.employeeService.save();

  this.router.navigate([
      '/employees'
  ]);

}
```

---

# Route Parameters

One of the most frequently asked interview topics.

---

# Problem

Need employee details page.

Employee IDs:

```text
101

102

103
```

Creating:

```text
/employees101

/employees102

/employees103
```

does not scale.

---

# Solution

Parameterized Routes

```typescript
{
   path: 'employees/:id',
   component: EmployeeDetailComponent
}
```

---

# URLs

```text
/employees/101

/employees/102

/employees/103
```

All use:

```typescript
EmployeeDetailComponent
```

---

# Reading Route Parameters

Inject:

```typescript
constructor(
  private route:
      ActivatedRoute
) {}
```

---

# Snapshot Approach

```typescript
const id =
 this.route.snapshot
     .paramMap
     .get('id');
```

---

Result

For:

```text
/employees/101
```

returns:

```text
101
```

---

# Reactive Approach

```typescript
this.route.paramMap
  .subscribe(params => {

     const id =
       params.get('id');

  });
```

---

# Why Reactive?

Useful when route changes:

```text
Employee 101

↓

Employee 102

↓

Employee 103
```

without recreating the component.

---

# Query Parameters

Another extremely common Angular feature.

---

# Route Parameters

Identify resource.

Example:

```text
/employees/101
```

---

# Query Parameters

Modify resource behavior.

Example:

```text
/employees?page=2
```

---

# Real Examples

```text
/employees?page=2

/employees?sort=name

/employees?status=active

/employees?page=2&sort=name
```

---

# Reading Query Parameters

```typescript
this.route.queryParamMap
  .subscribe(params => {

      const page =
          params.get('page');

  });
```

---

# Real Enterprise Example

Employee Search Screen

```text
/employees

?page=2

&sort=name

&department=IT

&status=active
```

---

# Benefits

```text
Bookmarkable

Sharable

Browser Back Support

Persistence
```

---

# Route Parameters vs Query Parameters

## Route Parameters

```text
Resource Identity
```

Example:

```text
/employees/101
```

---

## Query Parameters

```text
Display Options

Filters

Paging

Sorting
```

Example:

```text
?page=2
```

---

# Redirect Routes

Used frequently.

---

Example

```typescript
{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
}
```

---

Meaning

```text
/

↓

/dashboard
```

---

# pathMatch

Very common interview question.

---

# full

```typescript
pathMatch:'full'
```

Means:

```text
Entire URL Must Match
```

---

Usually used for:

```typescript
redirectTo
```

configurations.

---

# Wildcard Routes

Handle invalid URLs.

---

Example

```typescript
{
  path: '**',
  component: NotFoundComponent
}
```

---

Examples

```text
/xyz

/unknown-page

/wrong-url
```

---

Load:

```typescript
NotFoundComponent
```

---

# Nested Routes

Extremely common in enterprise applications.

---

# Example Structure

```text
/dashboard

/dashboard/users

/dashboard/reports

/dashboard/settings
```

---

# Route Definition

```typescript
{
  path: 'dashboard',

  component: DashboardComponent,

  children: [

     {
       path: 'users',
       component:
         UsersComponent
     },

     {
       path: 'reports',
       component:
         ReportsComponent
     }

  ]
}
```

---

# Visual

```text
Dashboard

    ↓

Users

Reports

Settings
```

All render inside dashboard layout.

---

# Nested router-outlet

Dashboard template:

```html
<h2>Dashboard</h2>

<router-outlet>
</router-outlet>
```

---

# Route Data

Attach metadata to routes.

---

Example

```typescript
{
   path: 'employees',

   component:
     EmployeeListComponent,

   data: {

      title: 'Employees'

   }
}
```

---

# Uses

```text
Page Titles

Permissions

Breadcrumbs

Metadata
```

---

# Reading Route Data

```typescript
this.route.data
  .subscribe(data => {

  });
```

---

# Router Events

Advanced but useful.

---

Examples

```text
Global Loader

Analytics

Tracking

Performance Monitoring
```

---

```typescript
this.router.events
  .subscribe(event => {

  });
```

---

# Common Enterprise Routing Structure

```typescript
const routes: Routes = [

  {
    path: '',
    redirectTo:
      'dashboard',
    pathMatch:
      'full'
  },

  {
    path:'dashboard',
    component:
      DashboardComponent
  },

  {
    path:'employees',
    component:
      EmployeeListComponent
  },

  {
    path:'employees/:id',
    component:
      EmployeeDetailComponent
  },

  {
    path:'projects',
    component:
      ProjectListComponent
  },

  {
    path:'reports',
    component:
      ReportDashboardComponent
  },

  {
    path:'**',
    component:
      NotFoundComponent
  }

];
```

---

# Routing Lifecycle

```text
User Navigates

↓

Router Receives URL

↓

Route Matching

↓

Guards Execute

↓

Resolvers Execute

↓

Component Loads

↓

router-outlet Updates
```

(We will deep dive Guards and Resolvers separately.)

---

# Common Interview Questions

## What Is Angular Router?

Framework service responsible for URL management and navigation.

---

## What Is router-outlet?

Placeholder where Angular renders routed components.

---

## What Is routerLink?

Directive used for SPA navigation in templates.

---

## Difference Between routerLink And href?

routerLink:

```text
SPA Navigation
```

href:

```text
Full Browser Refresh
```

---

## Programmatic Navigation?

```typescript
router.navigate(...)
```

---

## What Is A Route Parameter?

Used to identify a specific resource.

Example:

```text
/employees/101
```

---

## What Is A Query Parameter?

Used to modify behavior or filtering.

Example:

```text
?page=2
```

---

## Difference Between Route Params And Query Params?

```text
Route Params
    ↓
Resource Identity

Query Params
    ↓
Display Options
```

---

## What Is A Wildcard Route?

```typescript
path: '**'
```

Handles invalid URLs.

---

## Why Is router-outlet Required?

Because Angular needs a location where routed components can render.

---

# Common Interview Traps

## Trap 1

Using:

```html
href
```

instead of:

```html
routerLink
```

inside Angular applications.

---

## Trap 2

Confusing route parameters with query parameters.

---

## Trap 3

Forgetting:

```html
<router-outlet>
```

Without it, routing cannot render components.

---

## Trap 4

Placing wildcard routes above normal routes.

Incorrect:

```typescript
{
  path:'**'
}
```

should usually be the **st route.

---

# Senior-Level Mental Model

Think of routing as:

```text
URL

↓

Angular Router

↓

Route Configuration

↓

Matched Component

↓

router-outlet
```

Everything else:

```text
Parameters

Dat**
Resolvers

Guards

Lazy Loading
```

builds on top of that foundation.

---

# Key Takeaways

1. Angular Router maps URLs to components.
2. Routing enables SPA navigation without page reloads.
3. Routes define URL-to-component mappings.
4. router-outlet is where routed components render.
5. routerLink is used for template navigation.
6. router.navigate() is used for programmatic navigation.
7. Route parameters identify resources.
8. Query parameters modify behavior or filtering.
9. Nested routes support dashboard-style layouts.
10. Routing is the foundation for Guards, Resolvers, and Lazy Loading.

---

# Interview Notes (Revision Version)

## Template Navigation

```html
routerLink
```

---

## Programmatic Navigation

```typescript
router.navigate()
```

---

## Route Params

```text
/employees/101
```

---

## Query Params

```text
?page=2
```

---

## Router Placeholder

```html
<router-outlet>
```

---

## Invalid Routes

```typescript
path: '**'
```

---

## Redirect Route

```typescript
redirectTo
```

---

## Modern Configuration

```typescript
provideRouter(routes)
```

---

## Key Message

Angular Routing is the mechanism that maps URLs to components, enabling Single Page Application navigation, parameterized URLs, nested layouts, and enterprise-grade navigation patterns without full browser page reloads.

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Standalone Components](20-standalone-components.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Route Parameters & Query Parameters Deep Dive](22-route-parameters-and-query-parameters-deep-dive.md)

<br/>
<!-- navigation-end -->
