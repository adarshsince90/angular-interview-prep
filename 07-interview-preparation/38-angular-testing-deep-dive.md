# Angular Testing Deep Dive

## Interview Priority

High

## Interview Frequency

Medium to High

---

# Why Testing?

Testing increases:

```text
Confidence

Maintainability

Refactoring Safety
```

---

# Testing Pyramid

```text
E2E

Integration

Unit
```

---

# Unit Testing

Tests small isolated units.

Examples:

```text
Component

Service

Pipe

Guard

Store
```

---

# TestBed

Angular testing utility.

```typescript
beforeEach(() => {

 TestBed.configureTestingModule({
 });

});
```

---

# Component Testing

Example

```typescript
it('should create component');
```

Typical assertions:

```text
DOM

Inputs

Outputs

Events
```

---

# Service Testing

Example

```typescript
EmployeeService
```

Mock:

```typescript
HttpClient
```

Verify:

```text
Method Calls

Return Values

Transformations
```

---

# Mocking Dependencies

Example

```typescript
spyOn(service, 'loadEmployees');
```

Purpose:

```text
Isolation
```

---

# HTTP Testing

Use:

```typescript
HttpTestingController
```

---

Example

```typescript
const req =
 httpMock.expectOne('/employees');
```

Verify:

```text
URL

Method

Payload
```

---

# Guard Testing

Verify:

```text
Allowed Routes

Blocked Routes

Navigation Rules
```

---

# Interceptor Testing

Verify:

```text
Headers Added

Errors Handled

Token Attached
```

---

# Async Testing

Tools

```typescript
fakeAsync()

tick()

waitForAsync()
```

---

# Signals Testing

Verify:

```text
Signal Updates

Computed Values

Effects
```

---

# Store Testing

Verify:

```text
State Changes

Actions

Selectors
```

---

# Integration Testing

Multiple components working together.

Example:

```text
Page

Store

Service
```

Interaction.

---

# E2E Testing

Tools:

```text
Playwright

Cypress
```

---

Typical Scenarios

```text
Login

Checkout

Create Employee

Generate Report
```

---

# What To Test?

Test:

✅ Business Logic

✅ Transformations

✅ User Interaction

✅ Critical Workflows

---

Avoid Excessive Testing Of:

```text
Framework Behavior
```

---

# Common Interview Questions

## Difference Between Unit And Integration Testing?

Unit:

```text
Single Unit
```

Integration:

```text
Multiple Units Together
```

---

## Why Mock Dependencies?

Isolation.

---

## What Is HttpTestingController?

Utility for HTTP testing.

---

## Why Use E2E?

Validate complete user journeys.

---

# Testing Strategy

```text
Components
→ Unit

Services
→ Unit

Pages
→ Integration

Critical Flows
→ E2E
```

---

# Senior-Level View

Testing is not:

```text
Code Coverage
```

Testing is:

```text
Risk Reduction
```

Focus on:

```text
Business-Critical Paths
```

first.

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Frontend System Design](37-frontend-system-design.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Behavioral Interview Preparation](39-behavioral-interview-preparation.md)

<br/>
<!-- navigation-end -->
