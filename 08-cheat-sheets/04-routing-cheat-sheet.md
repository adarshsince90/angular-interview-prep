# Routing Cheat Sheet

# Route Types

Static

```typescript
/users
```

Dynamic

```typescript
/users/:id
```

---

# Parameters

Route Parameter

```typescript
/users/10
```

---

Query Parameter

```typescript
/users?page=2
```

---

# Navigation

```typescript
router.navigate(...)
```

---

# Guards

CanActivate

```text
Enter Route?
```

CanDeactivate

```text
Leave Route?
```

CanMatch

```text
Can Route Match?
```

---

# Resolvers

Load data:

```text
Before Navigation
```

---

# Lazy Loading

```typescript
loadChildren(...)
```

Benefits:

```text
Smaller Bundle

Faster Startup
```

---

# Interview Questions

401 vs Guard?

401:

```text
Backend
```

Guard:

```text
Frontend
```

---

# Golden Rule

```text
Authentication
    = Guard

Authorization
    = Guard + Backend Validation
```
