# Angular Cheat Sheet

# Angular

Angular is a TypeScript-based framework for building:

```text
Single Page Applications (SPA)
```

---

# Angular Building Blocks

```text
Component
    = UI

Template
    = HTML View

Directive
    = DOM Behavior

Pipe
    = Data Transformation

Service
    = Business Logic

Module (Legacy)
    = Feature Grouping

Standalone Component
    = Modern Angular Building Block
```

---

# Data Binding

```text
Interpolation
    {{ value }}

Property
    [disabled]="isDisabled"

Event
    (click)="save()"

Two-Way
    [(ngModel)]="name"
```

---

# Component Communication

Parent → Child

```typescript
@Input()
```

Child → Parent

```typescript
@Output()
```

---

# Lifecycle Hooks

```text
constructor

ngOnChanges

ngOnInit

ngDoCheck

ngAfterContentInit

ngAfterContentChecked

ngAfterViewInit

ngAfterViewChecked

ngOnDestroy
```

---

# Dependency Injection

Benefits:

```text
Loose Coupling

Reuse

Testability
```

---

# Service Scopes

```typescript
providedIn: 'root'
```

Singleton

---

# Common Interview Questions

Q: Component vs Directive?

Component:

```text
Template + Logic
```

Directive:

```text
Behavior Only
```

---

Q: Why DI?

```text
Loose Coupling
```

---

# Golden Rules

```text
API Calls → Services

UI Logic → Components

Business Logic → Services

State → Store/Signals
```
