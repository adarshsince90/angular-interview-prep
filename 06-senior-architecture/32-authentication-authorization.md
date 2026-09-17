# Authentication & Authorization

## Interview Priority

**Must Know**

## Interview Frequency

**Very High**

## Recommended Depth

**Expert Level Understanding**

## Relevant For

- Enterprise Applications
- Security
- Angular Routing
- HTTP Interceptors
- State Management
- Identity Management
- RBAC
- Angular Architecture
- Senior Angular Interviews

---

# First Principles

Before discussing JWT, Guards, Interceptors, or Access Tokens, we must understand:

```text
Why Authentication Exists

Why Authorization Exists
```

Consider an application:

```text
Employee Portal
```

Available features:

```text
View Employees

Create Employees

Update Employees

Delete Employees

Payroll

Admin Dashboard
```

Question:

```text
Can Everyone Access Everything?
```

Answer:

```text
No
```

This leads to two separate concerns:

```text
Authentication

Authorization
```

---

# Authentication vs Authorization

One of the most common interview questions.

---

# Authentication

Authentication answers:

```text
Who Are You?
```

---

Example

```text
Username

Password

Login
```

The system verifies:

```text
Are You Really Adarsh?
```

---

Authentication means:

```text
Identity Verification
```

---

Examples

```text
Username + Password

OTP

Google Login

Microsoft Login

GitHub Login

Biometric Login
```

---

# Authorization

Authorization answers:

```text
What Are You Allowed To Do?
```

---

Example

User successfully logs in.

Authentication succeeds.

---

Now system knows:

```text
User = Adarsh
```

---

Next question:

```text
Can Adarsh Delete Employees?

Can Adarsh View Payroll?

Can Adarsh Access Admin Dashboard?
```

Authorization decides.

---

# Easy Interview Answer

Authentication:

```text
Who Are You?
```

Authorization:

```text
What Can You Do?
```

---

# Real Example

```text
User Logs In Successfully
```

Authentication:

✅ Success

---

User attempts:

```text
Delete Employee
```

---

Authorization:

❌ Permission Denied

---

Result:

```http
403 Forbidden
```

---

# Authentication Evolution

Historically most applications used:

```text
Session-Based Authentication
```

Modern Single Page Applications typically use:

```text
JWT Authentication
```

Understanding both is important.

---

# Session-Based Authentication

Traditional web applications.

---

Flow

```text
Login

↓

Server Validates Credentials

↓

Session Created

↓

Session ID Returned

↓

Browser Stores Cookie

↓

Future Requests Include Session Cookie
```

---

Server stores session data.

---

Example

```text
Session Id

↓

User Information Stored On Server
```

---

Advantages

```text
Simple

Server Controlled

Easy Revocation
```

---

Disadvantages

```text
Requires Server Memory

Harder To Scale

Additional Infrastructure Required
```

---

# JWT Authentication

Modern SPA standard.

---

JWT stands for:

```text
JSON Web Token
```

---

Instead of storing session state:

```text
Server Generates Token

↓

Client Stores Token

↓

Future Requests Send Token
```

---

# Login Flow

User enters:

```text
Username

Password
```

---

Angular sends:

```http
POST /login
```

---

Backend validates credentials.

---

Success Response

```json
{
  "accessToken": "eyJ...",

  "refreshToken": "xyz..."
}
```

---

Client stores tokens.

---

User becomes authenticated.

---

# JWT Structure

JWT consists of three parts.

```text
Header

Payload

Signature
```

---

Visual Representation

```text
xxxxx.yyyyy.zzzzz
```

---

Example Payload

```json
{
  "sub": "123",

  "name": "Adarsh",

  "role": "Admin"
}
```

---

# JWT Is NOT Encryption

Common Interview Trap.

JWT is:

```text
Signed
```

Not:

```text
Encrypted
```

---

Anyone can decode:

```text
Header

Payload
```

---

But cannot alter contents without invalidating the signature.

---

Never place:

```text
Passwords

Secrets

Sensitive Data
```

inside JWT payloads.

---

# Claims

Payload values are called:

```text
Claims
```

---

Examples

```json
{
  "sub": "123",

  "name": "Adarsh",

  "role": "Admin",

  "department": "Engineering"
}
```

---

Common Claims

```text
sub

name

email

role

permissions

exp
```

---

# Access Token

Used for normal API requests.

---

Example

```http
Authorization:
Bearer eyJ...
```

---

Backend validates token.

---

If valid:

```text
Request Allowed
```

---

If expired:

```http
401 Unauthorized
```

---

# Why Access Tokens Expire

Imagine:

```text
Token Stolen
```

---

Without expiration:

```text
Attacker Has Permanent Access
```

---

Typical lifetimes:

```text
15 Minutes

30 Minutes

1 Hour
```

---

# Refresh Token

Common senior interview topic.

---

Problem:

```text
Access Token Expires
```

---

Should users login every 30 minutes?

```text
No
```

---

Refresh Token Flow

```text
Access Token Expired

↓

Send Refresh Token

↓

Server Validates Refresh Token

↓

Issue New Access Token

↓

Continue Using Application
```

---

# Why Two Tokens?

Access Token

```text
Short Lifetime

High Usage
```

---

Refresh Token

```text
Long Lifetime

Used Occasionally
```

---

Provides balance between:

```text
Security

User Experience
```

---

# Access Token vs Refresh Token

## Access Token

```text
Sent With Every Request

Short-Lived

Used For Authorization
```

---

## Refresh Token

```text
Used To Obtain New Access Tokens

Long-Lived

Not Sent With Every Request
```

---

# Token Storage

Frequently Asked Interview Question.

---

# Option 1: Local Storage

```typescript
localStorage.setItem(
  'token',
  token
);
```

---

Advantages

```text
Simple

Persistent
```

---

Risks

```text
XSS Vulnerability
```

---

# Option 2: Session Storage

```typescript
sessionStorage.setItem(
  'token',
  token
);
```

---

Advantages

```text
Per Browser Session
```

---

Still vulnerable to:

```text
XSS Attacks
```

---

# Option 3: HttpOnly Secure Cookies

Enterprise-preferred solution.

---

Advantages

```text
JavaScript Cannot Access Cookie

Better Protection Against XSS
```

---

Interview Answer

```text
HttpOnly Secure Cookies are generally preferred when architecture supports them.
```

---

# Authentication State

Angular application needs to track:

```text
Current User

Login Status

Permissions

Roles
```

---

Example

```typescript
currentUser =
  signal<User | null>(
    null
  );

isLoggedIn =
  computed(
    () => this.currentUser() !== null
  );
```

---

Authentication is fundamentally:

```text
State Management
```

---

# Auth Service

Typical Angular service.

---

```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {

}
```

---

Responsibilities

```text
Login

Logout

Refresh Token

Manage Current User

Expose Authentication State
```

---

Example Login

```typescript
login(
  credentials: LoginDto
) {

  return this.http.post(
    '/login',
    credentials
  );

}
```

---

# Auth Store Pattern

Modern Angular approach.

---

```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthStore {

  private readonly _user =
      signal<User | null>(
        null
      );

  readonly user =
      this._user.asReadonly();

  readonly isLoggedIn =
      computed(
        () => this._user() !== null
      );

}
```

---

# Authentication Interceptor

One of the most common Angular use cases.

---

# Problem

Every request requires:

```http
Authorization:
Bearer TOKEN
```

---

Bad

```typescript
http.get(...)

http.post(...)

http.put(...)
```

manually attaching token each time.

---

# Solution

Auth Interceptor

```typescript
@Injectable()
export class AuthInterceptor
implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ) {

    const token =
      this.authService
          .getToken();

    const authReq =
      req.clone({

        setHeaders: {

          Authorization:
            `Bearer ${token}`

        }

      });

    return next.handle(
      authReq
    );

  }
}
```

---

Benefits

```text
Single Place

Automatic Token Injection

Reusable
```

---

# Token Refresh Strategy

Advanced Interview Topic.

---

Scenario

```text
Token Expired
```

API Response:

```http
401 Unauthorized
```

---

Interceptor Flow

```text
Receive 401

↓

Call Refresh Endpoint

↓

Receive New Access Token

↓

Retry Original Request

↓

Return Response
```

---

User continues working.

No re-login required.

---

# Refresh Token Example

```typescript
return next.handle(req)
  .pipe(

    catchError(error => {

      if(error.status === 401) {

        return authService
           .refreshToken();

      }

      throw error;

    })

  );
```

---

# Route Protection

Authenticated APIs are not enough.

Routes must also be protected.

---

Example

```text
/dashboard
```

should only be accessible when logged in.

---

# Auth Guard

```typescript
export const authGuard:

CanActivateFn =
() => {

   const auth =
      inject(AuthService);

   return auth.isLoggedIn();

};
```

---

If not authenticated:

```text
Redirect To Login
```

---

# Route Configuration

```typescript
{
  path: 'dashboard',

  component:
      DashboardComponent,

  canActivate: [
    authGuard
  ]
}
```

---

# Authorization

Authentication verifies:

```text
Identity
```

---

Authorization verifies:

```text
Permissions
```

---

# Role-Based Access Control (RBAC)

Most common model.

---

Roles

```text
Admin

Manager

Employee

Guest
```

---

JWT Payload

```json
{
  "role": "Admin"
}
```

---

# Example Rules

```text
Admin
  Can Create

Admin
  Can Delete

Manager
  Can Edit

Employee
  Can View
```

---

Role determines access.

---

# Authorization Guard

```typescript
export const adminGuard:

CanActivateFn =
() => {

  const auth =
     inject(AuthService);

  return auth
      .hasRole('Admin');

};
```

---

Only admins can enter route.

---

# Route Configuration

```typescript
{
  path: 'admin',

  component:
      AdminComponent,

  canActivate: [
     adminGuard
  ]
}
```

---

# Permission-Based Authorization

More flexible than RBAC.

---

Instead of role:

```json
{
  "permissions": [
     "employee.read",
     "employee.create",
     "employee.update"
  ]
}
```

---

Application checks permissions directly.

---

Benefits

```text
Fine-Grained Access Control
```

---

# Permission Service Example

```typescript
hasPermission(
  permission: string
): boolean {

  return this.currentUser()
      ?.permissions
      .includes(permission)
      ?? false;

}
```

---

# Permission-Based UI

Very common enterprise requirement.

---

Example

```html
@if(
 auth.hasPermission(
     'employee.delete'
 )
) {

  <button>
     Delete
  </button>

}
```

---

Only authorized users see action.

---

# Important Security Rule

Never trust Angular authorization.

---

Bad Assumption

```text
Delete Button Hidden

↓

Application Secure
```

---

Wrong.

User can still:

```text
Call API Directly

Forge Requests

Manipulate Browser
```

---

Frontend authorization provides:

```text
User Experience
```

---

Backend authorization provides:

```text
Actual Security
```

---

# Server-Side Authorization

Always enforce permissions server-side.

---

Frontend

```text
Hide Unauthorized Actions
```

---

Backend

```text
Validate Permissions

Protect Resources

Enforce Security
```

---

Both are required.

---

# Complete Enterprise Flow

```text
User Opens App

↓

Login Screen

↓

Credentials Submitted

↓

Backend Validation

↓

JWT Issued

↓

Token Stored

↓

Auth State Updated

↓

Interceptor Adds Token

↓

Protected API Requests

↓

Guards Protect Routes

↓

Authorization Rules Applied

↓

Permission-Based UI

↓

Backend Validation
```

---

# Logout Flow

```text
User Clicks Logout

↓

Clear Access Token

↓

Clear Refresh Token

↓

Clear User State

↓

Redirect To Login
```

---

Example

```typescript
logout() {

  this.authStore.clear();

  localStorage.removeItem(
    'token'
  );

  this.router.navigate(
    ['/login']
  );

}
```

---

# Common Interview Questions

## Authentication vs Authorization?

Authentication:

```text
Who Are You?
```

Authorization:

```text
What Can You Do?
```

---

## What Is JWT?

Signed token containing identity and claims.

---

## Is JWT Encrypted?

No.

JWT is signed.

Not encrypted.

---

## What Is A Claim?

A piece of information stored inside a JWT payload.

---

## What Is Access Token?

Token used to access APIs.

---

## What Is Refresh Token?

Token used to obtain a new access token.

---

## Why Use Interceptors?

Automatically attach authentication information to requests.

---

## Why Use Guards?

Protect routes from unauthenticated users.

---

## What Is RBAC?

Role-Based Access Control.

---

## Where Should Tokens Be Stored?

Preferred answer:

```text
HttpOnly Secure Cookies
```

when possible.

---

## Should Authorization Exist Only In Angular?

No.

Backend must always enforce authorization.

---

# Common Interview Traps

## Trap 1

Confusing Authentication and Authorization.

---

## Trap 2

Thinking JWT Is Encrypted.

---

## Trap 3

Storing Secrets Inside JWT Payload.

---

## Trap 4

Trusting Frontend Authorization.

---

## Trap 5

Ignoring Refresh Token Flow.

---

## Trap 6

Not Handling Token Expiration.

---

## Trap 7

Keeping Authorization Logic Only In UI.

---

# Senior-Level Mental Model

Authentication answers:

```text
Who Are You?
```

Authorization answers:

```text
What Can You Do?
```

---

Enterprise Flow

```text
Identity

↓

JWT

↓

Auth State

↓

Interceptor

↓

Protected APIs

↓

Guards

↓

Roles

↓

Permissions

↓

Authorization

↓

Backend Enforcement
```

---

# Key Takeaways

1. Authentication verifies identity.
2. Authorization verifies permissions.
3. JWT is the most common SPA authentication mechanism.
4. JWT is signed, not encrypted.
5. Claims contain user information and permissions.
6. Access tokens should be short-lived.
7. Refresh tokens provide long-lived authentication.
8. Authentication state is application state.
9. Interceptors automatically attach tokens.
10. Guards protect routes.
11. RBAC is the most common authorization model.
12. Permission-based authorization provides more flexibility.
13. Frontend authorization improves UX.
14. Backend authorization provides actual security.
15. Authentication and Authorization are foundational enterprise architecture concepts.

---

# Interview Revision Sheet

```text
Authentication
    = Who Are You?

Authorization
    = What Can You Do?

JWT
    = Signed Token

Access Token
    = API Access

Refresh Token
    = Renew Access Token

Interceptor
    = Attach Token

Guard
    = Protect Route

RBAC
    = Role-Based Access

Permissions
    = Fine-Grained Access

Backend
    = Real Security Boundary
```

---

# Complete Flow To Remember

```text
Login

↓

JWT Issued

↓

Token Stored

↓

Interceptor Adds Token

↓

API Calls

↓

Guard Protects Routes

↓

Role/Permission Checks

↓

Backend Validates Access

↓

Response Returned
```

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [NgRx Fundamentals](31-ngrx-fundamentals.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Error Handling Strategy](33-error-handling-strategy.md)

<br/>
<!-- navigation-end -->
