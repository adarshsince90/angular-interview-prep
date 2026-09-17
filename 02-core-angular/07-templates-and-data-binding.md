# Templates and Data Binding

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

# What Is a Template?

A Template is the HTML view associated with an Angular Component.

Example:

```html
<h2>Employee List</h2>
```

However, Angular Templates are much more than plain HTML.

Angular extends HTML with additional capabilities such as:

- Data Binding
- Directives
- Control Flow
- Event Handling
- Component Composition

Think of a Template as:

```text
HTML
+
Angular Features
=
Angular Template
```

---

# Why Do Templates Exist?

A Component contains:

```text
State
Logic
Methods
Business Interaction
```

But users cannot see TypeScript code.

A Template acts as the visual representation of a Component.

Example:

```typescript
export class EmployeeComponent {
  employeeName = 'Adarsh';
}
```

Template:

```html
<h2>{{ employeeName }}</h2>
```

Result:

```text
Adarsh
```

The Template displays Component data.

---

# Component and Template Relationship

```text
Component
(State + Logic)

      ↓

Template
(UI Representation)

      ↓

User
```

The Component owns the data.

The Template presents the data.

---

# What Is Data Binding?

Data Binding is the mechanism that synchronizes:

```text
Component
⇄
Template
```

Without Angular:

```javascript
document.getElementById("name")
        .innerText = employee.name;
```

Developers manually update the DOM.

With Angular:

```text
State Changes
↓
Angular Updates UI
```

This significantly reduces boilerplate code.

---

# Why Data Binding Exists

Angular promotes a State-Driven UI design.

Example:

```typescript
isLoading = true;
```

UI:

```text
Loading...
```

---

```typescript
isLoading = false;
```

UI:

```text
Employee List
```

The UI reflects the Component's state.

---

# Types of Data Binding

Angular provides four primary types of Data Binding.

```text
1. Interpolation
2. Property Binding
3. Event Binding
4. Two-Way Binding
```

This is one of the most frequently asked Angular interview questions.

---

# 1. Interpolation

## What Is Interpolation?

Interpolation displays Component data inside a Template.

Syntax:

```html
{{ expression }}
```

Example:

Component:

```typescript
employeeName = 'Adarsh';
```

Template:

```html
<h2>{{ employeeName }}</h2>
```

Result:

```html
<h2>Adarsh</h2>
```

---

## Flow

```text
Component
    ↓
Template
```

One-way communication.

Display only.

---

## Common Examples

```html
{{ title }}

{{ employee.name }}

{{ employees.length }}

{{ totalEmployees }}
```

---

## Typical Use Cases

- Displaying Names
- Displaying Counts
- Displaying Labels
- Displaying Dates
- Displaying Calculated Values

---

# Interview Question

### What is Interpolation?

Interpolation displays Component data inside a Template using double curly braces.

---

# 2. Property Binding

## What Is Property Binding?

Property Binding assigns Component values to DOM properties.

Syntax:

```html
[property]="value"
```

Example:

Component:

```typescript
imageUrl = 'employee.png';
```

Template:

```html
<img [src]="imageUrl">
```

Angular updates:

```text
img.src
```

using the Component property.

---

## Flow

```text
Component
    ↓
DOM Property
```

One-way communication.

---

## Common Examples

```html
<img [src]="imageUrl">

<button [disabled]="isLoading">

<input [value]="employeeName">

<div [hidden]="isHidden">
```

---

# Interpolation vs Property Binding

Interpolation:

```html
{{ employeeName }}
```

Used for text rendering.

---

Property Binding:

```html
<img [src]="imageUrl">
```

Used for DOM properties.

---

# Interview Question

### What is Property Binding?

Property Binding updates a DOM property using Component data.

---

# 3. Event Binding

## What Is Event Binding?

Event Binding allows user actions to trigger Component methods.

Syntax:

```html
(event)="handler()"
```

Example:

Template:

```html
<button (click)="saveEmployee()">
  Save
</button>
```

Component:

```typescript
saveEmployee() {
  console.log('Saved');
}
```

---

## Flow

```text
User
 ↓
Event
 ↓
Component Method
```

---

## Common Events

```html
(click)

(change)

(input)

(keyup)

(submit)

(mouseenter)
```

---

## Example

```html
<input (input)="search()">
```

```html
<form (submit)="save()">
```

---

# Interview Question

### What is Event Binding?

Event Binding connects browser events to Component methods.

---

# 4. Two-Way Binding

## What Is Two-Way Binding?

Two-Way Binding synchronizes:

```text
Component
⇄
UI Element
```

Changes on either side automatically update the other.

---

## Syntax

```html
[(ngModel)]
```

Example:

Component:

```typescript
employeeName = '';
```

Template:

```html
<input [(ngModel)]="employeeName">
```

---

## Flow

```text
Component
      ⇄
Input Control
```

Bidirectional.

---

## Practical Example

User types:

```text
Adarsh
```

Input updates:

```typescript
employeeName
```

automatically.

If Component changes:

```typescript
employeeName = 'John';
```

Input updates automatically.

---

# Why Two-Way Binding Exists

Forms frequently require synchronization between:

```text
User Input
⇄
Application State
```

Angular provides this capability with minimal code.

---

# Common Use Cases

- Login Forms
- Registration Forms
- Search Boxes
- User Profiles
- Employee Forms

---

# Interview Question

### What is Two-Way Binding?

Two-Way Binding keeps a Component property and UI control synchronized in both directions.

---

# Data Binding Summary

## Interpolation

```text
Component → Template
```

Display Text

---

## Property Binding

```text
Component → DOM Property
```

Update Element Properties

---

## Event Binding

```text
User → Component
```

Capture User Actions

---

## Two-Way Binding

```text
Component ⇄ Template
```

Synchronization

---

# Visual Diagram

```text
Interpolation

Component
    ↓
Template

----------------------

Property Binding

Component
    ↓
DOM Property

----------------------

Event Binding

User
    ↓
Event
    ↓
Component

----------------------

Two-Way Binding

Component
      ⇄
Template
```

---

# Template Expressions

Templates can evaluate simple expressions.

Examples:

```html
{{ employee.name }}
```

```html
{{ employees.length }}
```

```html
{{ firstName + ' ' + lastName }}
```

---

# Best Practices

## Good

```html
{{ employee.name }}
```

Simple and readable.

---

```html
{{ employeeCount }}
```

Pre-computed value.

---

## Avoid

```html
{{ calculateEmployeeMetrics() }}
```

Complex methods inside Templates.

Reason:

- Frequent execution
- Performance impact
- Harder debugging

---

# Modern Angular (16+/17+/18+)

Angular introduced improved control flow.

Recommended approach:

```html
@if (employees.length > 0) {

}
```

---

```html
@for (employee of employees;
      track employee.id) {

}
```

This is cleaner and more intuitive.

---

# Legacy Angular Approach

Before Angular 17:

```html
<div *ngIf="employees.length > 0">

</div>
```

---

```html
<div *ngFor="let employee of employees">

</div>
```

Widely used in existing applications.

---

# Why Angular Changed

Older syntax:

```html
*ngIf
*ngFor
```

was powerful but less intuitive.

New syntax resembles normal programming constructs:

```typescript
if
for
```

which improves readability and developer experience.

---

# Template vs Component Responsibilities

## Component Responsibilities

- State Management
- Event Handling
- Service Interaction
- Business Coordination

Example:

```typescript
loadEmployees()
```

---

## Template Responsibilities

- Rendering Data
- Displaying Layout
- Binding UI Elements
- Handling Presentation

Example:

```html
Employee Table

Search Input

Action Buttons
```

---

# Enterprise Example

Employee Directory Screen

Component:

```typescript
employees = [];

loadEmployees();
```

Responsibilities:

- Retrieve data
- Manage state
- Call services

---

Template:

```html
Employee Table

Search Controls

Paging Controls
```

Responsibilities:

- Display UI
- Display Data
- Receive User Input

---

# How This Fits Into Angular Architecture

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

Templates are the visible layer.

Components control behavior behind the Templates.

---

# Common Interview Questions

## What is a Template?

A Template is the HTML view associated with a Component.

---

## What is Data Binding?

The mechanism that synchronizes Component data and the UI.

---

## What are the four types of Data Binding?

1. Interpolation
2. Property Binding
3. Event Binding
4. Two-Way Binding

---

## What is Interpolation?

Displays Component data in a Template using:

```html
{{ }}
```

---

## What is Property Binding?

Updates DOM properties using Component values.

---

## What is Event Binding?

Connects browser events to Component methods.

---

## What is Two-Way Binding?

Synchronizes Component properties and UI controls in both directions.

---

## Difference Between Property Binding and Event Binding?

Property Binding:

```text
Component → UI
```

Event Binding:

```text
UI → Component
```

---

## How Does Two-Way Binding Work?

Combination of:

```text
Property Binding
+
Event Binding
```

---

## What Are Modern Angular Control Flow Features?

```html
@if

@for
```

---

## What Was Used Before Angular 17?

```html
*ngIf

*ngFor
```

---

# Senior-Level Discussion

Data Binding is a foundational Angular concept that enables declarative UI development.

Instead of manually manipulating the DOM, developers describe relationships between application state and the UI, while Angular keeps both synchronized.

Benefits:

- Less DOM manipulation code
- Better maintainability
- Cleaner architecture
- More predictable UI behavior

This is one of the key reasons Angular applications remain manageable at enterprise scale.

---

# Architecture Considerations

When designing Templates:

- Keep Templates focused on presentation.
- Avoid heavy calculations.
- Avoid business logic.
- Keep bindings simple.
- Move complex logic into Components or Services.

Good Angular applications maintain a clear separation between:

```text
Presentation

and

Behavior
```

---

# Key Takeaways

1. Templates are Angular's view layer.
2. Templates extend HTML with Angular-specific capabilities.
3. Data Binding synchronizes Component state and the UI.
4. Angular provides four binding types:
   - Interpolation
   - Property Binding
   - Event Binding
   - Two-Way Binding
5. Modern Angular uses:
   - `@if`
   - `@for`
6. Components manage state.
7. Templates display state.

---

# Interview Notes (Revision Version)

## Data Binding Types

### Interpolation

```html
{{ value }}
```

Component → Template

---

### Property Binding

```html
[src]="imageUrl"
```

Component → DOM Property

---

### Event Binding

```html
(click)="save()"
```

UI Event → Component

---

### Two-Way Binding

```html
[(ngModel)]="name"
```

Component ⇄ UI

---

## Modern Angular

```html
@if

@for
```

Preferred approach.

---

## Legacy Angular

```html
*ngIf

*ngFor
```

Still common in enterprise applications.

---

## Key Message

Templates are Angular's view layer, and Data Binding is the mechanism that keeps Component state and the UI synchronized.

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Angular Components](06-angular-components.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Directives](08-directives.md)

<br/>
<!-- navigation-end -->
