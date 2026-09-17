# HTTP Interceptors

## Interview Priority

**Must Know**

## Interview Frequency

**Very High**

## Recommended Depth

**Expert Level Understanding**

## Relevant For

- Enterprise Applications
- Authentication
- Authorization
- HTTP Communication
- Global Error Handling
- Logging
- Observability
- Performance
- Senior Angular Interviews

---

# First Principles

Before understanding HTTP Interceptors, let's understand the problem they solve.

Consider an application that makes many API calls:

```typescript
this.http.get('/employees');

this.http.get('/projects');

this.http.post('/employees');

this.http.put('/settings');

this.http.delete('/reports/10');
```

Every request may need:

```text
JWT Token

Correlation ID

Request Logging

Error Handling

Loading Indicator

API Version Header
```

---

# Traditional Approach

Handle everything manually.

```typescript
this.http.get(
  '/employees',
  {
    headers: {
      Authorization:
         `Bearer ${token}`
    }
  }
);
```

---

Every request repeats the same code.

```typescript
this.http.get(...)
this.http.post(...)
this.http.put(...)
this.http.delete(...)
```

---

# Problems

```text
Code Duplication

Maintenance Difficulties

Inconsistent Header Usage

Repeated Error Handling

Poor Architecture
```

---

# Solution

Use:

```typescript
HTTP Interceptors
```

---

# What Is An HTTP Interceptor?

An HTTP Interceptor is:

> Middleware that intercepts outgoing HTTP requests and incoming HTTP responses.

---

# Mental Model

```text
Component

↓

HttpClient

↓

Interceptor

↓

Backend

↓

Interceptor

↓

Component
```

---

Think of an Interceptor as:

```text
Airport Security Checkpoint
```

Every passenger passes through security.

Similarly:

```text
Every HTTP Request

↓

Interceptor
```

---

# HttpClient Request Lifecycle

Understanding where interceptors fit.

---

```text
Component

↓

HttpClient

↓

Interceptor Pipeline

↓

Backend API

↓

Interceptor Pipeline

↓

Component
```

---

# Full Request Flow

```text
Component

↓

HttpClient

↓

Auth Interceptor

↓

Logging Interceptor

↓

Error Interceptor

↓

Backend

↓

Error Interceptor

↓

Logging Interceptor

↓

Auth Interceptor

↓

Component
```

---

# Why Interceptors Exist

Common enterprise concerns:

```text
Authentication

Authorization

Logging

Observability

Caching

Error Handling

Request Tracking

Response Transformation

Loading Indicators
```

---

# Modern Angular Interceptors

Angular now prefers:

```typescript
HttpInterceptorFn
```

---

Instead of:

```typescript
HttpInterceptor
```

classes.

---

# Old Style

```typescript
@Injectable()
export class AuthInterceptor
implements HttpInterceptor {

}
```

---

# Modern Style

```typescript
export const authInterceptor:
HttpInterceptorFn = (

   req,
   next

) => {

   return next(req);

};
```

---

# Why Functional Interceptors?

Benefits:

```text
Less Boilerplate

Better Tree Shaking

Simpler Registration

Modern Angular Standard
```

---

# Understanding Parameters

## req

Represents current HTTP request.

Type:

```typescript
HttpRequest<any>
```

---

Example

```text
GET /employees
```

---

## next

Represents:

```text
Next Interceptor

or

Backend API
```

---

Calling:

```typescript
next(req)
```

means:

```text
Continue Request Processing
```

---

# Minimal Interceptor

```typescript
export const sampleInterceptor:
HttpInterceptorFn = (

 req,
 next

) => {

   return next(req);

};
```

---

No modifications occur.

Request simply continues.

---

# Registering Interceptors

Standalone Angular:

```typescript
bootstrapApplication(
  AppComponent,
  {
    providers: [

      provideHttpClient(

        withInterceptors([

          authInterceptor

        ])

      )

    ]
  }
);
```

---

# Interceptor Execution Order

Very common interview topic.

---

Registration

```typescript
withInterceptors([

  authInterceptor,

  loadingInterceptor,

  errorInterceptor

])
```

---

Request

```text
Auth

↓

Loading

↓

Error

↓

Backend
```

---

Response

```text
Backend

↓

Error

↓

Loading

↓

Auth
```

---

# Mental Model

Request:

```text
Top → Bottom
```

---

Response:

```text
Bottom → Top
```

---

# Most Common Use Case: JWT Authentication

Almost every enterprise application uses this.

---

# Problem

Backend expects:

```http
Authorization: Bearer TOKEN
```

for every request.

---

Without Interceptor

Every request contains:

```typescript
headers: {
  Authorization:
      `Bearer ${token}`
}
```

---

Repeated throughout application.

---

# Authentication Interceptor

```typescript
export const authInterceptor:
HttpInterceptorFn = (

 req,
 next

) => {

   const token =
      localStorage.getItem(
          'token'
      );

   const request =
      req.clone({

         setHeaders: {

            Authorization:
              `Bearer ${token}`

         }

      });

   return next(request);

};
```

---

# Why clone()?

Extremely common interview question.

---

# HttpRequest Is Immutable

This is invalid:

```typescript
req.headers.set(...)
```

---

Angular requests cannot be modified directly.

---

Use:

```typescript
req.clone(...)
```

instead.

---

# Why Immutability?

Benefits:

```text
Predictability

Thread Safety

No Side Effects

Consistent Pipeline Behavior
```

---

# Request Flow

```text
Component

↓

GET /employees

↓

Auth Interceptor

↓

Authorization Header Added

↓

Backend API
```

---

# Loading Indicator Interceptor

Very common enterprise requirement.

---

Desired Behavior

```text
Request Starts

↓

Show Loader

↓

Response Returns

↓

Hide Loader
```

---

Implementation

```typescript
export const loadingInterceptor:
HttpInterceptorFn = (

 req,
 next

) => {

   loaderService.show();

   return next(req).pipe(

      finalize(() => {

         loaderService.hide();

      })

   );

};
```

---

# Benefits

No component needs:

```typescript
showLoader()

hideLoader()
```

logic.

---

Everything becomes centralized.

---

# Global Error Handling

One of the most valuable interceptor use cases.

---

Without Interceptor

Every request handles errors separately.

```typescript
this.http.get(...)
   .subscribe({

      error: () => {

      }

   });
```

---

Problem:

```text
Duplicate Logic

Inconsistent Error Handling
```

---

# Error Interceptor

```typescript
export const errorInterceptor:
HttpInterceptorFn = (

 req,
 next

) => {

   return next(req).pipe(

      catchError(error => {

         console.error(error);

         return throwError(
            () => error
         );

      })

   );

};
```

---

# Handling 401 Unauthorized

Very common interview scenario.

---

Backend:

```text
401 Unauthorized
```

---

Interceptor:

```typescript
catchError(error => {

   if(error.status === 401) {

      inject(Router)
         .navigate([
            '/login'
         ]);

   }

   return throwError(
      () => error
   );

});
```

---

# Flow

```text
Token Expired

↓

401 Returned

↓

Interceptor Executes

↓

Redirect To Login
```

---

# Request Logging

Very common.

---

Implementation

```typescript
export const loggingInterceptor:
HttpInterceptorFn = (

 req,
 next

) => {

   console.log(
      req.method,
      req.url
   );

   return next(req);

};
```

---

Useful for:

```text
Debugging

Audit Trails

Diagnostics
```

---

# Logging Request And Response

```typescript
export const loggingInterceptor:
HttpInterceptorFn = (

 req,
 next

) => {

   console.log(
      'Request',
      req.url
   );

   return next(req).pipe(

      tap(() => {

          console.log(
             'Response'
          );

      })

   );

};
```

---

# Response Transformation

Interceptors can modify responses.

---

Example

Backend returns:

```json
{
  "payload": {
    "name": "John"
  }
}
```

---

Interceptor can flatten:

```json
{
  "name": "John"
}
```

before application receives it.

---

# Observability & Correlation IDs

Very common in microservices.

---

Every request carries:

```text
Correlation ID

Trace ID

Request ID
```

---

Interceptor

```typescript
const request =
   req.clone({

      setHeaders: {

        'X-Correlation-ID':
            crypto.randomUUID