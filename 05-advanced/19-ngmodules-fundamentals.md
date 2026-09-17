# NgModules Fundamentals

## Interview Priority

**Important**

## Interview Frequency

**Common**

## Recommended Depth

**Senior Level Understanding**

## Relevant For

- Legacy Angular Applications
- Enterprise Applications
- Angular 2-15 Era
- Migration Projects
- Senior Developer Interviews

---

# First Principles

Before Standalone Components existed, Angular needed a way to organize:

```text
Components

Directives

Pipes

Services

Dependencies
```

Angular solved this problem using:

```typescript
@NgModule()
```

Think of a module as:

```text
Application Registry
```

that tells Angular:

```text
What Exists

What Can Be Used

What Can Be Shared

What Can Be Injected
```

---

# What Is An NgModule?

Example:

```typescript
@NgModule({

  declarations: [],

  imports: [],

  exports: [],

  providers: []

})
export class EmployeeModule {
}
```

Each section has a specific purpose.

---

# NgModule Anatomy

```typescript
@NgModule({

   declarations: [],

   imports: [],

   exports: [],

   providers: []

})
```

Remember:

```text
Declarations
   ↓
I Created It

Imports
   ↓
I Use It

Exports
   ↓
Others Can Use It

Providers
   ↓
Angular Can Inject It
```

---

# declarations

## Purpose

Register things that YOU created.

---

# What Goes Into declarations?

```typescript
@Component(...)
```

```typescript
@Directive(...)
```

```typescript
@Pipe(...)
```

---

Example

```typescript
@Component(...)
export class EmployeeComponent {}

@Component(...)
export class EmployeeDetailsComponent {}

@Directive(...)
export class HighlightDirective {}

@Pipe(...)
export class EmployeeFilterPipe {}
```

---

Register

```typescript
@NgModule({

  declarations: [

    EmployeeComponent,

    EmployeeDetailsComponent,

    HighlightDirective,

    EmployeeFilterPipe

  ]

})
```

---

# Why Is declarations Needed?

Suppose:

```html
<app-employee>
</app-employee>
```

Question:

```text
How does Angular know
what app-employee is?
```

Answer:

```text
Because it was declared
inside a module.
```

---

# Mental Model

```text
declarations

=

Things I Created
```

---

# imports

## Purpose

Use things created somewhere else.

---

Common examples:

```typescript
CommonModule

FormsModule

ReactiveFormsModule

RouterModule
```

---

Example

```typescript
@NgModule({

  imports: [

    CommonModule,

    FormsModule,

    ReactiveFormsModule

  ]

})
```

---

# Why Is imports Needed?

Template:

```html
<div *ngIf="loading">

</div>
```

Where does:

```typescript
*ngIf
```

*ome from?

Not your component.

It comes from:

```typescript
CommonModule
```

Therefore:

```typescript
imports: [
  CommonModule
]
```

---

# Another Example

Template:

```html
<form [formGroup]="form">
<form>
```

Requires:

```typescript
ReactiveFormsModule
```

inside:

```typescript
imports:[]
```

---

## Mental Model

```text
imports

=

Things Others Created

That I Want To Use
```

---

# exports

## Purpose

Make things available to other modules.

---

Example

```typescript
@NgModule({
  declarations: [

    EmployeeComponent

  ],

  exports: [

    EmployeeComponent

  ]

})
```

---

Now other modules can use:

```html
<app-employee>
</app-employee>
```
---

# Why exports Exists

Without exports:

```text
Module A
```

cannot automatically use:

```text
Module B Components
```

---

# Mental Model

```text
exports

=

Make Public
```

---

# providers

Usually the most misunderstood section.
---

# Purpose

Register services with Angular's Dependency Injection container.

---

Example Service

```typescript
@Injectable()
export class EmployeeService {}
```

---

*egister

```typescript
@NgModule({
  providers: [

    EmployeeService

  ]

})
```

---

# Why?

Component:

```typescript
constructor(

* private employeeService:
   EmployeeService

})
```

Angular asks:

```text
Who Provides EmployeeService?
```

Answer:
```typescript
providers:[
   EmployeeService
]
```

---

# Mental Model

```text
providers

=

Dependency Injection Registrations
```

---

# Dependency Injection Flow

```text
Component

    ↓ asks for

EmployeeService

    ↓

Angular DI Container

    ↓

Provider Found

    ↓*
Service Created

    ↓

Service Injected
```

---

# Complete Example

```typescript
@NgModule({

  declarations: [

    EmployeeComponent
  ],

  imports: [

    CommonModule,

    ReactiveFormsModule

  ],
  providers: [

    EmployeeService

  ]

})
export class EmployeeModule {}
```

---

# Feature Modules
Large applications commonly organize features into modules.

---

Example

```text
EmployeeModule

AdminModule

ReportsModule

SettingsModule
```

---

Employee Module

```typescript
@NgModule({

  declarations: [

    EmployeeListComponent,

*   EmployeeDetailsComponent

  ]

})
export class EmployeeModule {}
```

---

# Shared Module

Common pattern.

Contains reusable:

```text
Components

Directives

Pipes
```
---

Example

```typescript
@NgModule({

   declarations: [

      LoadingSpinnerComponent,

      SearchBoxComponent

   ],

   exports: [
      LoadingSpinnerComponent,

 *    SearchBoxComponent

   ]

})
```

---

Used across application.

---

# Core Module Pattern

Often contains:

```text
Singleton Services

Authentication

Interceptors

Global Configuration
```

---

Example

```typescript
CoreModule
```

loaded once for the application.

---

# Common Interview Questions

## What Is An NgModule?

Organizational container that registers components, directives, pipes, dependencies, and services.

---

## Difference Between declarations And imports?
*Declarations:

```text
Things I Created
```

Imports:

```text
Things Others Created
```

that I want to use.

---

## What Goes Into providers?

Services registered for Dependency Injection.

---

## What Are exports?

Things other modules are allowed to use.

---

# Common Interview Traps

## Trap 1

Putting services into declarations.

Incorrect.

Services belong in:

```typescript
providers
```

---

## Trap 2

Declaring same component in multiple modules.

Not allowed.

---

## Trap 3

Confusing imports with declarations.

---

# Senior-Level Summary

NgModules acted as Angular's registration and organization mechanism.

They told Angular:

```text
What Exists

What Is Shared

What Can Be Used

What Can Be Injected
```
For many years they were the backbone of Angular architecture.

---

## Key Takeaways

1. NgModules organized Angular applications.
2. declarations register components, directives, and pipes.
3. imports bring in external functionality.
4. exports make functionality available to other modules.
5. providers register services for dependency injection.
6. Feature Modules improve scalability.
7. Shared Modules support reuse.
8. Core Modules provide application-wide services.
9. NgModules remain important in many enterprise applications.
10. Understanding NgModules makes Standalone Components easier to understand.

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Signal-Based Component APIs](../04-reactivity/18a-signal-based-component-apis.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Standalone Components](20-standalone-components.md)

<br/>
<!-- navigation-end -->
