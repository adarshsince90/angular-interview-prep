# Angular Components

## Interview Priority

**Must Know**

## Interview Frequency

**Extremely Common**

## Recommended Depth

**Expert Level Understanding**

## Relevant For

- Mid-Level Interviews
- Senior Developer Interviews
- Lead Developer Interviews
- Architect Discussions

---

# What Is An Angular Component?

A Component is a reusable, self-contained UI building block that controls a portion of the screen.

Angular applications are built by combining multiple Components together.

Think of a Component as:

```text
Mini Application
Inside a Larger Application
```

Examples:

```text
Header
Sidebar
Dashboard
Employee List
Employee Details
Footer
```

Each of these can be implemented as a separate Component.

---

# Why Do Components Exist?

As web applications grow, maintaining one large HTML, CSS, and JavaScript file becomes difficult.

Problems include:

- Code duplication
- Difficult maintenance
- Tight coupling
- Poor scalability
- Difficult testing
- Team collaboration issues

Angular solves these problems through Component-Based Architecture.

---

# First Principles

Consider an Employee Management Portal.

Instead of:

```text
Single Giant Page
```

Angular promotes:

```text
Employee Portal

├── HeaderComponent
├── SidebarComponent
├── EmployeeListComponent
├── EmployeeDetailsComponent
└── FooterComponent
```

Complexity is distributed across smaller reusable units.

---

# Component-Based Architecture

Angular applications are built as a hierarchy of Components.

Example:

```text
AppComponent
│
├── HeaderComponent
│
├── DashboardComponent
│   │
│   ├── EmployeeListComponent
│   │
│   └── EmployeeCardComponent
│
└── FooterComponent
```

This hierarchy is called the **Component Tree**.

---

# Angular Component Anatomy

A typical Angular Component consists of:

```text
Component Class
Template
Styles
Metadata
```

Example:

```typescript
@Component({
  selector: 'app-employee',
  standalone: true,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

}
```

---

# Anatomy Breakdown

## Component Class

A Component is fundamentally a TypeScript class.

Example:

```typescript
export class EmployeeComponent {

  employees = [];

  loadEmployees() {
  }

  saveEmployee() {
  }
}
```

The class contains:

- State
- Methods
- UI Logic
- Event Handlers

---

## Component Metadata

Metadata is defined through the `@Component()` decorator.

Example:

```typescript
@Component({...})
```

Purpose:

```text
Tell Angular that this class is a Component
```

Without the decorator:

```typescript
export class EmployeeComponent {}
```

Angular sees only a normal TypeScript class.

---

## Selector

Example:

```typescript
selector: 'app-employee'
```

Usage:

```html
<app-employee></app-employee>
```

When Angular encounters:

```html
<app-employee>
```

it renders:

```text
EmployeeComponent
```

---

## Template

Defines the UI.

Example:

```html
<h2>Employees</h2>
<button>Add Employee</button>
```

Responsibilities:

- Display data
- Capture events
- Render UI
- Host child components

---

## Styles

Defines Component-specific styling.

Example:

```css
.employee-grid {
    display: grid;
}
```

Benefits:

- Encapsulation
- Maintainability
- Better organization

---

# Component Lifecycle

Components do not exist forever.

They move through stages.

```text
Created
↓
Initialized
↓
Updated
↓
Destroyed
```

Angular provides Lifecycle Hooks to participate in these stages.

Examples:

```typescript
ngOnInit()
```

```typescript
ngOnDestroy()
```

Lifecycle Hooks will be covered in detail later.

---

# Component State

Every Component maintains state.

Example:

```typescript
employees = [];
```

```typescript
isLoading = false;
```

```typescript
selectedEmployee = null;
```

State drives the UI.

---

## State Driven UI

Example:

```typescript
isLoading = true;
```

UI:

```html
Loading...
```

---

```typescript
isLoading = false;
```

UI:

```html
Employee List
```

A major responsibility of Angular is keeping UI synchronized with Component state.

---

# Modern Angular (16+)

Modern Angular promotes:

```typescript
standalone: true
```

Example:

```typescript
@Component({
  standalone: true
})
```

This is now the preferred approach.

---

# What Are Standalone Components?

Standalone Components can be used without being declared inside an NgModule.

Example:

```typescript
@Component({
  standalone: true
})
export class EmployeeComponent {}
```

Benefits:

- Simpler architecture
- Less boilerplate
- Better developer experience
- Easier lazy loading

---

# Legacy Angular Approach

Prior to Angular 14/15/16, Components were typically declared inside NgModules.

Example:

```typescript
@NgModule({
  declarations: [
    EmployeeComponent
  ]
})
export class EmployeeModule {}
```

---

# Modern vs Legacy

## Modern Angular

```typescript
@Component({
  standalone: true
})
```

Recommended approach.

---

## Legacy Angular

```typescript
@NgModule({
  declarations: []
})
```

Older approach.

Still commonly found in enterprise applications.

---

# Why Angular Introduced Standalone Components

Problems with NgModules:

```text
Additional Boilerplate
Additional Complexity
Learning Curve
Configuration Overhead
```

Angular simplified this by making Components more self-sufficient.

---

# What Should Components Do?

Good Components should focus on:

- Displaying data
- Handling user interactions
- Managing UI state
- Coordinating services

Example:

```text
Employee List Screen

Load Employees
Handle Search
Handle User Actions
Display UI
```

---

# What Should Components NOT Do?

Avoid putting:

- Complex Business Logic
- Caching Logic
- Authentication Logic
- Reporting Logic
- Heavy Calculations
- Data Access Logic

inside Components.

Those responsibilities usually belong to Services.

---

# Smart vs Dumb Components

Common enterprise design pattern.

---

## Smart Components

Responsibilities:

- Fetch data
- Manage state
- Call services
- Coordinate workflow

Example:

```text
EmployeeListComponent
```

---

## Dumb Components

Responsibilities:

- Display data
- Raise events
- Remain reusable

Example:

```text
EmployeeCardComponent
```

Input:

```text
Employee Data
```

Output:

```text
Edit Clicked
Delete Clicked
Selected
```

No business logic.

---

# Enterprise Example

Employee Management Portal

```text
EmployeeListComponent
```

Responsibilities:

```text
Load Employees
Manage Filters
Call EmployeeService
```

---

```text
EmployeeCardComponent
```

Responsibilities:

```text
Display Employee Information
Raise User Actions
```

Reusable throughout the application.

---

# Parent and Child Components

Components often contain other Components.

Example:

```text
EmployeeListComponent
│
├── EmployeeCardComponent
├── EmployeeCardComponent
├── EmployeeCardComponent
```

Relationship:

```text
Parent Component
↓
Child Component
```

This introduces the need for Component Communication.

---

# Component Communication

A common challenge:

```text
How do Parent and Child Components exchange data?
```

Angular solves this through:

```typescript
@Input()
```

and

```typescript
@Output()
```

These topics will be covered later.

---

# How Components Fit Into Angular Architecture

High-Level Flow:

```text
User
↓
Template
↓
Component
↓
Service
↓
API
↓
Database
```

Component sits at the center of the UI layer.

---

# Relationship With Other Angular Concepts

Most Angular features support Components.

```text
Templates
→ Render Components

Data Binding
→ Connect UI and State

Directives
→ Enhance Templates

Services
→ Provide Logic

Dependency Injection
→ Provide Services

Lifecycle Hooks
→ Manage Component Creation and Destruction

Signals
→ Manage Component State

Routing
→ Display Components
```

---

# Common Interview Questions

## What is a Component?

A reusable UI building block that encapsulates template, logic, and styling.

---

## Why do Components exist?

To improve:

- Reusability
- Maintainability
- Testability
- Scalability

---

## What does @Component do?

It provides metadata that allows Angular to identify and configure a Component.

---

## What is a Selector?

A custom HTML element used to render a Component.

---

## What is a Standalone Component?

A Component that does not require declaration inside an NgModule.

---

## Why did Angular introduce Standalone Components?

To reduce boilerplate and simplify application structure.

---

## What should belong in a Component?

- UI Logic
- State Management
- User Interactions

---

## What should not belong in a Component?

- Complex Business Logic
- Data Access Logic
- Cross-Cutting Concerns

---

# Senior-Level Discussion

Components are not merely UI elements.

They represent architectural boundaries in a frontend application.

A well-designed Component should:

- Have a single responsibility
- Be reusable
- Be easy to test
- Minimize coupling
- Maximize cohesion

Standalone Components further simplify architecture by reducing framework complexity while preserving these engineering principles.

---

# Architecture Considerations

When designing Components:

Ask:

1. Is this reusable?
2. Does it have a single responsibility?
3. Should this logic live in a Service?
4. Is this becoming too large?
5. Can it be independently tested?

Good Components are:

- Focused
- Predictable
- Testable
- Reusable

---

# Diagram

```text
AppComponent
│
├── HeaderComponent
│
├── DashboardComponent
│   │
│   ├── EmployeeListComponent
│   │   │
│   │   ├── EmployeeCardComponent
│   │   ├── EmployeeCardComponent
│   │   └── EmployeeCardComponent
│   │
│   └── EmployeeSummaryComponent
│
└── FooterComponent
```

---

# Key Takeaways

1. Components are the fundamental building blocks of Angular.
2. Angular applications are organized as Component Trees.
3. Components encapsulate template, logic, and styling.
4. State inside Components drives the UI.
5. Modern Angular promotes Standalone Components.
6. Components should focus on presentation and coordination.
7. Business logic should usually move into Services.
8. Most Angular features exist to support Components.

---

# Interview Notes (Revision Version)

## Definition

A Component is a reusable UI building block that encapsulates:

- Template
- Logic
- Styling

---

## Responsibilities

- Display Data
- Manage UI State
- Handle User Interactions
- Coordinate Services

---

## Key Concepts

- Component Tree
- Selector
- Template
- Metadata
- Standalone Components

---

## Modern Angular

Preferred:

```typescript
@Component({
  standalone: true
})
```

---

## Legacy Angular

```typescript
@NgModule({
  declarations: [...]
})
```

---

## Common Interview Questions

- What is a Component?
- What does @Component do?
- What is a Selector?
- What is a Standalone Component?
- Why did Angular move away from NgModules?

---

## Senior Talking Point

Components are architectural boundaries that improve modularity, reusability, maintainability, and testability in large Angular applications.

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [TypeScript Essentials for Angular](../01-foundations/05-typescript-essentials-for-angular.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Templates and Data Binding](07-templates-and-data-binding.md)

<br/>
<!-- navigation-end -->
