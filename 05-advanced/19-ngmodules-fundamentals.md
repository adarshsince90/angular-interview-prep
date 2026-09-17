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

Where *oes:

```typescript
*ngIf
```

*ome from?

Not your component.

*t comes*from:

```typescript
CommonModule
*``

Therefore:

```typescript
impo*ts: [
  Common*odule
]
```

*--

# Another Example

Template:

*``html
<form [formGroup]="form">
<*form>
```

Requires:

```typescrip*
ReactiveFormsModule
```

inside:
*```typescript
imports:[]
```

---
*# Mental Model

```text*imports

=

Things*Others Created

That*I Want To Use
```

*--

# exports

*# Purpose

Make things*available to other modules.

---

*xample

```typescript
@NgModule({
*  declarations: [

    Employee*omponent

  ],

  exports: [

   *EmployeeComponent

  ]

})
```

--*

*ow other modules can use:

```html*<app-employee>
</app-employee>
```*
---

# Why exports Exists

Withou* exports:

```text
Module A
```

c*nnot automatically use:

```text
M*dule B Components
```

---

# Ment*l Model

```text
exports

=

Make *ublic
```

---

# providers

Usual*y the most misunderstood section.
*---

# Purpose

Register services *ith Angular's Dependency Injection*container.

---

Example Service

*``typescript
@Injectable()
export *lass EmployeeService {}
```

---

*egister

```typescript
@NgModule({*
  providers: [

    EmployeeServi*e

  ]

})
```

---

# Why?

Compo*ent:

```typescript
constructor(

* private employeeService:
   *Employee*ervice

**{}
*``

Angular asks:

```text
Who Pro*ides EmployeeService?
```

Answer:*
```typescript
providers:[
   Empl*yeeService
]
```

---

# Mental Mo*el

```text
providers

=

Dependen*y Injection Registrations
```

---*
# Dependency Injection Flow

```t*xt
Component

    ↓ asks for

Empl*yeeService

    ↓

Angular DI Cont*iner

    ↓

Provider Found

    ↓*
Service Created

    ↓

Service I*jected
```

---

# Complete Exampl*

```typescript
@NgModule({

  dec*arations: [

    EmployeeComponent*
  ],

  imports: [

    CommonMod*le,

    ReactiveFormsModule

  ],*
  providers: [

    EmployeeServi*e

  ]

})
export class EmployeeMo*ule {}
```

---

# Feature Modules*
Large applications commonly organ*ze features into modules.

---

Ex*mple

```text
EmployeeModule

Admi*Module

ReportsModule

SettingsMod*le
```

---

Employee Module

```t*pescript
@NgModule({

  declaratio*s: [

    EmployeeListComponent,

*   EmployeeDetailsComponent

  ]

*)
export class EmployeeModule {}
`*`

---

# Shared Module

Common pa*tern.

Contains reusable:

```text*Components

Directives

Pipes
```
*---

Example

```typescript
@NgMod*le({

   declarations: [

      Lo*dingSpinnerComponent,

      Searc*BoxComponent

   ],

   exports: [*
      LoadingSpinnerComponent,

 *    SearchBoxComponent

   ]

})
`*`

---

Used across application.

*--

# Core Module Pattern

Often c*ntains:

```text
Singleton Service*

Authentication

Interceptors

Gl*bal Configuration
```

---

Exampl*

```typescript
CoreModule
```

lo*ded once for the application.

---*
# Common Interview Questions

## *hat Is An NgModule?

Organizationa* container that registers componen*s, directives, pipes, dependencies* and services.

---

## Difference*Between declarations And imports?
*Declarations:

```text
Things I Cr*ated
```

Imports:

```text
Things*Others Created
```

that I want to*use.

---

## What Goes Into provi*ers?

Services registered for Depe*dency Injection.

---

## What Are*exports?

Things other modules are*allowed to use.

---

# Common Int*rview Traps

## Trap 1

Putting se*vices into declarations.

Incorrec*.

Services belong in:

```typescr*pt
providers
```

---

## Trap 2

*eclaring same component in multipl* modules.

Not allowed.

---

## T*ap 3

Confusing imports with decla*ations.

---

# Senior-Level Summa*y

NgModules acted as Angular's re*istration and organization mechani*m.

They told Angular:

```text
Wh*t Exists

What Is Shared

What Can*Be Used

What Can Be Injected
```
*For many years they were the backb*ne of Angular architecture.

---

* Key Takeaways

1. NgModules organ*zed Angular applications.
2. decla*ations register components, direct*ves, and pipes.
3. imports bring i* external functionality.
4. export* make functionality available to o*her modules.
5. providers register*services for dependency injection.*6. Feature Modules improve scalabi*ity.
7. Shared Modules support reu*e.
8. Core Modules provide applica*ion-wide services.
9. NgModules re*ain important in many enterprise a*plications.
10. Understanding NgMo*ules makes Standalone Components e*sier to understand.