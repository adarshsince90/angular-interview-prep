# Directives

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

---

# What Is a Directive?

A Directive is a class that tells Angular how to modify an element's:

- Structure
- Appearance
- Behavior

Think of Directives as instructions attached to HTML elements.

Example:

```html
@if (isLoggedIn()) {
  <h2>Welcome</h2>
}
```

Angular receives an instruction:

```text
Render this section only if the condition is true.
```

That instruction is implemented through a Directive-like mechanism.

---

# First Principles

Normal HTML is static.

Example:

```html
<h2>Employees</h2>
```

HTML alone cannot say:

```text
Show if user is logged in

Repeat for every employee

Apply CSS dynamically

Disable button conditionally
```

Angular introduces Directives to add dynamic behavior.

---

# Why Do Directives Exist?

Without Directives:

```javascript
if(isLoggedIn)
{
   document.getElementById(...)
}
```

Developers manually manipulate the DOM.

Angular's philosophy:

```text
Describe what should happen

instead of

Manually manipulating the DOM
```

Directives make templates declarative.

---

# Angular Building Blocks

Angular provides:

```text
Components
Templates
Data Binding
Directives
Services
Dependency Injection
```

Templates define UI.

Directives make templates dynamic.

---

# Types of Directives

Angular Directives are generally categorized into:

```text
1. Component Directives
2. Structural Directives
3. Attribute Directives
```

This is one of the most common interview questions.

---

# 1. Component Directives

Technically, every Component is a Directive.

Example:

```typescript
@Component({
  selector: 'app-employee'
})
export class EmployeeComponent {}
```

Usage:

```html
<app-employee></app-employee>
```

Angular injects an entire UI section.

Think:

```text
Component
=
Directive + Template
```

A Component is simply a special Directive that owns a view.

---

# 2. Structural Directives

Structural Directives change the structure of the DOM.

Key Question:

```text
Should this element exist?
```

Examples:

```html
@if
```

```html
@for
```

Legacy:

```html
*ngIf
```

```html
*ngFor
```

---

# Structural Directive Mental Model

Structural Directives can:

```text
Create Elements / Remove Elements
Repeat Elements
```

They change the DOM tree itself.
---

# Example: Conditional Rendering

Modern Angular:

```html
@if (isAdmin) {
    <button>Delete</button>
}
```

If condition is false:
```text
Button does not exist in DOM
```

Not hidden.

Removed.

Important distinction.

---

# Legacy Version

```html
<button *ngIf="isAdmin">
    Delete
</button>
```

Still very common in enterprise projects.

---

# Example: Loops

Modern Angular:

```html
@for(employee of employees;
     track employee.id) {

  <app-employee-card />
}
```

Angular creates one DOM element per employee.

---

# Legacy Version

```html
<div *ngFor="let employee of employees">

</div>
```

---

# Why Angular Introduced @if and @for

Legacy syntax:

```html
*ngIf
*ngFor
```

was powerful but not intuitive.

Modern syntax resembles:

```typescript
if

for
```

which improves readability.

---

# Structural directive Characteristics

Structural Directives:

```text
Add Elements
Remove Elements
Repeat Elements
```

They modify DOM structure.

---

# Interview Question

### What is a Structural Directive?

A Structural Directive modifies the structure of the DOM by adding, removing, or repeating elements.

---

# Why Only One Structural Directive Per Element?

Legacy Example:

```html
<div
 *ngIf="isVisible"
 *ngFor="let emp of employees">
</div>
```

Problem:

```text
Angular does not know which structural transformation
should occur first.
```

Solution:

```html
<ng-container *ngIf="isVisible">
    <div *ngFor="let emp of employees">

    </div>
</ng-container>
```

Common interview question.
---

# 3. Attribute Directives

Attribute Directives modify:

```text
Appearance
Behavior
```

without changing DOM structure.

Important distinction.

---

# Example

```html
<div [ngClass]="cssClass">
```

Angular does NOT add or remove the div.

The div already exists.

Angular changes:

```text
CSS Classes
```

only

---

# Another Example

```html
<div [ngStyle]="styles">
```

Angular modifies styles.

DOM structure remains unchanged.

---

# Attribute Directive Mental Model

Attribute Directives:

```text
Element Stays
Behavior Changes
Appearance Changes
```

---

# ngClass

One of the most common Attribute Directives.

Example:

```typescript
statusClass = 'success';
```

Template:

```html
<div [ngClass]="statusClass">
    Saved Successfully
</div>
```

Angular updates CSS classes dynamically.
---

# ngStyle

Example:

```typescript
styles = {
   color:'green'
*;
```

Template:

```html
<div [ngStyle]="styles">
```

Angular applies styles dynamically.

---

# Property Binding vs Attribute Directives
A frequent source of confusion.

---

## Native DOM Property

```html
<img [src]="imageUrl">
```

Target:

```javascript
img.src
```

Native browser property.

---

## Directive Input

```html
<div [ngClass]="cssClass">
```

Target:

```typescript
NgClass Directive
```

Angular passes the value to the directive.
The directive decides how to update the DOM.

---

# Visual Comparison

```text
[src]
 ↓
Native DOM Property

--------------------

[ngClass]
 ↓
Angular Directive
 ↓
Directive Manipulates DOM
```

---

# Modern Angular Control Flow

Modern Angular:

```html
@if

@for
```

Preferred approach.

---

# Legacy Angular Control Flow

Older Angular:

```html
*ngIf

*ngFor
```

Still commonly encountered.

Interviewers may ask both.

---

# Built-In Directives Commonly Used

## Structural

Modern:

```html
@if

@for
```

Legacy:

```html
*ngIf

*ngFor
```

---

## Attribute

```html
[ngClass]

[ngStyle]
```

---

# Custom Directives

Angular allows creation of custom directives.

Example:

```typescript
@Directive({
   selector: '[appHighlight]'
})
export class HighlightDirective {}
```

Usage:

```html
<div appHighlight>
```

Purpose:
```text
Reusable DOM behavior
```
Common enterprise use cases:

- Highlighting
- Auto Focus
- Permission Based UI
- Input Formatting

---

# Real Enterprise Example

Employee Portal

```html
@if(user.canDelete)
{
   <button>Delete</button>
}
```

Structural Directive.

---

```html
<button
   [ngClass]="buttonClass">
```

Attribute Directive.

---

```html
<input appAutoFocus>
```

Custom Directive.

---

# How Directives Fit Into Angular Architecture

```text
Component
      ↓
Template
      ↓
Directives
      ↓
DOM
```

Templates declare Directives.
Directives modify rendering behavior.

---

# Modern Angular (16+/17+/18+)

Preferred syntax:

```html
*if

@for
```

Benefits:

- Cleaner templates
- Easier learning
- Better readability
- More familiar syntax

---

# Legacy Angular Approach

```html
*ngIf

*ngFor
```

Still extremely common in production systems.

A good Angular developer should know both.

---

# Why Angular Changed

Goals:

- Reduce complexity
- Improve readability
- Align template syntax with JavaScript/TypeScript
- Improve developer experience

---

# Common Interview Traps

## Trap 1

Thinking:

```html
*ngIf
```
hides an element.

Incorrect.

It removes the element from the DOM.
---

## Trap 2

Thinking:

```html
[hidden]
```

is equivalent to:

```html
*ngIf
```

Not true.

```html
[hidden]
```

Element exists but is hidden.

```html
*ngIf
```

Element is removed.

---

## Trap 3

Confusing:

```html
[src]
```

with:

```html
[ngClass]
```

Both use property binding syntax.

One targets a DOM property.

One targets a Directive.

---

# Common Interview Questions

## What is a Directive?

A Directive is a class that modifies the behavior, appearance, or structure of DOM elements.

---

## Types of Directives?

1. Component Directives
2. Structural Directives
3. Attribute Directives

---

## What is a Structural Directive?

A Directive that adds, removes, or repeats elements in the DOM.

---

## Examples of Structural Directives?

Modern:

```html
@if
@for
```

Legacy:
```html
*ngIf
*ngFor
```

---

## What is an Attribute Directive?

A Directive that changes appearance or behavior without modifying DOM structure.

---

## Examples of Attribute Directives?

```html
[ngClass]
[ngStyle]
```

---

## Difference Between Structural and Attribute Directives?

Structural:

```text
Changes DOM Structure
```

Attribute:
```text
Changes Appearance/Behavior
```

---

## Why Only One Structural Directive Per Element?

Angular can apply only one structural transformation to an element at a time.

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Templates and Data Binding](07-templates-and-data-binding.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Services](09-services.md)

<br/>
<!-- navigation-end -->
