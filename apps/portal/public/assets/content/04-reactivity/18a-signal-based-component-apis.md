# Signal-Based Component APIs

## Interview Priority

**Must Know (Angular 17+)**

## Interview Frequency

**Increasing Rapidly**

## Recommended Depth

**Expert Level Understanding**

## Relevant For

- Modern Angular Development
- Angular 17+
- Angular 18+
- Senior Developer Interviews
- Lead Developer Interviews

---

# Why Were Signal-Based Component APIs Introduced?

Before Signals, Angular component communication was primarily built using:

```typescript
@Input()

@Output()

EventEmitter

ngOnChanges()
```

Example:

```typescript
@Component({...})
export class EmployeeCardComponent {

  @Input()
  employee!: Employee;

  @Output()
  delete =
    new EventEmitter<number>();

}
```

This worked well and is still fully supported.

---

# Angular's Observation

Signals introduced a new reactive model:

```typescript
count = signal(0);
```

which provides:

```text
Automatic Dependency Tracking

Reactive Updates

Computed Values

Effects
```

However:

```typescript
@Input()
employee!: Employee;
```

was still:

```text
Property Based

Not Signal Based
```

Angular wanted a unified reactive model.

---

# Angular's Goal

Make these APIs feel consistent:

```typescript
signal()

input()

output()

model()

computed()

effect()
```

All following the same reactive principles.

---

# Traditional Component APIs

For years Angular used:

```typescript
@Input()

@Output()
```

to communicate between components.

---

# Parent To Child Communication

Parent:

```html
<app-employee-card
    [employee]="selectedEmployee">
</app-employee-card>
```

Child:

```typescript
@Input()
employee!: Employee;
```

---

# Child To Parent Communication

Child:

```typescript
@Output()
save =
  new EventEmitter<Employee>();
```

Emit:

```typescript
this.save.emit(employee);
```

Parent:

```html
<app-employee-card
   (save)="saveEmployee($event)">
</app-employee-card>
```

---

# Signal-Based APIs

Modern Angular introduces:

```typescript
input()

output()

model()
```

---

# Overview

## Parent → Child

```typescript
input()
```

---

## Child → Parent

```typescript
output()
```

---

## Two-Way Binding

```typescript
model()
```

---

# input()

Signal-based replacement for:

```typescript
@Input()
```

---

# Traditional Input

```typescript
@Input()
employee!: Employee;
```

---

# Signal Input

```typescript
employee =
  input.required<Employee>();
```

---

# What's Different?

Traditional input:

```typescript
employee
```

is simply a property.

---

Signal input:

```typescript
employee
```

is a Signal.

Meaning:

```typescript
employee()
```

returns the value.

---

# Reading Input Values

Traditional:

```typescript
console.log(
  this.employee.name
);
```

---

Signal Input:

```typescript
console.log(
  this.employee().name
);
```

---

# Why Is This Important?

Signal inputs can participate directly in:

```typescript
computed()

effect()
```

This is one of their biggest advantages.

---

# Simple Rendering Example

Parent:

```html
<app-employee-card
    [employee]="employee">
</app-employee-card>
```

---

Child:

```typescript
employee =
  input.required<Employee>();
```

Template:

```html
{{ employee().firstName }}
{{ employee().lastName }}
```

---

# Is Traditional @Input Already Reactive?

Yes.

Traditional code:

```html
{{ employee.firstName }}
{{ employee.lastName }}
```

already updates when the parent passes a new employee.

---

# Important Interview Point

Signal inputs are not primarily solving:

```text
Template Rendering
```

Traditional inputs already handle that well.

---

Signal inputs become more valuable when:

```text
Derived State

Input-Based Logic

Replacing ngOnChanges()

Computed Values

Effects
```

are involved.

---

# Optional Inputs

Traditional:

```typescript
@Input()
employee?: Employee;
```

---

Signal Version

```typescript
employee =
  input<Employee>();
```

Value can be:

```typescript
undefined
```

---

# Required Inputs

Traditional:

```typescript
@Input({ required: true })
employee!: Employee;
```

---

Signal Version:

```typescript
employee =
  input.required<Employee>();
```

---

# computed() With Inputs

One of the strongest use cases.

---

# Real Problem

Parent passes:

```typescript
Employee
```

Child needs:

```text
Display Name

Full Name

Formatted Address
```

derived from employee.

---

# Traditional Approach

```typescript
@Input()
employee!: Employee;

get displayName() {

  return `${this.employee.id}
          - ${this.employee.name}`;

}
```

---

Or:

```typescript
ngOnChanges() {

}
```

---

# Signal Approach

```typescript
employee =
  input.required<Employee>();

displayName =
  computed(() =>

    `${employee().id}
     - ${employee().name}`

  );
```

---

# What Happens?

Parent updates:

```typescript
employee
```

↓

Signal updates

↓

Computed recalculates

↓

UI updates

Automatically.

---

# Real Enterprise Example

```typescript
employee =
  input.required<Employee>();

fullName =
  computed(() =>

    `${employee().firstName}
     ${employee().lastName}`

  );

emailDisplay =
  computed(() =>

    employee().email
      .toLowerCase()

  );
```

No lifecycle hooks required.

---

# Replacing ngOnChanges()

One of the most important Angular modernization topics.

---

# Traditional Workflow

Input changes:

```text
EmployeeId
```

Need:

```text
Load Employee

Update View

Log Change
```

Traditionally:

```typescript
@Input()
employeeId!: number;

ngOnChanges(
  changes: SimpleChanges
) {

  if(changes['employeeId']) {

    this.loadEmployee();

  }

}
```

---

# Problems

```text
Extra Lifecycle Hook

Manual Checks

Verbose Code
```

---

# Signal Version

```typescript
employeeId =
  input.required<number>();

effect(() => {

  const id =
      employeeId();

  console.log(
      'Loading Employee',
      id
  );

});
```

No:

```typescript
ngOnChanges()
```

required.

---

# Mental Model

Traditional:

```text
Input Changes

      ↓

ngOnChanges()

      ↓

Execute Logic
```

---

Signal Version

```text
Input Changes

      ↓

Signal Updates

      ↓

effect()

      ↓

Execute Logic
```

---

# Real Enterprise Example

Parent passes:

```typescript
employeeId
```

Child must load employee details.

---

Traditional

```typescript
@Input()
employeeId!: number;

ngOnChanges() {

  this.loadEmployee(
      this.employeeId
  );

}
```

---

Signal Style

```typescript
employeeId =
  input.required<number>();

effect(() => {

  this.loadEmployee(
      employeeId()
  );

});
```

Cleaner reactive model.

---

# Important Caution

Avoid placing large subscription logic directly inside effects.

Example:

```typescript
effect(() => {

  this.employeeService
      .getEmployee(
         employeeId()
      )
      .subscribe();

});
```

Technically works.

But for complex async flows:

```text
RxJS Still Often Makes Sense
```

---

Typical solution:

```typescript
employeeId =
  input.required<number>();

employee$ =
  toObservable(
     employeeId
  ).pipe(

      switchMap(id =>

         this.employeeService
             .getEmployee(id)

      )

  );
```

Signals and RxJS frequently work together.

---

# output()

Signal-era replacement for:

```typescript
@Output()
```

---

# Traditional Output

```typescript
@Output()
delete =
    new EventEmitter<number>();
```

---

Emit:

```typescript
this.delete.emit(id);
```

---

# Signal Version

```typescript
delete =
  output<number>();
```

---

Emit:

```typescript
this.delete.emit(id);
```

Same usage.

---

# Parent Usage

```html
<app-employee-card
    (delete)="
       removeEmployee($event)">
</app-employee-card>
```

No change.

---

# Why Introduce output()?

Benefits:

```text
Consistent API Style

Better Typing

Aligned With Signals
```

---

# Real Enterprise Example

```typescript
saveEmployee =
   output<Employee>();

save() {

   this.saveEmployee.emit(

      this.employeeForm.value

   );

}
```

---

# model()

Perhaps the most powerful component API.

---

# The Problem

Traditional two-way binding requires:

```typescript
@Input()

@Output()
```

pair.

---

# Traditional Child Component

```typescript
@Input()
name!: string;

@Output()
nameChange =
  new EventEmitter<string>();
```

---

Update

```typescript
this.nameChange.emit(
   newValue
);
```

---

Parent

```html
<app-child
   [(name)]="employeeName">
</app-child>
```

---

# Problem

Lots of boilerplate.

---

# Signal-Based Model

```typescript
name = model('');
```

That's it.

---

# What Angular Creates

Internally Angular provides:

```text
Input Behavior

Output Behavior

Signal Behavior

Two-Way Binding
```

All automatically.

---

# Parent

```html
<app-child
   [(name)]="employeeName">
</app-child>
```

---

# Child

```typescript
name = model('');
```

Update:

```typescript
name.set(
   'Adarsh'
);
```

Parent automatically updates.

---

# Mental Model

```text
Input

   +

Output

   +

Signal

   =

model()
```

---

# Real Enterprise Example

Reusable Search Component

---

Parent

```html
<app-search
    [(searchText)]="term">
</app-search>
```

---

Child

```typescript
searchText =
  model('');
```

---

Input Changes

```typescript
searchText.set(
   value
);
```

Parent receives updates automatically.

---

# Traditional vs Signal APIs

## Input

Traditional:

```typescript
@Input()
employee!: Employee;
```

Signal:

```typescript
employee =
  input.required<Employee>();
```

---

## Output

Traditional:

```typescript
@Output()
save =
  new EventEmitter<Employee>();
```

Signal:

```typescript
save =
  output<Employee>();
```

---

## Two-Way Binding

Traditional:

```typescript
@Input()
value!: string;

@Output()
valueChange =
  new EventEmitter<string>();
```

Signal:

```typescript
value =
  model('');
```

---

# input() + computed()

Powerful combination.

---

Example

```typescript
employee =
   input.required<Employee>();

displayName =
   computed(() =>

      `${employee().id}
       - ${employee().name}`

   );
```

---

# input() + effect()

Powerful replacement for input change tracking.

---

Example

```typescript
employeeId =
  input.required<number>();

effect(() => {

   console.log(
      employeeId()
   );

});
```

---

# When Should You Use Signal Component APIs?

## Existing Angular Applications

No urgent need to migrate.

Traditional:

```typescript
@Input()

@Output()
```

remain fully supported.

---

## New Angular Applications

Consider:

```typescript
input()

output()

model()
```

especially when using Signals elsewhere.

---

# Common Interview Questions

## What Is input()?

Signal-based alternative to:

```typescript
@Input()
```

---

## What Is output()?

Modern alternative to:

```typescript
@Output()
```

---

## What Is model()?

Signal-based API that simplifies two-way binding.

---

## Can Signal Inputs Replace ngOnChanges()?

Often yes.

Using:

```typescript
effect()
```

or

```typescript
computed()
```

instead.

---

## Can Signal Inputs Be Used In computed()?

Yes.

This is one of their biggest advantages.

---

## Does @Input() Still Work?

Absolutely.

Nothing has been deprecated.

---

# Common Interview Traps

## Trap 1

Thinking signal inputs are required.

Incorrect.

```typescript
@Input()
```

still

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Signals](18-signals.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [NgModules Fundamentals](../05-advanced/19-ngmodules-fundamentals.md)

<br/>
<!-- navigation-end -->
