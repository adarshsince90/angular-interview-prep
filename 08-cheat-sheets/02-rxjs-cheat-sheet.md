# RxJS Cheat Sheet

# Observable vs Promise

Observable

```text
0 to Many Values

Lazy

Cancelable
```

Promise

```text
Single Value

Eager

Not Cancelable
```

---

# Subjects

Subject

```text
Hot Observable
```

BehaviorSubject

```text
Stores Current Value
```

ReplaySubject

```text
Replays Previous Values
```

---

# Operator Decision Guide

Search Box

```text
switchMap
```

---

Parallel Requests

```text
mergeMap
```

---

Sequential Requests

```text
concatMap
```

---

Prevent Double Click

```text
exhaustMap
```

---

# Transformation

```typescript
map()
```

Transform values

---

# Filtering

```typescript
filter()

take()

debounceTime()

distinctUntilChanged()
```

---

# Combination

```typescript
combineLatest()

forkJoin()

zip()
```

---

# Error Handling

```typescript
catchError()

retry()

retryWhen()
```

---

# Caching

```typescript
shareReplay(1)
```

---

# Interview Traps

switchMap:

```text
Cancels Previous Request
```

mergeMap:

```text
Does NOT Cancel
```

---

# Golden Rule

```text
Streams
    = RxJS

State
    = Signals
```
