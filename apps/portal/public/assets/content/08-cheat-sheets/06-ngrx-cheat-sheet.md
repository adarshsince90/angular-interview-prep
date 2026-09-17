# NgRx Cheat Sheet

# Mental Model

```text
Action

↓

Reducer

↓

Store

↓

Selector

↓

UI
```

---

# Store

```text
Application State
```

---

# Action

```text
Event
```

Example:

```typescript
loadEmployees
```

---

# dispatch()

```text
Publish Event
```

---

# Reducer

```text
Old State
+
Action
=
New State
```

Pure Function.

---

# Effect

```text
Side Effects
```

Examples:

```text
API Calls

Logging

Navigation
```

---

# Selector

```text
Read State
```

---

# Pure Reducer

Must:

✅ Same Input → Same Output

✅ No Side Effects

✅ No State Mutation

---

# Do Not Put In Reducers

```text
API Calls

Logging

Navigation
```

---

# Typical Pattern

```text
loadEmployees

↓

loadEmployeesSuccess

↓

loadEmployeesFailure
```

---

# Golden Rule

```text
Actions Describe

Reducers Transform

Effects Execute

Selectors Read
```

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Forms Cheat Sheet](05-forms-cheat-sheet.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Authentication & Authorization Cheat Sheet](07-auth-cheat-sheet.md)

<br/>
<!-- navigation-end -->
