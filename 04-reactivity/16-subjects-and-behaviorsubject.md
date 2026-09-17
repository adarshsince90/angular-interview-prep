# Subjects & BehaviorSubject

## Interview Priority

**Must Know**

## Interview Frequency

**Very Common**

## Recommended Depth

**Expert Level Understanding**

## Relevant For

- Mid-Level Interviews
- Senior Developer Interviews
- Lead Developer Interviews
- Architect Discussions

---

# Why Do We Need Subjects?

Let's start from what we already know.

HttpClient returns:

```typescript
Observable<Employee[]>
```

Example:

```typescript
this.employeeService
    .getEmployees()
    .subscribe(...);
```

Here:

```text
Angular Creates Data

We Consume Data
```

We are subscribers.

We don't control the stream.

---

# The Missing Problem

Suppose we have:

```text
Login Page

Navbar

Dashboard

Profile Page
```

When a user logs in:

```text
Navbar should update

Dashboard should update

Profile should update
```

Question:

```text
Who informs all these components?
```

We need a mechanism that allows us to:

```text
Push Data

Store State

Notify Multiple Components
```

This is exactly what Subjects solve.

---

# What Is A Subject?

A Subject is a special RxJS type that is both:

```text
Observable
+
Observer
```

Meaning:

```text
Can Receive Values

Can Emit Values

Can Be Subscribed To
```

---

# Simple Mental Model

Observable:

```text
Receive Data Only
```

Subject:

```text
Receive Data

Emit Data
```

---

# Visual Representation

```text
          Subject

        ┌─────┐

next() ─►     ├──► Subscriber A
             │
             ├──► Subscriber B
             │
             └──► Subscriber C
```

One emission can notify many subscribers.

---

# Subject Is Like A Broadcast Channel

Imagine:

```text
Radio Station
```

Broadcaster:

```text
Sends Message
```

Listeners:

```text
Receive Message
```

Anyone tuned in receives future broadcasts.

---

# Creating A Subject

```typescript
import { Subject } from 'rxjs';

const subject =
  new Subject<string>();
```

---

# Subscribing To Subject

```typescript
subject.subscribe(value => {

  console.log(value);

});
```

---

# Emitting Values

```typescript
subject.next('Hello');
```

Output:

```text
Hello
```

---

# Multiple Subscribers

```typescript
subject.subscribe(value => {

  console.log('A:', value);

});

subject.subscribe(value => {

  console.log('B:', value);

});
```

---

Emit:

```typescript
subject.next('Angular');
```

Output:

```text
A: Angular

B: Angular
```

---

# Multicasting

One of the most important Subject concepts.

Normal Observable:

```text
Producer

    ↓

Single Execution
```

Subject:

```text
One Value

    ↓

Many Subscribers
```

This is called:

```text
Multicasting
```

---

# Subject Timeline

```text
Subscriber A Joins

       ↓

next(A)

       ↓

A Receives Value

       ↓

Subscriber B Joins

       ↓

next(B)

       ↓

A Receives B

B Receives B
```

Notice:

```text
Subscriber B missed A
```

---

# The Biggest Limitation Of Subject

Subjects do not store previously emitted values.

Once a value is emitted:

```text
It's Gone
```

---

# Example

```typescript
const subject =
  new Subject<number>();

subject.next(1);

subject.subscribe(value => {

  console.log(value);

});
```

Output:

```text
Nothing
```

---

# Why?

Because:

```text
1 was emitted

before subscription occurred
```

Subject has:

```text
No Memory
```

---

# Real Angular Problem

Imagine:

```text
User Logs In
```

AuthService emits:

```typescript
userSubject.next(user);
```

Later:

```text
Navbar Component Loads
```

Navbar subscribes.

Question:

```text
Will it receive user?
```

With Subject:

```text
No
```

The value was already lost.

---

# This Is Why BehaviorSubject Exists

Most applications require:

```text
Current User

Current Theme

Current Language

Shopping Cart

Selected Project
```

These all have:

```text
Current State
```

We need a Subject that remembers.

---

# What Is BehaviorSubject?

BehaviorSubject is a Subject that:

```text
Stores Current Value

Automatically Sends Current Value
To New Subscribers
```

---

# Key Difference

Subject:

```text
Forgets Everything
```

BehaviorSubject:

```text
Remembers Latest Value
```

---

# Creating A BehaviorSubject

```typescript
import {
  BehaviorSubject
} from 'rxjs';

const userSubject =
  new BehaviorSubject<string>(
    'Guest'
  );
```

---

# Important Observation

BehaviorSubject requires:

```text
Initial Value
```

Always.

---

# Why Initial Value Is Required

BehaviorSubject promises:

```text
Every subscriber receives
current value immediately.
```

A current value must therefore exist.

---

# Subscribe Immediately

```typescript
userSubject.subscribe(user => {

  console.log(user);

});
```

Output:

```text
Guest
```

Even before:

```typescript
next()
```

is called.

---

# Emit New Value

```typescript
userSubject.next(
  'Adarsh'
);
```

Output:

```text
Adarsh
```

---

# New Subscriber Later

```typescript
userSubject.subscribe(user => {

  console.log(
    'New Subscriber:',
    user
  );

});
```

Output:

```text
New Subscriber:
Adarsh
```

Even though:

```text
Adarsh was emitted earlier
```

---

# Timeline Comparison

## Subject

```text
next(User)

      ↓

Subscriber Joins

      ↓

Nothing Received
```

---

## BehaviorSubject

```text
next(User)

      ↓

Stores User

      ↓

Subscriber Joins

      ↓

User Immediately Received
```

---

# Subject vs BehaviorSubject

## Subject

```typescript
const subject =
  new Subject<User>();
```

Characteristics:

```text
No Initial Value

No Memory

Missed Values Lost Forever
```

---

## BehaviorSubject

```typescript
const subject =
  new BehaviorSubject<User | null>(
      null
  );
```

Characteristics:

```text
Initial Value Required

Stores Current Value

New Subscribers Get Latest Value
```

---

# Real Enterprise Example: Authentication

Most Angular applications have:

```text
AuthService
```

managing current user state.

---

# Service

```typescript
@Injectable({
  providedIn:'root'
})
export class AuthService {

  private userSubject =
    new BehaviorSubject<
       User | null
    >(null);

  user$ =
    this.userSubject.asObservable();

}
```

---

# Why Is Subject Private?

Bad:

```typescript
public userSubject =
  new BehaviorSubject(...);
```

Now any component can:

```typescript
this.authService
    .userSubject
    .next(...)
```

Very risky.

---

# Recommended Pattern

```typescript
private userSubject =
   new BehaviorSubject(...);

public user$ =
   this.userSubject.asObservable();
```

Benefits:

```text
Encapsulation

Controlled Updates

Safer Architecture
```

---

# Login Example

```typescript
login(user: User) {

   this.userSubject.next(user);

}
```

---

# Logout Example

```typescript
logout() {

  this.userSubject.next(null);

}
```

---

# Navbar Component

```typescript
this.authService
    .user$
    .subscribe(user => {

        this.user = user;

    });
```

---

# Dashboard Component

```typescript
this.authService
    .user$
    .subscribe(user => {

       this.currentUser = user;

    });
```

---

# Profile Component

```typescript
this.authService
    .user$
    .subscribe(user => {

       this.profile = user;

    });
```

---

# Architecture Flow

```text
User Logs In

      ↓

AuthService

      ↓

BehaviorSubject

      ↓

Navbar Updated

Dashboard Updated

Profile Updated
```

One update.

Multiple consumers.

---

# Another Enterprise Example: Theme Management

```typescript
private themeSubject =
  new BehaviorSubject(
     'light'
  );
```

---

# Change Theme

```typescript
setTheme(
   theme:string
){

   this.themeSubject.next(
      theme
   );

}
```

---

# Any Component

```typescript
this.themeService
    .theme$
    .subscribe(theme => {

    });
```

Immediately receives current theme.

---

# Search Screen Example

Search Component:

```typescript
search(term:string){

  this.searchSubject
      .next(term);

}
```

---

Results Component:

```typescript
this.searchService
    .search$
    .subscribe(term => {

    });
```

Classic sibling communication.

---

# Accessing Current Value

BehaviorSubject provides:

```typescript
getValue()
```

---

# Example

```typescript
const currentUser =

  this.userSubject
      .getValue();
```

---

# Should We Use getValue Frequently?

Usually:

```text
No
```

Prefer:

```text
Reactive Subscriptions
```

when possible.

---

# Subject Types

Interview awareness only.

---

## Subject

```text
No Stored Value
```

---

## BehaviorSubject

```text
Stores Latest Value
```

---

## ReplaySubject

```text
Stores Multiple Values
```

Example:

```text
Last 5 Values
```

---

## AsyncSubject

```text
Emits Final Value Only
```

Rarely used in Angular.

---

# Subject vs EventEmitter

Very common interview question.

---

## EventEmitter

Used for:

```typescript
@Output()
```

component communication.

---

Example:

```typescript
@Output()
save =
 new EventEmitter();
```

---

## Subject

Typically used for:

```text
Services

State Sharing

Cross-Component Communication
```

---

# Memory Leak Considerations

Subjects and BehaviorSubjects are still Observables.

Subscriptions still require cleanup.

---

Traditional:

```typescript
ngOnDestroy() {

   this.subscription
       .unsubscribe();

}
```

---

Modern Angular:

```typescript
takeUntilDestroyed()
```

---

# Common Angular Pattern

```typescript
private userSubject =
   new BehaviorSubject<
      User | null
   >(null);

user$ =
   this.userSubject
       .asObservable();
```

You'll see this pattern constantly in enterprise Angular projects.

---

# BehaviorSubject vs Signals (Preview)

Traditional Angular:

```typescript
private userSubject =
   new BehaviorSubject<
      User | null
   >(null);
```

---

Modern Angular:

```typescript
user =
  signal<User | null>(
     null
  );
```

Signals reduce:

```text
Subscriptions

Boilerplate

RxJS Complexity
```

We'll compare them later in depth.

---

# Common Interview Questions

## What Is A Subject?

A special RxJS type that acts as both an Observable and an Observer.

---

## What Is A BehaviorSubject?

A Subject that stores the latest value and immediately emits it to new subscribers.

---

## Why Does BehaviorSubject Require An Initial Value?

It always maintains a current value.

---

## Difference Between Subject And BehaviorSubject?

Subject:

```text
No Stored Value
```

BehaviorSubject:

```text
Stores Current Value
```

---

## Why Use BehaviorSubject In Services?

To share reactive state between multiple components.

---

## What Does next() Do?

Pushes a new value into the stream.

---

## What Does getValue() Do?

Returns the current value stored inside a BehaviorSubject.

---

## How Do Sibling Components Communicate?

Common approach:

```text
Shared Service

BehaviorSubject
```

---

# Common Interview Traps

## Trap 1

Thinking Subject stores emitted values.

Incorrect.

It does not.

---

## Trap 2

Exposing BehaviorSubject publicly.

Prefer:

```typescript
private subject

public observable
```

pattern.

---

## Trap 3

Using getValue() everywhere.

Prefer reactive subscriptions.

---

## Trap 4

Thinking BehaviorSubject is a state management solution like NgRx.

It works well for simple and medium-sized state.

Large applications may require dedicated state management.

---

# Senior-Level Discussion

BehaviorSubject became the de-facto Angular state-sharing mechanism for many years because it provides:

```text
Current State

Reactive Updates

Multicasting

Simple API
```

A very common enterprise architecture looks like:

```text
Component

     ↓

Service

     ↓

BehaviorSubject

     ↓

Multiple Components
```

This pattern is widely used for:

- Authentication
- User Preferences
- Search Filters
- Theme Switching
- Shopping Cart State
- Feature-Level State

Understanding BehaviorSubject is extremely important because it bridges the gap between basic RxJS and modern Angular Signals.

---

# Architecture Considerations

Use Subject when:

```text
Only Future Events Matter
```

Examples:

```text
Button Clicks

Notifications

Temporary Events
```

---

Use BehaviorSubject when:

```text
Current State Must Be Remembered
```

Examples:

```text
Current User

Current Theme

Current Language

Current Filters
```

---

# Decision Matrix

```text
Need Current Value?
      ↓
BehaviorSubject

Need Only Future Events?
      ↓
Subject

Need Multiple Previous Values?
      ↓
ReplaySubject
```

---

# Key Takeaways

1. Subject is both an Observable and Observer.
2. Subjects support multicasting.
3. Subject does not remember previous values.
4. BehaviorSubject remembers the latest value.
5. BehaviorSubject requires an initial value.
6. New subscribers immediately receive the latest value.
7. BehaviorSubject is commonly used in Angular services.
8. Keep Subjects private and expose Observables publicly.
9. BehaviorSubject is a popular lightweight state-sharing mechanism.
10. Understanding BehaviorSubject makes Signals much easier to learn.

---

# Interview Notes (Revision Version)

## Subject

```text
Observable + Observer
```

---

## Subject Characteristics

```text
No Memory

No Initial Value

Multicasting
```

---

## BehaviorSubject Characteristics

```text
Initial Value Required

Stores Current Value

Immediate Value For New Subscribers
```

---

## Common Angular Service Pattern

```typescript
private subject =
   new BehaviorSubject(...);

public state$ =
   this.subject.asObservable();
```

---

## Updating State

```typescript
this.subject.next(value);
```

---

## Reading State

Reactive:

```typescript
state$.subscribe(...)
```

---

Current Value:

```typescript
subject.getValue()
```

---

## Key Message

A Subject enables multicast event publishing, while a BehaviorSubject additionally stores and exposes the current state, making it one of the most common mechanisms for sharing reactive data across Angular applications.

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Forms](../03-intermediate/15-forms.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [RxJS Operators Deep Dive](17-rxjs-operators-deep-dive.md)

<br/>
<!-- navigation-end -->
