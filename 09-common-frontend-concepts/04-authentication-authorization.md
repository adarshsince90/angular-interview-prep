# Authentication, Authorization, OAuth2, OIDC & Security Deep Dive

## Why This Document Exists

Many developers use:

```text
JWT

OAuth2

OIDC

Azure AD

Entra ID

SSO

Sessions

Cookies
```

daily but still occasionally get confused about:

```text
Authentication vs Authorization

OAuth vs OIDC

Session vs Cookie

Access Token vs Refresh Token

JWT Signing vs Encryption

XSS vs CSRF
```

This document focuses on first principles and the mental models required to confidently discuss these concepts during interviews and system design discussions.

---

# The Core Mental Model

Everything in Identity and Access Management ultimately tries to answer two questions:

```text
Who Are You?

What Are You Allowed To Do?
```

---

Question 1:

```text
Who Are You?
```

Leads to:

```text
Authentication
```

---

Question 2:

```text
What Are You Allowed To Do?
```

Leads to:

```text
Authorization
```

Every solution:

```text
JWT

OAuth

OIDC

Azure AD

Auth0

Okta

SSO
```

exists to solve one or both of these problems.

---

# Authentication vs Authorization

## Authentication

Authentication answers:

```text
Who Are You?
```

Examples:

```text
Username + Password

Google Login

Microsoft Login

Biometric Login

OTP
```

---

Result:

```text
Identity Established
```

---

## Authorization

Authorization answers:

```text
What Are You Allowed To Do?
```

Examples:

```text
Can View Employees

Can Approve Leave

Can Access Admin Screen

Can Delete Records
```

---

Important:

```text
Authentication Must Happen First
```

Before authorization can occur.

---

Example

```text
User Successfully Logs In
```

Authenticated:

✅ Yes

---

Can Delete Employee Records?

Authorized:

❌ No

---

# Identity Concepts

---

# Identity

Identity means:

```text
Who You Are
```

Examples:

```text
adarsh@company.com

john@contoso.com

employee123
```

Think:

```text
Person
```

---

# Credentials

Credentials are:

```text
Proof Of Identity
```

Examples:

```text
Password

OTP

Biometric

Certificate

Security Key
```

---

Analogy:

```text
Identity
    = Your Name

Credential
    = Your Passport
```

---

# Principal

Principal means:

```text
Authenticated Identity
```

Process:

```text
Identity

↓

Authentication

↓

Principal
```

---

Example:

Before Login:

```text
Anonymous User
```

After Login:

```text
Authenticated Principal
```

---

# Claims

Claims are:

```text
Facts About A Principal
```

Example:

```json
{
  "name": "Adarsh",
  "role": "Admin",
  "department": "IT"
}
```

---

Claims can contain:

```text
Name

Email

Role

Permissions

Department

EmployeeId
```

---

Think:

```text
Identity Metadata
```

---

# Session

A session represents:

```text
An Authenticated Conversation
Between User And System
```

---

Process:

```text
Login

↓

Authenticated

↓

Continue Using Application
```

without re-entering credentials every request.

---

# Authentication Models

---

# Session-Based Authentication

Traditional approach.

---

Flow

```text
Username + Password

↓

Server Validates

↓

Server Creates Session

↓

Session Stored On Server

↓

SessionId Returned

↓

Browser Stores Session Cookie
```

---

Browser contains:

```text
SessionId=ABC123
```

---

Future Requests:

```http
Cookie:
SessionId=ABC123
```

---

Server:

```text
Looks Up Session

Finds User

Authenticates Request
```

---

Aha Moment

```text
Session Data Lives On Server

Cookie Only Stores Session Identifier
```

---

# Cookie-Based Authentication

A common source of confusion.

Cookies are not authentication.

Cookies are:

```text
Storage Mechanism
```

---

Cookies may contain:

```text
Session Id

JWT

Preferences

Anti-Forgery Token
```

---

Relationship:

```text
Session Authentication

Often Uses Cookies
```

---

But:

```text
Cookie
≠
Session
```

---

# JWT Deep Dive

JWT stands for:

```text
JSON Web Token
```

---

Structure:

```text
HEADER.PAYLOAD.SIGNATURE
```

Visual:

```text
xxxxx.yyyyy.zzzzz
```

---

# Header

Contains metadata.

Example:

```json
{
  "alg": "RS256",
  "typ": "JWT"
}
```

---

Meaning:

```text
What Algorithm Was Used?
```

---

# Payload

Contains claims.

Example:

```json
{
  "sub": "123",
  "name": "Adarsh",
  "role": "Admin"
}
```

---

Contains:

```text
Identity Information

Roles

Claims

Permissions
```

---

# Signature

Purpose:

```text
Protect Integrity
```

---

Question:

```text
How Is Signature Generated?
```

Conceptually:

```text
Base64(Header)

+

Base64(Payload)

↓

Cryptographic Signing

↓

Signature
```

---

# HS256

Uses shared secret key.

```text
Header

+

Payload

↓

HMACSHA256

↓

Signature
```

---

Validation:

```text
Recalculate Signature

↓

Compare
```

---

If modified:

```text
Validation Fails
```

---

# RS256

Used by:

```text
Azure AD

Entra ID

Auth0

Okta
```

commonly.

---

Uses:

```text
Private Key
```

for signing.

---

Uses:

```text
Public Key
```

for verification.

---

Flow:

```text
Identity Provider

↓

Private Key Signs

↓

JWT Generated

↓

Applications Verify

Using Public Key
```

---

# JWT Is Signed, Not Encrypted

One of the most common interview questions.

---

JWT provides:

```text
Integrity

Authenticity
```

---

JWT does NOT provide:

```text
Confidentiality
```

---

Anyone can decode:

```text
Header

Payload
```

---

Nobody should store:

```text
Passwords

Secrets

Sensitive Data
```

inside JWT payloads.

---

# Easy Memory Trick

Think:

```text
Passport
```

Everyone can read it.

---

But if someone modifies:

```text
Country

Date Of Birth

Name
```

the passport becomes invalid.

---

JWT works similarly.

---

# OAuth2 vs OpenID Connect (OIDC)

Most misunderstood topic.

---

# OAuth2

OAuth2 answers:

```text
What Can This Application Access?
```

OAuth2 focuses on:

```text
Authorization
```

---

Example:

```text
Calendar Application

↓

Request Access

↓

Google Calendar
```

---

OAuth allows:

```text
Delegated Access
```

---

Important:

```text
OAuth Does Not Identify User
```

---

# OpenID Connect (OIDC)

OIDC sits on top of OAuth2.

OIDC answers:

```text
Who Is The User?
```

---

OIDC adds:

```text
Authentication
```

to OAuth.

---

Think:

```text
OAuth2

=

Authorization
```

---

```text
OIDC

=

Authentication

+

Authorization
```

---

# Memory Trick

If you forget:

```text
OAuth
    = What Can You Access?

OIDC
    = Who Are You?
```

---

# Access Token vs Refresh Token

---

# Access Token

Purpose:

```text
Call APIs
```

---

Usage:

```http
Authorization: Bearer token
```

---

Usually:

```text
Short Lived
```

Example:

```text
15 Minutes

30 Minutes

1 Hour
```

---

# Refresh Token

Purpose:

```text
Obtain New Access Token
```

without requiring a new login.

---

Flow:

```text
Access Token Expired

↓

Refresh Token

↓

New Access Token
```

---

Memory Trick

```text
Access Token
    = Door Key

Refresh Token
    = Key Maker
```

---

# Secure Token Storage

A major interview topic.

---

# Local Storage

Advantages:

```text
Simple

Persistent
```

---

Disadvantages:

```text
Accessible Via JavaScript

Vulnerable To XSS
```

---

# Session Storage

Advantages:

```text
Tab Scoped
```

---

Disadvantages:

```text
Accessible Via JavaScript
```

---

# In-Memory Storage

Advantages:

```text
Not Persisted

Harder To Steal Persistently
```

---

Disadvantages:

```text
Lost On Refresh
```

---

# HttpOnly Cookie

Common Enterprise Choice.

---

Advantages:

```text
JavaScript Cannot Read

Strong XSS Protection
```

---

Disadvantages:

```text
Requires CSRF Protection
```

---

# How SSO Works

SSO means:

```text
Single Sign-On
```

---

Flow:

```text
User Logs Into

Microsoft Entra ID

↓

Identity Established

↓

Access App A

↓

Access App B

↓

Access App C
```

without re-entering credentials.

---

Why?

Because:

```text
Identity Provider

Already Authenticated User
```

---

# Azure AD / Microsoft Entra ID Integration

Typical Flow:

```text
Angular / React App

↓

Redirect User

↓

Microsoft Entra ID

↓

User Authenticates

↓

ID Token

↓

Access Token

↓

Application
```

---

Frontend never sees:

```text
User Password
```

---

Libraries:

Angular:

```text
MSAL Angular
```

---

React:

```text
MSAL React
```

---

# How OAuth Flow Works

Example:

```text
Employee Portal

↓

Login With Microsoft

↓

Redirect To Entra ID

↓

Authentication

↓

Authorization Granted

↓

Access Token Returned

↓

API Calls
```

---

The application delegates authentication to the identity provider.

---

# Route Guards Are Not Security

Common misconception.

---

Wrong:

```text
CanActivate

Provides Security
```

---

Correct:

```text
CanActivate

Improves User Experience
```

---

Real security lives in:

```text
Backend Authorization Checks
```

Always.

---

# Security Vulnerabilities

---

# XSS (Cross-Site Scripting)

Goal:

```text
Inject And Execute JavaScript
```

---

Flow:

```text
Attacker Inputs Script

↓

Application Renders Script

↓

Browser Executes Script
```

---

Example:

```html
<script>
stealCookies()
</script>
```

---

Mental Model:

```text
XSS

=

Run Malicious JavaScript
```

---

# Why XSS Is Dangerous

Attacker may access:

```text
Local Storage

Session Storage

DOM

API Calls

Page Data
```

---

# CSRF (Cross-Site Request Forgery)

Different attack.

---

Goal:

```text
Trick Browser

Into Sending Request
```

---

Example:

User already logged in.

---

Attacker website causes:

```text
Transfer Money Request
```

---

Browser automatically sends:

```text
Session Cookies
```

---

Server mistakenly trusts request.

---

Mental Model:

```text
CSRF

=

Forge Request
```

---

# XSS vs CSRF

## XSS

Goal:

```text
Run JavaScript
```

---

Think:

```text
Code Injection
```

---

# CSRF

Goal:

```text
Send Fake Request
```

---

Think:

```text
Request Forgery
```

---

# Other Security Terms

## Authentication Bypass

Goal:

```text
Skip Login
```

---

## Authorization Bypass

Goal:

```text
Access Unauthorized Resource
```

---

## SQL Injection

Goal:

```text
Inject SQL Commands
```

---

## Clickjacking

Goal:

```text
Trick User Into Clicking
Unexpected Action
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

## OAuth vs OIDC?

OAuth:

```text
Authorization
```

OIDC:

```text
Authentication + Authorization
```

---

## JWT vs Session?

JWT:

```text
Stateless
```

Session:

```text
Server Stateful
```

---

## Is JWT Encrypted?

```text
No

JWT Is Signed
```

---

## Access Token vs Refresh Token?

Access Token:

```text
Call APIs
```

Refresh Token:

```text
Obtain New Access Tokens
```

---

## Where Should JWT Be Stored?

Strong answer:

```text
HttpOnly Secure Cookies
```

with discussion of trade-offs.

---

## Can Frontend Enforce Security?

```text
No
```

Frontend can:

```text
Hide UI
```

Backend must:

```text
Enforce Authorization
```

---

# Senior-Level Mental Model

Always think:

```text
Identity

↓

Authentication

↓

Principal

↓

Claims

↓

Authorization

↓

Permissions

↓

Access Control
```

Everything else:

```text
JWT

OAuth2

OIDC

SSO

Azure AD

Cookies

Sessions
```

is implementation detail.

---

# Ultimate Aha Moments

## Aha #1

```text
Authentication

=

Establish Trust
```

---

## Aha #2

```text
Authorization

=

Use Trust
```

---

## Aha #3

```text
OAuth

=

Delegated Access
```

---

## Aha #4

```text
OIDC

=

Identity Layer On Top Of OAuth
```

---

## Aha #5

```text
JWT Signature

=

Integrity Protection

Not Encryption
```

---

## Aha #6

```text
XSS

=

Run Code
```

---

## Aha #7

```text
CSRF

=

Send Request
```

---

## Aha #8

```text
Frontend Can Improve UX

Backend Must Enforce Security
```

---

# Revision Sheet

```text
Authentication
    = Who Are You?

Authorization
    = What Can You Do?

Identity
    = Person

Credentials
    = Proof Of Identity

Principal
    = Authenticated User

Claims
    = Facts About User

Session
    = Authenticated Conversation

OAuth2
    = Authorization

OIDC
    = Authentication + Authorization

JWT
    = Signed Token

Access Token
    = API Access

Refresh Token
    = Token Renewal

XSS
    = Run Malicious JavaScript

CSRF
    = Forge Authenticated Request

HttpOnly Cookie
    = Preferred Token Storage

SSO
    = One Login, Many Applications
```