# Component-Based Architecture

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

# What Is Component-Based Architecture?

Component-Based Architecture is a software design approach where the user interface is broken into smaller, reusable, independent building blocks called Components.

Instead of building the entire UI as one large page, the application is divided into logical pieces.

Example:

```text
Amazon

Header
Search Bar
Navigation Menu
Product List
Shopping Cart
Footer
```

Each section can become a separate component.

---

# Why Does It Exist?

As web applications became larger, maintaining a single HTML, CSS, and JavaScript codebase became difficult.

Problems included:

- Code duplication
- Difficult maintenance
- Tight coupling
- Poor reusability
- Complex testing
- Team collaboration issues

Component-Based Architecture solves these problems by introducing modularity.

---

# Historical Context

## Early Web Applications

Traditional applications often contained:

```text
index.html
app.js
style.css
```

All functionality existed in a few large files.

For small websites this worked.

For enterprise applications it became difficult to manage.

---

## jQuery Era

jQuery improved DOM manipulation.

Example:

```javascript
$("#saveButton").click(...)
```

However, applications still lacked structure.

As applications grew:

- JavaScript became difficult to maintain
- UI logic scattered throughout the application
- Reuse became difficult

---

## Modern Frontend Frameworks

Frameworks like:

- Angular
- React
- Vue

introduced Component-Based Architecture.

Developers now think in reusable UI building blocks rather than pages.

---

# Problem It Solves

Consider an Employee Directory application.

Without Components:

```text
Employee Card HTML copied multiple times

Dashboard
Employee List
Organization Chart
Reports
```

Problems:

- Duplicate code
- Difficult updates
- Inconsistent UI

With Components:

```text
EmployeeCardComponent
```

Implemented once and reused everywhere.

---

# First Principles Explanation

Backend developers do not place all logic inside:

```csharp
Program.cs
```

Instead they create:

```text
Controllers
Services
Repositories
Entities
```

Why?

To manage complexity.

Angular applies the same principle to the UI.

Instead of one giant page:

```text
Application
```

becomes:

```text
Header
Sidebar
Dashboard
Footer
```

and each becomes a Component.

---

# Real World Analogy

Think about a car manufacturing assembly line.

A car is built from independent parts:

```text
Engine
Wheels
Seats
Dashboard
Doors
```

Each part has its own responsibility.

The completed car is assembled from these parts.

Angular applications work similarly.

An application is assembled from Components.

---

# Angular's Component Model

In Angular, every application is built around Components.

A Component typically contains:

## Template

Defines UI.

```html
<h2>Employee Details</h2>
```

---

## Logic

Defines behavior.

```typescript
loadEmployees()
```

---

## Styles

Defines appearance.

```css
.employee-card {
}
```

---

# Component Tree

Angular applications are organized in a hierarchy.

Example:

```text
AppComponent
│
├── HeaderComponent
│
├── MainLayoutComponent
│   │
│   ├── SidebarComponent
│   │
│   ├── DashboardComponent
│   │   │
│   │   ├── WidgetComponent
│   │   ├── ChartComponent
│   │   └── SummaryComponent
│
└── FooterComponent
```

This structure is called the Component Tree.

---

# Parent and Child Components

Components often contain other components.

Example:

```text
DashboardComponent
│
├── EmployeeCardComponent
├── EmployeeCardComponent
├── EmployeeCardComponent
```

Dashboard becomes the Parent.

EmployeeCard

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Single Page Application (SPA)](02-spa-concepts.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Angular Architecture Overview](04-angular-architecture-overview.md)

<br/>
<!-- navigation-end -->
