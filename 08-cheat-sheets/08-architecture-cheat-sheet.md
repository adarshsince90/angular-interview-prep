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