# Performance Engineering

## Why This Topic Exists

As applications grow, performance naturally becomes a concern.

Small applications may contain:

```text
10 Components

100 Records

Few API Calls
```

and appear fast.

---

Large enterprise applications often contain:

```text
1000+ Components

Complex Forms

Large Data Tables

Real-time Dashboards

Charts

Live Notifications

Heavy API Communication
```

Suddenly users start experiencing:

```text
Slow Screens

Laggy Interactions

Janky Scrolling

UI Freezes

Long Loading Times
```

Performance Engineering exists to solve these problems.

---

## Learning Objectives

By the end of this chapter you should understand:

```text
Why applications become slow

Browser rendering fundamentals

Render cycles

Re-renders

Change Detection

Virtual DOM

React Reconciliation

Angular Change Detection

Signals

Memoization

Debouncing

Throttling

Virtual Scrolling

Lazy Loading

Performance Measurement

Enterprise Performance Strategies
```

---

# First Principles

Question:

```text
What Makes An Application Slow?
```

Many developers immediately think:

```text
Slow CPU
```

But that's only part of the story.

Applications become slow when they perform:

```text
Too Much Work

Too Frequently

At The Wrong Time
```

---

Performance Engineering is ultimately about:

```text
Doing Less Work

Doing It Smarter

Doing It Later

Avoiding It Completely
```

---

# What Is Performance?

Performance is not merely:

```text
CPU Usage

Memory Usage

Network Speed
```

Performance is:

```text
How Fast The User Perceives
The Application To Be
```

---

This introduces an important distinction.

---

# Actual Performance vs Perceived Performance

## Actual Performance

Measured by:

```text
Execution Time

Memory Usage

CPU Usage

Frame Rate
```

---

## Perceived Performance

Measured by:

```text
User Experience
```

---

Example:

```text
Screen Shows Skeleton Loader

↓

Data Loads
```

Users often perceive:

```text
Fast Experience
```

even when backend calls take several seconds.

---

Good engineering optimizes both.

---

# Historical Evolution

Understanding performance history explains why modern optimization techniques exist.

---

## Stage 1 - Static Websites

Applications were simple:

```text
HTML

CSS
```

Minimal JavaScript.

Performance rarely became an issue.

---

## Stage 2 - jQuery Era

Developers directly manipulated:

```text
DOM Elements
```

using JavaScript.

Example:

```javascript
$("#name").text("John");
```

---

Problem:

```text
Frequent DOM Manipulation

Complex UI State

Maintenance Challenges
```

Performance suffered in large applications.

---

## Stage 3 - Framework Era

Frameworks emerged:

```text
Angular

React

Vue
```

---

New goal:

```text
Let Framework Manage UI Updates
```

instead of developers manually manipulating DOM.

---

## Stage 4 - Virtual DOM Era

React popularized:

```text
Virtual DOM
```

---

Goal:

```text
Minimize Costly DOM Changes
```

by first calculating changes in memory.

---

## Stage 5 - Angular Optimization Era

Angular introduced:

```text
OnPush

TrackBy

Lazy Loading

Optimized Change Detection
```

to improve scalability.

---

## Stage 6 - Fine-Grained Reactivity Era

Modern frameworks introduced:

```text
Signals

SolidJS Reactivity

Vue Reactivity
```

---

Goal:

```text
Update Only What Changed
```

instead of repeatedly checking large portions of the component tree.

---

# Browser Rendering Pipeline

A fundamental concept.

Everything eventually ends up in the browser.

---

Rendering pipeline:

```text
JavaScript

↓

DOM Update

↓

Style Calculation

↓

Layout

↓

Paint

↓

Composite

↓

Screen
```

---

Question:

```text
What Is Expensive?
```

Usually:

```text
DOM Updates

Layout Calculation

Painting
```

---

Many performance optimizations exist to reduce work in this pipeline.

---

# What Is Rendering?

Definition:

> Rendering is the process of converting application state into visible user interface.

---

Example:

State:

```text
Counter = 0
```

↓

User Clicks

↓

```text
Counter = 1
```

↓

Screen Updates

---

This update process is called:

```text
Rendering
```

---

# What Causes Re-Rendering?

Applications re-render when state changes.

Examples:

```text
User Input

API Responses

Timers

WebSockets

Signal Updates

Store Updates
```

---

Question:

```text
Should Entire App Update?

Or

Only Relevant Parts?
```

This becomes the central performance challenge.

---

# Change Detection

Every framework must answer:

```text
How Do We Know
Something Changed?
```

Different frameworks solve this differently.

---

Angular:

```text
Change Detection Tree
```

---

React:

```text
Reconciliation
```

---

Signals:

```text
Dependency Tracking
```

---

Different implementation.

Same problem.

---

# Reactivity Models

Frontend frameworks evolved through several reactivity models.

---

## Model 1 - Manual DOM Manipulation

Developer manually updates:

```text
DOM
```

---

Advantages:

```text
Simple

Direct Control
```

---

Disadvantages:

```text
Error Prone

Hard To Scale
```

---

## Model 2 - Change Detection

Framework checks:

```text
What Changed?
```

and updates UI.

---

Angular adopted this approach.

---

## Model 3 - Virtual DOM

Framework compares:

```text
Previous Tree

↓

Current Tree
```

and computes differences.

---

React adopted this model.

---

## Model 4 - Fine-Grained Reactivity

Framework knows:

```text
Exactly Which Dependency Changed
```

and updates only those parts.

---

Signals follow this model.

---

# Virtual DOM Deep Dive

One of the most misunderstood topics.

---

Question:

```text
Is Virtual DOM Faster Than Real DOM?
```

Not exactly.

---

Real DOM operations are expensive.

React uses:

```text
Virtual Representation
```

of UI in memory.

---

Flow:

```text
State Changes

↓

Virtual Tree Created

↓

Compare Previous Tree

↓

Find Differences

↓

Update Real DOM
```

---

Important:

```text
Virtual DOM

Does Not Eliminate

DOM Updates
```

---

It simply:

```text
Reduces Unnecessary Updates
```

---

# React Reconciliation

React's diffing process.

---

Question:

```text
Which Parts Of UI Changed?
```

---

React compares:

```text
Old Virtual Tree

↓

New Virtual Tree
```

---

Result:

```text
Minimal Update Set
```

---

Called:

```text
Reconciliation
```

---

# Angular Change Detection

Angular's traditional model.

---

Question:

```text
Did Any Data Change?
```

---

Angular traverses:

```text
Component Tree
```

checking bindings.

---

This process is:

```text
Change Detection
```

---

Benefits:

```text
Predictable

Simple Mental Model
```

---

Costs:

```text
Additional Checks
```

for large applications.

---

# OnPush Change Detection

Angular optimization strategy.

---

Default:

```text
Check Frequently
```

---

OnPush:

```text
Check Only When Necessary
```

---

Typical triggers:

```text
Input Reference Changes

Events

Observable Updates

Signal Updates
```

---

Benefits:

```text
Less Work

Fewer Checks

Better Scalability
```

---

# Signals And Fine-Grained Reactivity

Modern approach.

---

Question:

```text
Why Recheck Entire Trees?
```

when only one value changed.

---

Signals track:

```text
Dependencies
```

directly.

---

Example:

```text
Signal

↓

Consumer Components

↓

Only Those Consumers Update
```

---

Benefits:

```text
Precise Updates

Less Waste

Simpler Mental Model
```

---

# React Rendering Model

Simplified view:

```text
State Change

↓

Render Phase

↓

Reconciliation

↓

Commit Phase

↓

DOM Update
```

---

Most React performance work aims to avoid unnecessary renders.

---

# Performance Optimization Categories

---

# Rendering Optimization

Reduce UI updates.

Examples:

```text
OnPush

React.memo
```

---

# Computation Optimization

Reduce expensive calculations.

Examples:

```text
computed()

useMemo()
```

---

# Event Optimization

Reduce event frequency.

Examples:

```text
Debouncing

Throttling
```

---

# Network Optimization

Reduce data transfer.

Examples:

```text
Caching

Compression

Pagination
```

---

# Bundle Optimization

Reduce download size.

Examples:

```text
Lazy Loading

Code Splitting

Tree Shaking
```

---

# Memoization

Definition:

```text
Cache Computation Results
```

to avoid repeated work.

---

Example:

```text
Expensive Calculation

↓

Store Result

↓

Reuse Result
```

---

Angular:

```typescript
computed()
```

---

React:

```typescript
useMemo()
```

---

Use carefully.

Memoization also has cost.

---

# Debouncing

Question:

```text
Should Search API Call

On Every Keystroke?
```

Example:

```text
A

Ad

Ada

Adar

Adarsh
```

---

Without debounce:

```text
5 API Calls
```

---

With debounce:

```text
Wait

↓

User Stops Typing

↓

1 API Call
```

---

Common Uses:

```text
Search

Filtering

Auto Complete
```

---

# Throttling

Question:

```text
How Often Should Scroll Events Fire?
```

---

Without throttle:

```text
Hundreds Of Events
```

---

With throttle:

```text
At Most Every X Milliseconds
```

---

Common Uses:

```text
Scroll

Resize

Mouse Tracking
```

---

# Debounce vs Throttle

Debounce:

```text
Wait For Silence
```

---

Throttle:

```text
Limit Frequency
```

---

Easy Memory Trick:

```text
Debounce
    = Search Box

Throttle
    = Scroll Events
```

---

# TrackBy vs key

A very common Angular vs React discussion.

---

Problem:

```text
List Changes
```

How do frameworks know:

```text
Which Items Changed?
```

---

Angular:

```typescript
trackBy
```

---

React:

```tsx
key
```

---

Goal:

```text
Identify Stable Items
```

---

Benefits:

```text
Less DOM Recreation

Better Rendering Performance
```

---

# Virtual Scrolling

Question:

```text
Should Browser Render
100000 Rows?
```

---

Answer:

```text
No
```

---

Instead:

```text
Render Only Visible Rows
```

---

Example:

```text
Rows 1-20 Visible

↓

Render 1-20

↓

User Scrolls

↓

Render New Visible Range
```

---

Benefits:

```text
Lower Memory Usage

Better Rendering Performance
```

---

# Pagination

Another optimization.

Instead of:

```text
100000 Records
```

Load:

```text
20 Records
```

at a time.

---

Benefits:

```text
Smaller Payloads

Less Rendering

Better UX
```

---

# Lazy Loading

Discussed previously under routing.

Goal:

```text
Load Code

Only When Needed
```

---

Benefits:

```text
Smaller Initial Bundle

Faster Startup
```

---

# Code Splitting

Instead of:

```text
Single Large Bundle
```

Create:

```text
Feature Bundles
```

loaded independently.

---

# Measuring Performance

Optimization requires measurement.

---

Rule:

```text
Measure First
```

---

Then:

```text
Optimize
```

---

# Browser DevTools

Useful for:

```text
Rendering

CPU

Memory

Network
```

analysis.

---

# Lighthouse

Measures:

```text
Performance

Accessibility

Best Practices

SEO
```

---

# Network Analysis

Questions:

```text
Large Payloads?

Slow APIs?

Repeated Requests?
```

---

Often performance issues are:

```text
Network Issues

Not Rendering Issues
```

---

# Angular Perspective

Common Angular optimization tools:

```text
OnPush

Signals

TrackBy

Async Pipe

Lazy Loading

Virtual Scrolling
```

---

Mental Model:

```text
Reduce Change Detection Work
```

---

# React Perspective

Common React optimization tools:

```text
React.memo

useMemo

useCallback

React.lazy

Suspense

Virtual Lists
```

---

Mental Model:

```text
Reduce Rendering Work
```

---

# What Stays The Same Across Frameworks?

✅ Browser Rendering Pipeline

✅ DOM Costs

✅ CPU Constraints

✅ Memory Constraints

✅ Network Constraints

✅ User Perception

✅ Caching

✅ Lazy Loading

✅ Virtual Scrolling

---

# What Changes Across Frameworks?

❌ Framework APIs

❌ Optimization Techniques

❌ Change Detection Implementation

❌ Rendering Models

---

# Angular ↔ React Mapping

## Rendering Optimization

Angular

```text
OnPush
```

React

```text
React.memo
```

---

## Computed Values

Angular

```text
computed()
```

React

```text
useMemo()
```

---

## Side Effects

Angular

```text
effect()
```

React

```text
useEffect()
```

---

## List Optimization

Angular

```text
trackBy
```

React

```text
key
```

---

## Lazy Loading

Angular

```text
loadChildren()
```

React

```text
React.lazy()
```

---

# Enterprise Performance Engineering

Large applications care about:

```text
CPU

Memory

Network

Rendering

Bundle Size
```

simultaneously.

---

Common enterprise strategies:

```text
Caching

Lazy Loading

Virtual Scrolling

Performance Monitoring

SSR

Code Splitting

CDNs
```

---

# How This Topic Evolves Into Enterprise Architecture

Performance evolves through stages:

```text
Component Optimization

↓

Feature Optimization

↓

Application Optimization

↓

Platform Optimization

↓

Enterprise Architecture
```

---

Eventually performance becomes:

```text
An Architectural Concern
```

not merely a coding concern.

---

# Common Interview Questions

## What Causes Re-Renders?

State changes.

---

## What Is Virtual DOM?

In-memory representation used to calculate efficient DOM updates.

---

## What Is Reconciliation?

React's diffing process.

---

## What Is OnPush?

Angular optimization strategy that limits unnecessary checking.

---

## Why Signals?

To enable fine-grained reactivity.

---

## Memoization?

Caching computation results.

---

## Debounce vs Throttle?

Debounce:

```text
Wait For Silence
```

Throttle:

```text
Limit Frequency
```

---

## TrackBy vs key?

Help frameworks identify stable list items.

---

## How Do You Diagnose Performance Issues?

```text
Measure

Profile

Analyze

Optimize
```

---

# Common Interview Traps

## Trap 1

Thinking performance means:

```text
UseMemo Everywhere
```

---

## Trap 2

Optimizing without measurement.

---

## Trap 3

Ignoring network costs.

---

## Trap 4

Ignoring user-perceived performance.

---

## Trap 5

Believing Virtual DOM eliminates DOM updates.

---

# Senior-Level Mental Model

Do not think:

```text
OnPush

React.memo

Signals

useMemo

useCallback
```

Think:

```text
Why Is Work Happening?

Can We Avoid It?

Can We Reduce It?

Can We Delay It?

Can We Do Less Of It?
```

Every optimization ultimately answers one of those questions.

---

# Key Takeaways

1. Performance engineering is about reducing unnecessary work.
2. User perception matters as much as raw metrics.
3. Browser rendering follows a predictable pipeline.
4. Rendering costs scale with application complexity.
5. Different frameworks use different reactivity models to solve the same problem.
6. Virtual DOM optimizes DOM updates but does not eliminate them.
7. Signals enable fine-grained reactivity.
8. Memoization, debouncing, throttling, and virtualization are universal performance patterns.
9. Measure before optimizing.
10. Performance eventually becomes an architectural concern.

---

# Revision Sheet

```text
Performance
    = Efficient User Experience

Rendering
    = State → UI

Virtual DOM
    = UI Comparison Layer

Reconciliation
    = React Diffing

Change Detection
    = Angular Update Detection

Signals
    = Fine-Grained Reactivity

Memoization
    = Cache Computation

Debounce
    = Wait For Silence

Throttle
    = Limit Frequency

TrackBy / key
    = Stable Item Identity

Virtual Scrolling
    = Render Visible Items

Lazy Loading
    = Load When Needed

Performance Rule
    = Measure First

What Changes?
    = APIs

What Stays Same?
    = Browser Constraints
```