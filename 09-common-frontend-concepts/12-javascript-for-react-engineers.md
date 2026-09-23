# JavaScript For React Engineers

## Why This Document Exists

Most Angular developers learn frontend development through:

```text
Components

Services

Dependency Injection

Observables

Framework Features
```

As a result, many JavaScript concepts remain hidden behind Angular abstractions.

React is different.

React exposes JavaScript much more directly.

Examples:

```text
React Hooks
    → Closures

React Components
    → Functions

React State Updates
    → Event Loop

React Rendering
    → Functions + Scope

React Context
    → Shared References

React Props
    → Function Parameters
```

This means React interviews frequently become:

```text
JavaScript Interviews
```

with React examples.

---

# Learning Objectives

By the end of this chapter, you should understand:

```text
Execution Context

Scope

var vs let vs const

Hoisting

Temporal Dead Zone

Closures

Event Loop

Promises

Async/Await

Call Stack

Microtasks

Macrotasks

Objects

Prototypes

Inheritance

this Keyword

call/apply/bind

Higher Order Functions

Destructuring

Spread/Rest

Modules

DOM Events

Event Bubbling

Error Handling
```

More importantly:

```text
How Every React Concept
Is Built On These Foundations
```

---

# The Core Mental Model

Before React Exists:

```text
JavaScript Exists
```

Before Components:

```text
Functions Exist
```

Before Hooks:

```text
Closures Exist
```

Before State:

```text
Variables Exist
```

Before React Updates:

```text
Event Loop Exists
```

Before JSX:

```text
Functions Returning Objects Exist
```

Therefore:

```text
Strong JavaScript

↓

Strong React
```

---

# JavaScript Execution Model

## First Principles Question

```text
How Does JavaScript Run Code?
```

JavaScript is:

```text
Single Threaded

Synchronous

Blocking By Default
```

Meaning:

```text
One Statement

At A Time
```

---

Example:

```javascript
console.log("A");
console.log("B");
console.log("C");
```

Output:

```text
A
B
C
```

Why?

Because JavaScript executes:

```text
Top To Bottom
```

unless asynchronous mechanisms are involved.

---

# Execution Context

One of the most important concepts.

---

Definition:

> An execution context is the environment created by JavaScript when code runs.

---

Every execution context contains:

```text
Variables

Functions

Scope References

this Reference
```

---

Types:

```text
Global Execution Context

Function Execution Context
```

---

Example:

```javascript
function greet() {
   const name = "John";
}
```

Calling:

```javascript
greet();
```

creates:

```text
New Execution Context
```

for that function.

---

# Scope

Question:

```text
Which Variables
Can This Code Access?
```

Scope answers this.

---

# Global Scope

Variables available everywhere.

```javascript
const appName = "React";
```

Accessible from:

```text
Most Parts Of Application
```

---

# Function Scope

Variables defined inside a function.

```javascript
function demo() {
   const msg = "Hello";
}
```

Outside:

```javascript
console.log(msg);
```

Error.

---

Why?

Function scope prevents access.

---

# Block Scope

Created by:

```text
if

for

while

{}
```

Example:

```javascript
if (true) {
   let age = 30;
}
```

Outside:

```javascript
console.log(age);
```

Error.

---

# var vs let vs const

One of the most common interview topics.

---

# Comparison

| Feature | var | let | const |
|----------|----------|----------|----------|
| Scope | Function | Block | Block |
| Hoisted | Yes | Yes | Yes |
| TDZ | No | Yes | Yes |
| Reassign | Yes | Yes | No |
| Redeclare | Yes | No | No |

---

# var

Legacy JavaScript variable.

```javascript
var count = 1;
```

Problems:

```text
Function Scope

Hoisting Confusion

Accidental Reassignment
```

---

Interview Question

```text
Should We Use var?
```

Answer:

```text
Almost Never
```

---

# let

Mutable modern variable.

```javascript
let count = 1;
```

Use when value changes.

---

Example:

```javascript
let page = 1;

page++;
```

Valid.

---

# const

Preferred default.

```javascript
const apiUrl = "...";
```

---

Common Misconception

```text
const
=
Immutable
```

Wrong.

---

Example:

```javascript
const user = {
  name: "John"
};

user.name = "Mike";
```

Works.

---

What cannot change:

```text
Reference
```

not object contents.

---

Interview Question

```text
Why Prefer const?
```

Answer:

```text
Prevents Accidental Reassignment

Improves Readability
```

---

# Hoisting

One of the most misunderstood concepts.

---

Question:

```text
Why Does This Work?
```

```javascript
console.log(name);

var name = "John";
```

Output:

```text
undefined
```

not:

```text
Reference Error
```

---

Why?

Because JavaScript internally behaves roughly like:

```javascript
var name;

console.log(name);

name = "John";
```

---

This behavior is:

```text
Hoisting
```

---

Definition

```text
Declarations Are Processed
Before Execution
```

---

Important

```text
Only Declaration Hoisted

Not Assignment
```

---

# Temporal Dead Zone (TDZ)

Applies to:

```text
let

const
```

---

Example:

```javascript
console.log(name);

let name = "John";
```

Result:

```text
Reference Error
```

---

Question:

```text
Why?
```

---

Because variable exists but cannot be accessed yet.

---

Period between:

```text
Scope Created

↓

Variable Initialized
```

is called:

```text
Temporal Dead Zone
```

---

Interview Question

```text
Difference Between
var And let Hoisting?
```

Answer:

```text
Both Hoisted

Only let/const have TDZ
```

---

# Closures

Most important JavaScript topic for React.

---

Definition

> A closure allows a function to remember variables from an outer scope even after that scope has finished executing.

---

Example

```javascript
function createCounter() {

  let count = 0;

  return function () {
     count++;
     return count;
  };
}
```

---

Usage

```javascript
const counter = createCounter();

counter();
counter();
counter();
```

---

Output

```text
1
2
3
```

---

Question

```text
Why Is count Still Available?
```

Answer:

```text
Closure
```

---

The inner function remembers:

```text
Outer Lexical Scope
```

---

# Why Closures Matter In React

React heavily depends on closures.

Examples:

```text
useEffect

useCallback

useMemo

Event Handlers

Custom Hooks
```

---

Example

```javascript
function Component() {

  const count = 0;

  const handleClick = () => {
      console.log(count);
  };
}
```

The handler remembers:

```text
count
```

via closure.

---

Many React bugs are:

```text
Stale Closure Problems
```

---

Interview Question

```text
What Is A Closure?
```

Strong Answer:

```text
A Closure Gives A Function
Access To Variables From
Its Lexical Scope Even After
That Scope Has Finished Execution
```

---

# The Event Loop

Extremely important topic.

---

Question:

```text
JavaScript Is Single Threaded

How Does Async Work?
```

Answer:

```text
Event Loop
```

---

Components

```text
Call Stack

Web APIs

Microtask Queue

Macrotask Queue

Event Loop
```

---

# Call Stack

Tracks current function execution.

Example:

```javascript
foo();
```

↓

```javascript
bar();
```

Stack:

```text
bar

foo

Global
```

---

Functions exit:

```text
Top Down
```

---

# Microtasks

High-priority async tasks.

Examples:

```text
Promises

queueMicrotask()
```

---

# Macrotasks

Lower priority tasks.

Examples:

```text
setTimeout

setInterval

DOM Events
```

---

# Event Loop Rule

Execution Order:

```text
Call Stack

↓

Microtasks

↓

Macrotasks
```

---

Example

```javascript
console.log("A");

setTimeout(() => {
   console.log("B");
},0);

Promise.resolve().then(() => {
   console.log("C");
});

console.log("D");
```

---

Output

```text
A
D
C
B
```

---

Interview Question

```text
Why C Before B?
```

Answer:

```text
Promise

↓

Microtask

↓

Higher Priority
```

than:

```text
setTimeout

↓

Macrotask
```

---

# Promises

Represent future completion of work.

---

States

```text
Pending

Fulfilled

Rejected
```

---

Example

```javascript
fetch("/users")
  .then(response => response.json())
  .catch(error => console.error(error))
  .finally(() => console.log("Done"));
```

---

Mental Model

```text
Value Available Later
```

---

Interview Question

```text
Why Were Promises Introduced?
```

Answer:

```text
Avoid Callback Hell

Improve Async Composition
```

---

# Async / Await

Built on top of Promises.

---

Without Async/Await

```javascript
fetchUsers()
   .then(...)
   .then(...)
```

---

With Async/Await

```javascript
async function getUsers() {

  const response =
      await fetch("/users");

  return response.json();
}
```

---

Benefits

```text
Readable

Maintainable

Looks Synchronous
```

---

Interview Question

```text
Is Async/Await Different
From Promises?
```

Answer:

```text
No

Async/Await Uses Promises Underneath
```

---

# Error Handling

Errors are inevitable.

---

Basic Pattern

```javascript
try {

}
catch(error) {

}
finally {

}
```

---

Example

```javascript
try {

   const data =
      await fetchUsers();

}
catch(error){

   console.error(error);

}
finally {

   console.log("Complete");

}
```

---

Interview Question

```text
Why Use Finally?
```

Answer:

```text
Runs Regardless Of Success Or Failure
```

---

# Objects

Everything in JavaScript revolves around objects.

---

Example

```javascript
const user = {
   name: "John",
   age: 30
};
```

---

Properties:

```text
State

Behavior
```

can both exist.

---

# Prototypes

JavaScript uses:

```text
Prototype-Based Inheritance
```

---

Question

```text
How Can Objects Share Functionality?
```

---

Answer:

```text
Prototype Chain
```

---

Example

```javascript
const person = {
  greet() {
      console.log("Hello");
  }
};
```

---

Other objects may inherit:

```text
greet()
```

through prototype linkage.

---

# Prototype Chain

Lookup order:

```text
Object

↓

Prototype

↓

Prototype

↓

null
```

---

Question:

```text
Where Does JavaScript Look
For Missing Properties?
```

Answer:

```text
Prototype Chain
```

---

# Classes

Modern syntax.

```javascript
class Person {
}
```

---

Important Interview Answer

```text
JavaScript Classes

Are Syntactic Sugar

Over Prototypes
```

---

# The this Keyword

Most confusing JS topic.

---

Question

```text
What Is this?
```

---

Answer:

```text
Reference To Calling Context
```

---

# Object Method

```javascript
const user = {

  name: "John",

  print() {
     console.log(this.name);
  }

};
```

Here:

```text
this = user
```

---

# Arrow Functions

Arrow functions do NOT create:

```text
Own this
```

---

Instead:

```text
Capture Surrounding this
```

---

Why React Prefers Arrow Functions?

```text
Fewer Context Problems
```

---

# call apply bind

Used to control:

```text
this
```

---

# call

```javascript
fn.call(user);
```

Execute immediately.

---

# apply

```javascript
fn.apply(user,args);
```

Execute immediately.

---

# bind

```javascript
const newFn =
    fn.bind(user);
```

Returns function.

---

Interview Question

```text
Difference Between
call apply bind?
```

Answer:

```text
call → execute now

apply → execute now with array

bind → return new function
```

---

# Higher Order Functions

Definition

```text
Function Accepting Function

OR

Returning Function
```

---

Examples

```javascript
map()

filter()

reduce()
```

---

# map

Transforms items.

```javascript
users.map(
  user => user.name
);
```

---

React uses:

```javascript
items.map(...)
```

for rendering lists.

---

# filter

Keeps matching items.

```javascript
users.filter(
 u => u.active
);
```

---

# reduce

Aggregates values.

```javascript
numbers.reduce(
 (sum,current)=>sum+current,
 0
);
```

---

Interview Question

```text
Difference Between
map filter reduce?
```

Answer:

```text
map
 → transform

filter
 → remove

reduce
 → accumulate
```

---

# Destructuring

Extremely common React syntax.

---

Object Destructuring

```javascript
const {
  name,
  age
} = user;
```

---

Array Destructuring

```javascript
const [a,b] = values;
```

---

React Example

```javascript
const [count,setCount]
  = useState(0);
```

---

# Spread Operator

Used for copying.

```javascript
const updated = {
   ...user,
   age:31
};
```

---

Why Important In React?

Because React prefers:

```text
Immutable Updates
```

---

# Rest Operator

Collect remaining values.

```javascript
const {
  name,
  ...remaining
} = user;
```

---

# Modules

Modern way to organize code.

---

Export

```javascript
export function save() {}
```

---

Import

```javascript
import { save }
from "./save";
```

---

Benefits

```text
Encapsulation

Maintainability

Reuse
```

---

# DOM Fundamentals

DOM:

```text
Document Object Model
```

---

Represents:

```text
HTML As JavaScript Objects
```

---

Before React:

```javascript
document.getElementById(...)
```

was common.

---

React ultimately updates:

```text
DOM
```

underneath.

---

# Event Handling

Browser emits events.

Examples:

```text
click

submit

change

input
```

---

React still relies on:

```text
Same Event Concepts
```

---

# Event Bubbling

Event flow:

```text
Button

↓

Parent

↓

Body

↓

Document
```

---

Example

```html
<div>
   <button>
```

Button click reaches:

```text
button

↓

div

↓

body
```

---

Interview Question

```text
What Is Event Bubbling?
```

Answer:

```text
Events Propagate Upward
Through Parent Elements
```

---

# Common JavaScript → React Mapping

| JavaScript Concept | React Concept |
|-------------------|----------------|
| Functions | Components |
| Closures | Hooks |
| Higher Order Functions | List Rendering |
| Promises | Data Fetching |
| Async/Await | API Calls |
| Event Loop | State Updates |
| Destructuring | Props & State |
| Spread Operator | Immutable Updates |
| Modules | Component Architecture |
| DOM Events | React Events |

---

# React-Critical Topic Ranking

## Must Master

```text
Closures

Scope

Promises

Async/Await

Event Loop

Destructuring

Spread

Higher Order Functions
```

---

## Very Important

```text
Hoisting

TDZ

this

Modules

Error Handling
```

---

## Nice To Have

```text
Advanced Prototype Chains

call/apply/bind Edge Cases
```

---

# Senior-Level Mental Model

Do not think:

```text
React Hooks

React Events

React Components
```

Think:

```text
Closures

Functions

Objects

Modules

Event Loop
```

Most React concepts are simply:

```text
Modern JavaScript

Applied To UI Development
```

---

# Ultimate Aha Moment

```text
Components
    ↓
Functions

Props
    ↓
Function Parameters

State
    ↓
Variables + Closures

Hooks
    ↓
Closures

Rendering
    ↓
Function Execution

Effects
    ↓
Async JavaScript

React
    ↓
JavaScript + UI Abstractions
```

The strongest React engineers are rarely the people who memorize React APIs.

They are usually the engineers who deeply understand the JavaScript runtime underneath React.