# Signals Cheat Sheet

# Core APIs

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