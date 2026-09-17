# Services

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

# What Is a Service?

A Service is a reusable TypeScript class that contains business logic, shared functionality, or data-access logic that can be used across multiple Components.

Think of:

```text
Component
=
Presentation Layer

Service
=
Business Logic Layer
```

Services help keep Components focused on UI responsibilities.

---

# Why Do Services Exist?

Imagine a Component like:

```typescript
export class EmployeeComponent {

  employees = [];

  loadEmployees() {
  }

  validateEmployee() {
  }

  calculateSalary() {
  }

  exportReport() {
  }
}
```

Initially this looks fine.

As the application grows:

```text
More API Calls
More Validation
More Business Rules
More Data Transformations
```

The Component becomes:

```text
Large
Difficult to Test
Difficult to Maintain
Difficult to Reuse
```

Angular solves this problem through Services.

---

# First Principles

A Component should answer:

```text
How should this UI behave?
```

A Service should answer:

```text
How does the application perform business operations?
```

---

# Before Services

```text
EmployeeComponent

├── UI Logic
├── API Calls
├── Validation
├── Calculations
├── Caching
└── Formatting
```

Everything is mixed together.

---

# After Services

```text
EmployeeComponent
        ↓
EmployeeService
```

Responsibilities become clear and maintainable.

---

# Angular Architecture Perspective

High-Level Flow:

```text
User
 ↓
Component
 ↓
Service
 ↓
API
 ↓
Database
```

Services sit between the Component layer and the infrastructure layer.

---

# .NET Comparison

ASP.NET Core:

```csharp
EmployeeController
        ↓
IEmployeeService
```

Angular:

```text
EmployeeComponent
        ↓
EmployeeService
```

Very similar architectural thinking.

---

# Typical Service Example

```typescript
@Injectable()
export class EmployeeService {

  getEmployees() {
  }

  createEmployee() {
  }

  updateEmployee() {
  }

  deleteEmployee() {
  }
}
```

The Component delegates work to the Service.

---

# What Responsibilities Belong in a Service?

Services commonly contain:

## API Communication

Examples:

```text
Load Employees
Save Employees
Delete Employees
```

---

## Business Logic

Examples:

```text
Salary Calculation
Discount Rules
Eligibility Checks
Permission Logic
```

---

## Validation

Examples:

```text
Domain Validation
Business Validation
Workflow Validation
```

---

## State Management

Examples:

```text
Current User
Application Theme
Selected Employee
```

Services often act as central state containers.

---

## Caching

Examples:

```text
Employee Cache
Lookup Data Cache
Configuration Cache
```

---

## Shared Functionality

Examples:

```text
Export Logic
Notification Logic
Date Utilities
Logging Helpers
```

---

# What Should NOT Belong in a Service?

Avoid placing:

```text
Templates
HTML Markup
CSS Styling
Layout Logic
DOM Manipulation
```

inside Services.

Those belong in Components and Templates.

---

# Component vs Service

## Component

Responsibilities:

```text
Display Data
Capture Events
Manage UI State
Render Templates
```

---

## Service

Responsibilities:

```text
Business Logic
Data Access
Shared Functionality
Caching
Cross-Component Reuse
```

---

# Real Enterprise Example

Employee Portal

Without Services:

```text
EmployeeListComponent

Calls API
Validates Data
Formats Data
Caches Data
```

---

```text
EmployeeDetailsComponent

Calls API Again
Repeats Validation
Repeats Formatting
```

Duplication appears quickly.

---

# Reusable Service Approach

```text
EmployeeListComponent
           ↓
       EmployeeService
           ↑
EmployeeDetailsComponent
```

Multiple Components share the same implementation.

---

# Benefits of Services

## Reusability

Write once.

Use everywhere.

---

## Maintainability

Business logic exists in one place.

---

## Testability

Services can be tested independently.

---

## Separation of Concerns

Clear boundaries between:

```text
UI
Business Logic
Infrastructure
```

---

## Scalability

Applications remain easier to evolve.

---

# Service Lifecycle

Question:

How many instances of a Service exist?

Answer:

It depends on where it is provided.

Most commonly:

```typescript
@Injectable({
  providedIn

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Directives](08-directives.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Dependency Injection (DI)](10-dependency-injection.md)

<br/>
<!-- navigation-end -->
