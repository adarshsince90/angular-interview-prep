# Authentication, Authorization, OAuth2, OIDC & Security Deep Dive

## Why This Document Exists

Many developers regularly work with:

```text
JWT

OAuth2

OIDC

Microsoft Entra ID (Azure AD)

SSO

Sessions

Cookies

Route Guards

Access Tokens
```

Yet even experienced engineers can occasionally confuse:

```text
Authentication vs Authorization

OAuth2 vs OIDC

Session vs Cookie

JWT Signing vs Encryption

Access Token vs Refresh Token

XSS vs CSRF
```

This document focuses on:

```text
First Principles

Mental Models

Architecture Thinking

Interview Readiness
```

rather than framework-specific implementation details.

---

# Learning Objectives

By the end of this document, you should be able to confidently explain:

```text
Identity Concepts

Authentication Models

Authorization Models

JWT Internals

OAuth2

OpenID Connect (OIDC)

SSO

Azure AD / Entra ID Integration

Token Storage Strategies

Common Security Vulnerabilities

Interview Questions & Tradeoffs
```

---

# The Core Mental Model

Every Identity & Access system ultimately tries to answer two questions:

```text
1. Who Are You?

2. What Are You Allowed To Do?
```

Question 1 leads to:

```text
Authentication
```

Question 2 leads to:

```text
Authorization
```

Everything else:

```text
OAuth2

OIDC

JWT

SSO

Azure AD

Auth0

Okta
```

exists to solve one or both of these questions.

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

OTP

Biometric Authentication
```

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

Can Create Orders

Can Access Admin Portal

Can Delete Records
```

---

Important Mental Model:

```text
Authentication

↓

Authorization
```

You must know:

```text
Who A User Is
```

before deciding:

```text
What The User Can Do
```

---

# Identity Concepts

These concepts appear everywhere:

```text
JWT

OAuth

OIDC

Azure AD

.NET

Spring

Node.js
```

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
The Person
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

Hardware Security Key
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

A Principal is:

```text
Authenticated Identity
```

Flow:

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
Anonymous
```

After Login:

```text
Authenticated Principal
```

---

In .NET:

```csharp
HttpContext.User
```

represents the authenticated principal.

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
  "email": "adarsh@company.com",
  "role": "Admin",
  "department": "IT"
}
```

Common Claims:

```text
Name

Email

Role

Department

Permissions

EmployeeId
```

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

Flow:

```text
Login

↓

Authenticated

↓

Continue Using App
```

without re-entering credentials for every request.

---

# Authentication Models

Throughout history, authentication evolved significantly.

---

# Session-Based Authentication

Traditional server-side approach.

---

Flow:

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

Browser Stores SessionId Cookie
```

---

Browser Stores:

```text
SessionId=ABC123
```

Only the identifier.

---

Subsequent Requests:

```http
Cookie:
SessionId=ABC123
```

---

Server:

```text
Looks Up Session

↓

Find User

↓

Authenticate Request
```

---

Important Aha Moment

```text
Session Data
Lives On Server

Browser Only Stores Session Id
```

---

# Cookie-Based Authentication

One of the most misunderstood concepts.

---

Cookie is:

```text
Storage Mechanism
```

NOT authentication itself.

---

Cookies may contain:

```text
SessionId

JWT

Preferences

CSRF Token

Other Metadata
```

---

Relationship:

```text
Session Authentication

Typically Uses Cookies
```

---

But:

```text
Cookie
≠
Authentication Mechanism
```

---

# Token-Based Authentication

Modern SPA architecture popularized this model.

---

Flow:

```text
Login

↓

Authentication

↓

JWT Issued

↓

Token Sent With API Calls
```

---

Server no longer needs:

```text
Session State
```

for every authenticated user.

---

This introduced:

```text
Stateless Authentication
```

---

# JWT Deep Dive

JWT stands for:

```text
JSON Web Token
```

Structure:

```text
HEADER.PAYLOAD.SIGNATURE
```

Example:

```text
xxxxx.yyyyy.zzzzz
```

Three Base64 segments separated by dots.

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

Meaning:

```text
Algorithm Used

Token Type
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

Contains:

```text
Identity Information

Roles

Permissions

Claims
```

---

# Signature

Purpose:

```text
Protect Integrity
```

---

# How Signature Is Generated

A common misconception:

```text
Signature = Encryption
```

Wrong.

---

Signing and encryption solve different problems.

---

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

# HS256 Signing

Uses:

```text
Shared Secret Key
```

Known by both issuer and verifier.

---

Process:

```text
Header.Payload

↓

HMACSHA256

↓

Secret Key

↓

Signature
```

---

Verification:

```text
Header.Payload

↓

Same Secret

↓

Recalculate Signature

↓

Compare
```

If signatures differ:

```text
Token Was Modified
```

---

# RS256 Signing

Enterprise favorite.

Used by:

```text
Microsoft Entra ID

Auth0

Okta

Identity Providers
```

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

Huge Benefit:

```text
Verifiers

Never Need

Private Key
```

---

# JWT Is Signed, Not Encrypted

Most common interview question.

---

JWT provides:

✅ Integrity

✅ Authenticity

---

JWT does NOT provide:

❌ Confidentiality

---

Anybody can decode:

```text
Header

Payload
```

---

Never put:

```text
Passwords

Secrets

Sensitive Information
```

inside JWT payloads.

---

# Easy Memory Trick

Think:

```text
Passport
```

Anyone can read:

```text
Name

Date Of Birth

Country
```

---

But if someone modifies:

```text
Name

Country

Passport Number
```

the passport becomes invalid.

---

JWT behaves similarly.

---

# Access Token vs Refresh Token

Another favorite interview topic.

---

# Access Token

Purpose:

```text
Call APIs
```

Example:

```http
Authorization: Bearer token
```

---

Usually:

```text
Short Lived
```

Examples:

```text
15 Minutes

30 Minutes

60 Minutes
```

---

# Refresh Token

Purpose:

```text
Obtain New Access Token
```

without forcing users to log in again.

---

Flow:

```text
Access Token Expires

↓

Refresh Token Sent

↓

New Access Token Issued
```

---

Memory Trick:

```text
Access Token
    = Door Key

Refresh Token
    = Key Making Machine
```

---

# OAuth2 Deep Dive

Most misunderstood topic.

---

# What Problem OAuth2 Solves

OAuth2 answers:

```text
What Can This Application Access?
```

OAuth2 is fundamentally about:

```text
Authorization
```

---

Example:

```text
Employee App

Needs Access

To Microsoft Calendar
```

Question:

```text
Can This App Access Calendar?
```

OAuth2 solves:

```text
Delegated Access
```

---

Important:

```text
OAuth Does Not Identify User
```

---

OAuth is about:

```text
Permissions
```

Not identity.

---

# OpenID Connect (OIDC)

OIDC sits on top of OAuth2.

---

Question OIDC Answers:

```text
Who Is The User?
```

---

OIDC adds:

```text
Authentication
```

to OAuth2.

---

Relationship:

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

# Easiest Memory Trick

When confused:

```text
OAuth
    = What Can You Access?

OIDC
    = Who Are You?
```

---

# OAuth + OIDC Flow

Example:

```text
React App

↓

Redirect User

↓

Microsoft Entra ID

↓

User Logs In

↓

Identity Verified

↓

Authorization Granted

↓

Tokens Returned

↓

Application Uses Tokens
```

---

Very important:

```text
Application Never Sees Password
```

---

# Role-Based Access Control (RBAC)

Most common enterprise model.

---

Roles:

```text
Admin

Manager

Employee
```

---

Permissions attached to role.

---

Example:

```text
Admin

Can Delete Users

Can Manage Roles
```

---

# Permission-Based Authorization

More granular.

---

Permissions:

```text
employee.read

employee.write

employee.delete
```

---

Benefits:

```text
Fine-Grained Control
```

---

# Attribute-Based Authorization (ABAC)

More advanced.

---

Decision based on:

```text
Department

Location

Clearance

Environment
```

---

Example:

```text
User Can Access Employee

Only If Same Department
```

---

# Secure Token Storage

Critical interview topic.

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
Accessible By JavaScript

Vulnerable To XSS
```

---

# Session Storage

Advantages:

```text
Per Browser Tab
```

---

Disadvantages:

```text
Still Accessible By JavaScript
```

---

# In Memory

Advantages:

```text
Not Persisted

Difficult To Steal Persistently
```

---

Disadvantages:

```text
Lost On Refresh
```

---

# HttpOnly Secure Cookie

Preferred enterprise choice in many architectures.

---

Advantages:

```text
JavaScript Cannot Read

Better XSS Protection
```

---

Disadvantages:

```text
Requires CSRF Protection
```

---

# Single Sign-On (SSO)

SSO means:

```text
Login Once

Access Multiple Applications
```

---

Flow:

```text
User

↓

Microsoft Entra ID

↓

Application A

Application B

Application C
```

---

User authenticates once.

Applications trust same Identity Provider.

---

# Azure AD / Microsoft Entra ID Integration

Enterprise applications commonly integrate with:

```text
Microsoft Entra ID
```

---

Flow:

```text
Angular / React App

↓

Redirect To Entra ID

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

Benefits:

```text
SSO

Central Identity

RBAC

Enterprise Governance
```

---

Common Libraries

Angular:

```text
MSAL Angular
```

React:

```text
MSAL React
```

---

# Route Guards Are Not Security

A common mistake.

---

Wrong:

```text
Route Guard

Provides Security
```

---

Correct:

```text
Route Guard

Provides Better User Experience
```

---

Example:

```text
Hide Admin Screen
```

Useful.

---

But:

```text
Backend Must Still Validate Permissions
```

---

Real security always lives on the backend.

---

# Security Vulnerabilities

---

# XSS (Cross-Site Scripting)

Goal:

```text
Execute Malicious JavaScript
```

---

Flow:

```text
Attacker Injects Script

↓

Browser Executes Script
```

---

Example:

```html
<script>
stealData()
</script>
```

---

Memory Trick:

```text
XSS

=

Run Malicious Code
```

---

Why Dangerous?

Attacker gains access to:

```text
DOM

Local Storage

Session Storage

User Context

API Calls
```

---

# CSRF (Cross-Site Request Forgery)

Very different attack.

---

Goal:

```text
Trick Browser

Into Sending Request
```

---

Example:

```text
User Logged Into Bank

↓

Visits Evil Website

↓

Browser Sends Request

↓

Bank Trusts Existing Cookie
```

---

Memory Trick:

```text
CSRF

=

Forge Authenticated Request
```

---

# XSS vs CSRF

## XSS

Goal:

```text
Run Code
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
Send Request
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
Access Something You Shouldn't
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
Unexpected Actions
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

JWT Is Usually Signed
```

---

## Access Token vs Refresh Token?

Access Token:

```text
Used To Call APIs
```

Refresh Token:

```text
Used To Obtain New Access Tokens
```

---

## Where Should JWT Be Stored?

Strong interview answer:

```text
HttpOnly Secure Cookies

or

Short-Lived Memory Storage

Depending On Architecture
```

Explain tradeoffs.

---

## Can Frontend Enforce Security?

```text
No
```

Frontend can:

```text
Hide UI

Improve UX
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

Azure AD

SSO

Cookies

Sessions
```

is simply implementation detail.

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

Identity Layer
On Top Of OAuth
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
Frontend Improves UX

Backend Enforces Security
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
    = Preferred Enterprise Token Storage

SSO
    = One Login, Many Applications
```