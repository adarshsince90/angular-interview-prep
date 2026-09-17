# Component Communication

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

---

# What Is Component Communication?

Component Communication refers to the mechanisms Angular provides for exchanging data and events between components.

In real-world applications, components rarely exist in isolation.

Example:

```text
AppComponent
    │
    ├── EmployeeListComponent
    │
    └── EmployeeCardComponent
```

Eventually components need to communicate.

Questions arise such as:

```text
How does Parent send data to Child?

How does Child notify Parent?

How do Sibling Components communicate?

How do unrelated Components communicate?
```

Angular provides several patterns to solve these scenarios.

---

# First Principles

Consider:

```text
EmployeeListComponent
```

which loads employee data.

```typescript
employees: Employee[];
```

Each employee is displayed using:

```text
EmployeeCardComponent
```

Question:

```text
How does EmployeeCardComponent
receive employee data?
```

This is a component communication problem.

---

# Types of Component Communication

Angular supports several communication patterns.

```text
Parent → Child

Child → Parent

Sibling ↔ Sibling

Unrelated Components
```

---

# Communication Overview

```text
Parent → Child
      @Input()

Child → Parent
      @Output()

Sibling ↔ Sibling
      Service

Application-Wide Communication
      Service / State Management
```

---

# Parent to Child Communication

Most common communication scenario.

Used when:

```text
Parent Owns Data

Child Displays Data
```

Example:

```text
EmployeeListComponent
         │
         ▼
EmployeeCardComponent
```

---

# What Is @Input()?

`@Input()` allows a Parent Component to pass data into a Child Component.

Think:

```text
Parent
   ↓
Data
   ↓
Child
```

---

# Child Component Example

```typescript
import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  template: `
    <h3>{{ employee.name }}</h3>
  `
})
export class EmployeeCardComponent {

  @Input()
  employee!: Employee;

}
```

---

# Parent Component Example

```typescript
@Component({
  selector: 'app-employee-list',
  standalone: true,
  template: `
    <app-employee-card
      [employee]="selectedEmployee">
    </app-employee-card>
  `
})
export class EmployeeListComponent {

  selectedEmployee: Employee = {
    id: 1,
    name: 'Adarsh'
  };

}
```

---

# Flow Diagram

```text
Parent Component

selectedEmployee

      │

      ▼

@Input()

      │

      ▼

Child Component
```

---

# Important Observation

Notice:

```html
[employee]="selectedEmployee"
```

This is Property Binding.

Target:

```typescript
@Input()
employee
```

Angular conceptually performs:

```typescript
child.employee =
    parent.selectedEmployee;
```

---

# Interview Question

## What Is @Input()?

`@Input()` is a decorator that allows a Parent Component to pass data into a Child Component.

---

# Child to Parent Communication

Now imagine a Child Component contains:

```text
Delete Button
```

When the user clicks Delete:

```text
Parent Component
must be notified
```

This requires communication in the opposite direction.

---

# Why @Input() Cannot Help

`@Input()` only supports:

```text
Parent → Child
```

We need:

```text
Child → Parent
```

communication.

---

# What Is @Output()?

`@Output()` allows a Child Component to emit custom events to its Parent Component.

Think:

```text
Child
  ↓
Event
  ↓
Parent
```

---

# Child Component Example

```typescript
import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  template: `
    <button
      (click)="deleteClicked()">
      Delete
    </button>
  `
})
export class EmployeeCardComponent {

  @Output()
  delete =
      new EventEmitter<number>();

  deleteClicked(): void {

    this.delete.emit(1);

  }

}
```

---

# Parent Component Example

```html
<app-employee-card
  (delete)="onDelete($event)">
</app-employee-card>
```

Parent Component:

```typescript
onDelete(employeeId: number): void {

  console.log(employeeId);

}
```

---

# Flow Diagram

```text
Child Component

      │

EventEmitter

      │

      ▼

@Output()

      │

      ▼

Parent Component
```

---

# What Is EventEmitter?

EventEmitter is Angular's mechanism for publishing custom events from Child Components.

Example:

```typescript
@Output()
save = new EventEmitter();
```

---

# What Does emit() Do?

```typescript
this.save.emit();
```

Meaning:

```text
Raise Event

Notify Parent

Send Data
```

---

# Parent-Child Communication Summary

## Parent → Child

```typescript
@Input()
```

Used for passing data.

---

## Child → Parent

```typescript
@Output()
```

plus:

```typescript
EventEmitter
```

Used for raising events.

---

# Real Enterprise Example

Employee Portal

Parent:

```text
EmployeeListComponent
```

Responsibilities:

```text
Load Employees

Call APIs

Manage State
```

---

Child:

```text
EmployeeCardComponent
```

Responsibilities:

```text
Display Employee

Raise Events
```

---

Communication Flow

```text
Employee
   ↓
@Input()

Delete Click
   ↓
@Output()
```

---

# Two-Way Communication

Angular achieves two-way communication by combining:

```typescript
@Input()
```

and

```typescript
@Output()
```

---

Example:

```text
Parent
   ⇄
Child
```

Parent provides state.

Child raises events.

---

# Sibling Component Communication

Example:

```text
HeaderComponent

EmployeeListComponent

FooterComponent
```

These components are siblings.

Question:

```text
How can HeaderComponent
communicate with EmployeeListComponent?
```

---

# Bad Approach

Trying to directly access sibling components.

Problems:

```text
Tight Coupling

Hard Maintenance

Poor Testability
```

---

# Recommended Approach

Use a shared Service.

---

# Service-Based Communication

```text
HeaderComponent

       │

       ▼

SearchService

       ▲

       │

EmployeeListComponent
```

Both components communicate through the same Service.

---

# Example

```typescript
@Injectable({
  providedIn: 'root'
})
export class SearchService {

}
```

We will later enhance this using:

```text
BehaviorSubject

Signals

State Management
```

---

# Unrelated Components

For components without any parent-child relationship:

```text
Navbar

Sidebar

Dashboard

Profile
```

Use:

```text
Shared Services

BehaviorSubject

Signals

State Management Solutions
```

instead of direct references.

---

# Parent Access To Child

Sometimes a Parent needs direct access to a Child Component.

Angular provides:

```typescript
@ViewChild()
```

---

# Example

```typescript
@ViewChild(EmployeeCardComponent)
employeeCard!: EmployeeCardComponent;
```

---

# Usage

```typescript
this.employeeCard.refresh();
```

Angular gives us direct access to the Child Component instance.

---

# Should ViewChild Be Used Frequently?

Generally:

```text
No
```

Prefer:

```text
@Input()

@Output()
```

because they maintain loose coupling.

Use `@ViewChild()` only when necessary.

---

# Common ViewChild Use Cases

Examples:

```text
Working with third-party components

Accessing child methods

Manipulating DOM elements

Managing focus
```

---

# Content Projection (Preview)

Angular also supports Content Projection.

Example:

```html
<app-card>

  <h2>Employee Details</h2>

</app-card>
```

Child Component:

```html
<div class="card">

  <ng-content></ng-content>

</div>
```

This allows content to flow from Parent into Child templates.

We'll cover this topic separately later.

---

# Modern Angular (16+/17+/18+)

Angular still relies heavily on:

```typescript
@Input()

@Output()
```

for component communication.

New Signal-based APIs are emerging, but these remain foundational concepts and are heavily used across enterprise applications.

---

# Common Interview Questions

## What Is Component Communication?

The process through which Angular components exchange data and events.

---

## How Does Parent Send Data To Child?

Using:

```typescript
@Input()
```

---

## How Does Child Send Data To Parent?

Using:

```typescript
@Output()
```

and

```typescript
EventEmitter
```

---

## What Is EventEmitter?

An Angular class used to emit custom events from Child Components.

---

## What Does emit() Do?

Raises an event and notifies subscribers.

---

## How Do Sibling Components Communicate?

Typically using a shared Service.

---

## What Is ViewChild?

A mechanism for obtaining a reference to a Child Component or DOM element.

---

## Why Avoid Excessive ViewChild Usage?

Because it creates tight coupling between components.

---

## Can @Input() Support Two-Way Communication?

No.

It only supports:

```text
Parent → Child
```

communication.

---

# Common Interview Traps

## Trap 1

Thinking:

```typescript
@Input()
```

supports two-way communication.

Incorrect.

It supports:

```text
Parent → Child
```

only.

---

## Trap 2

Using EventEmitter inside Services.

EventEmitter is primarily intended for Component communication.

---

## Trap 3

Using ViewChild for every communication scenario.

Prefer:

```text
@Input()

@Output()
```

first.

---

## Trap 4

Making sibling components communicate directly.

Use:

```text
Shared Services
```

instead.

---

# Senior-Level Discussion

Component communication is fundamentally about maintaining clean architectural boundaries.

Parent components generally own:

```text
State

Data

Business Coordination
```

Child components generally own:

```text
Presentation

Rendering

User Interaction
```

Recommended architecture:

```text
Parent
   ↓
@Input()

Child
   ↓
@Output()

Parent
```

For broader communication:

```text
Service

BehaviorSubject

Signals

State Management
```

should be preferred.

This approach improves:

- Maintainability
- Reusability
- Testability
- Scalability

---

# Architecture Considerations

Use:

```typescript
@Input()
```

when:

```text
Parent Owns Data
```

---

Use:

```typescript
@Output()
```

when:

```text
Child Raises Events
```

---

Use:

```text
Service-Based Communication
```

when:

```text
Sibling Components Need Communication

Cross-Feature Communication Exists
```

---

Avoid:

```text
Direct Component References
```

unless absolutely necessary.

---

# Component Communication Decision Matrix

```text
Parent → Child
      ↓
    @Input()

Child → Parent
      ↓
 @Output()
 + EventEmitter

Sibling → Sibling
      ↓
   Service

Application-Wide
      ↓
Service / State Management

Direct Child Access
      ↓
   @ViewChild()
```

---

# Key Takeaways

1. Components frequently need to exchange data and events.
2. Parent-to-Child communication uses `@Input()`.
3. Child-to-Parent communication uses `@Output()`.
4. EventEmitter powers custom events.
5. Sibling components should communicate via shared Services.
6. `@ViewChild()` provides direct access to Child Components.
7. Prefer Inputs and Outputs over direct component manipulation.
8. Clean communication patterns improve long-term maintainability and scalability.

---

# Interview Notes (Revision Version)

## Parent → Child

```typescript
@Input()
```

---

## Child → Parent

```typescript
@Output()

EventEmitter
```

---

## Raise Event

```typescript
this.save.emit();
```

---

## Sibling Communication

```text
Shared Service
```

---

## Direct Child Reference

```typescript
@ViewChild()
```

---

## Recommended Flow

```text
Parent
  ↓
@Input()

Child
  ↓
@Output()

Parent
```

---

## Key Message

Angular component communication is primarily built around `@Input()` and `@Output()`, enabling clean, maintainable, and loosely coupled interaction between components.