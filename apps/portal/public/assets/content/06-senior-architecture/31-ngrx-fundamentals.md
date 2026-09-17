# NgRx Fundamentals

## Interview Priority

**High**

## Interview Frequency

**Medium to High**

## Recommended Depth

**Senior-Level Conceptual Understanding**

## Relevant For

- Enterprise Applications
- Large Angular Projects
- State Management
- Frontend Architecture
- Distributed Teams
- Senior Angular Interviews

---

# First Principles

Before understanding NgRx, understand the problem.

Most developers learn:

```text
Actions

Reducers

Effects

Selectors

Store
```

without understanding:

```text
Why NgRx Exists
```

NgRx is not about APIs.

NgRx is about solving state management problems in large applications.

---

# What Is NgRx?

NgRx is:

> A reactive state management library for Angular inspired by Redux.

---

Think of NgRx as:

```text
Single Source Of Truth

+

Predictable State Changes

+

Reactive Updates

+

State Governance
```

---

# Important Distinction

Angular provides:

```text
Components

Services

Routing

HTTP

Forms

Signals
```

---

NgRx is:

```text
NOT Part Of Angular Core
```

It is an architectural library.

---

# What Problem Does NgRx Solve?

Imagine an enterprise application.

```text
Employees

Projects

Reports

Dashboard

Notifications

Administration
```

---

State exists everywhere.

```text
Current User

Permissions

Employees

Filters

Theme

Selected Project

Notifications
```

---

Initially:

```typescript
Component State
```

works.

---

Later:

```typescript
Services + Signals
```

work.

---

Eventually:

```text
100 Components

50 Screens

Many Teams

Complex Shared State
```

create challenges.

---

# Typical Problems

## Problem 1

Multiple Sources Of Truth

Example

```text
Navbar Has User

Sidebar Has User

Profile Has User
```

---

Question

```text
Which User Is Correct?
```

---

# Problem 2

Hidden State Changes

Example

```typescript
employeeService.employees.set(...)
```

used everywhere.

---

Question

```text
Who Changed State?
```

---

Answer

```text
Difficult To Know
```

---

# Problem 3

Debugging

Question

```text
Why Did Employee Count Change?
```

---

Without state discipline:

```text
Hard To Trace
```

---

# Problem 4

Large Teams

Example

```text
10 Teams

50 Developers
```

---

Need:

```text
Consistent Rules

Predictability

Auditability
```

---

# NgRx Philosophy

NgRx enforces one core rule:

```text
State Cannot Change Randomly
```

---

Every state change must follow:

```text
A Predictable Flow
```

---

# Core NgRx Flow

```text
Component

↓

Action

↓

Effect (Optional)

↓

Reducer

↓

Store Updated

↓

Selector

↓

UI Updates
```

---

This flow is the heart of NgRx.

---

# The Store

The Store is:

> The central location where application state lives.

---

Example

```typescript
{
  user: {},

  employees: [],

  projects: [],

  notifications: [],

  settings: {}
}
```

---

Think:

```text
Frontend Database
```

---

Everything reads state from the Store.

---

# Single Source Of Truth

Without Store:

```text
Component A Has State

Component B Has State

Component C Has State
```

---

With Store:

```text
One State Owner

↓

Every Component Reads It
```

---

# What Is An Action?

Action answers:

```text
What Happened?
```

---

Actions are:

```text
Events
```

---

Examples

```text
Employee Loaded

Employee Deleted

Project Created

User Logged In

Theme Changed
```

---

# Action Example

```typescript
export const loadEmployees =
  createAction(
    '[Employee] Load Employees'
  );
```

---

Important:

```text
Action Does NOT Change State
```

---

It only describes:

```text
An Event Happened
```

---
# What Actions Are NOT

A common misconception is:

```text
Action = Execute Something
```

This is incorrect.

Actions do NOT:

```text
Call APIs

Update State

Perform Logging

Navigate

Execute Business Logic

Modify Store Values
```

Actions are simply:

```text
Events
```

---

Example

```typescript
export const loadEmployees =
  createAction(
    '[Employee] Load Employees'
  );
```

This action only describes:

```text
Employee Load Requested
```

It does not:

```text
Call GET /employees

Update employees state

Perform Any Work
```

---

# Mental Model

Action means:

```text
Something Happened
```

NOT:

```text
Do Something
```

Examples:

```text
Employee Loaded

User Logged In

Theme Changed

Report Generated
```

These are events, not commands.
---

# Think Of Actions As Events

Example

```text
Customer Ordered Pizza
```

---

This does NOT mean:

```text
Pizza Delivered
```

---

Similarly:

```typescript
loadEmployees()
```

does NOT mean:

```text
Employees Loaded
```

---

It means:

```text
Employee Load Requested
```

---

# What Is dispatch()?

Example

```typescript
this.store.dispatch(
   loadEmployees()
);
```

---

dispatch means:

```text
Publish Event
```

or

```text
Broadcast Event
```

---

Think:

```text
Tell NgRx

"Load Employees Happened"
```

---

It does NOT:

```text
Update State Directly
```

---
# What Does dispatch() Actually Do?

Example:

```typescript
this.store.dispatch(
  loadEmployees()
);
```

Many developers assume:

```text
dispatch()
```

means:

```text
Call API

Update State

Execute Logic
```

It does not.

---

dispatch() means:

```text
Publish Event

Broadcast Event

Notify NgRx System
```

---

The published action becomes visible to:

```text
Reducers

Effects

DevTools
```

which may react to it.

---

# Mental Model

Think:

```typescript
dispatch(loadEmployees())
```

is conceptually similar to:

```typescript
eventBus.publish(
  'Load Employees'
);
```

---

Nothing has changed yet.

The action has simply been announced.

---

# Important Distinction

dispatch():

```text
Publishes Action
```

Reducer:

```text
Updates State
```

Effect:

```text
Performs Side Effects
```

These are separate responsibilities.
---

# What Happens After dispatch()?

Example

```typescript
dispatch(loadEmployees());
```

---

NgRx broadcasts:

```text
Load Employees Event
```

---

Reducers may react.

Effects may react.

DevTools records it.

---

# What Is A Reducer?

Reducer answers:

```text
How Should State Change?
```

---

Reducer Formula

```text
Current State

+

Action

=

New State
```

---

Example

Current State

```typescript
{
  employees: []
}
```

---

Action

```typescript
loadEmployeesSuccess
```

---

Reducer

```typescript
export const employeeReducer =
  createReducer(

    initialState,

    on(
      loadEmployeesSuccess,
      (state, { employees }) => ({

        ...state,

        employees

      })
    )
);
```

---

Output

```typescript
{
  employees: [
    {
      id: 1,
      name: 'John'
    }
  ]
}
```

---

# Why Is It Called A Reducer?

Comes from:

```typescript
Array.reduce()
```

Example

```typescript
[1,2,3].reduce(
  (sum, n) => sum + n
);
```

---

Many values become:

```text
One Result
```

---

NgRx reducers perform:

```text
Many Actions

↓

One Current State
```

---

# Reducers Must Be Pure
---
# What Does "Pure Reducer" Mean?

One of the most frequently misunderstood NgRx concepts.

---

A pure function follows two rules.

---

# Rule 1

Same Input

↓

Same Output

Always.

---

Example

Given:

```typescript
state = {
  employees: []
};

action = loadEmployeesSuccess({
  employees: [
    {
      id: 1,
      name: 'John'
    }
  ]
});
```

the reducer should always produce:

```typescript
{
  employees: [
    {
      id: 1,
      name: 'John'
    }
  ]
}
```

---

The result must be predictable.

---

# Rule 2

No Side Effects

Reducers must not:

```text
Call APIs

Navigate

Log Analytics

Write To Local Storage

Show Notifications

Trigger HTTP Requests
```

Reducers should only perform:

```text
Current State

+

Action

↓

New State
```

---

# Important Clarification

Pure does NOT mean:

```text
State Never Changes
```

State absolutely changes.

---

Example

Old State

```typescript
{
  employees: []
}
```

---

New State

```typescript
{
  employees: [
    {
      id: 1,
      name: 'John'
    }
  ]
}
```

---

The state changed.

That is expected.

---

What makes the reducer pure is:

```text
No Side Effects

No State Mutation

Deterministic Output
```

Very important interview question.

---

Reducer should do:

```text
Input

↓

Output
```

only.

---

Good

```typescript
(state, action)
  => newState
```

---

Bad

```typescript
http.get(...)

router.navigate(...)

console.log(...)
```

---

Reducers should never perform side effects.

---

# Why?

Pure functions are:

```text
Predictable

Testable

Debuggable
```

---

# Immutable Updates

Never mutate state.

---

Bad

```typescript
state.employees.push(
  employee
);
```

---

Good

```typescript
{

  ...state,

  employees: [

     ...state.employees,

     employee

  ]

}
```

---

NgRx relies heavily on immutability.

---

# What Is An Effect?

Effects answer:

```text
What External Work Needs To Happen?
```

---

Examples

```text
API Calls

Navigation

Logging

Analytics
```

---

Reducers cannot do these things.

---

Effects handle them.

---
# Effects Own Side Effects

Reducers must remain pure.

Therefore any operation that interacts with the outside world belongs in an Effect.

---

Examples

```text
API Calls

Navigation

Logging

Analytics

Audit Events

Toast Notifications

Local Storage

Session Storage
```

---

# Rule Of Thumb

Ask:

```text
Does This Touch
Something Outside The Store?
```

If yes:

```text
Use An Effect
```

---

# Logging Example

```typescript
createEffect(
  () =>
    this.actions$.pipe(

      ofType(loadEmployees),

      tap(() => {

        console.log(
          'Loading employees'
        );

      })

    ),
  { dispatch: false }
);
```

---

The effect performs logging.

No state update occurs.

---

# Why Not In Reducers?

Bad:

```typescript
on(
  loadEmployees,
  state => {

    console.log(
      'Loading employees'
    );

    return state;

  }
)
```

---

Problem:

```text
Reducer Is No Longer Pure
```

Reducers should only calculate new state.

Everything else belongs in Effects.
---

# Effect Example

User requests:

```text
Load Employees
```

---

Component

```typescript
this.store.dispatch(
  loadEmployees()
);
```

---

Effect

```typescript
loadEmployees$ =
 createEffect(() =>

   this.actions$.pipe(

     ofType(loadEmployees),

     switchMap(() =>
        this.api.getEmployees()
     ),

     map(employees =>

        loadEmployeesSuccess({
           employees
        })

     )

   )

 );
```

---

Read It Like English

```text
When

Load Employees

Occurs

↓

Call API

↓

Dispatch Success Action
```

---

# Why Is It Called An Effect?

Because:

```text
Something Happened

↓

External Work Happened
```

---

That external work is called:

```text
Side Effect
```

---

# Two-Action Pattern

Common enterprise pattern.

---

Action 1

```typescript
loadEmployees
```

Meaning:

```text
Request Started
```

---

Action 2

```typescript
loadEmployeesSuccess
```

Meaning:

```text
Request Completed
```

---

Optional

```typescript
loadEmployeesFailure
```

Meaning:

```text
Request Failed
```

---
# Why Do We Often Have Multiple Actions?

A common beginner question:

```text
Why Not Just One Action?
```

---

Because different events occur at different moments.

---

Example:

```typescript
loadEmployees
```

means:

```text
Employee Loading Requested
```

---

At this point:

```text
No API Response Yet
```

---

Effect executes:

```text
GET /employees
```

---

API returns successfully.

Now a different event occurred.

---

```typescript
loadEmployeesSuccess
```

means:

```text
Employees Successfully Received
```

---

If API fails:

```typescript
loadEmployeesFailure
```

means:

```text
Employee Loading Failed
```

---

# Typical Enterprise Pattern

```typescript
loadEmployees

loadEmployeesSuccess

loadEmployeesFailure
```

---

These represent three separate events.

```text
Request Started

↓

Request Succeeded

OR

Request Failed
```

---

This separation provides:

```text
Cleaner State Management

Better Debugging

Loading Indicators

Error Handling
```

---

Example Reducer

```typescript
on(
  loadEmployees,
  state => ({
    ...state,
    loading: true
  })
),

on(
  loadEmployeesSuccess,
  (state, { employees }) => ({
    ...state,
    loading: false,
    employees
  })
),

on(
  loadEmployeesFailure,
  (state, { error }) => ({
    ...state,
    loading: false,
    error
  })
)
```
---

# Complete Flow

```text
Component

↓

dispatch(loadEmployees)

↓

Effect

↓

API Call

↓

API Response

↓

dispatch(loadEmployeesSuccess)

↓

Reducer

↓

Store Updated

↓

Selector Emits

↓

UI Updates
```

---

# What Happens Without Reducer?

Very important.

---

Suppose:

```text
Effect Calls API

↓

Success Action Dispatched
```

---

But:

```text
No Reducer Exists
```

---

Result:

```text
Store Never Changes
```

---

State remains:

```typescript
{
  employees: []
}
```

---

UI never updates.

---

# What Is A Selector?

Selector answers:

```text
How Do I Read State?
```

---

Store

```typescript
{
  employees: [...],

  users: [...],

  settings: {...}
}
```

---

Need only:

```typescript
employees
```

---

Selector

```typescript
export const selectEmployees =
  createSelector(

    selectEmployeeState,

    state => state.employees

  );
```

---

Component

```typescript
employees$ =
   this.store.select(
      selectEmployees
   );
```

---

# Why Is It Called Selector?

Think SQL.

---

SQL

```sql
SELECT *
FROM Employees
```

---

NgRx

```typescript
selectEmployees
```

---

Same idea.

---

# Benefits Of Selectors

```text
Reusable

Centralized

Typed

Memoized
```

---

# Derived State

Bad

```typescript
employees
employeeCount
```

stored separately.

---

This creates:

```text
Multiple Sources Of Truth
```

---

Prefer

```typescript
export const
selectEmployeeCount =
 createSelector(

   selectEmployees,

   employees =>
     employees.length

 );
```

---

Now count is:

```text
Derived State
```

---

# Memoization

Hidden superpower of selectors.

---

Scenario

```typescript
employees
```

did not change.

---

Selector already calculated:

```typescript
employees.length
```

---

NgRx reuses the old result.

---

No recalculation.

---

Performance benefit.

---

# NgRx DevTools

One of the biggest enterprise advantages.

---

Example Timeline

```text
User Logged In

Employee Loaded

Employee Created

Employee Updated

Theme Changed
```

---

For every action:

```text
Previous State

Current State

Action
```

can be inspected.

---

Huge debugging advantage.

---

# Why NgRx Feels Complex

Without NgRx

```typescript
employees = data;
```

---

With NgRx

```text
Action

↓

Effect

↓

Reducer

↓

Store

↓

Selector

↓

Component
```

---

More steps.

---

But also:

```text
More Predictability

More Debugging Power

More Governance
```

---

# Signals vs NgRx

Common interview discussion.

---

# Signals Solve

```text
Reactivity
```

---

Example

```typescript
employees =
  signal<Employee[]>([]);
```

---

Update

```typescript
employees.set(data);
```

---

UI updates.

---

# NgRx Solves

```text
Large Scale State Governance
```

---

Examples

```text
Many Teams

Complex State

Auditability

Time Travel Debugging

Strict Architecture Rules
```

---

# Modern Angular Perspective

Many applications today use:

```text
Signals

+

Service Stores

+

Computed
```

without NgRx.

---

Example

```typescript
@Injectable()
export class EmployeeStore {

  employees =
    signal<Employee[]>([]);

}
```

---

For many business applications:

```text
This Is Enough
```

---

# Service Store Example

```typescript
@Injectable({
  providedIn: 'root'
})
export class EmployeeStore {

  private readonly _employees =
      signal<Employee[]>([]);

  readonly employees =
      this._employees.asReadonly();

  readonly employeeCount =
      computed(
        () => this._employees().length
      );

  setEmployees(
    employees: Employee[]
  ) {
    this._employees.set(
      employees
    );
  }

  addEmployee(
    employee: Employee
  ) {
    this._employees.update(
      current => [
        ...current,
        employee
      ]
    );
  }
}
```

---

# When NgRx Makes Sense

Good Candidates

```text
Large Enterprise Applications

Complex Shared State

Many Teams

Multiple Domains

Offline Workflows

Real-Time Systems

Advanced Debugging Needs
```

---

# When NgRx Is Overkill

Bad Candidates

```text
Simple CRUD Apps

Internal Tools

Small Teams

Few Shared States
```

---

# Entity State

Advanced NgRx Topic.

---

Instead Of

```typescript
employees: Employee[]
```

---

NgRx Entity Stores

```typescript
{
  ids: [1,2,3],

  entities: {

     1: {...},

     2: {...},

     3: {...}

  }
}
```

---

Benefits

```text
Faster Lookup

Easy Updates

Normalized State
```

---

# Common Interview Questions

## What Problem Does NgRx Solve?

Predictable management of complex shared application state.

---

## What Is The Store?

Single Source Of Truth.

---

## What Is An Action?

An event describing something that happened.

---

## What Does dispatch() Do?

Publishes an action into the NgRx system.

---

## What Is A Reducer?

Pure function that calculates new state.

---

## What Is An Effect?

Handles side effects such as API calls.

---

## What Is A Selector?

Reusable, memoized state query.

---

## Why Are Reducers Pure?

Predictability and testability.

---

## What Happens Without A Reducer?

State never changes.

---

## Signals vs NgRx?

Signals solve reactivity.

NgRx solves enterprise-scale state management.

---

# Common Interview Traps

## Trap 1

Thinking Actions Update State.

They do not.

Reducers update state.

---

## Trap 2

Thinking dispatch() Updates State.

It does not.

It broadcasts an event.

---

## Trap 3

Calling APIs In Reducers.

Never.

Use Effects.

---

## Trap 4

Mutating State.

Bad

```typescript
state.users.push(user);
```

Good

```typescript
{
  ...state,
  users: [...state.users, user]
}
```

---

## Trap 5

Thinking NgRx Is Mandatory.

Many modern Angular applications succeed with:

```text
Signals
+
Service Stores
```

---

# Mental Model

Remember:

```text
Store
    = State

Action
    = What Happened

dispatch()
    = Publish Event

Reducer
    = How State Changes

Effect
    = External Work

Selector
    = Read State
```

---

# Complete Flow To Remember

```text
User Clicks Button

↓

dispatch(loadEmployees)

↓

Effect Executes

↓

API Call

↓

dispatch(loadEmployeesSuccess)

↓

Reducer Updates Store

↓

Selector Emits Data

↓

UI Updates
```

---

# Key Takeaways

1. NgRx is a state management library, not an Angular feature.
2. NgRx was created to solve large-scale state management problems.
3. The Store is the single source of truth.
4. Actions describe events.
5. dispatch() publishes actions.
6. Reducers are the only place state changes.
7. Effects handle side effects such as API calls.
8. Selectors provide memoized state access.
9. NgRx relies heavily on immutable state updates.
10. Signals solve reactivity; NgRx solves enterprise-scale state governance.
11. Not every Angular application needs NgRx.
12. Modern Angular often starts with Signals and adopts NgRx only when complexity justifies it.

---

# Interview Revision Sheet

```text
Store
  = State

Action
  = Event

dispatch()
  = Publish Event

Reducer
  = Pure Function
    (Old State + Action = New State)

Effect
  = Side Effects

Selector
  = Read State

Signals
  = Reactivity

NgRx
  = State Governance
```

---

# Golden Rule

```text
Actions Describe

Reducers Transform

Effects Execute

Selectors Read
```

---

# Complete Flow

```text
User Clicks Button

↓

dispatch(loadEmployees)

↓

Effect Executes

↓

API Call

↓

dispatch(loadEmployeesSuccess)

↓

Reducer Updates Store

↓

Selector Emits

↓

UI Updates
```

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [State Management Fundamentals](30-state-management-fundamentals.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Authentication & Authorization](32-authentication-authorization.md)

<br/>
<!-- navigation-end -->
