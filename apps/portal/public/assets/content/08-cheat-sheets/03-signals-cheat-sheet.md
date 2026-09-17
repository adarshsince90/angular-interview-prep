# Signals Cheat Sheet

## Core APIs

```text
signal()

computed()

effect()
```

---

signal

```typescript
count = signal(0);
```

Writable state.

---

computed

```typescript
total = computed(
 () => price() * qty()
);
```

Derived state.

---

effect

```typescript
effect(() => {
 console.log(count());
});
```

Side effects.

---

# Updates

```typescript
count.set(10);

count.update(v => v + 1);
```

---

# Why Signals?

```text
Fine-Grained Reactivity

Better Performance

Less Boilerplate
```

---

# Signals vs RxJS

Signals

```text
State
```

RxJS

```text
Streams
```

---

# Interview Question

Signals Replace RxJS?

```text
No
```

Use:

```text
Signals → State

RxJS → Async Streams
```

---

# Golden Rule

```text
State
    ↓

signal()

    ↓

computed()

    ↓

effect()
```

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [RxJS Cheat Sheet](02-rxjs-cheat-sheet.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Routing Cheat Sheet](04-routing-cheat-sheet.md)

<br/>
<!-- navigation-end -->
