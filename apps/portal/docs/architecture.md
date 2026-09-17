# Angular Interview Prep Portal — Architecture Specification

## 1. Executive Summary
The **Angular Interview Prep Portal** is a production-grade web application built to render, search, and interact with 60+ in-depth Angular architecture and interview guides.

## 2. Core Architectural Tenets
1. **Single Source of Truth (SSOT)**:
   - The markdown files in the parent directory (`01-foundations/` through `08-cheat-sheets/`) remain the sole content source.
   - Content is never duplicated into Angular templates or compiled static HTML.
2. **Hybrid Content Pipeline (CQRS / Read Model)**:
   - **Query / Read Index (`content-manifest.json`)**: A build-time node script creates a 35KB manifest indexing topic metadata, categories, flashcards, and search tokens.
   - **Document Stream**: Full markdown content is fetched on demand via `HttpClient` when a user navigates to a topic.
3. **Reactivity & State**:
   - Built on modern **Angular Signals** (`signal()`, `computed()`, `effect()`, `input()`, `output()`).
   - `ChangeDetectionStrategy.OnPush` enforced across all components.
   - Zoneless-ready architecture.
4. **Security & Sanitization**:
   - `DOMPurify` pre-sanitization before `DomSanitizer.bypassSecurityTrustHtml()`.
   - Host-level `MarkdownLinkInterceptorDirective` to convert internal markdown file links into seamless client-side SPA routing.

## 3. Layer Separation
- **`core/`**: Layout shell (Header, Sidebar, Drawer), singleton services (`ContentService`, `ThemeService`, `SearchEngineService`), state facades.
- **`shared/`**: Presentational UI controls (Liquid Glass buttons, tabs, modal dialogs, badges, pipes, directives).
- **`features/`**:
  - `topic-reader`: Multi-mode reader container (Deep Dive, Quick Recap, Flashcards).
  - `search-modal`: Instant `Cmd+K` global index search.
  - `visualizers`: Interactive Signals vs RxJS and Change Detection trees.
