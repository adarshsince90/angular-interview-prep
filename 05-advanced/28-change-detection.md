# Change Detection

## Interview Priority

**Must Know**

## Interview Frequency

**Very High**

## Recommended Depth

**Expert Level Understanding**

## Relevant For

- Angular Internals
- Performance Optimization
- Signals
- OnPush Strategy
- Enterprise Applications
- Senior Angular Interviews

---

# First Principles

Let's begin with the most fundamental Angular question.

Consider:

```typescript
@Component({
  template: `
    <h1>{{ count }}</h1>

    <button (click)="increment()">
      Increment
    </button>
  `
})
export class AppComponent {

  count = 0;

  increment() {
    this.count++;
  }

}
```

---

Question:

```typescript
this.count++;
```

executes.

How does Angular know that:

```text
DOM Needs Updating?
```

---

Answer:

```text
Change Detection
```

---

# What Is Change Detection?

Change Detection is:

> Angular's mechanism for synchronizing application state with the DOM.

---

# Mental Model

```text
State Changes

↓

Angular Detects Change

↓

DOM Updates

↓

User Sees Updated UI
```

---

# Example

Component State

```typescript
count = 0;
```

UI

```html
0
```

---

After:

```typescript
count++;
```

State:

```typescript
count = 1;
```

---

Angular performs:

```text
Change Detection
```

and updates:

```html
1
```

---

# The Core Problem

JavaScript changes variables.

```typescript
count++;
```

---

Angular does not continuously watch every variable.

That would be:

```text
Extremely Expensive
```

---

Instead Angular runs:

```text
Change Detection Cycles
```

at specific times.

---

# Angular's Question

Angular repeatedly asks:

```text
Did Anything Change?
```

---

If yes:

```text
Update DOM
```

---

If no:

```text
Do Nothing
```

---

# What Triggers Change Detection?

Common triggers include:

```text
Button Click

Input Events

HTTP Responses

Promises

setTimeout()

setInterval()

Observable Emissions
```

---

Example

```typescript
this.http
    .get(...)
    .subscribe(result => {

       this.data = result;

    });
```

---

Flow

```text
HTTP Response

↓

Angular Notified

↓

Change Detection Runs

↓

UI Updates
```

---

# Zone.js

Historically Angular relies on:

```text
Zone.js
```

---

# What Is Zone.js?

Zone.js monkey-patches browser APIs.

Meaning it wraps:

```text
Events

Timers

Promises

XHR Calls

Fetch Calls
```

and notifies Angular when they complete.

---

# Example

```typescript
setTimeout(() => {

   this.count++;

}, 1000);
```

---

Flow

```text
Timer Finished

↓

Zone.js Notices

↓

Angular Runs Change Detection

↓

DOM Updates
```

---

# Without Zone.js

```text
Timer Finished

↓

Angular Doesn't Know
```

---

# With Zone.js

```text
Timer Finished

↓

Angular Notified

↓

Change Detection Runs
```

---

# Change Detection Tree

Angular organizes components into a tree.

---

Example

```text
AppComponent

│

├── HeaderComponent

│

├── DashboardComponent
│
├── EmployeeListComponent
│
└── ReportsComponent

│

└── FooterComponent
```

---

Visual

```text
App

↓

Dashboard

↓

Employees

↓

Employee Card
```

---

When Change Detection executes:

```text
Angular Traverses Tree
```

and checks bindings.

---

# Default Change Detection Strategy

Every Angular component uses:

```typescript
ChangeDetectionStrategy.Default
```

unless specified otherwise.

---

Example

```typescript
@Component({
  changeDetection:
      ChangeDetectionStrategy.Default
})
```

---

# Behavior

```text
Check Everything
```

---

Flow

```text
User Action

↓

Angular Starts At Root

↓

Traverses Entire Tree

↓

Checks Bindings

↓

Updates DOM
```

---

# Why Default Strategy Works Well

Advantages:

```text
Very Easy To Understand

Very Forgiving

Works Automatically

Few Surprises
```

---

# Object Mutation Works

Example

```typescript
user = {
   name: 'John'
};
```

---

Modify

```typescript
user.name = 'Adarsh';
```

---

Default strategy usually updates UI successfully.

---

Developers often don't think about:

```text
Immutability

Reference Changes

Object Replacement
```

---

# The Problem With Default Strategy

Imagine:

```text
App

↓

Dashboard

↓

100 Employee Cards

↓

Nested Components
```

---

User clicks:

```text
Employee Card #1
```

---

Angular may run checks for:

```text
Entire Component Tree
```

even though a small portion actually changed.

---

# Important Clarification

Angular does NOT rebuild the entire DOM.

---

Common misconception:

```text
Angular Re-Renders Everything
```

---

Reality:

```text
Angular Checks Bindings

↓

Updates Only Changed Bindings
```

---

Example

Template:

```html
{{ employee.name }}
```

---

Angular remembers:

```text
Previous Value:
John
```

---

Current Value:

```text
Adarsh
```

---

Difference found:

```text
Update DOM
```

---

# OnPush Strategy

One of the most common senior interview topics.

---

Default:

```text
Check Everything
```

---

OnPush:

```text
Check Less Often
```

---

Example

```typescript
@Component({

  changeDetection:
     ChangeDetectionStrategy.OnPush

})
export class UserComponent {

}
```

---

# Why OnPush Exists

Large applications may contain:

```text
Hundreds

Thousands

Of Components
```

---

Default strategy checks many components.

---

OnPush reduces unnecessary work.

---

Result:

```text
Potentially Better Performance
```

---

# How OnPush Works

Instead of checking constantly, Angular checks only when specific triggers occur.

---

# Trigger #1

Input Reference Changes

---

Parent

```typescript
user = {
  name: 'John'
};
```

---

Template

```html
<app-user
   [user]="user">
</app-user>
```

---

Child

```typescript
OnPush
```

---

Later

```typescript
this.user = {
   name: 'Adarsh'
};
```

---

Reference changes.

Angular detects:

```text
New Object Reference
```

---

Change Detection runs.

---

# Trigger #2

Events Inside Component

Example

```html
<button (click)="save()">
```

---

User click:

```text
Triggers Change Detection
```

---

# Trigger #3

Async Pipe

Example

```html
{{ user$ | async }}
```

---

Observable emits.

---

Angular updates UI.

---

# Trigger #4

Signals

Example

```typescript
count = signal(0);
```

---

Update

```typescript
count.set(1);
```

---

Angular knows:

```text
Signal Changed
```

and updates the component.

---

# Why OnPush Can Be Risky

Most common enterprise issue:

```text
Object Mutation
```

---

Example

```typescript
user = {
   name: 'John'
};
```

---

Bad

```typescript
user.name = 'Adarsh';
```

---

Reference did not change.

Angular sees:

```text
Same Object
```

---

Result:

```text
UI May Not Update
```

---

# Correct Approach

```typescript
user = {

   ...user,

   name: 'Adarsh'

};
```

---

Now Angular sees:

```text
New Reference
```

and updates.

---

# Arrays Have Same Issue

Bad

```typescript
employees.push(employee);
```

---

Reference unchanged.

---

Better

```typescript
employees = [

   ...employees,

   employee

];
```

---

Reference changes.

Angular recognizes update.

---

# Immutability

OnPush encourages:

```text
Immutable State Updates
```

---

Instead of:

```typescript
object.name = 'John';
```

Prefer:

```typescript
object = {
  ...object,
  name: 'John'
};
```

---

Instead of:

```typescript
array.push(item);
```

Prefer:

```typescript
array = [
  ...array,
  item
];
```

---

# Risks Of Using OnPush Everywhere

Many people believe:

```text
Default = Bad

OnPush = Good
```

---

Reality:

```text
OnPush Requires Discipline
```

---

Team must consistently understand:

```text
Reference Changes

Immutability

Component Communication

Signals
```

---

Otherwise bugs occur like:

```text
State Changes

↓

UI Doesn't Update

↓

No Error

↓

No Exception

↓

Difficult Debugging
```

---

# Should We Use OnPush Everywhere?

For modern Angular:

```text
Often Yes
```

but only when developers understand immutable state principles.

---

Large enterprise teams commonly standardize on:

```typescript
ChangeDetectionStrategy.OnPush
```

combined with good state-management practices.

---

# Signals

Modern Angular introduced:

```typescript
signal()
computed()
effect()
```

---

Goal:

```text
More Precise Reactivity
```

---

Traditional Model

```text
Something Happened

↓

Check Tree

↓

Find Changes
```

---

Signal Model

```text
Signal Changed

↓

Known Immediately

↓

Update Consumers
```

---

# Primitive Signal Example

```typescript
count = signal(0);
```

---

Update

```typescript
count.set(1);
```

---

Angular immediately knows:

```text
Signal Changed
```

---

UI updates.

---

# Signal Holding An Object

Example

```typescript
user = signal({

   name: 'John',

   age: 30

});
```

---

Template

```html
{{ user().name }}
```

---

# Incorrect Update

```typescript
user().name = 'Adarsh';
```

---

Question:

Was Signal Notified?

Answer:

```text
No
```

---

Signal still points to the same object.

---

Angular sees:

```text
Signal Not Updated
```

---

Result:

```text
UI May Not Update
```

---

# Correct Signal Update

```typescript
user.update(current => ({

   ...current,

   name: 'Adarsh'

}));
```

---

Or

```typescript
user.set({

   ...user(),

   name: 'Adarsh'

});
```

---

Now Angular knows:

```text
Signal Changed
```

---

Consumers update.

---

# Signals And Arrays

Bad

```typescript
employees().push(employee);
```

---

Signal not notified.

---

Good

```typescript
employees.update(current => [

   ...current,

   employee

]);
```

---

Signal notification occurs.

---

# Signals