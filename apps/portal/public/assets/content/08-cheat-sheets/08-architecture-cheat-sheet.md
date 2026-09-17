# Enterprise Architecture Cheat Sheet

# Layers

```text
Core

Shared

Feature
```

---

# Core

Application-wide concerns.

Examples:

```text
Auth

Guards

Interceptors

Logging
```

---

# Shared

Reusable UI.

Examples:

```text
Button

Modal

Pipe

Directive
```

---

# Feature

Business Domains.

Examples:

```text
Employees

Projects

Reports
```

---

# Enterprise Flow

```text
UI

↓

Store

↓

Service

↓

HTTP

↓

Backend
```

---

# Container Components

```text
Behavior

State

Workflows
```

---

# Presentational Components

```text
Rendering
```

---

# Cross-Cutting Concerns

```text
Auth

Logging

Caching

Monitoring

Error Handling
```

---

# Micro Frontends

```text
Many Apps

One Product
```

---

# Shell Owns

```text
Authentication

Theme

Localization

Feature Flags
```

---

# Shared State

✅ User

✅ Theme

✅ Locale

✅ Permissions

---

❌ Employees

❌ Projects

❌ Reports

---

# Golden Rule

```text
Feature Owns Its State

Shell Owns Global Context
```

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Authentication & Authorization Cheat Sheet](07-auth-cheat-sheet.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Interview Day Quick Revision](09-interview-day-cheat-sheet.md)

<br/>
<!-- navigation-end -->
