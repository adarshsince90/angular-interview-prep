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
Create Elements*Remove Elements
Repeat Elements
``*

They change the DOM tree itself.*
---

# Example: Conditional Rende*ing

Modern Angular:

```html
@if *isAdmin) {
    <button>Delete</but*on>
}
```

If condition is false:
*```text
Button does not exist in D*M
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
     track employee.id) *

  <app-employee-card />
}
```

Angular creates one DOM element per employee.

---

# Legacy Version

`*`html
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
Add Element*
Remove Elements
Repeat Elements
`*`

They modify DOM structure.

---*
# Interview Question

### What is a Structural Directive?

A Structural Directive modifies the structure of the DOM by adding, removing, or repeating elements.

---

# Why Only One Structural Directive Per Element?

Legacy Example:

```html
<d*v
 *ngIf="isVisible"
 *ngFor="let *mp of employees">
</div>
```

Problem:

```text
Angular does not know which structural transformation
should occur first.
```

Solution:

`*`html
<ng-container *ngIf="isVisib*e">
    <div *ngFor="let emp of em*loyees">

    </div>
</ng-containe*>
```

Common interview question.
*---

# 3. Attribute Directives

Attribute Directives modify:

```text*Appearance
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
``*

only*

---

# Another Example

```html
*div [ngStyle]="styles">
```

Angular modifies styles.

DOM structure remains unchanged.

---

# Attribute Directive Mental Model

Attribute*Directives:

```text
Element Stays*
Behavior Changes
Appearance Chang*s**``

---

# ngClass

One of the mos* common Attribute Directives.

Exa*ple:

```typescript
statusClass = *success';
```

Template:

```html
*div [ngClass]="statusClass">
    S*ved Successfully
</div>
```

Angul*r updates CSS classes dynamically.*
---

# ngStyle

Example:

```type*cript
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

*--

## Native DOM Property

```htm*
<img [src]="imageUrl">
```

Targe*:

```javascript
img.src
```

Nati*e browser property.

---

## Direc*ive Input

```html
<div [ngClass]=*cssClass">
```

Target:

```typesc*ipt
NgClass Directive
```

Angular*passes the value to the directive.*
The directive decides how to upda*e the DOM.

---

# Visual Comparis*n

```text
[src]
 ↓
Native DOM Pro*erty

--------------------

[ngCla*s]
 ↓
Angular Directive
 ↓
Directi*e Manipulates DOM
```

---

# Mode*n Angular Control Flow

Modern Ang*lar:

```html
@if

@for
```

Prefe*red approach.

---

# Legacy Angul*r Control Flow

Older Angular:

``*html
*ngIf

*ngFor
```

Still comm*nly encountered.

Interviewers may*ask both.

---

# Built-In Directi*es Commonly Used

## Structural

M*dern:

```html
@if

@for
```

Lega*y:

```html
*ngIf

*ngFor
```

---*
## Attribute

```html
[ngClass]

*ngStyle]
```

---

# Custom Direct*ves

Angular allows creation of cu*tom directives.

Example:

```type*cript
@Directive({
   selector:'[a*pHighlight]'
})
export class Highl*ghtDirective {}
```

Usage:

```ht*l
<div appHighlight>
```

Purpose:*
```text
Reusable DOM behavior
```*
Common enterprise use cases:

- H*ghlighting
- Auto Focus
- Permissi*n Based UI
- Input Formatting

---*
# Real Enterprise Example

Employ*e Portal

```html
@if(user.canDele*e)
{
   <button>Delete</button>
}
*``

Structural Directive.

---

``*html
<button
   [ngClass]="buttonC*ass">
```

Attribute Directive.

-*-

```html
<input appAutoFocus>
``*

Custom Directive.

---

# How Di*ectives Fit Into Angular Architect*re

```text
Component
      ↓
Temp*ate
      ↓
Directives
      ↓
DOM*```

Templates declare Directives.*
Directives modify rendering behav*or.

---

# Modern Angular (16+/17*/18+)

Preferred syntax:

```html
*if

@for
```

Benefits:

- Cleaner*templates
- Easier learning
- Bett*r readability
- More familiar synt*x

---

# Legacy Angular Approach
*```html
*ngIf

*ngFor
```

Still e*tremely common in production syste*s.

A good Angular developer shoul* know both.

---

# Why Angular Ch*nged

Goals:

- Reduce complexity
* Improve readability
- Align templ*te syntax with JavaScript/TypeScri*t
- Improve developer experience

*--

# Common Interview Traps

## T*ap 1

Thinking:

```html
*ngIf
```*
hides an element.

Incorrect.

It*removes the element from the DOM.
*---

## Trap 2

Thinking:

```html*[hidden]
```

is equivalent to:

`*`html
*ngIf
```

Not true.

```htm*
[hidden]
```

Element exists but *s hidden.

```html
*ngIf
```

Elem*nt is removed.

---

## Trap 3

Co*fusing:

```html
[src]
```

with:
*```html
[ngClass]
```

Both use pr*perty binding syntax.

One targets*a DOM property.

One targets a Dir*ctive.

---

# Common Interview Qu*stions

## What is a Directive?

A*Directive is a class that modifies*the behavior, appearance, or struc*ure of DOM elements.

---

## Type* of Directives?

1. Component Dire*tives
2. Structural Directives
3. *ttribute Directives

---

## What *s a Structural Directive?

A Direc*ive that adds, removes, or repeats*elements in the DOM.

---

## Exam*les of Structural Directives?

Mod*rn:

```html
@if
@for
```

Legacy:*
```html
*ngIf
*ngFor
```

---

##*What is an Attribute Directive?

A*Directive that changes appearance *r behavior without modifying DOM s*ructure.

---

## Examples of Attr*bute Directives?

```html
[ngClass*
[ngStyle]
```

---

## Difference*Between Structural and Attribute D*rectives?

Structural:

```text
Ch*nges DOM Structure
```

Attribute:*
```text
Changes Appearance/Behavi*r
```

---

## Why Only One Struct*ral Directive Per Element?

Angula* can apply only one structural tra*sformation to an element at a time*