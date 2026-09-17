# Route Guards

## Interview Priority

**Must Know**

## Interview Frequency

**Very High**

## Recommended Depth

**Expert Level Understanding**

## Relevant For

- Authentication
- Authorization
- Enterprise Applications
- Security
- Admin Portals
- Dashboard Applications
- Senior Angular Interviews

---

# First Principles

Before understanding Route Guards, let's understand the problem they solve.

---

# The Problem

Suppose an application contains:

```text
/login

/dashboard

/admin

/reports

/settings
```

Only authenticated users should access:

```text
/ dashboard
```

---

Menu is hidden:

```html
@if(isLoggedIn) {

  <a routerLink="/dashboard">
    Dashboard
  </a>

}
```

Looks secure?

No.

---

User can still open browser and manually enter:

```text
https://company.com/dashboard
```

Without protection:

```text
Dashboard Loads
```

---

# Why UI Protection Is Not Enough

Hiding menu items:

```html
@if(role === 'Admin')
```

only affects the UI.

It does not stop navigation.

Users can:

```text
Bookmark URLs

Type URLs

Refresh Pages

Deep Link Into Screens
```

---

# Solution

Use:

```typescript
Route Guards
```

---

# What Is A Route Guard?

A Route Guard is:

> A mechanism that decides whether Angular should continue with navigation.

---

# Mental Model

```text
User Navigates

      ↓

Route Match

      ↓

Guard Executes

      ↓

Allowed?

      ↓

Yes

      ↓

Component Loads
```

---

Or:

```text
User Navigates

      ↓

Guard Executes

      ↓

Denied

      ↓

Redirect
```

---

# Router Navigation Lifecycle

Understanding the lifecycle helps understand where guards fit.

```text
User Clicks Link

      ↓

Router Receives URL

      ↓

Route Matching

      ↓

Route Guards Execute

      ↓

Route Resolvers Execute

      ↓

Component Created

      ↓

router-outlet Updated
```

---

# Why Guards Are Used

Most common enterprise requirements:

```text
Authentication

Authorization

Role-Based Access

Feature Flags

Tenant Isolation

Subscription Plans

Prevent Unsaved Data Loss
```

---

# Types Of Guards

Angular provides:

```typescript
CanActivate

CanActivateChild

CanDeactivate

CanMatch
```

These are the most important ones.

---

# Quick Summary

## CanActivate

```text
Can User Enter Route?
```

---

## CanActivateChild

```text
Can User Enter Child Routes?
```

---

## CanDeactivate

```text
Can User Leave Current Route?
```

---

## CanMatch

```text
Should Route Match At All?
```

---

# Functional Guards

Modern Angular prefers:

```typescript
Functional Guards
```

instead of:

```typescript
Class-Based Guards
```

---

# Old Style

```typescript
@Injectable()
export class AuthGuard
implements CanActivate {

}
```

---

# Modern Style

```typescript
export const authGuard:
CanActivateFn = () => {

  return true;

};
```

---

# Why Functional Guards?

Benefits:

```text
Less Boilerplate

Simpler Code

Better Tree Shaking

Modern Angular Standard
```

---

# Dependency Injection In Functional Guards

Use:

```typescript
inject()
```

Example:

```typescript
export const authGuard:
CanActivateFn = () => {

   const authService =
      inject(AuthService);

   return authService
       .isLoggedIn();

};
```

---

# Guard Return Types

Interview favorite.

A guard can return:

```typescript
boolean
```

---

Allow:

```typescript
return true;
```

---

Block:

```typescript
return false;
```

---

Observable:

```typescript
Observable<boolean>
```

---

Promise:

```typescript
Promise<boolean>
```

---

Redirect:

```typescript
UrlTree
```

---

# Visual

```text
true

     ↓

Allow Navigation
```

---

```text
false

     ↓

Block Navigation
```

---

```text
UrlTree

     ↓

Redirect User
```

---

# CanActivate

Most commonly used guard.

---

# Purpose

Question:

```text
Can This Route Be Activated?
```

---

# Example

```typescript
{
  path: 'dashboard',

  component:
     DashboardComponent,

  canActivate: [
      authGuard
  ]
}
```

---

# Mental Model

```text
Navigate

↓

CanActivate

↓

Allowed?

↓

Load Component
```

---

# Authentication Example

Auth Service:

```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn(): boolean {

    return !!localStorage
       .getItem('token');

  }

}
```

---

Guard:

```typescript
export const authGuard:
CanActivateFn = () => {

    const authService =
        inject(AuthService);

    return authService
        .isLoggedIn();

};
```

---

# Flow

```text
Dashboard Requested

↓

Guard Runs

↓

Token Exists?

↓

Yes

↓

Dashboard Loads
```

---

# Redirect To Login

Very common.

---

Guard

```typescript
export const authGuard:
CanActivateFn = () => {

   const authService =
       inject(AuthService);

   const router =
       inject(Router);

   if(authService.isLoggedIn()) {

      return true;

   }

   return router.createUrlTree(
      ['/login']
   );

};
```

---

# Why UrlTree?

Angular recommends:

```typescript
return UrlTree;
```

instead of:

```typescript
router.navigate(...)
```

inside guards.

---

Benefits:

```text
Cleaner

Declarative

Integrated With Navigation Pipeline
```

---

# JWT Example

Very common enterprise scenario.

---

Authentication flow:

```text
User Logs In

↓

JWT Returned

↓

Store Token

↓

Guard Validates Token

↓

Allow Route
```

---

Auth Service

```typescript
isLoggedIn(): boolean {

   const token =
      localStorage.getItem(
         'jwt'
      );

   return !!token;

}
```

---

Guard

```typescript
canActivate()
```

validates token existence.

---

# Authorization

Senior interview favorite.

---

# Difference

Authentication:

```text
Who Are You?
```

---

Authorization:

```text
What Are You Allowed To Access?
```

---

# Role-Based Authorization

Example roles:

```text
Admin

Manager

Employee
```

---

# Admin Guard

```typescript
export const adminGuard:
CanActivateFn = () => {

   const authService =
     inject(AuthService);

   return authService
      .role === 'Admin';

};
```

---

# Route

```typescript
{
  path:'admin',

  component:
      AdminComponent,

  canActivate:[
      adminGuard
  ]
}
```

---

# Real Enterprise Example

Employee:

```text
Dashboard ✅

Reports ✅

Admin ❌
```

---

Admin:

```text
Dashboard ✅

Reports ✅

Admin ✅
```

---

# Multiple Guards

Possible.

---

Route

```typescript
{
  path:'reports',

  canActivate:[

    authGuard,

    roleGuard

  ]
}
```

---

Execution

```text
authGuard

↓

roleGuard

↓

Load Component
```

---

# CanActivateChild

Purpose:

```text
Protect All Child Routes
```

---

# Problem

Routes:

```text
/admin

/admin/users

/admin/roles

/admin/settings

/admin/reports
```

---

Protecting each individually:

```typescript
canActivate
```

becomes repetitive.

---

# Solution

```typescript
{
  path:'admin',

  canActivateChild:[
      adminGuard
  ],

  children:[]
}
```

---

# Example

```typescript
{
  path:'admin',

  component:
      AdminShellComponent,

  canActivateChild:[
      adminGuard
  ],

  children:[

      {
        path:'users',
        component:
          UsersComponent
      },

      {
        path:'roles',
        component:
          RolesComponent
      }

  ]
}
```

---

# Mental Model

```text
Parent Protected

↓

Every Child Protected
```

---

# CanDeactivate

One of the most useful enterprise guards.

---

# Problem

User opens:

```text
Employee Edit Form
```

---

Modifies data.

---

Clicks:

```text
Back

Menu

Different Page
```

---

Unsaved changes:

```text
Lost
```

---

# Purpose

Question:

```text
Can User Leave Current Component?
```

---

# Common Use Cases

```text
Employee Forms

Settings

Configurations

CMS Editors

Profile Screens
```

---

# Component Contract

```typescript
export interface CanComponentDeactivate {

   canDeactivate(): boolean;

}
```

---

# Component

```typescript
export class EmployeeEditComponent
implements CanComponentDeactivate {

  hasUnsavedChanges = true;

  canDeactivate() {

     return !this
       .hasUnsavedChanges;

  }

}
```

---

# Guard

```typescript
export const unsavedChangesGuard:
CanDeactivateFn<
EmployeeEditComponent
> = (component) => {

    return component
       .canDeactivate();

};
```

---

# Real Version

```typescript
export const unsavedChangesGuard:
CanDeactivateFn<
EmployeeEditComponent
> = () => {

   return confirm(
      'Unsaved changes. Leave page?'
   );

};
```

---

# Navigation Flow

```text
User Navigates Away

↓

CanDeactivate

↓

Unsaved Changes?

↓

Show Prompt

↓

User Decides
```

---

# CanMatch

Newest and commonly asked in modern Angular interviews.

---

# Purpose

Question:

```text
Should This Route Match?
```

---

# Difference

CanActivate:

```text
Route Already Matched
```

---

CanMatch:

```text
Route Matching Itself
Can Be Prevented
```

---

# Typical Uses

```text
Feature Flags

A/B Testing

Conditional Routing

Conditional Lazy Loading
```

---

# Feature Flag Example

Beta users:

```text
/dashboard
```

↓

New Dashboard

---

Normal users:

```text
/dashboard
```

↓

Old Dashboard

---

Guard

```typescript
export const betaGuard:
CanMatchFn = () => {

   return true;

};
```

---

# Enterprise Use Cases

```text
Premium Features

Subscription Plans

Tenant Routing

Feature Rollouts

Beta Features
```

---

# Async Guards

Very common.

---

# Why?

Permission often comes from:

```text
Backend

Identity Provider

JWT Validation

API Call
```

---

Example:

```typescript
export const authGuard:
CanActivateFn = () => {

  const authService =
      inject(AuthService);

  return authService
      .validateToken();

};
```

---

Where:

```typescript
validateToken():
Observable<boolean>
```

---

Angular waits for the result.

---

# Guard Execution Order

Interview question.

---

Route:

```typescript
canActivate:[
   authGuard,
   roleGuard
]
```

---

Execution:

```text
authGuard

↓

roleGuard

↓

Route Activation
```

---

If one fails:

```text
Pipeline Stops
```

---

# Guards Do NOT Replace Security

Extremely important.

---

Incorrect understanding:

```text
Route Guards Secure Application
```

---

Reality:

```text
Route Guards

↓

Frontend Protection

↓

User Experience
```

---

Backend must still validate:

```text
JWT

Roles

Permissions

Authorization
```

---

# Common Interview Questions

## What Is A Route Guard?

Mechanism controlling whether Angular navigation can continue.

---

## Most Common Guard?

```typescript
CanActivate
```

---

## CanActivate vs CanActivateChild?

CanActivate:

```text
Single Route
```

---

CanActivateChild:

```text
All Child Routes
```

---

## CanDeactivate?

Protects against losing unsaved changes.

---

## CanMatch?

Controls route matching before route activation.

---

## Return Types?

```typescript
boolean

Observable<boolean>

Promise<boolean>

UrlTree
```

---

## Functional Guards Or Class-Based Guards?

Modern Angular prefers:

```typescript
Functional Guards
```

---

## Do Guards Provide Security?

No.

Server-side validation remains mandatory.

---

# Common Interview Traps

## Trap 1

Using route guards as security boundaries.

Incorrect.

Backend security remains essential.

---

## Trap 2

Using CanActivate for unsaved forms.

Use:

```typescript
CanDeactivate
```

---

## Trap 3

Confusing Authentication and Authorization.

Authentication:

```text
Who Are You?
```

Authorization:

```text
What Can You Access?
```

---

## Trap 4

Using CanActivate on all child routes individually.

Prefer:

```typescript
CanActivateChild
```

---

# Decision Framework

Need Login Validation?

↓

```typescript
CanActivate
```

---

Need Role Access?

↓

```typescript
CanActivate
```

---

Need Child Route Protection?

↓

```typescript
CanActivateChild
```

---

Need Unsaved Form Protection?

↓

```typescript
CanDeactivate
```

---

Need Feature Flags?

↓

```typescript
CanMatch
```

---

# Senior-Level Mental Model

```text
CanActivate
     ↓
Can Enter?

CanActivateChild
     ↓
Can Enter Children?

CanDeactivate
     ↓
Can Leave?

CanMatch
     ↓
Can Route Match?
```

---

# Key Takeaways

1. Route Guards control Angular navigation decisions.
2. `CanActivate` is primarily used for authentication and authorization.
3. `CanActivateChild` protects all child routes.
4. `CanDeactivate` prevents accidental data loss.
5. `CanMatch` controls route matching before activation.
6. Modern Angular prefers functional guards.
7. Guards can return booleans, Observables, Promises, or UrlTrees.
8. Multiple guards execute in sequence.
9. Guards improve navigation control and UX.
10. Guards never replace backend security.

---

# Interview Notes (Revision Version)

## Authentication

```typescript
CanActivate
```

---

## Authorization

```typescript
CanActivate
CanActivateChild
```

---

## Unsaved Changes

```typescript
CanDeactivate
```

---

## Feature Flags

```typescript
CanMatch
```

---

## Redirect

```typescript
UrlTree
```

---

## Modern Guards

```typescript
CanActivateFn
CanDeactivateFn
CanMatchFn
```

---

## Key Message

Route Guards act as Angular's navigation control layer, enabling authentication, authorization, feature management, and unsaved-change protection while ensuring users navigate only to routes they are allowed to access.