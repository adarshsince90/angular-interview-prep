# Nested Routes

## Interview Priority

**High**

## Interview Frequency

**Common**

## Recommended Depth

**Senior Level Understanding**

## Relevant For

- Enterprise Applications
- Dashboard Applications
- Admin Portals
- SaaS Applications
- Multi-Level Navigation
- Senior Angular Interviews

---

# First Principles

Before understanding Nested Routes, let's understand the problem they solve.

---

# The Problem

Suppose we build a dashboard application.

Routes:

```text
/dashboard

/dashboard/users

/dashboard/reports

/dashboard/settings

/dashboard/audit
```

Question:

Should Angular completely reload the dashboard page every time a user clicks:

```text
Users

Reports

Settings
```

?

Ideally:

```text
Dashboard Header
Dashboard Sidebar
Dashboard Navigation
```

should remain visible.

Only:

```text
Page Content
```

should change.

---

# Desired UI

```text
+----------------------------------+
| Dashboard Header                 |
+----------------------------------+
| Sidebar | Content Area           |
|         |                        |
|         | Users                  |
|         | Reports                |
|         | Settings               |
+----------------------------------+
```

When user clicks:

```text
Reports
```

Only the content area changes.

---

# Solution

Use:

```typescript
Nested Routes
```

---

# What Are Nested Routes?

Nested Routes are routes defined inside another route using:

```typescript
children
```

property.

---

# Mental Model

```text
Parent Route
      ↓
Layout/Shell

Child Routes
      ↓
Content Area
```

---

# Parent Route

Example:

```typescript
{
  path: 'dashboard',
  component: DashboardComponent
}
```

The parent component often acts as a:

```text
Layout

Shell

Container
```

for child routes.

---

# Dashboard As A Shell

Imagine:

```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  children: []
}
```

DashboardComponent becomes:

```text
Parent Layout
```

that remains visible while child routes change.

---

# Dashboard Template

```html
<h1>Dashboard</h1>

<nav>

  <a routerLink="users">
      Users
  </a>

  <a routerLink="reports">
      Reports
  </a>

  <a routerLink="settings">
      Settings
  </a>

</nav>

<router-outlet>
</router-outlet>
```

---

# Important Concept

Notice:

```html
<router-outlet>
```

inside DashboardComponent.

This is crucial.

---

# Why Another router-outlet?

We already have:

```html
AppComponent

<router-outlet>
```

Why another one?

---

Angular needs a place to render child routes.

---

# Rendering Hierarchy

```text
App Component

    ↓

router-outlet

    ↓

Dashboard Component

    ↓

router-outlet

    ↓

Users Component
```

---

# Route Configuration

```typescript
{
  path: 'dashboard',

  component: DashboardComponent,

  children: [

      {
        path: 'users',
        component: UsersComponent
      },

      {
        path: 'reports',
        component: ReportsComponent
      },

      {
        path: 'settings',
        component: SettingsComponent
      }

  ]
}
```

---

# URL To Component Mapping

```text
/dashboard/users

↓

DashboardComponent

↓

UsersComponent
```

---

```text
/dashboard/reports

↓

DashboardComponent

↓

ReportsComponent
```

---

```text
/dashboard/settings

↓

DashboardComponent

↓

SettingsComponent
```

---

# Navigation Flow

User visits:

```text
/dashboard/users
```

Angular performs:

```text
dashboard
      ↓
DashboardComponent
      ↓
users
      ↓
UsersComponent
```

---

# Visual Rendering

```text
AppComponent
     ↓
router-outlet
     ↓
DashboardComponent
     ↓
router-outlet
     ↓
UsersComponent
```

---

# Why Not Separate Routes?

Without nested routes:

```typescript
{
  path:'users',
  component: UsersComponent
}

{
  path:'reports',
  component: ReportsComponent
}
```

Problem:

```text
Dashboard Layout Lost

Sidebar Lost

Header Lost

Repeated UI
```

---

# Nested Routes Preserve Layout

```text
Dashboard Layout

↓

Always Visible

↓

Only Child Content Changes
```

---

# Enterprise Example

Admin Portal

```text
/admin

/admin/users

/admin/roles

/admin/permissions

/admin/audit
```

---

Configuration

```typescript
{
  path:'admin',

  component:
      AdminComponent,

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
      },

      {
        path:'permissions',
        component:
          PermissionsComponent
      }

  ]
}
```

---

# Child Navigation

Inside parent component:

```html
<a routerLink="users">
  Users
</a>

<a routerLink="roles">
  Roles
</a>
```

---

Notice:

```html
users
```

not:

```html
/admin/users
```

These are relative routes.

---

# Relative Navigation

Common in child routes.

---

Current URL:

```text
/dashboard
```

---

Navigation:

```html
<a routerLink="users">
```

Result:

```text
/dashboard/users
```

---

# Absolute Navigation

```html
<a routerLink="/dashboard/users">
```

Starts from application root.

---

# Relative vs Absolute

## Relative

```html
routerLink="users"
```

Current Route:

```text
/dashboard
```

Result:

```text
/dashboard/users
```

---

## Absolute

```html
routerLink="/dashboard/users"
```

Always starts from root

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Route Guards](23-route-guards.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Route Resolvers](25-route-resolvers.md)

<br/>
<!-- navigation-end -->
