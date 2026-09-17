# Standalone Components

## Interview Priority

**Must Know (Angular 15+)**

## Interview Frequency
**Very Common**

## Recommended Depth

**Expert Level Understanding**

## Relevant For

- Modern Angular Development
- Angular 15+
- Angular 16+
- Angular 17+
- Senior Developer Interviews

---

# Why Were Standalone Components Introduced?

This is the most important question.
---

# Problem With NgModules

To create one component:

```typescript
EmployeeComponent
```

Angular required:

```text
Component

   ↓

Feature Module

   ↓

App Module
```
Lots of registration and boilerplate.

---

# Angular's Question

Why should components require modules to exist?

---

Traditional:

```text
Declare Component

Register Component

Export Component

Import Module

Use Component
```

---

Angular wanted:

```text
Component

↓

Use Component
```

Much simpler.

---

# What Is A Standalone Component?

A component that can exist without being declared in an NgModule.

---

Example

```typescript
@Component({

  standalone: true,

  template: `
    <h1>Hello</h1>
  `

})
export class EmployeeComponent {
}
```

---

# The Biggest Change

Traditional Angular:

```typescript
@NgModule({

  declarations:[
     EmployeeComponent
  ]

})
```

---

Standalone Angular:

```typescript
@Component({

  standalone: true

})
```

No declaration required.

---

## What Happened To declarations?

It disappeared.

---

Why?

```text
Component Already Knows
It Is A Component
```

Angular no longer needs

```typescript
declarations:[]
```

---

# Imports In Standalone Components

Imports still exist.

But move closer to where they are used.
---

Old

```typescript
@NgModule({

  imports:[
     CommonModule
 *]

})
```

---

New

```typescript
@Component({

  standalone:true,

* imports:[
     CommonModule
  ]

*)
```

---

# Real Example

```typescript
@Component({

  standalone: true,

  imports:[

      CommonModule,

      ReactiveFormsModule

  *

})
export class EmployeeComponent {}
```

---

Template now supports:

```html
*ngIf

*ngFor

formGroup
```

because dependencies were imported directly.

---

# Mental Model

```text
Standalone Imports

=

What This Component Uses
```

---

## Direct Component Imports

Huge change.

---

Traditional

```text
Component

 ↓

Module

 ↓

Module
```
---

Standalone

```text
Component

 ↓

Component
```

---

Example

```typescript
@Component({

  standalone: true,

  imports:[

      EmployeeCardComponent

  ]

})
```

---

Now template can use:

```html
<app-employee-card>
</app-employee-card>
```

directly.

---

# What Happened To exports?

Mostly unnecessary.

---

Old

```typescript
exports: [
   EmployeeComponent
]
```

---

New

```typescript
imports:[
  EmployeeComponent
]
```

Direct usage.

No export layer.

---

# Dependency Injection

Providers still exist.

---

# Preferred Approach

```typescript
@Injectable({

  providedIn: 'root'

})
export class EmployeeService {}
```

---

Application-wide singleton.

---

# Component Scope Providers

Possible.

---

Example

```typescript
@Component({

* standalone:true,

  providers:[

     EmployeeService

  ]

})
```

---

Meaning:

```text
New Service Instance

For This Component Tree
```

---

# Bootstrapping

Old Angular:

```typescript
platformBrowserDynamic()
  .bootstrapModule(
       AppModule
  );
```

---

Standalone Angular:

```typescript
bootstrapApplication(
   AppComponent
);
```

Much simpler.

---

# Routing In Standalone World

Traditional:

```typescript
RouterModule.forRoot(...)
```

---

Modern:

```typescript
bootstrapApplication(
    AppComponent,
    {
      providers: [
         provideRouter(routes)
      ]
    }
);
```

---

# Lazy Loading

Traditional

```typescript
loadChildren()
```

---

Standalone

```typescript
loadComponent:
 () =>
   import(...)
```

---

Example

```typescript
{
   path:'employees',

   loadComponent: () =>

      import(
        './employee.component'
      )
}
```

---

# Standalone Directives

Possible.

---

Example

```typescript
@Directive({

  standalone:true

})
```

---

# Standalone Pipes

Possible.

---

Example

```typescript
@Pipe({

  standalone:true

})
```

---

# Migration From NgModules

Traditional

```typescript
@NgModule({

  declarations:[
     EmployeeComponent
  ]

})
```

---

Standalone

```typescript
@Component({

  standalone:true

})
```

---

Traditional

```typescript
imports:[
   CommonModule
]
```

---

Standalone

```typescript
@Component({

  imports:[
     CommonModule
  ]

})
```

---

Traditional

```typescript
exports:[
   EmployeeComponent
]
```

---

Standalone

```typescript
imports:[
   EmployeeComponent
]
```

directly.

---

# Standalone + Signals

Modern Angular frequently combines:

```typescript
standalone:true
```

with

```typescript
signal()

input()

computed()

effect()

model()
```

creating highly reactive component-based architecture.

---

# Real Enterprise Example

```typescript
@Component({

  standalone:true,

  imports:[

     CommonModule,

     ReactiveFormsModule,

     EmployeeCardComponent

  ]

})
export class EmployeeListComponent {

}
```

Everything needed is visible immediately.

---

# Standalone vs NgModules

## Registration

NgModules

```typescript
declarations:[]
```

Standalone

```typescript
standalone:true
```

---

## Sharing

NgModules

```typescript
exports:[]
```

Standalone

```typescript
imports:[]
```

---

## Complexity

NgModules

Medium

Standalone

Low

---

## Dependency Visibility

NgModules

Distributed

Standalone

Local

---

## Modern Angular

NgModules

Supported

Standalone

Preferred

---

# Common Interview Questions

## What Is A Standalone Component?

A component that can operate without being declared in an NgModule.

---

## Why Were Standalone Components Introduced?

To reduce boilerplate and simplify Angular architecture.

---

## Do NgModules Still Work?

Yes.

Fully supported.

---

## Are Standalone Components Recommended?

For new Angular applications:

```text
Yes
```

---

## What Happened To declarations?

Replaced by:

```typescript
standalone:true
```

---

## How Are Dependencies Imported?

Using:

```typescript
imports:[]
```

inside the component.

---

## What Happened To exports?

Mostly unnecessary.

Components are imported directly.

---

# Common Interview Traps

## Trap 1

Thinking NgModules are deprecated.

Incorrect.

They remain supported.

---

## Trap 2

Thinking standalone removes DI.

Incorrect.

Dependency Injection remains unchanged.

---

## Trap 3

Thinking standalone removes routing.

Incorrect.

Routing becomes even simpler.

---

# Architecture Considerations

Use Standalone Components when:

```text
Building New Applications

Creating Reusable Components

Using Signals

Using Modern Angular
```

NgModules still make sense when:

```text
Maintaining Existing Enterprise Applications

Large Legacy Codebases

Gradual Migrations
```

---

# Key Takeaways

1. Standalone Components eliminate the need for declarations.
2. Components become self-contained.
3. Dependencies are imported directly into components.
4. exports become largely unnecessary.
5. Dependency injection continues to work normally.
6. Bootstrapping becomes simpler.
7. Routing integrates naturally with standalone components.
8. Standalone Components are Angular's preferred modern architecture.
9. NgModules are still fully supported.
10. Standalone Components simplify development while improving dependency visibility.

---

# Interview Notes (Revision Version)

## Old Angular

```text
Component

↓

Module

↓

Application
```

---

## Modern Angular

```text
Component

↓

Component

↓

Application
```

---

## Declarations

```text
Removed
```

---

## Imports

```text
Moved To Component Level
```

---

## Exports

```text
Mostly Unnecessary
```

---

## Providers

```text
Still Exist
```

---

## Bootstrap

```typescript
bootstrapApplication()
```

---

## Key Message

Standalone Components remove much of the ceremony historically associated with Angular modules, resulting in a simpler, more explicit, and more maintainable architecture while preserving Angular's powerful dependency injection and routing capabilities.

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [NgModules Fundamentals](19-ngmodules-fundamentals.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Routing & Navigation](21-routing-and-navigation.md)

<br/>
<!-- navigation-end -->
