# Route Parameters & Query Parameters Deep Dive

## Interview Priority

**Must Know**

## Interview Frequency

**Extremely Common**

## Recommended Depth

**Expert Level Understanding**

## Relevant For

- CRUD Applications
- Enterprise Applications
- Dashboard Applications
- Admin Portals
- E-commerce Applications
- Senior Developer Interviews

---

# First Principles

Most applications need to answer two questions:

```text
Which resource?

How should it be displayed?
```

Angular solves these using:

```text
Route Parameters

Query Parameters
```

---

# Route Parameters vs Query Parameters

This is one of the most common Angular interview topics.

---

## Route Parameters

Answer:

```text
Which resource?
```

---

Example

```text
/employees/101
```

Meaning:

```text
Employee ID 101
```

---

Another Example

```text
/projects/25
```

Meaning:

```text
Project ID 25
```

---

## Query Parameters

Answer:

```text
How should it be displayed?
```

---

Example

```text
/employees?page=2
```

Meaning:

```text
Show Page 2
```

---

Another Example

```text
/employees?sort=name
```

Meaning:

```text
Sort By Name
```

---

# Simple Rule

## Route Parameter

```text
Identity
```

---

## Query Parameter

```text
Options
```

---

# Real Enterprise Example

```text
/employees/101
```

Means:

```text
Which Employee?
```

---

```text
/employees?page=2&sort=name
```

Means:

```text
How Should Employees Be Shown?
```

---

# Route Parameters

## Why They Exist

Suppose an application contains:

```text
Employee List
```

User clicks:

```text
Employee 101
```

Need:

```text
Employee Details Page
```

---

Creating routes like:

```text
/employees101

/employees102

/employees103
```

would not scale.

---

# Solution

Parameterized Routes

```typescript
{
  path: 'employees/:id',
  component: EmployeeDetailComponent
}
```

---

# Understanding :

This:

```typescript
:id
```

means:

```text
Dynamic Value
```

---

Examples

```text
/employees/101

/employees/102

/employees/103
```

All match:

```typescript
employees/:id
```

---

# Visual

```text
employees/:id

     ↓

employees/101

employees/102

employees/103
```

---

# Multiple Route Parameters

Possible.

---

Example

```typescript
{
  path:
    'departments/:departmentId/employees/:employeeId',
  component:
    EmployeeComponent
}
```

---

Example URL

```text
/departments/10/employees/101
```

---

Values

```text
departmentId = 10

employeeId = 101
```

---

# Enterprise Example

E-commerce

```text
/orders/500/items/20
```

---

Route

```typescript
{
 path:
   'orders/:orderId/items/:itemId'
}
```

---

Result

```text
orderId = 500

itemId = 20
```

---

# Reading Route Parameters

Angular provides:

```typescript
ActivatedRoute
```

---

Inject

```typescript
constructor(
  private route:
      ActivatedRoute
) {}
```

---

# Approach 1

Snapshot

Most common beginner approach.

---

Example

```typescript
const id =
 this.route.snapshot
     .paramMap
     .get('id');
```

---

URL

```text
/employees/101
```

Result

```text
101
```

---

# Mental Model

Snapshot means:

```text
Read Once
```

---

Think:

```text
Take Picture

Of Current URL
```

---

# When Snapshot Is Good

```text
Initial Page Load

Component Created Once

Route Unlikely To Change
```

---

Example

```text
Employee Details Page
```

Typical use case.

---

# Limitations Of Snapshot

Suppose user navigates:

```text
/employees/101

↓

/employees/102

↓

/employees/103
```

Component may remain alive.

Snapshot won't automatically react.

---

# Approach 2

Reactive Parameter Reading

Preferred approach.

---

Example

```typescript
this.route.paramMap
  .subscribe(params => {

     const id =
       params.get('id');

  });
```

---

# Advantage

Whenever URL changes:

```text
101

↓

102

↓

103
```

subscription receives updates.

---

# Visual

```text
Route Change

↓

paramMap Emits

↓

Component Updates
```

---

# Real Enterprise Example

Master-Detail Screen

Left:

```text
Employees List
```

Right:

```text
Employee Details
```

User clicks:

```text
101

102

103
```

Reactive parameters handle this naturally.

---

# Route Parameters + API Calls

Most common combination.

---

URL

```text
/employees/101
```

---

Read Parameter

```typescript
this.route.paramMap
```

---

Call API

```typescript
employeeService.getById(
   id
);
```

---

Visual

```text
URL

↓

Parameter

↓

API Call

↓

Employee Data

↓

UI
```

---

# Reactive RxJS Version

Senior-level pattern.

---

```typescript
this.route.paramMap
  .pipe(

    map(params =>
       params.get('id')
    ),

    switchMap(id =>

      this.employeeService
          .getById(id!)

    )

  )
  .subscribe();
```

---

# Why Is This Better?

Problems solved:

```text
Route Changes

↓

Automatic API Reload

↓

Cancel Old Requests

↓

Always Show Latest Data
```

---

# Query Parameters

Now let's explore the second half.

---

# Why Query Parameters Exist

Imagine Employee List.

Need:

```text
Paging

Sorting

Filtering

Searching
```

---

Route Parameter doesn't fit.

---

Bad Example

```text
/employees/page2
```

---

Good Example

```text
/employees?page=2
```

---

# Query Parameter Anatomy

Example

```text
/employees?page=2
```

---

Parameter

```text
page
```

---

Value

```text
2
```

---

# Multiple Query Parameters

Example

```text
/employees

?page=2

&sort=name

&status=active

&department=IT
```

---

Values

```text
page=2

sort=name

status=active

department=IT
```

---

# Real Enterprise Example

Employee Search Screen

```text
/employees

?page=3

&sort=name

&status=active

&department=IT
```

---

Benefits

```text
Bookmarkable

Sharable

Browser Friendly

Persistent State
```

---

# Reading Query Parameters

Reactive Version

```typescript
this.route.queryParamMap
  .subscribe(params => {

      const page =
          params.get('page');

  });
```

---

# Snapshot Version

```typescript
const page =
  this.route.snapshot
      .queryParamMap
      .get('page');
```

---

# Query Parameter Defaults

Very common.

---

Example

```typescript
const page =

 Number(
   params.get('page')
 ) || 1;
```

---

Result

If URL:

```text
/employees
```

then:

```text
Page = 1
```

---

# Route Params vs Query Params

## Route Params

```text
Required

Identify Resource
```

Example

```text
/employees/101
```

---

## Query Params

```text
Optional

Modify Display
```

Example

```text
?page=2
```

---

# Real Enterprise Design Rule

Employee Details

```text
/employees/101
```

Use:

```text
Route Params
```

---

Employee List

```text
/employees?page=2
```

Use:

```text
Query Params
```

---

# Updating Query Parameters

Suppose user changes page.

---

Navigate

```typescript
this.router.navigate(
  [],
  {
    queryParams: {
      page: 2
    }
  }
);
```

---

Result

```text
?page=2
```

---

# Preserve Existing Query Parameters

Very common.

---

Current

```text
?page=2&sort=name
```

---

Update only page

```typescript
this.router.navigate(
  [],
  {
    queryParams: {
      page: 3
    },

    queryParamsHandling:
       'merge'
  }
);
```

---

Result

```text
?page=3&sort=name
```

---

# Search Screen Example

Very common interview scenario.

---

URL

```text
/employees

?page=1

&sort=name

&search=adarsh

&department=IT
```

---

Query Parameters control:

```text
Pagination

Filters

Sorting

Search
```

---

# Combining Route + Query Parameters

Real-world example.

---

URL

```text
/employees/101

?tab=projects

&sort=date
```

---

Route Parameter

```text
employeeId = 101
```

---

Query Parameters

```text
tab = projects

sort = date
```

---

Meaning

```text
Show Employee 101

Open Projects Tab

Sort By Date
```

---

# Parent-Child Resource Example

```text
/departments/10/employees/101

?page=2
```

---

Route Params

```text
departmentId = 10

employeeId = 101
```

---

Query Params

```text
page = 2
```

---

# Common Interview Questions

## What Is A Route Parameter?

Dynamic URL segment used to identify a resource.

Example:

```text
/employees/101
```

---

## What Is A Query Parameter?

Optional URL parameter used to modify behavior.

Example:

```text
?page=2
```

---

## Difference Between ParamMap And QueryParamMap?

```text
paramMap

↓

Route Parameters
```

---

```text
queryParamMap

↓

Query Parameters
```

---

## Snapshot vs Subscribe?

Snapshot:

```text
Read Once
```

---

Subscribe:

```text
React To Changes
```

---

## When Should Route Parameters Be Used?

For:

```text
Customer ID

Employee ID

Order ID

Resource Identity
```

---

## When Should Query Parameters Be Used?

For:

```text
Search

Filters

Pagination

Sorting
```

---

# Common Interview Traps

## Trap 1

Using query parameters for resource identity.

Bad:

```text
/employees?id=101
```

Prefer:

```text
/employees/101
```

---

## Trap 2

Using route parameters for filtering.

Bad:

```text
/employees/active
```

Prefer:

```text
/employees?status=active
```

---

## Trap 3

Using snapshot when route changes should be handled reactively.

---

# Senior-Level Mental Model

Think:

```text
Route Parameters

↓

What Resource?
```

---

```text
Query Parameters

↓

How Should It Be Displayed?
```

---

# Decision Framework

## Employee Details

```text
/employees/101
```

Route Parameter

---

## Employee Search

```text
/employees?search=john
```

Query Parameter

---

## Employee Pagination

```text
/employees?page=2
```

Query Parameter

---

## Employee Details + Active Tab

```text
/employees/101?tab=projects
```

Both

---

# Key Takeaways

1. Route parameters identify resources.
2. Query parameters modify behavior and presentation.
3. Route parameters are defined using `:parameterName`.
4. `ActivatedRoute` is used to access route information.
5. `snapshot` reads values once.
6. `paramMap` and `queryParamMap` provide reactive updates.
7. Query parameters are ideal for search, filters, sorting, and paging.
8. Route parameters are ideal for resource identifiers.
9. RxJS operators pair naturally with route changes.
10. Most enterprise Angular applications use both route and query parameters extensively.

---

# Interview Notes (Revision Version)

## Resource Identity

```text
/employees/101
```

Use:

```typescript
paramMap
```

---

## Search

```text
?search=angular
```

Use:

```typescript
queryParamMap
```

---

## Paging

```text
?page=2
```

Use:

```typescript
queryParamMap
```

---

## Route Changes

```typescript
paramMap.subscribe(...)
```

---

## One-Time Read

```typescript
snapshot
```

---

## Senior Pattern

```typescript
paramMap
   ↓
switchMap()
   ↓
API
```

---

## Key Message

Route parameters answer **"Which resource?"** while query parameters answer **"How should the resource be displayed?"**. Understanding this distinction makes Angular routing design much simpler and leads to cleaner, more maintainable enterprise applications.