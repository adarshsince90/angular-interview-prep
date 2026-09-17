# Signals

## Interview Priority

**Must Know (Angular 16+)**

## Interview Frequency

**Very Common**

## Recommended Depth

**Expert Level Understanding**

## Relevant For

- Mid-Level Interviews
- Senior Developer Interviews
- Lead Developer Interviews
- Modern Angular Applications

---

# Why Were Signals Introduced?

This is the most important Signals question.

Before learning syntax, understand the motivation.

---

# The Traditional Angular Approach

Simple component state:

```typescript
counter = 0;
```

works fine.

But as applications grow:

```text
Navbar

Dashboard

Profile

Settings
```

need shared state.

Developers historically used:

```typescript
BehaviorSubject
```

and RxJS.

---

# Traditional BehaviorSubject Example

```typescript
private userSubject =
  new BehaviorSubject<User | null>(null);

user$ =
  this.userSubject.asObservable();
```

Update:

```typescript
this.userSubject.next(user);
```

Read:

```typescript
this.user$
  .subscribe(user => {
     this.user = user;
  });
```

---

# Problems Angular Observed

A lot of code looked like:

```typescript
private dataSubject =
  new BehaviorSubject(...);

data$ =
  dataSubject.asObservable();

updateData() {
  dataSubject.next(...);
}
```

Along with:

```typescript
.subscribe()

.unsubscribe()

takeUntil()

takeUntilDestroyed()
```

For simple UI state this felt excessive.

---

# Angular's Question

For things like:

```text
Current User

Current Theme

Loading State

Selected Employee

Current Tab
```

Do we really need:

```text
BehaviorSubject

Observable

Subscription

Cleanup
```

?

Angular answered:

```text
No
```

Signals were introduced as a simpler reactive primitive.

---

# What Is A Signal?

A Signal is:

> A reactive value that Angular automatically tracks.

Think of it as:

```text
Reactive Variable
```

---

# Traditional Variable

```typescript
count = 0;
```

---

# Signal

```typescript
count = signal(0);
```

Both hold values.

The difference:

```text
Angular Tracks Signal Dependencies
```

automatically.

---

# Creating A Signal

```typescript
import {
  signal
} from '@angular/core';

count = signal(0);
```

---

# Reading A Signal

Signals are read using:

```typescript
count()
```

Notice:

```text
Function Call Syntax
```

not:

```typescript
count
```

---

# Example

```typescript
count = signal(10);

console.log(
  count()
);
```

Output:

```text
10
```

---

# Why Are Signals Functions?

A common interview question.

---

# Traditional Variable

```typescript
count
```

Angular cannot easily track reads.

---

# Signal

```typescript
count()
```

Angular can track:

```text
Who Read This Signal

When It Was Read
```

This enables automatic dependency tracking.

---

# Updating Signals

Signals are immutable from the outside.

Updates occur through dedicated APIs.

---

# set()

Replace the current value.

```typescript
count.set(25);
```

---

# Example

```typescript
count = signal(10);

count.set(20);
```

Result:

```text
20
```

---

# Visual

```text
10

↓

set(20)

↓

20
```

---

# update()

Calculate a new value from the previous value.

---

Example:

```typescript
count.update(
  value => value + 1
);
```

---

Equivalent to:

```typescript
count++;
```

in traditional code.

---

# Example

```typescript
count = signal(5);

count.update(
  value => value + 5
);
```

Result:

```text
10
```

---

# Why update() Exists

Without update:

```typescript
count.set(
  count() + 1
);
```

Works.

But:

```typescript
update()
```

is cleaner and expresses intent more clearly.

---

# Simple Counter Example

```typescript
count = signal(0);

increment() {

  this.count.update(
    value => value + 1
  );

}
```

Template:

```html
<p>{{ count() }}</p>

<button
 (click)="increment()">
  Increment
</button>
```

---

# Signals As Reactive State

Traditional state:

```typescript
loading = false;
```

---

Signal state:

```typescript
loading = signal(false);
```

---

Update:

```typescript
loading.set(true);
```

---

Template:

```html
@if (loading()) {

  <p>Loading...</p>

}
```

---

# Real-Time Use Case: Loading State

One of the most common enterprise examples.

---

Traditional

```typescript
loading = false;
```

---

Signal

```typescript
loading =
  signal(false);
```

---

Before Request

```typescript
loading.set(true);
```

---

After Request

```typescript
loading.set(false);
```

---

Template

```html
@if(loading()) {

   <app-spinner />

}
```

Perfect use case.

---

# Real-Time Use Case: Selected Employee

Employee list screen:

```text
Employee List

Employee Details
```

Need to track selected employee.

---

```typescript
selectedEmployee =
  signal<Employee | null>(
      null
  );
```

---

User Clicks Employee

```typescript
selectEmployee(
  employee: Employee
) {

  this.selectedEmployee
      .set(employee);

}
```

---

Template

```html
@if(selectedEmployee()) {

  <app-employee-details
     [employee]="selectedEmployee()">
  </app-employee-details>

}
```

---

# Real-Time Use Case: Active Tab

```typescript
activeTab =
  signal('overview');
```

---

Update

```typescript
activeTab.set('settings');
```

---

Use

```html
@if(activeTab() === 'settings') {

}
```

Very common dashboard pattern.

---

# Computed Signals

One of the most important Signals concepts.

---

# Problem

Suppose:

```typescript
firstName =
  signal('Adarsh');

lastName =
  signal('Pawaskar');
```

Need:

```text
Full Name
```

---

Bad approach:

```typescript
fullName =
  firstName() +
  ' ' +
  lastName();
```

This is not reactive.

---

# Solution

```typescript
fullName = computed(

  () =>

    firstName() +
    ' ' +
    lastName()

);
```

---

# What Happens?

Whenever:

```typescript
firstName
```

changes

or

```typescript
lastName
```

changes,

Angular automatically recomputes:

```typescript
fullName
```

---

# Visual

```text
firstName

     ↓

     ┐

     │

computed()

     │

     ┘

lastName
```

---

# Example

```typescript
firstName.set('John');
```

Result:

```text
John Pawaskar
```

without additional code.

---

# Mental Model

Computed Signals represent:

```text
Derived State
```

---

# Real-Time Use Case: Cart Total

E-commerce application.

---

Signals

```typescript
items =
  signal<CartItem[]>([]);
```

Need:

```text
Cart Total
```

---

Computed

```typescript
total = computed(() =>

  items()
   .reduce(
     (sum, item) =>
        sum +
        item.price,
     0
   )

);
```

---

Whenever cart items change:

```text
Total Automatically Updates
```

---

# Real-Time Use Case: Full Name

```typescript
firstName =
  signal('');

lastName =
  signal('');
```

---

Computed:

```typescript
fullName =
  computed(() =>

     firstName() +
     ' ' +
     lastName()

  );
```

---

Forms and profile pages use this frequently.

---

# Effects

The third core Signals API.

---

# What Problem Do Effects Solve?

Sometimes we need to:

```text
Log Data

Track Analytics

Store Data

React To Changes
```

when Signals change.

---

# Effect Example

```typescript
effect(() => {

  console.log(
    count()
  );

});
```

---

Whenever:

```typescript
count
```

changes,

effect automatically reruns.

---

# Example

```typescript
count.set(1);

count.set(2);

count.set(3);
```

Output:

```text
1

2

3
```

---

# Mental Model

```text
Signal Changes

      ↓

Effect Runs
```

---

# Real-Time Use Case: Persist Theme

```typescript
theme =
  signal('light');
```

Store choice.

---

Effect

```typescript
effect(() => {

  localStorage.setItem(
     'theme',
     theme()
  );

});
```

---

Whenever theme changes:

```text
Storage Automatically Updates
```

---

# Real-Time Use Case: Analytics

```typescript
selectedEmployee =
  signal<Employee | null>(
      null
  );
```

---

Effect

```typescript
effect(() => {

  console.log(
      selectedEmployee()
  );

});
```

Used for:

```text
Logging

Tracking

Auditing
```

---

# The Three Core Signal APIs

## signal()

Stores state.

---

Example

```typescript
count =
 signal(0);
```

---

## computed()

Derives state.

---

Example

```typescript
fullName =
 computed(...);
```

---

## effect()

Reacts to state.

---

Example

```typescript
effect(...);
```

---

# Enterprise Example: Theme Service

Before Signals:

```typescript
private themeSubject =
  new BehaviorSubject(
     'light'
  );
```

---

With Signals:

```typescript
theme =
  signal('light');
```

---

Update

```typescript
theme.set('dark');
```

---

Read

```typescript
theme()
```

Much simpler.

---

# Enterprise Example: Authentication State

Traditional:

```typescript
private userSubject =
  new BehaviorSubject<User | null>(
      null
  );
```

---

Signals

```typescript
currentUser =
  signal<User | null>(
     null
  );
```

---

Login

```typescript
currentUser.set(user);
```

---

Logout

```typescript
currentUser.set(null);
```

---

Component

```typescript
authStore.currentUser()
```

No subscription required.

---

# Enterprise Example: Feature Store

```typescript
@Injectable({
  providedIn: 'root'
})
export class EmployeeStore {

  employees =
      signal<Employee[]>([]);

  selectedEmployee =
      signal<Employee | null>(
          null
      );

  loading =
      signal(false);

}
```

This is becoming increasingly common.

---

# Signals vs BehaviorSubject

One of the hottest Angular interview topics.

---

# Similarities

Both provide:

```text
Current Value

Reactive Updates

State Management
```

---

# BehaviorSubject

```typescript
private subject =
  new BehaviorSubject(
     value
  );
```

Requires:

```text
Observable

Subscription

RxJS
```

---

# Signal

```typescript
state =
 signal(value);
```

Requires:

```text
Nothing Else
```

---

# Comparison

## Current Value

BehaviorSubject

✅

Signal

✅

---

## Subscription Required

BehaviorSubject

✅

Signal

❌

---

## RxJS Dependency

BehaviorSubject

✅

Signal

❌

---

## Boilerplate

BehaviorSubject

High

Signal

Low

---

## UI State

BehaviorSubject

Good

Signal

Excellent

---

## Async Streams

BehaviorSubject

Excellent

Signal

Not Primary Purpose

---

# Signals Do NOT Replace RxJS

Extremely important interview point.

---

# Use Signals For

```text
UI State

Loading State

Modal Visibility

Current User

Theme

Selected Entity

Feature State
```

---

Examples

```typescript
loading =
 signal(false);

theme =
 signal('dark');
```

---

# Use RxJS For

```text
Http Requests

WebSockets

valueChanges

Streaming Data

Complex Async Pipelines
```

---

Example

```typescript
valueChanges
 .pipe(
    debounceTime(500),
    switchMap(...)
 )
```

Still RxJS.

---

# Modern Angular Pattern

Very common in Angular 17+.

```text
HttpClient

      ↓

Observable

      ↓

Signal

      ↓

Template
```

---

Example

```typescript
employees =
  signal<Employee[]>([]);
```

Fetch:

```typescript
this.employeeService
  .getEmployees()
  .subscribe(data => {

     this.employees
         .set(data);

  });
```

---

# Signals And Change Detection

Historically Angular relied heavily on:

```text
Zone.js
```

and broad change detection.

Signals allow Angular to know:

```text
Exactly What Changed

Exactly What Depends On It
```

leading to more efficient updates.

---

# Common Interview Questions

## What Is A Signal?

A reactive value that Angular automatically tracks.

---

## Why Were Signals Introduced?

To simplify state management and reduce RxJS boilerplate for UI state.

---

## How Do You Read A Signal?

```typescript
count()
```

---

## How Do You Update A Signal?

```typescript
count.set()

count.update()
```

---

## What Is A Computed Signal?

A derived value that automatically updates when dependencies change.

---

## What Is An Effect?

Code that runs whenever dependent Signals change.

---

## Can Signals Replace BehaviorSubject?

For many UI-state scenarios:

```text
Yes
```

For asynchronous streams:

```text
No
```

---

## Do Signals Replace RxJS?

No.

Both solve different problems.

---

# Common Interview Traps

## Trap 1

Thinking Signals replace HttpClient.

Incorrect.

HttpClient still returns:

```typescript
Observable
```

---

## Trap 2

Thinking Signals replace RxJS entirely.

Incorrect.

RxJS remains critical for:

```text
Http Calls

WebSockets

Reactive Forms

Async Event Streams
```

---

## Trap 3

Using effect() for derived state.

Prefer:

```typescript
computed()
```

when deriving values.

---

## Trap 4

Using Signals everywhere.

Choose the right tool:

```text
UI State
   ↓
Signal

Async Streams
   ↓
RxJS
```

---

# Architecture Considerations

## Prefer Signals For

```text
Local Component State

Feature State

View State

UI State
```

---

## Prefer RxJS For

```text
Async Workflows

Streams

Socket Events

Form Pipelines
```

---

## Common Modern Architecture

```text
API

 ↓

Observable

 ↓

Store Signal

 ↓

Template
```

---

# Key Takeaways

1. Signals are Angular's modern reactive state primitive.
2. A Signal is a reactive value Angular automatically tracks.
3. `signal()` stores state.
4. `computed()` derives state.
5. `effect()` reacts to state changes.
6. Signals reduce RxJS boilerplate.
7. Signals are ideal for UI and component state.
8. Signals do not replace RxJS.
9. RxJS remains the preferred solution for async streams.
10. Understanding BehaviorSubject makes Signals much easier to understand.

---

# Interview Notes (Revision Version)

## Store State

```typescript
signal()
```

---

## Derived State

```typescript
computed()
```

---

## Side Effects

```typescript
effect()
```

---

## Read Value

```typescript
state()
```

---

## Update Value

```typescript
state.set()

state.update()
```

---

## Use Signals For

```text
UI State

Current User

Theme

Loading

Selection
```

---

## Use RxJS For

```text
HTTP

WebSockets

valueChanges

Search Pipelines
```

---

## Key Message

Signals provide Angular's modern, lightweight, and reactive approach to UI state management, reducing the boilerplate traditionally associated with BehaviorSubject-based state while complementing, not replacing, RxJS.

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Async Pipe & RxJS Template Patterns](17b-async-pipe-and-rxjs-template-patterns.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Signal-Based Component APIs](18a-signal-based-component-apis.md)

<br/>
<!-- navigation-end -->
