# Error Handling Strategy

## Interview Priority

**Must Know**

## Interview Frequency

**High**

## Recommended Depth

**Senior / Architect Level Understanding**

## Relevant For

- Enterprise Applications
- HTTP Communication
- Authentication
- Interceptors
- Observability
- Reliability Engineering
- Angular Architecture
- Senior Angular Interviews

---

# First Principles

A common misconception is:

```text
Errors Are Exceptional
```

In production systems:

```text
Errors Are Normal
```

Examples:

```text
Network Failures

Server Failures

Expired Tokens

Validation Failures

Timeouts

Database Issues

Third-Party Service Outages
```

A good application is not judged by how it behaves when everything works.

It is judged by:

```text
How Gracefully It Handles Failure
```

---

# What Is Error Handling Strategy?

Error Handling Strategy is:

> A structured approach for detecting, classifying, handling, logging, monitoring, and recovering from failures.

---

# Goals Of Error Handling

```text
Protect User Experience

Prevent Application Crashes

Enable Recovery

Provide Meaningful Feedback

Support Monitoring

Improve Debugging
```

---

# What Can Go Wrong?

Imagine:

```http
GET /employees
```

Potential failures:

```text
No Internet

DNS Failure

Server Down

Timeout

401 Unauthorized

403 Forbidden

404 Not Found

500 Internal Server Error

Malformed JSON

Angular Runtime Exception
```

---

# Error Classification

One of the most important senior-level concepts.

---

# Category 1: Runtime Errors

Errors occurring inside Angular.

---

Example

```typescript
user.name.toUpperCase();
```

when:

```typescript
user === undefined
```

---

Result

```text
TypeError
```

---

Examples

```text
Cannot Read Property

Null Reference

Template Errors

JavaScript Exceptions
```

---

# Category 2: Network Errors

Communication never reaches backend.

---

Examples

```text
No Internet Connection

DNS Failure

Connection Refused

Timeout
```

---

Angular often reports:

```typescript
status === 0
```

---

# Category 3: Authentication Errors

Example

```http
401 Unauthorized
```

---

Meaning

```text
Identity Cannot Be Verified
```

---

Causes

```text
Expired Token

Invalid Token

Missing Token
```

---

# Category 4: Authorization Errors

Example

```http
403 Forbidden
```

---

Meaning

```text
Authenticated

But Not Allowed
```

---

Examples

```text
Insufficient Role

Missing Permission
```

---

# Category 5: Business Validation Errors

Business rules violated.

---

Examples

```text
Employee Already Exists

Salary Cannot Be Negative

Project Already Closed
```

---

Typical Status

```http
400 Bad Request
```

---

# Category 6: Server Errors

Backend failed unexpectedly.

---

Examples

```http
500 Internal Server Error

502 Bad Gateway

503 Service Unavailable
```

---

Meaning

```text
Server Problem
```

---

# Error Handling Pyramid

Errors should be handled at appropriate layers.

```text
Global Error Handler
         ↑

HTTP Interceptors
         ↑

Services
         ↑

Components
```

---

# Guiding Principle

```text
Handle Errors
As High As Reasonably Possible
```

Avoid duplicated handling logic.

---

# Poor Error Handling

Example

```typescript
this.employeeService
    .getEmployees()
    .subscribe({

      next: result => {},

      error: error => {}

    });
```

Repeated everywhere:

```text
Employees Component

Projects Component

Dashboard Component

Settings Component
```

---

Problems

```text
Code Duplication

Inconsistent UX

Maintenance Issues
```

---

# Good Error Handling

Centralize:

```text
Authentication Errors

Authorization Errors

Logging

Monitoring

Error Mapping
```

---

# Layer 1: Component-Level Handling

Used for:

```text
UI-Specific Reactions
```

---

Example

```typescript
loadEmployees() {

  this.employeeService
      .getEmployees()
      .subscribe({

         next: result => {

           this.employees = result;

         },

         error: () => {

           this.errorMessage =
             'Unable to load employees';

         }

      });

}
```

---

Use For

```text
Validation Messages

View-Specific Messages

Screen-Specific UX
```

---

Avoid Using For

```text
Token Refresh

Authentication

Logging

Monitoring
```

---

# Layer 2: Service-Level Handling

Services may transform technical errors into business errors.

---

Example

```typescript
getEmployees() {

  return this.http
      .get<Employee[]>('/employees')
      .pipe(

        catchError(error => {

          return throwError(
            () =>
              new Error(
                'Employee Service Failed'
              )
          );

        })

      );

}
```

---

Benefits

```text
Centralized Service Logic

Reusable

Consistent
```

---

# Layer 3: HTTP Interceptor

One of the most important enterprise patterns.

---

Why?

Interceptor sees:

```text
Every Request

Every Response

Every HTTP Error
```

---

Perfect For

```text
401 Handling

403 Handling

Global Logging

Token Refresh

Error Mapping
```

---

# Global Error Interceptor

```typescript
@Injectable()
export class ErrorInterceptor
implements HttpInterceptor {

  intercept(req, next) {

    return next.handle(req)

      .pipe(

        catchError(error => {

          switch(error.status) {

            case 401:
              break;

            case 403:
              break;

            case 500:
              break;

          }

          return throwError(
            () => error
          );

        })

      );

  }

}
```

---

# Why Interceptors?

Without interceptor:

```text
401 Logic

Repeated Everywhere
```

---

With interceptor:

```text
Single Place
```

---

# Handling 401 Unauthorized

Most common enterprise scenario.

---

Typical Cause

```text
Access Token Expired
```

---

Flow

```text
API Returns 401

↓

Interceptor Detects

↓

Refresh Token Request

↓

New Access Token Issued

↓

Original Request Retried

↓

User Continues Working
```

---

User Experiences

```text
No Interruption
```

---

# Handling 403 Forbidden

Example

```http
403 Forbidden
```

---

Meaning

```text
User Is Authenticated

But Lacks Permission
```

---

Typical UX

```text
Access Denied Page

Permission Warning

Feature Hidden
```

---

# Handling 404 Not Found

Example

```http
404 Not Found
```

---

Example Scenario

```text
Employee Does Not Exist
```

---

Do NOT treat every 404 as a system crash.

---

Better UX

```text
Employee Not Found
```

instead of:

```text
Application Failed
```

---

# Handling 500 Internal Server Error

Example

```http
500 Internal Server Error
```

---

Never expose raw server details.

---

Bad

```text
Object Reference Not Set...
```

---

Good

```text
Something Went Wrong

Please Try Again Later
```

---

# Error Mapping

Enterprise applications often standardize backend errors.

---

Backend

```json
{
  "code": "EMPLOYEE_EXISTS",
  "message": "Employee already exists"
}
```

---

Frontend Mapping

```typescript
{
  userMessage:
    'Employee already exists.'
}
```

---

Benefits

```text
Consistent UX

Standardized Error Handling

Localization Support
```

---

# Retry Strategy

Important senior interview topic.

---

Not every error should be retried.

---

Good Retry Candidates

```text
Network Failures

Temporary Server Errors

Timeouts
```

---

Example

```typescript
http.get(...)

.pipe(
  retry(3)
)
```

---

# Retry With Delay

```typescript
retry({
  count: 3,
  delay: 1000
})
```

---

# What Should NOT Be Retried?

Do not automatically retry:

```http
400

401

403
```

---

Reason

```text
Retrying Won't Fix The Problem
```

---

# Exponential Backoff

Enterprise systems frequently use:

```text
1s

2s

4s

8s
```

between retries.

---

Benefits

```text
Reduce Server Pressure

Avoid Retry Storms
```

---

# Angular Global ErrorHandler

Angular provides:

```typescript
ErrorHandler
```

---

Purpose

```text
Catch Unhandled Runtime Errors
```

---

Example

```typescript
@Injectable()
export class GlobalErrorHandler
implements ErrorHandler {

  handleError(
    error: any
  ): void {

    console.error(error);

  }

}
```

---

Captures

```text
Runtime Exceptions

Template Failures

Unexpected Application Errors
```

---

Think Of It As

```text
Last Line Of Defense
```

---

# Global ErrorHandler Registration

```typescript
providers: [
  {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
  }
]
```

---

# Logging Strategy

Senior-level discussion topic.

---

Question

```text
Where Do Errors Go?
```

---

Bad

```text
Console.log()
```

only.

---

Enterprise Systems Use

```text
Azure Application Insights

Datadog

Splunk

Elastic

New Relic

Sentry
```

---

Flow

```text
Error

↓

Global Error Handler

↓

Monitoring Platform

↓

Alert

↓

Investigation
```

---

# User-Friendly Error Messages

Never expose technical details.

---

Bad

```text
Cannot Read Property 'name'
of Undefined
```

---

Good

```text
Something Went Wrong

Please Try Again Later
```

---

# Error State Pattern

Very common modern Angular pattern.

---

Instead Of

```typescript
employees = signal([]);
```

Use

```typescript
employees =
  signal<Employee[]>([]);

loading =
  signal(false);

error =
  signal<string | null>(
    null
  );
```

---

Request Starts

```typescript
loading.set(true);

error.set(null);
```

---

Success

```typescript
loading.set(false);
```

---

Failure

```typescript
loading.set(false);

error.set(
  'Unable to load employees'
);
```

---

# UI Error States

Template

```html
@if (loading()) {

  <app-spinner />

}
@else if (error()) {

  <app-error
      [message]="error()" />

}
@else {

  <app-employee-list />

}
```

---

Benefits

```text
Clear UX

Predictable States

Easy Testing
```

---

# Result Pattern

Advanced architecture approach.

---

Instead of throwing exceptions everywhere:

```typescript
throw error;
```

Return:

```typescript
type Result<T> = {

  success: boolean;

  data?: T;

  error?: string;

};
```

---

Example

```typescript
{
  success: false,
  error: 'Employee not found'
}
```

---

Benefits

```text
Explicit Failures

Predictable Behavior

Improved Testability
```

---

# Monitoring & Observability

Enterprise applications must answer:

```text
What Failed?

When Did It Fail?

Who Did It Affect?

How Often Does It Fail?
```

---

Error handling and observability work together.

---

Examples

```text
Application Insights

OpenTelemetry

Datadog

Elastic Stack
```

---

# Common Interview Questions

## What Layers Handle Errors?

```text
Component

Service

Interceptor

Global Error Handler
```

---

## Why Use HTTP Interceptors?

Centralized error processing.

---

## How Do You Handle 401?

```text
Refresh Token

Retry Request

Redirect To Login If Refresh Fails
```

---

## Difference Between 401 And 403?

401

```text
Not Authenticated
```

403

```text
Authenticated But Not Authorized
```

---

## Why Use Global ErrorHandler?

Capture unexpected runtime errors.

---

## Should Users See Technical Errors?

No.

Provide user-friendly messages.

---

## When Should Retry Be Used?

Transient failures only.

---

# Common Interview Traps

## Trap 1

Handling every error in components.

---

## Trap 2

Swallowing errors.

```typescript
catchError(() => EMPTY)
```

without logging.

---

## Trap 3

Infinite retries.

---

## Trap 4

Displaying stack traces to users.

---

## Trap 5

Treating all errors equally.

---

## Trap 6

Ignoring monitoring and observability.

---

# Enterprise Error Strategy

```text
Runtime Errors
    ↓
Global Error Handler

HTTP Errors
    ↓
Interceptor

Business Errors
    ↓
Service Layer

UI Errors
    ↓
Component Layer

Monitoring
    ↓
Observability Platform
```

---

# Senior-Level Mental Model

Error handling is not:

```text
try/catch
```

Error handling is:

```text
Detection

↓

Classification

↓

Logging

↓

Recovery

↓

User Feedback

↓

Monitoring
```

---

# Key Takeaways

1. Failures are normal in production systems.
2. Errors should be categorized (runtime, network, auth, authorization, business, server).
3. Handle errors at the highest reasonable layer.
4. Use HTTP interceptors for centralized HTTP error handling.
5. Use Angular Global ErrorHandler for unexpected runtime failures.
6. Refresh tokens should handle most 401 responses.
7. Do not expose technical details to end users.
8. Retry only transient failures.
9. Implement structured logging and monitoring.
10. Error handling, observability, and recovery are core enterprise architecture concerns.

---

# Interview Revision Sheet

```text
401
 = Not Authenticated

403
 = Not Authorized

404
 = Resource Not Found

500
 = Server Failure

Interceptor
 = Central HTTP Error Handling

Global ErrorHandler
 = Runtime Error Handling

Retry
 = Temporary Failures Only

Monitoring
 = Production Visibility

Error Handling
 = Detection + Recovery + Observability
```

---

# Complete Flow To Remember

```text
Error Occurs

↓

Classify Error

↓

Handle At Appropriate Layer

↓

Log Error

↓

Recover If Possible

↓

Show User-Friendly Message

↓

Monitor & Alert

↓

Improve System
```

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Authentication & Authorization](32-authentication-authorization.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Enterprise Architecture](34-enterprise-architecture.md)

<br/>
<!-- navigation-end -->
