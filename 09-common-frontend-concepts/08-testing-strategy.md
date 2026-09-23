# Testing Strategy

## Why This Topic Exists

Software is built by humans.

Humans make mistakes.

---

Question:

```text
How Do We Gain Confidence
That Software Works?
```

Answer:

```text
Testing
```

---

Testing does not prove software is correct.

Testing increases confidence that software behaves as expected.

---

## Learning Objectives

By the end of this chapter you should understand:

```text
Why testing exists

Testing pyramid

Unit testing

Integration testing

End-to-end testing

Mocks

Test doubles

Test strategy

Angular testing

React testing

Enterprise testing architecture
```

---

# First Principles

Question:

```text
Will Bugs Exist?
```

Answer:

```text
Yes
```

---

Question:

```text
Can We Reduce Risk?
```

Answer:

```text
Yes
```

through testing.

---

Testing exists to increase confidence.

---

# Historical Evolution

## Stage 1

Manual testing.

Humans verify behavior.

---

## Stage 2

Automated testing.

Repeatable validation.

---

## Stage 3

CI/CD pipelines.

Tests become deployment gates.

---

## Stage 4

Enterprise Quality Engineering.

Testing becomes part of architecture.

---

# What Is Testing?

Definition:

> Executing software to verify behavior against expectations.

---

Question:

```text
What Should Happen?
```

---

Compare with:

```text
What Actually Happened?
```

---

# Testing Goals

Testing helps improve:

```text
Quality

Confidence

Maintainability

Refactoring Safety

Deployment Safety
```

---

# Testing Pyramid

Classic model.

```text
        E2E
      /     \
 Integration
   /         \
 Unit Tests
```

---

Meaning:

```text
Many Unit Tests

Some Integration Tests

Few End-To-End Tests
```

---

# Unit Testing

Smallest testing level.

---

Question:

```text
Does One Unit Work?
```

Examples:

```text
Function

Component

Service

Utility
```

---

Characteristics:

```text
Fast

Cheap

Isolated
```

---

# Integration Testing

Question:

```text
Do Multiple Parts Work Together?
```

Examples:

```text
Component + Service

API + Database

Feature Workflow
```

---

Characteristics:

```text
Moderate Speed

Higher Confidence
```

---

# End-To-End Testing

Question:

```text
Does Entire Application Work?
```

---

Examples:

```text
Login

Create Employee

Submit Leave

Generate Report
```

---

Characteristics:

```text
Slow

Expensive

Very Realistic
```

---

# Confidence vs Cost

Useful mental model.

---

Unit Tests:

```text
Low Cost

Good Confidence
```

---

Integration Tests:

```text
Medium Cost

High Confidence
```

---

E2E Tests:

```text
High Cost

Highest Confidence
```

---

# Test Doubles

Used to isolate systems.

---

## Mock

Simulates behavior.

---

## Stub

Returns predefined data.

---

## Fake

Simplified implementation.

---

## Spy

Observes interactions.

---

Interviewers love this topic.

---

# What Makes A Good Test?

Good tests are:

```text
Readable

Reliable

Fast

Independent

Deterministic
```

---

# Test Smells

Examples:

```text
Fragile Tests

Slow Tests

Duplicate Tests

Hidden Dependencies
```

---

# Arrange Act Assert

Classic structure.

---

Arrange:

```text
Prepare
```

---

Act:

```text
Execute
```

---

Assert:

```text
Verify
```

---

Most unit tests follow this pattern.

---

# Behavior vs Implementation

Bad:

```text
Testing Internals
```

---

Good:

```text
Testing Behavior
```

---

Tests should verify:

```text
What System Does
```

not:

```text
How It Does It
```

---

# Angular Perspective

Tools:

```text
TestBed

Jasmine

Karma

Jest

Spectator
```

---

Typical testing areas:

```text
Components

Services

Pipes

Guards
```

---

# React Perspective

Tools:

```text
Jest

Vitest

React Testing Library

Playwright

Cypress
```

---

React philosophy:

```text
Test User Behavior
```

---

# End-To-End Testing

Popular tools:

```text
Playwright

Cypress

Selenium
```

---

Validates:

```text
Real User Journeys
```

---

# Testing And CI/CD

Modern pipelines often enforce:

```text
Unit Tests

Integration Tests

Quality Gates
```

before deployment.

---

Testing becomes:

```text
Deployment Protection
```

---

# What Stays The Same Across Frameworks?

✅ Unit Tests

✅ Integration Tests

✅ E2E Tests

✅ Test Doubles

✅ Assertions

✅ Confidence Building

---

# What Changes Across Frameworks?

❌ Testing Libraries

❌ APIs

❌ Framework Tooling

---

# Angular ↔ React Mapping

## Component Testing

Angular

```text
TestBed
```

React

```text
React Testing Library
```

---

## Unit Testing

Angular

```text
Jasmine/Jest
```

React

```text
Jest/Vitest
```

---

## E2E Testing

Angular

```text
Playwright/Cypress
```

React

```text
Playwright/Cypress
```

Same tools frequently used.

---

# Enterprise Testing Strategy

Large organizations often follow:

```text
Unit Tests

↓

Integration Tests

↓

Contract Tests

↓

E2E Tests

↓

Production Monitoring
```

---

Quality becomes a system.

---

# Common Interview Questions

### What Is The Testing Pyramid?

Many unit tests, fewer integration tests, very few E2E tests.

---

### Unit vs Integration Tests?

Unit tests isolate.

Integration tests verify collaboration.

---

### Why Mock Dependencies?

Isolation and predictable outcomes.

---

### What Makes A Good Test?

Fast, reliable, deterministic.

---

### What Should Be Tested?

Behavior, not implementation.

---

# Common Interview Traps

## Trap 1

100% coverage means quality.

It does not.

---

## Trap 2

Testing implementation details.

---

## Trap 3

Too many E2E tests.

---

## Trap 4

No integration tests.

---

# How This Topic Evolves Into Enterprise Architecture

```text
Testing

↓

Automation

↓

CI/CD

↓

Quality Gates

↓

Engineering Excellence
```

---

# Senior-Level Mental Model

Do not think:

```text
Jest

Jasmine

Playwright

Cypress
```

Think:

```text
Risk

↓

Confidence

↓

Verification

↓

Quality
```

Testing is fundamentally a risk-reduction strategy.

---

# Key Takeaways

1. Testing increases confidence.
2. Unit tests are fastest.
3. Integration tests provide high value.
4. E2E tests validate real workflows.
5. Behavior is more important than implementation.
6. Good tests are deterministic.
7. Testing protects refactoring.
8. Testing enables safer deployments.
9. Quality is an architectural concern.
10. Testing ultimately reduces risk.

---

# Revision Sheet

```text
Testing
    = Confidence

Unit Test
    = One Unit

Integration Test
    = Multiple Units

E2E Test
    = User Journey

Mock
    = Simulated Dependency

Stub
    = Predefined Response

Spy
    = Observe Calls

Testing Pyramid
    = More Unit, Less E2E

Good Test
    = Fast + Reliable

Testing Goal
    = Reduce Risk

What Changes?
    = Tools

What Stays Same?
    = Confidence Building
```