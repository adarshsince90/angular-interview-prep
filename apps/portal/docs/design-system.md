# Liquid Glass Design System Specification

## 1. Typography
- **UI & Prose**: `Plus Jakarta Sans` / `Inter`, system fallback.
- **Code & Syntax**: `JetBrains Mono` / `Fira Code`, monospace fallback.

## 2. Liquid Glass Tokens (`:root`)

```css
:root {
  /* Dimensions & Offsets */
  --header-height: 76px;
  --sticky-offset: calc(var(--header-height) + 0.75rem);
  --sidebar-width: 320px;
  --drawer-width: 400px;

  /* Fonts */
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Light Theme */
[data-theme='light'] {
  --bg-gradient: radial-gradient(circle at 10% 20%, rgba(241, 245, 249, 0.8) 0%, rgba(248, 250, 252, 1) 90%);
  --bg-surface: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;

  --glass-bg: rgba(255, 255, 255, 0.78);
  --glass-bg-accent: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(255, 255, 255, 0.8) 100%);
  --glass-border: 1px solid rgba(226, 232, 240, 0.85);
  --glass-border-cyan: 1px solid rgba(14, 165, 233, 0.4);
  --glass-blur: blur(16px);
  --glass-shadow: 0 8px 32px 0 rgba(15, 23, 42, 0.06), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9);
  --glass-shadow-glow: 0 8px 32px 0 rgba(14, 165, 233, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9);
  --accent-cyan: #0284c7;
  --accent-cyan-glow: rgba(2, 132, 199, 0.2);
}

/* Dark Theme (Liquid Glass Default) */
[data-theme='dark'] {
  --bg-gradient: radial-gradient(circle at 15% 15%, #0f172a 0%, #030712 100%);
  --bg-surface: #0a0f1d;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;

  --glass-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%), rgba(15, 23, 42, 0.55);
  --glass-bg-accent: linear-gradient(135deg, rgba(0, 243, 255, 0.06) 0%, rgba(15, 23, 42, 0.6) 100%), rgba(15, 23, 42, 0.55);
  --glass-border: 1px solid rgba(255, 255, 255, 0.12);
  --glass-border-cyan: 1px solid rgba(0, 243, 255, 0.35);
  --glass-blur: blur(16px);
  --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.45), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12);
  --glass-shadow-glow: 0 8px 32px 0 rgba(0, 0, 0, 0.45), 0 0 20px rgba(0, 243, 255, 0.18), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2);
  --accent-cyan: #00f3ff;
  --accent-cyan-glow: rgba(0, 243, 255, 0.25);
}
```
