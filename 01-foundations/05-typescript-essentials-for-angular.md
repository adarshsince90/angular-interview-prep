# TypeScript Essentials for Angular

## Interview Priority

**Must Know**

## Interview Frequency

**Very Common**

## Recommended Depth

**Strong Understanding**

## Relevant For

- Mid-Level Interviews
- Senior Developer Interviews
- Lead Developer Interviews

---

# What Is TypeScript?

TypeScript is a superset of JavaScript that adds features such as:

- Static Typing
- Interfaces
- Access Modifiers
- Generics
- Decorators
- Better Tooling Support

TypeScript code is compiled into JavaScript before running in the browser.

---

# Why Angular Chose TypeScript

Angular targets large enterprise applications.

Google needed a solution that provided:

- Type Safety
- Scalability
- Maintainability
- Refactoring Support
- Better Tooling
- Dependency Injection Support
- Metadata Support

TypeScript provides all these capabilities.

---

# First Principles

Imagine a large Angular application:

```text
500 Components
200 Services
100 APIs
50 Developers
```

With plain JavaScript:

```javascript
function saveUser(user) {
}
```

Questions:

```text
What is user?
Customer?
Employee?
Admin?
String?
Object?
```

Nobody knows.

TypeScript introduces contracts and type information.

Example:

```typescript
function saveUser(user: User) {
}
```

Now:

- Developers know the expected data
- IDE understands the contract
- Compiler can validate usage

---

# Why TypeScript Matters in Angular

Angular heavily relies on TypeScript for:

```text
Components
Services
Dependency Injection
Routing
Decorators
Metadata
HTTP Responses
Observables
```

Most Angular classes are simply TypeScript classes enhanced with Angular features.

---

# Angular-Relevant TypeScript Features

This chapter focuses only on TypeScript features Angular heavily depends on.

```text
Classes
Interfaces
Types
Access Modifiers
Generics
Decorators
Metadata
Dependency Injection Support
```

---

# 1. Classes

## What Is a Class?

A class is a blueprint for creating objects.

A class typically contains:

```text
Properties
Methods
Behavior
```

Example:

```typescript
export class Employee {
  id: number = 0;
  name: string = '';

  save(): void {
    console.log('Employee Saved');
  }
}
```

---

## Why Classes Matter in Angular

Angular is built around classes.

Examples:

```typescript
@Component(...)
export class EmployeeComponent {}
```

```typescript
@Injectable()
export class EmployeeService {}
```

```typescript
export class Employee {}
```

Components and Services are fundamentally TypeScript classes.

---

## Angular Perspective

Angular does not create a new programming model.

Instead:

```text
TypeScript Class
+
Angular Metadata
=
Angular Component / Service
```

---

# 2. Interfaces

## What Is an Interface?

An Interface defines a contract.

It describes:

```text
What should exist
```

but not:

```text
How it works
```

Example:

```typescript
export interface Employee {
  id: number;
  name: string;
}
```

---

## Why Interfaces Exist

Suppose an API returns:

```json
{
  "id": 1,
  "name": "Adarsh"
}
```

We can describe that structure:

```typescript
interface Employee {
  id: number;
  name: string;
}
```

Now all developers understand the shape of the object.

---

## Angular Usage

Interfaces are extremely common for:

```text
API Responses
Request Models
DTOs
Configuration Objects
View Models
```

Example:

```typescript
getEmployee(): Observable<Employee>
```

---

# Interface vs Class

## Interface

```typescript
interface Employee {
  id: number;
}
```

Contains:

```text
Contract Only
```

---

## Class

```typescript
class Employee {
  id = 0;

  save() {}
}
```

Contains:

```text
Data
Behavior
Implementation
```

---

# 3. Types

## What Is a Type?

Types provide another way to define data structures.

Example:

```typescript
type EmployeeRole =
  | 'Admin'
  | 'Manager'
  | 'Employee';
```

---

## Why Useful?

Provides stricter control over values.

Example:

```typescript
role = 'Admin';
```

Valid.

---

```typescript
role = 'SuperAdmin';
```

Invalid.

Compiler error.

---

## Angular Usage

Types are commonly used for:

```text
Union Types
State Definitions
API Models
Configuration Objects
```

---

# Interface vs Type

## Interface

Typically preferred for:

```text
Object Contracts
```

Example:

```typescript
interface Employee {
  id: number;
}
```

---

## Type

More flexible.

Supports:

```typescript
type Status =
    'Active'
  | 'Inactive';
```

and:

```typescript
type EmployeeId = number;
```

Both are commonly used in Angular projects.

---

# 4. Access Modifiers

Access Modifiers control visibility.

Angular uses these heavily.

---

## Public

Accessible from everywhere.

```typescript
public name = 'Adarsh';
```

Often optional because public is the default.

---

## Private

Accessible only inside the class.

```typescript
private apiUrl = '/api/employees';
```

---

### Angular Example

```typescript
constructor(
  private employeeService: EmployeeService
) {}
```

Common Angular pattern.

---

## Protected

Accessible inside:

```text
Class
Derived Classes
```

Example:

```typescript
protected loadData() {}
```

Less common but useful for inheritance scenarios.

---

## Readonly

Value cannot be modified after initialization.

Example:

```typescript
readonly apiUrl = '/api/employees';
```

---

# Why Access Modifiers Matter

Benefits:

```text
Encapsulation
Code Safety
Clear Intent
Better Maintainability
```

---

# 5. Generics

## What Problem Do Generics Solve?

Without Generics:

```typescript
function getData(): any
```

Return type is unknown.

---

With Generics:

```typescript
function getData<T>()
```

The caller decides the type.

---

# Angular Examples

## HttpClient

```typescript
http.get<Employee>()
```

Angular now understands:

```text
Response = Employee
```

---

## Observable

```typescript
Observable<Employee>
```

---

```typescript
Observable<Employee[]>
```

---

# Why Angular Uses Generics

Generics provide:

```text
Strong Typing
Compile-Time Validation
Better Tooling
Safer Refactoring
```

They are used extensively throughout Angular APIs.

---

# 6. Decorators

Decorators are one of Angular's most important TypeScript features.

---

# Problem

Angular sees:

```typescript
export class EmployeeComponent {}
```

How does Angular know:

```text
Component?
Service?
Directive?
Pipe?
```

It cannot know.

---

# Solution

Decorators.

Example:

```typescript
@Component({
  selector: 'app-employee'
})
export class EmployeeComponent {}
```

Decorator supplies additional information.

---

# Common Angular Decorators

## Component

```typescript
@Component()
```

Marks a class as a Component.

---

## Injectable

```typescript
@Injectable()
```

Marks a class as a Service.

---

## Input

```typescript
@Input()
```

Receives data from Parent Components.

---

## Output

```typescript
@Output()
```

Sends events to Parent Components.

---

## ViewChild

```typescript
@ViewChild()
```

Accesses child elements or Components.

---

# Why Decorators Matter

Decorators allow Angular to attach framework behavior to TypeScript classes.

Without Decorators, Angular would not know how classes should participate in the framework.

---

# 7. Metadata

## What Is Metadata?

Metadata means:

```text
Data About Data
```

or

```text
Information About a Class
```

---

# Example

```typescript
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
```

This configuration is Metadata.

---

# What Metadata Tells Angular

Examples:

```text
Component Selector
Template
Styles
Providers
Dependencies
Routing Information
```

Angular uses this metadata during compilation and runtime.

---

# Why Metadata Is Important

Without Metadata Angular would not know:

```text
Which classes are Components
Which classes are Services
Which template belongs to which Component
```

Metadata drives Angular's behavior.

---

# 8. Dependency Injection Support

One of the strongest reasons Angular benefits from TypeScript.

---

# Example

```typescript
constructor(
  private employeeService: EmployeeService
) {}
```

Question:

How does Angular know what to inject?

---

Angular sees:

```typescript
EmployeeService
```

and uses type information plus framework metadata to resolve dependencies.

---

# Dependency Injection Flow

```text
Component

      │

      ▼

Constructor Parameter

      │

      ▼

EmployeeService

      │

      ▼

Angular Injector

      │

      ▼

Instance Supplied
```

---

# ASP.NET Core Comparison

ASP.NET Core:

```csharp
public EmployeeController(
    IEmployeeService service)
{
}
```

Angular:

```typescript
constructor(
   private service: EmployeeService
)
{}
```

Conceptually the same pattern.

---

# How These Concepts Fit Together

```text
TypeScript Class
        ↓

Decorator
        ↓

Metadata
        ↓

Angular Understands Class

        ↓

Dependency Injection

        ↓

Templates

        ↓

Routing

        ↓

Application Executes
```

Most Angular features build upon these TypeScript foundations.

---

# Modern Angular (16+)

Modern Angular still heavily relies on:

```text
Classes
Interfaces
Types
Generics
Decorators
Metadata
Dependency Injection
```

Additionally introduces:

```typescript
signal()
computed()
effect()
```

for reactive state management.

---

# Legacy Angular Approach

The same TypeScript concepts were used before Angular 16.

Differences mainly involved:

```text
NgModules
Older Template Syntax
RxJS-Heavy Patterns
```

The TypeScript foundations remain largely unchanged.

---

# Why Angular Did Not Move Away From Classes

Many modern frameworks increasingly favor functions.

Angular continues to use classes because they work naturally with:

```text
Dependency Injection
Decorators
Metadata
Object-Oriented Design
Enterprise Development
```

This aligns with Angular's enterprise focus.

---

# Common Interview Questions

## Why does Angular use TypeScript?

To provide:

- Type Safety
- Better Tooling
- Refactoring Support
- Dependency Injection Support
- Decorators
- Metadata

---

## Interface vs Type?

Interface:

- Object contract

Type:

- More flexible
- Supports unions and intersections

---

## Interface vs Class?

Interface:

- Contract only

Class:

- Data and behavior

---

## What are Decorators?

Functions that attach metadata to classes, properties, methods, or parameters.

---

## Why is Metadata important?

Angular uses metadata to understand how a class should participate in the framework.

---

## How does Dependency Injection benefit from TypeScript?

Type information helps Angular identify and resolve

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Angular Architecture Overview](04-angular-architecture-overview.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Angular Components](../02-core-angular/06-angular-components.md)

<br/>
<!-- navigation-end -->
