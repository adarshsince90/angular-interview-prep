# Angular Performance Optimization

## Interview Priority

**Must Know**

## Interview Frequency

**Very High**

## Recommended Depth

**Expert Level Understanding**

## Relevant For

- Enterprise Applications
- Large Angular Applications
- High Traffic Systems
- SaaS Platforms
- Angular Architecture
- Senior Angular Interviews

---

# First Principles

Performance Optimization is not about making Angular faster.

It is about reducing unnecessary work.

Angular performance problems usually come from:

```text
Too Many Change Detection Cycles

Too Many DOM Elements

Too Much JavaScript

Too Many Network Calls

Expensive Computations

Memory Leaks
```

---

# Performance Optimization Pyramid

Always optimize in this order:

```text
Bundle Size
      ↓
Change Detection
      ↓
DOM Rendering
      ↓
Network Calls
      ↓
Memory Usage
```

---

# Golden Rule

Before optimizing ask:

```text
What exactly is slow?
```

Avoid:

```text
Premature Optimization
```

---

# Angular Performance Categories

```text
1. Change Detection Optimization

2. Rendering Optimization

3. Network Optimization

4. Bundle Optimization

5. Memory Optimization
```

---

# Optimization #1: OnPush Change Detection

One of the most important Angular performance optimizations.

---

# Problem

Default strategy:

```typescript
ChangeDetectionStrategy.Default
```

Angular checks many components whenever any triggering event occurs.

---

Example

```text
Button Click

↓

Root Component

↓

Entire Tree Check
```

---

Large applications:

```text
Dashboard

Employees

Reports

Settings

Charts

Tables
```

can trigger many checks.

---

# Solution

```typescript
@Component({

  selector: 'app-user',

  standalone: true,

  changeDetection:
      ChangeDetectionStrategy.OnPush

})
export class UserComponent {

}
```

---

# Benefits

```text
Fewer Checks

Less CPU Usage

Better Scalability
```

---

# Incorrect Pattern

```typescript
this.user.name = 'Adarsh';
```

---

# Correct Pattern

```typescript
this.user = {

   ...this.user,

   name: 'Adarsh'

};
```

---

# Why?

OnPush tracks:

```text
Reference Changes
```

not object mutations.

---

# Optimization #2: Signals

Modern Angular's most important optimization technique.

---

# Traditional Angular

```text
Event Happens

↓

Check Tree

↓

Find Changes
```

---

# Signals

```text
Signal Changes

↓

Angular Knows Immediately

↓

Update Consumer
```

---

# Example

```typescript
count = signal(0);

increment() {

  this.count.update(
      value => value + 1
  );

}
```

---

Template

```html
<p>{{ count() }}</p>
```

---

# Benefits

```text
Fine-Grained Reactivity

Less Work

Targeted Updates
```

---

# Optimization #3: Computed Signals

Computed signals provide:

```text
Reactivity

+

Memoization
```

---

Example

```typescript
items = signal([
   1, 2, 3, 4
]);

totalItems = computed(
  () => items().length
);
```

---

Template

```html
<p>Total: {{ totalItems() }}</p>
```

---

Benefit

```text
Calculated Once

Recalculated Only When Dependencies Change
```

---

# Optimization #4: trackBy / track

One of the most frequently asked interview topics.

---

# Problem

List rendering:

```typescript
employees = signal([
  { id: 1, name: 'John' },
  { id: 2, name: 'Adarsh' }
]);
```

---

Template

```html
@for (
  employee of employees();
  track employee.id
) {

  <app-employee-card
      [employee]="employee">
  </app-employee-card>

}
```

---

# Why Track?

Without track:

```text
Angular May Recreate DOM Nodes
```

---

With track:

```text
Angular Reuses Existing DOM Nodes
```

---

# Legacy Syntax

```html
<li
 *ngFor="
 let emp of employees;
 trackBy: trackByEmployee
 ">
</li>
```

---

Component

```typescript
trackByEmployee(
   index: number,
   employee: Employee
): number {

   return employee.id;

}
```

---

# Benefits

Especially important when rendering:

```text
Data Grids

Tables

Lists

5,000+ Records
```

---

# Optimization #5: Avoid Function Calls In Templates

Very common interview question.

---

# Avoid

```html
{{ calculateTotal() }}
```

---

Angular executes:

*``typescript
calculateTotal()
```
*during every change detection cycl*.

---

Example

```typescript
cal*ulateTotal() {

  console.log('exe*uted');

  return this.items.lengt*;

}
```

---

Potentially hundred* of executions.

---

# Better

``*typescript
totalItems =
  computed*
    () => this.items().length
  )*
```

---

Template

```html
{{ to*alItems() }}
```

---

# Optimizat*on #6: Pure Pipes

Instead of reca*culating repeatedly.

---

# Avoid*
```html
{{ getFullName(user) }}
`*`

---

# Better

```html
{{ user * fullName }}
```

---

Implementat*on

```typescript
@Pipe({
  name: *fullName',
  pure: true
})
export *lass FullNamePipe
implements PipeT*ansform {

  transform(
    user: *ser
  ): string {

    return `${u*er.firstName}
            ${user.l*stName}`;

  }

}
```

---

# Why *ure Pipes?

Execute only when:

``*text
Inputs Change
```

---

# Ben*fits

```text
Less CPU Work

Clean*r Templates

Predictable Performan*e
```

---

# Optimization #7: Mem*ization

Useful for expensive calc*lations.

---

Example

```typescr*pt
calculateReport(
  reportId: st*ing
) {

  // expensive logic

}
`*`

---

Without memoization:

```text
Same Input

↓

Same Calculation Again
```

---

# Example

```typescript
const cache =
  new Map<string, Report>();

function getReport(
  id: string
) {

  if(cache.has(id)) {

      return cache.get(id);

  }

  const report =
      calculateReport(id);

  cache.set(id, report);

  return report;

}
```

---

# Benefit

```text
Reuse Previous Result

Avoid Recalculation
```

---

# Optimization #8: Lazy Loading

Already covered in routing.

---

# Without Lazy Loading

```text
Download Everything
```

---

# With Lazy Loading

```typescript
{
  path: 'employees',

  loadChildren: () =>
     import(
       './employees/routes'
     )
     .then(
       m => m.employeeRoutes
     )
}
```

---

# Benefits

```text
Smaller Initial Bundle

Faster Startup

Better UX
```

---

# Optimization #9: Deferrable Views (@defer)

Angular 17+ feature.

---

# Problem

Heavy UI components loaded immediately.

Example:

```text
Charts

Maps

Analytics Widgets
```

---

# Solution

```html
@defer {

   <app-heavy-chart />

}
```

---

# Deferred Until Visible

```html
@defer (
  on viewport
) {

  <app-report-chart />

}
```

---

Meaning:

```text
Load When User Scrolls
Into View
```

---

# Deferred Until Interaction

```html
@defer (
  on interaction
) {

  <app-chart />

}
```

---

Meaning:

```text
Load After User Action
```

---

# Benefits

```text
Faster Initial Render

Reduced Startup Work
```

---

# Optimization #10: Virtual Scrolling

Extremely important for enterprise applications.

---

# Problem

Rendering:

```text
10,000 Records
```

at once.

---

Bad

```html
@for (
 item of employees();
 track item.id
) {

}
```

---

Result:

```text
10,000 DOM Elements
```

---

# Solution

Angular CDK Virtual Scrolling

```html
<cdk-virtual-scroll-viewport
     itemSize="50"
     class="viewport">

  <div
    *cdkVirtualFor="
      let employee
      of employees">

      {{ employee.name }}

  </div>

</cdk-virtual-scroll-viewport>
```

---

# Benefit

```text
Render Visible Rows Only
```

Example:

```text
10,000 Records

↓

20 Visible Rows

↓

20 DOM Elements
```

---

Huge performance gain.

---

# Optimization #11: Reduce DOM Size

DOM operations are expensive.

---

Bad

```html
<div
 *ngFor="
 let item of 5000Items">
</div>
```

---

Ask:

```text
Can It Be Deferred?

Can It Be Virtualized?

Can It Be Paginated?
```

---

Smaller DOM:

```text
Less Memory

Faster Rendering
```

---

# Optimization #12: RxJS shareReplay

One of the most useful enterprise optimizations.

---

# Problem

```typescript
employees$ =
   this.http.get<Employee[]>(
      '/employees'
   );
```

---

Three subscribers:

```text
Subscriber 1

Subscriber 2

Subscriber 3
```

may trigger:

```text
3 API Calls
```

---

# Solution

```typescript
employees$ =
  this.http
      .get<Employee[]>(
          '/employees'
      )
      .pipe(
         shareReplay(1)
      );
```

---

# Result

```text
One API Call

Shared Result
```

---

# Optimization #13: Async Pipe

Avoid manual subscriptions.

---

# Avoid

```typescript
employees: Employee[] = [];

ngOnInit() {

  this.service
      .getEmployees()
      .subscribe(result => {

          this.employees =
             result;

      });

}
```

---

# Prefer

```typescript
employees$ =
    this.service
        .getEmployees();
```

---

Template

```html
@if (
  employees$ | async;
  as employees
) {

  @for (
     employee of employees;
     track employee.id
  ) {

  }

}
```

---

# Benefits

```text
Automatic Subscription Management

Automatic Cleanup

Less Boilerplate
```

---

# Optimization #14: Memory Leak Prevention

Every leak eventually becomes a performance problem.

---

# Bad

```typescript
this.employeeService
    .streamEmployees()
    .subscribe();
```

---

Component destroyed.

Subscription survives.

---

# Modern Angular

```typescript
this.employeeService
    .streamEmployees()
    .pipe(
       takeUntilDestroyed()
    )
    .subscribe();
```

---

# Benefits

```text
Automatic Cleanup

Reduced Memory Usage
```

---

# Optimization #15: Image Optimization

Often ignored.

---

Problem

```text
5 MB Images
```

---

Questions:

```text
Can We Compress?

Can We Use WebP?

Can We Lazy Load?
```

---

Example

```html
employee.webp
```

---

# Benefits

```text
Reduced Bandwidth

Faster Loading
```

---

# Optimization #16: Bundle Optimization

Always review dependencies.

---

Bad

```text
Large Library

Used For One Function
```

---

Example

```text
Moment.js
```

for simple formatting.

---

Better

```text
date-fns

Intl APIs
```

---

# Benefits

```text
Smaller Bundle

Faster Startup
```

---

# Optimization #17: Smart Component Architecture

Avoid huge components.

---

Bad

```text
EmployeeComponent

3500 Lines

Many Responsibilities
```

---

Better

```text
EmployeeContainerComponent

↓

EmployeeTableComponent

↓

EmployeeFilterComponent

↓

EmployeeCardComponent
```

---

Benefits

```text
Smaller Components

Simpler Change Detection

Better Maintainability
```

---

# Optimization #18: Conditional Rendering

Avoid rendering UI users do not need.

---

# Avoid

```html
<app-heavy-chart></app-heavy-chart>
```

always present.

---

# Better

```html
@if(showChart()) {

   <app-heavy-chart />

}
```

---

Render only when required.

---

# Enterprise Performance Checklist

## Change Detection

✅ OnPush

✅ Signals

✅ Computed Signals

✅ Immutable Updates

---

## List Rendering

✅ trackBy / track

✅ Virtual Scrolling

✅ Pagination

---

## Routing

✅ Lazy Loading

✅ Preloading

✅ Deferrable Views

---

## HTTP

✅ shareReplay

✅ Request Caching

✅ Avoid Duplicate Requests

---

## Memory

✅ Async Pipe

✅ takeUntilDestroyed

✅ Cleanup Resources

---

## Assets

✅ WebP Images

✅ Compressed Assets

✅ Bundle Optimization

---

# Common Interview Questions

## What Improves Angular Performance The Most?

Usually:

```text
OnPush

Signals

Lazy Loading

trackBy

Virtual Scrolling
```

---

## Why Is trackBy Important?

Prevents unnecessary DOM recreation.

---

## Why Avoid Functions In Templates?

Functions execute during every change detection cycle.

---

## Why Are Signals Faster?

Angular knows exactly which consumers depend on the changed signal.

---

## Why Is OnPush Faster?

Angular performs fewer component checks.

---

## What Is Virtual Scrolling?

Rendering only visible items instead of the full dataset.

---

## What Does shareReplay(1) Solve?

Avoids duplicate API calls by sharing the same response among subscribers.

---

## What Is A Deferrable View?

A delayed rendering mechanism using `@defer` for non-critical UI.

---

# Common Interview Traps

## Trap 1

Using OnPush while mutating objects.

```typescript
user.name = 'John';
```

---

## Trap 2

Using Signals but mutating signal values directly.

```typescript
user().name = 'John';
```

---

## Trap 3

Rendering large lists without tracking.

---

## Trap 4

Calling expensive methods from templates.

---

## Trap 5

Loading every feature eagerly.

---

## Trap 6

Subscribing manually everywhere.

---

# Decision Framework

Large Application?

↓

Use Lazy Loading.

---

Large Lists?

↓

Use trackBy + Virtual Scrolling.

---

Expensive Calculations?

↓

Use Computed Signals + Memoization.

---

Too Many Change Detection Cycles?

↓

Use OnPush + Signals.

---

Duplicate HTTP Requests?

↓

Use shareReplay.

---

Memory Concerns?

↓

Use Async Pipe + takeUntilDestroyed.

---

# Senior-Level Mental Model

Performance optimization is about asking:

```text
Can I Reduce:

Change Detection?

DOM Operations?

Network Requests?

Bundle Size?

Memory Consumption?
```

If yes:

```text
Application Performance Improves
```

---

# Key Takeaways

1. Performance optimization is about reducing unnecessary work.
2. OnPush reduces change detection overhead.
3. Signals provide fine-grained reactivity.
4. Computed signals provide reactive memoization.
5. trackBy minimizes DOM recreation.
6. Pure pipes reduce repeated calculations.
7. Lazy loading reduces startup bundle size.
8. Deferrable views delay non-critical rendering.
9. Virtual scrolling prevents huge DOM trees.
10. shareReplay prevents duplicate API requests.
11. Async pipe simplifies subscription management.
12. Modern Angular performance strategy usually combines:

```text
OnPush
+
Signals
+
Computed Signals
+
trackBy
+
Lazy Loading
+
Virtual Scrolling
+
Deferrable Views
```

for scalable enterprise applications.

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Change Detection](28-change-detection.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [State Management Fundamentals](../06-senior-architecture/30-state-management-fundamentals.md)

<br/>
<!-- navigation-end -->
