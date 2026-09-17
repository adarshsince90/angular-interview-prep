# HttpClient

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

# What Is HttpClient?

HttpClient is Angular's built-in service for communicating with HTTP endpoints.

It allows Angular applications to:

- Retrieve Data
- Create Data
- Update Data
- Delete Data
- Upload Files
- Download Files
- Send Headers
- Handle Authentication

Think of HttpClient as:

```text
Angular's HTTP Communication Layer
```

---

# Why Do We Need HttpClient?

Most Angular applications are not standalone systems.

Data typically lives in:

```text
SQL Server
PostgreSQL
MongoDB
Redis
```

behind APIs such as:

```text
ASP.NET Core Web API

Java Spring Boot

Node.js Express

Python FastAPI
```

Angular must communicate with these systems.

Example:

```text
Employee Screen

    ↓

GET /api/employees

    ↓

ASP.NET Core API

    ↓

Database
```

---

# First Principles

Imagine an Employee application.

When the user clicks:

```text
Load Employees
```

Angular does not have the employee data.

It must:

```text
Send Request
Wait
Receive Response
Display Data
```

This process is handled by HttpClient.

---

# Evolution of HTTP Communication

## XMLHttpRequest

Early web applications used:

```javascript
var xhr = new XMLHttpRequest();
```

Problems:

```text
Verbose
Complex
Difficult Error Handling
Difficult Testing
```

---

## Fetch API

Modern browsers introduced:

```javascript
fetch('/api/employees');
```

Much simpler.

---

## Angular HttpClient

Angular introduced:

```typescript
HttpClient
```

Benefits:

```text
Strong Typing
Dependency Injection
RxJS Integration
Interceptors
Testing Support
Error Handling
```

---

# Angular Architecture Context

HttpClient typically sits inside Services.

```text
User
 ↓
Component
 ↓
Service
 ↓
HttpClient
 ↓
Backend API
 ↓
Database
```

---

# Why API Calls Should Not Live In Components

Possible:

```typescript
@Component({...})
export class EmployeeComponent {

  constructor(
    private http: HttpClient
  ) {}

}
```

But not recommended.

---

Preferred:

```text
Component
     ↓
EmployeeService
     ↓
HttpClient
```

---

# Responsibilities

## Component

```text
UI
Template
User Interaction
State
```

---

## Service

```text
HTTP Communication
Data Transformation
Business Rules
Caching
```

---

# Angular Configuration

## Modern Angular (16+)

Recommended approach:

```typescript
import { provideHttpClient }
from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient()
  ]
});
```

---

# What Does provideHttpClient() Do?

Registers:

```text
HttpClient
HttpBackend
Interceptors Infrastructure
HTTP Support Services
```

with Angular's DI system.

---

# Legacy Angular Approach

Older Angular applications use:

```typescript
import { HttpClientModule }
from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class AppModule {
}
```

---

# Modern vs Legacy

## Modern

```typescript
provideHttpClient()
```

Preferred.

---

## Legacy

```typescript
HttpClientModule
```

Still very common in enterprise projects.

---

# Why Angular Changed

Reasons:

```text
Standalone Architecture

Tree Shaking

Less Boilerplate

Simpler Configuration
```

---

# Creating Typed Models

Suppose API returns:

```json
{
  "id": 1,
  "name": "Adarsh",
  "department": "Engineering"
}
```

Create interface:

```typescript
export interface Employee {
  id: number;
  name: string;
  department: string;
}
```

---

# Why Strong Typing Matters

Without typing:

```typescript
http.get<any>()
```

Problems:

```text
No IntelliSense

Runtime Errors

Poor Refactoring Support
```

---

With typing:

```typescript
http.get<Employee[]>()
```

Benefits:

```text
Compile-Time Safety
Autocomplete
Refactoring Support
Readability
```

---

# Building Employee Service

## Service Setup

```typescript
import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) {}

}
```

---

# GET Request

Most common operation.

## Service

```typescript
getEmployees() {
  return this.http.get<Employee[]>(
    '/api/employees'
  );
}
```

---

# Understanding Generics

```typescript
http.get<Employee[]>()
```

means:

```text
Expected Response Type

Employee[]
```

Angular receives:

```json
[
  {
    "id": 1,
    "name": "Adarsh"
  }
]
```

and exposes it as:

```typescript
Employee[]
```

---

# Component Usage

```typescript
@Component({...})
export class EmployeeComponent {

  employees: Employee[] = [];

  constructor(
    private employeeService:
      EmployeeService
  ) {}

  ngOnInit(): void {

    this.employeeService
      .getEmployees()
      .subscribe(response => {

        this.employees = response;

      });

  }

}
```

---

# Request Flow

```text
Component

    ↓

EmployeeService

    ↓

HttpClient

    ↓

GET /api/employees

    ↓

ASP.NET Core API

    ↓

Database
```

---

# POST Request

Used to create data.

Example:

```typescript
createEmployee(
  employee: Employee
) {

  return this.http.post(
    '/api/employees',
    employee
  );

}
```

---

# Request Body

Angular automatically serializes:

```typescript
employee
```

into JSON.

Example:

```json
{
  "id": 1,
  "name": "Adarsh"
}
```

---

# PUT Request

Used for complete replacement.

```typescript
updateEmployee(
  employee: Employee
) {

  return this.http.put(
    `/api/employees/${employee.id}`,
    employee
  );

}
```

---

# PATCH Request

Used for partial updates.

Example:

```typescript
updateSalary(
  id: number,
  salary: number
) {

  return this.http.patch(
    `/api/employees/${id}`,
    {
      salary: salary
    }
  );

}
```

---

# DELETE Request

Used to remove resources.

```typescript
deleteEmployee(
  id: number
) {

  return this.http.delete(
    `/api/employees/${id}`
  );

}
```

---

# CRUD Mapping

```text
Create  → POST

Read    → GET

Update  → PUT / PATCH

Delete  → DELETE
```

Extremely common interview question.

---

# Why HttpClient Returns Observable<T>

Many developers ask:

```typescript
Why not return Employee[]?
```

Because HTTP operations are asynchronous.

Angular sends request:

```text
Request Sent
```

Then waits.

```text
Waiting...
```

Then response arrives later.

---

# Observable Flow

```text
Request Sent

     ↓

Waiting

     ↓

Response Arrives

     ↓

Observable Emits Data

     ↓

subscribe()
```

---

# Example

```typescript
getEmployees() {
  return this.http.get<Employee[]>(
    '/api/employees'
  );
}
```

Returns:

```typescript
Observable<Employee[]>
```

Not:

```typescript
Employee[]
```

---

# Understanding subscribe()

```typescript
this.employeeService
    .getEmployees()
    .subscribe(data => {

        this.employees = data;

    });
```

Meaning:

```text
When data becomes available,
execute this code.
```

---

# Error Handling

Real-world APIs fail.

Potential failures:

```text
404 Not Found

401 Unauthorized

403 Forbidden

500 Internal Server Error

Network Failure

Timeout
```

---

# Error Handling Example

```typescript
this.employeeService
  .getEmployees()
  .subscribe({

    next: data => {

      this.employees = data;

    },

    error: error => {

      console.error(error);

    }

  });
```

---

# Response Headers

Sometimes APIs return headers.

Example:

```typescript
return this.http.get<Employee[]>(
  '/api/employees',
  {
    observe: 'response'
  }
);
```

---

Now you get:

```text
Body

Headers

Status Code
```

---

# Custom Headers

Example:

```typescript
const headers = {
  Authorization:
    'Bearer token'
};

return this.http.get(
  '/api/employees',
  {
    headers
  }
);
```

---

# Query Parameters

API:

```text
/api/employees?page=1&size=10
```

Angular:

```typescript
return this.http.get(
  '/api/employees',
  {
    params: {
      page: 1,
      size: 10
    }
  }
);
```

---

# HttpClient and Dependency Injection

HttpClient itself is injected.

Example:

```typescript
constructor(
  private http: HttpClient
) {}
```

---

Dependency chain:

```text
Component
      ↓
EmployeeService
      ↓
HttpClient
```

Angular resolves the chain automatically.

---

# Enterprise Example

ASP.NET Core API:

```csharp
[HttpGet]
public IEnumerable<Employee>
GetEmployees()
{
   return repository.GetEmployees();
}
```

---

Angular Service:

```typescript
getEmployees() {

  return this.http.get<Employee[]>(
      '/api/employees'
  );

}
```

---

Angular Component:

```typescript
this.employeeService
    .getEmployees()
    .subscribe(
        employees => {
            this.employees = employees;
        });
```

---

# Interceptors (Introduction)

Interceptors act like middleware.

ASP.NET Core:

```csharp
app.UseAuthentication();

app.UseAuthorization();
```

Angular:

```text
HTTP Interceptors
```

---

# Common Interceptor Uses

```text
JWT Token Injection

Logging

Global Error Handling

Retry Logic

Request Tracking

Headers
```

We'll study them separately later.

---

# HttpClient vs Fetch

## Fetch

```javascript
fetch('/api/employees')
```

Browser API.

---

## HttpClient

```typescript
http.get<Employee[]>()
```

Angular API.

---

# HttpClient Advantages

```text
Strong Typing

Observables

Interceptors

Dependency Injection

Centralized Configuration

Testing Support
```

---

# Modern Angular (16+/17+/18+)

Configuration:

```typescript
provideHttpClient()
```

Preferred.

---

Usage:

```typescript
constructor(
 private http: HttpClient
) {}
```

or

```typescript
private http =
   inject(HttpClient);
```

Both are valid.

---

# Legacy Angular

Configuration:

```typescript
HttpClientModule
```

inside:

```typescript
@NgModule()
```

Still common in existing enterprise applications.

---

# Common Interview Questions

## What is HttpClient?

Angular service used to communicate with HTTP endpoints.

---

## Why use HttpClient instead of Fetch?

Benefits include:

- Strong Typing
- Observables
- Interceptors
- Better Angular Integration
- Improved Testing Support

---

## Where should API calls live?

Generally inside Services.

---

## Why does HttpClient return Observable?

Because HTTP operations are asynchronous.

---

## What does

```typescript
http.get<Employee[]>()
```

mean?

Expected response type:

```typescript
Employee[]
```

---

## Difference Between PUT and PATCH?

PUT:

```text
Full Update
```

PATCH:

```text
Partial Update
```

---

## What are Interceptors?

Middleware-like mechanisms for modifying requests and responses globally.

---

# Common Interview Traps

## Trap 1

Calling APIs directly from Components.

Possible but not recommended.

---

## Trap 2

Using:

```typescript
any
```

everywhere.

Prefer:

```typescript
Employee
Employee[]
Order
Product
```

typed models.

---

## Trap 3

Thinking HttpClient returns actual data.

Incorrect.

Returns:

```typescript
Observable<T>
```

which produces data later.

---

# Senior-Level Discussion

HttpClient represents Angular's infrastructure layer.

Well-designed Angular applications typically follow:

```text
Component
    ↓
Service
    ↓
HttpClient
    ↓
Backend API
```

This separation:

- Improves maintainability
- Improves testability
- Supports large teams
- Encourages reuse
- Simplifies architecture

HttpClient's integration with Dependency Injection, Observables, Interceptors, and TypeScript makes it one of Angular's most powerful enterprise features.

---

# Architecture Considerations

Prefer:

```text
Component
    ↓
Service
    ↓
HttpClient
```

Avoid:

```text
Component
    ↓
HttpClient
```

Use:

```typescript
http.get<Employee[]>()
```

instead of:

```typescript
http.get<any>()
```

Centralize concerns like:

- Authentication
- Logging
- Error Handling

using Interceptors.

---

# Complete Request Lifecycle Diagram

```text
User

 │

 ▼

Component

 │

 ▼

EmployeeService

 │

 ▼

HttpClient

 │

 ▼

ASP.NET Core API

 │

 ▼

Database

─────────────────────────

Database

 │

 ▼

ASP.NET Core API

 │

 ▼

HttpClient

 │

 ▼

Observable<Employee[]>

 │

 ▼

Component

 │

 ▼

Template

 │

 ▼

User
```

---

# Key Takeaways

1. HttpClient is Angular's HTTP communication service.
2. API calls should usually live in Services.
3. HttpClient supports GET, POST, PUT, PATCH, and DELETE.
4. Strong typing is achieved using TypeScript Generics.
5. HttpClient returns Observables because HTTP operations are asynchronous.
6. Modern Angular uses `provideHttpClient()`.
7. Interceptors act like middleware for HTTP requests.
8. HttpClient is a critical part of Angular's enterprise architecture.

---

# Interview Notes (Revision Version)

## Configuration

Modern:

```typescript
provideHttpClient()
```

Legacy:

```typescript
HttpClientModule
```

---

## CRUD Operations

```text
GET    → Read

POST   → Create

PUT    → Full Update

PATCH  → Partial Update

DELETE → Remove
```

---

## Typical Flow

```text
Component
 ↓
Service
 ↓
HttpClient
 ↓
API
```

---

## Return Type

```typescript
Observable<T>
```

not

```typescript
T
```

---

## Key Message

HttpClient is Angular's strongly typed, DI-enabled HTTP communication library and serves as the bridge between Angular applications and backend APIs.

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Dependency Injection (DI)](10-dependency-injection.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [RxJS & Observables Fundamentals](../03-intermediate/12-rxjs-and-observables-fundamentals.md)

<br/>
<!-- navigation-end -->
