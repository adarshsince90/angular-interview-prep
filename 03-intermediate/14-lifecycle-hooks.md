# Lifecycle Hooks

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

# What Are Lifecycle Hooks?

Every Angular Component goes through a lifecycle.

Example:

```text
Component Created

      ↓

Initialized

      ↓

Input Values Updated

      ↓

View Rendered

      ↓

Component Destroyed
```

Angular provides special methods called Lifecycle Hooks that execute at specific points during this lifecycle.

These hooks allow developers to run custom logic when components are:

- Created
- Updated
- Rendered
- Destroyed

---

# Why Do Lifecycle Hooks Exist?

Imagine a Component that:

- Loads employees from an API
- Receives data through `@Input()`
- Uses `@ViewChild()`
- Subscribes to Observables

Questions arise:

```text
When should I call APIs?

When can I access Input values?

When is ViewChild available?

When should I cleanup subscriptions?
```

Lifecycle Hooks answer these questions.

---

# Lifecycle Overview

Simplified lifecycle flow:

```text
Constructor
      ↓

ngOnChanges
      ↓

ngOnInit
      ↓

ngAfterContentInit
      ↓

ngAfterViewInit
      ↓

Component Running
      ↓

ngOnDestroy
```

This is one of the most important Angular interview diagrams.

---

# Complete Lifecycle Order

```text
Constructor

↓

ngOnChanges

↓

ngOnInit

↓

ngDoCheck

↓

ngAfterContentInit

↓

ngAfterContentChecked

↓

ngAfterViewInit

↓

ngAfterViewChecked

↓

Component Running

↓

ngOnDestroy
```

---

# Constructor

The constructor is a TypeScript class feature.

It is not an Angular lifecycle hook.

Example:

```typescript
@Component({...})
export class EmployeeComponent {

  constructor() {

    console.log('Constructor');

  }

}
```

---

# Purpose Of Constructor

Use constructor for:

```text
Dependency Injection

Basic Field Initialization
```

Example:

```typescript
constructor(
  private employeeService: EmployeeService
) {
}
```

---

# Avoid Doing This In Constructor

Avoid:

```typescript
API Calls

Complex Logic

View Access

Input Processing
```

Reason:

Angular has not finished initializing the component yet.

---

# Constructor vs ngOnInit

Very common interview question.

---

## Constructor

```text
Class Creation

Dependency Injection

Basic Initialization
```

---

## ngOnInit

```text
Angular Initialization Complete

Inputs Ready

Safe Place For Startup Logic
```

---

# ngOnChanges

Triggered whenever an Input property changes.

Requires:

```typescript
@Input()
```

---

# Example

Child Component:

```typescript
@Component({...})
export class EmployeeCardComponent
implements OnChanges {

  @Input()
  employee!: Employee;

  ngOnChanges() {

    console.log('Employee Changed');

  }

}
```

---

# When Does ngOnChanges Run?

```text
Initial Input Assignment

Every Subsequent Input Change
```

---

# Flow

```text
Parent Changes Input

        ↓

Child Receives New Value

        ↓

ngOnChanges Executes
```

---

# Practical Example

Parent:

```html
<app-card
  [employee]="selectedEmployee">
</app-card>
```

Whenever:

```typescript
selectedEmployee
```

changes,

Angular executes:

```typescript
ngOnChanges()
```

inside the child.

---

# Interview Question

## Why Use ngOnChanges?

To react whenever `@Input()` values change.

---

# ngOnInit

Most commonly used hook.

Runs once after Angular initializes the component.

---

# Example

```typescript
@Component({...})
export class EmployeeComponent
implements OnInit {

  ngOnInit(): void {

    console.log('Initialized');

  }

}
```

---

# Typical Uses

```text
HTTP Calls

Load Initial Data

Initialize Forms

Setup Component State
```

---

# Real Example

```typescript
ngOnInit() {

  this.employeeService
      .getEmployees()
      .subscribe(data => {

        this.employees = data;

      });

}
```

This is the most common place for API calls.

---

# ngOnChanges vs ngOnInit

## ngOnChanges

Runs:

```text
Every Input Change
```

---

## ngOnInit

Runs:

```text
Only Once
```

after component initialization.

---

# Interview Comparison

```text
ngOnChanges

Many Times

------------------

ngOnInit

One Time
```

---

# ngDoCheck

Runs during Angular's change detection cycle.

Example:

```typescript
ngDoCheck() {

  console.log('Checking');

}
```

---

# Why It Exists

Allows custom change detection.

---

# Real Usage

Rare.

Most projects do not implement it.

---

# Interview Advice

Know:

```text
Purpose

Execution Order
```

But do not expect heavy usage in enterprise applications.

---

# Content Projection Refresher

Consider:

```html
<app-card>

  <h2>Employee Details</h2>

</app-card>
```

Inside Child:

```html
<ng-content></ng-content>
```

Projected content has its own lifecycle hooks.

---

# ngAfterContentInit

Runs after projected content is initialized.

Example:

```typescript
ngAfterContentInit() {

}
```

---

# Usage

```text
Content Projection Scenarios
```

Not commonly used.

---

# ngAfterContentChecked

Runs whenever Angular checks projected content.

```typescript
ngAfterContentChecked() {

}
```

Rarely used.

---

# View Initialization

Now consider:

```typescript
@ViewChild(EmployeeCardComponent)
employeeCard!: EmployeeCardComponent;
```

Question:

```text
When is employeeCard available?
```

Not during constructor.

Not during ngOnInit.

---

# ngAfterViewInit

Runs after Angular initializes the component view and child views.

Example:

```typescript
ngAfterViewInit() {

  console.log(this.employeeCard);

}
```

Now `@ViewChild()` is available.

---

# Why ngAfterViewInit Matters

Used when working with:

```text
ViewChild

Child Components

DOM Access

Third-Party Libraries
```

---

# Example

```typescript
@ViewChild('searchInput')
searchInput!: ElementRef;

ngAfterViewInit() {

  this.searchInput.nativeElement.focus();

}
```

Very common use case.

---

# Interview Question

## When Is ViewChild Available?

Answer:

```text
ngAfterViewInit()
```

---

# ngAfterViewChecked

Runs whenever Angular checks component views.

```typescript
ngAfterViewChecked() {

}
```

---

# Usage

Rare.

Mostly encountered in advanced scenarios.

---

# Component Running State

After initialization:

```text
Handle User Actions

Update UI

Receive Input Changes

Respond To Events
```

Angular repeatedly performs change detection.

---

# ngOnDestroy

One of the most important lifecycle hooks.

Runs before Angular destroys a component.

---

# Why Is It Important?

Used for cleanup.

Examples:

```text
Subscriptions

Timers

Intervals

WebSocket Connections

Event Listeners
```

---

# Observable Cleanup Example

```typescript
private subscription!: Subscription;

ngOnInit() {

  this.subscription =
      this.employeeService
          .getEmployees()
          .subscribe();

}
```

---

Cleanup:

```typescript
ngOnDestroy() {

  this.subscription.unsubscribe();

}
```

---

# Why Cleanup Matters

Without cleanup:

```text
Memory Leaks

Unused Network Activity

Unexpected Behavior
```

can occur.

---

# Lifecycle Example Timeline

```text
Component Created

      ↓

Constructor

      ↓

ngOnChanges

      ↓

ngOnInit

      ↓

ngAfterContentInit

      ↓

ngAfterViewInit

      ↓

User Interacts

      ↓

Input Changes

      ↓

ngOnChanges

      ↓

Component Removed

      ↓

ngOnDestroy
```

---

# Modern Angular Cleanup

Modern Angular provides:

```typescript
takeUntilDestroyed()
```

Example:

```typescript
this.employeeService
    .getEmployees()
    .pipe(
      takeUntilDestroyed()
    )
    .subscribe();
```

Reduces manual cleanup code.

We'll discuss it in detail later.

---

# Lifecycle Hook Frequency

## Commonly Used

```typescript
ngOnInit()

ngOnChanges()

ngOnDestroy()

ngAfterViewInit()
```

---

## Occasionally Used

```typescript
ngAfterContentInit()

ngAfterContentChecked()
```

---

## Rarely Used

```typescript
ngDoCheck()

ngAfterViewChecked()
```

---

# Modern Angular (16+/17+/18+)

Lifecycle Hooks remain fundamental.

Even with:

```text
Signals

Standalone Components

Modern APIs
```

these hooks are still heavily used.

---

# Common Interview Questions

## What Are Lifecycle Hooks?

Methods invoked by Angular during a component's lifecycle.

---

## Difference Between Constructor And ngOnInit?

Constructor:

```text
Dependency Injection

Basic Initialization
```

ngOnInit:

```text
Component Startup Logic

API Calls

Data Loading
```

---

## When Does ngOnChanges Execute?

Whenever an `@Input()` property changes.

---

## Which Hook Runs Only Once?

```typescript
ngOnInit()
```

---

## When Is ViewChild Available?

```typescript
ngAfterViewInit()
```

---

## When Should API Calls Be Made?

Typically:

```typescript
ngOnInit()
```

---

## When Should Cleanup Occur?

```typescript
ngOnDestroy()
```

---

## Why Use ngOnDestroy?

To prevent:

```text
Memory Leaks

Lingering Subscriptions

Unused Resources
```

---

# Common Interview Traps

## Trap 1

Making API calls inside Constructor.

Incorrect.

Prefer:

```typescript
ngOnInit()
```

---

## Trap 2

Accessing ViewChild inside Constructor.

Incorrect.

Use:

```typescript
ngAfterViewInit()
```

---

## Trap 3

Ignoring Observable Cleanup.

Can cause memory leaks.

---

## Trap 4

Thinking ngOnInit executes multiple times.

It executes once per component instance.

---

# Senior-Level Discussion

Lifecycle Hooks provide precise control over component behavior throughout its lifespan.

A senior engineer should understand:

```text
When Components Are Created

When Input Values Arrive

When Views Are Initialized

When Cleanup Must Occur
```

This knowledge becomes critical when working with:

- RxJS
- Change Detection
- Forms
- Child Components
- Third-Party Libraries

Proper lifecycle management leads to more reliable, maintainable, and performant Angular applications.

---

# Architecture Considerations

Use:

```typescript
Constructor
```

for:

```text
Dependency Injection
```

---

Use:

```typescript
ngOnInit()
```

for:

```text
Startup Logic

API Calls

Initialization
```

---

Use:

```typescript
ngOnChanges()
```

for:

```text
Reacting To Input Changes
```

---

Use:

```typescript
ngAfterViewInit()
```

for:

```text
ViewChild

DOM Access
```

---

Use:

```typescript
ngOnDestroy()
```

for:

```text
Cleanup
```

---

# Lifecycle Hook Decision Matrix

```text
Need Dependency Injection?
      ↓
Constructor

Need Initial Data Load?
      ↓
ngOnInit

Need To Detect @Input Changes?
      ↓
ngOnChanges

Need ViewChild Access?
      ↓
ngAfterViewInit

Need Cleanup?
      ↓
ngOnDestroy
```

---

# Key Takeaways

1. Components have a lifecycle managed by Angular.
2. Lifecycle Hooks execute at specific stages.
3. Constructor is for Dependency Injection, not business logic.
4. `ngOnInit()` is commonly used for initialization and API calls.
5. `ngOnChanges()` reacts to Input changes.
6. `ngAfterViewInit()` is where ViewChild becomes available.
7. `ngOnDestroy()` is critical for resource cleanup.
8. Proper lifecycle management prevents memory leaks and improves maintainability.

---

# Interview Notes (Revision Version)

## Most Common Hooks

```typescript
ngOnInit()

ngOnChanges()

ngAfterViewInit()

ngOnDestroy()
```

---

## Constructor vs ngOnInit

Constructor:

```text
Dependency Injection
```

---

ngOnInit:

```text
Startup Logic
```

---

## Input Changes

```typescript
ngOnChanges()
```

---

## ViewChild Access

```typescript
ngAfterViewInit()
```

---

## Cleanup

```typescript
ngOnDestroy()
```

---

## Typical Order

```text
Constructor

↓

ngOnChanges

↓

ngOnInit

↓

ngAfterViewInit

↓

ngOnDestroy
```

---

## Key Message

Lifecycle Hooks provide controlled entry points into Angular's component lifecycle, enabling initialization, change handling, view interaction, and cleanup at the appropriate stages.