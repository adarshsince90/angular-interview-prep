import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '../../..');
const PORTAL_PUBLIC_ASSETS = path.resolve(__dirname, '../public/assets');

const CATEGORY_META = {
  '01-foundations': { title: 'Foundations & Architecture', order: 1, badge: 'Basics', icon: 'layers' },
  '02-core-angular': { title: 'Core Angular Essentials', order: 2, badge: 'Core', icon: 'cpu' },
  '03-intermediate': { title: 'Intermediate Patterns', order: 3, badge: 'Intermediate', icon: 'workflow' },
  '04-reactivity': { title: 'Reactivity, RxJS & Signals', order: 4, badge: 'Must Know', icon: 'zap' },
  '05-advanced': { title: 'Advanced & Performance', order: 5, badge: 'Advanced', icon: 'gauge' },
  '06-senior-architecture': { title: 'Senior Architecture & Enterprise', order: 6, badge: 'Architect', icon: 'shield-check' },
  '07-interview-preparation': { title: 'Interview Drills & System Design', order: 7, badge: 'Interview', icon: 'target' },
  '08-cheat-sheets': { title: 'Rapid Cheat Sheets', order: 8, badge: 'Quick Cram', icon: 'bookmark' }
};

const CURATED_FLASHCARDS = {
  '01-why-angular': [
    {
      question: 'What is Angular and what primary architectural problem does it solve?',
      answer: 'Angular is a full-featured, opinionated, TypeScript-based platform maintained by Google. It provides an end-to-end architecture (DI, routing, forms, HTTP client, signals) to eliminate spaghetti code and build maintainable, testable enterprise SPAs.'
    },
    {
      question: 'What is the fundamental difference between Angular and jQuery?',
      answer: 'jQuery relies on imperative DOM manipulation where application state is stored directly inside HTML elements. Angular uses declarative data binding where state resides in TypeScript classes/signals and the DOM is a reactive projection of that state.'
    },
    {
      question: 'How does Angular differ from React architecturally?',
      answer: 'Angular is a complete "batteries-included" framework with built-in DI, routing, forms, and fine-grained Signals. React is a view rendering library requiring community packages for routing, forms, and state, with rendering driven by virtual DOM reconciliation.'
    },
    {
      question: 'What is the core difference between a Framework and a Library?',
      answer: 'Inversion of Control (IoC). With a library, your application code controls the execution flow and calls the library. With a framework, the framework owns the lifecycle and architecture, calling your code into predefined hooks.'
    },
    {
      question: 'Why do enterprise organizations overwhelmingly prefer Angular?',
      answer: 'Standardized architecture across distributed teams, automated framework migrations via ng update, first-class TypeScript type safety, integrated XSS/CSRF security, and built-in hierarchical dependency injection.'
    },
    {
      question: 'How has Modern Angular (v16–v19+) modernized compared to legacy Angular?',
      answer: 'Introduced Standalone components by default (no NgModules), fine-grained Signals reactivity, built-in control flow (@if, @for), deferrable views (@defer), and zoneless change detection support.'
    }
  ],
  '02-spa-concepts': [
    {
      question: 'What is a Single Page Application (SPA)?',
      answer: 'A web application that loads a single HTML document shell once and dynamically rewrites the UI via client-side JavaScript by manipulating the DOM and exchanging raw JSON data asynchronously over HTTP APIs without full page reloads.'
    },
    {
      question: 'What are the main differences between an SPA and a traditional Multi-Page Application (MPA)?',
      answer: 'MPAs re-render entire HTML documents on the server for each request, causing white screen flashes and lost client state. SPAs render views in the browser, preserve client memory and state, and exchange lightweight JSON data.'
    },
    {
      question: 'How does client-side routing work under the hood without refreshing the browser?',
      answer: 'It intercepts anchor clicks via preventDefault(), updates the URL and history stack using the HTML5 History API (history.pushState), listens for popstate events, and dynamically renders the matched component inside <router-outlet>.'
    },
    {
      question: 'What are the primary challenges of SPAs and how does Angular solve them?',
      answer: 'Initial load latency and SEO challenges. Angular solves these using Server-Side Rendering (@angular/ssr) with non-destructive hydration, event replay, route-level code splitting (loadComponent), and deferrable views (@defer).'
    },
    {
      question: 'What server configuration is required to support deep linking in an SPA?',
      answer: 'The web server (Nginx, Apache, or ASP.NET Core) must be configured with a fallback rule (e.g. try_files $uri $uri/ /index.html) to serve index.html for all non-file routes so the client-side router can resolve the path.'
    }
  ],
  '03-component-based-architecture': [
    {
      question: 'What is the core philosophy of Component-Based Architecture?',
      answer: 'Decomposing complex user interfaces into independent, self-contained, and reusable building blocks that encapsulate their own template, styles, and controller logic.'
    },
    {
      question: 'What is the difference between Smart (Container) and Dumb (Presentational) components?',
      answer: 'Smart components manage state, inject services, and handle business flows. Dumb components receive data strictly via inputs, emit events via outputs, and focus purely on UI rendering with zero external dependencies.'
    },
    {
      question: 'How does unidirectional data flow operate between parent and child components?',
      answer: 'Data flows down from parent to child via property bindings (input()), and user events flow up from child to parent via custom event emitters (output()). Children never directly mutate parent state.'
    },
    {
      question: 'Why did Angular introduce Signal-based component inputs and outputs?',
      answer: 'Signal inputs (input(), input.required()) provide compile-time safety, integrate with computed() and effect(), eliminate ngOnChanges boilerplate, and support zoneless change detection.'
    }
  ],
  '05-typescript-essentials-for-angular': [
    {
      question: 'Why did Google choose TypeScript as the foundation for Angular?',
      answer: 'TypeScript provides static type safety, refactoring support, compile-time contract enforcement, decorator metadata for framework wiring, and parameter types essential for Dependency Injection.'
    },
    {
      question: 'How does Angular Dependency Injection leverage TypeScript?',
      answer: 'TypeScript emits type metadata for constructor parameters, allowing Angular’s injector to inspect parameter types at runtime and automatically inject the corresponding singleton service token.'
    },
    {
      question: 'What is the difference between interface and type in TypeScript?',
      answer: 'Interfaces define extensible object and class contracts. Types are aliases that can represent primitives, unions (|), intersections (&), tuples, and complex mapped transformations.'
    },
    {
      question: 'What is the difference between any, unknown, and never in TypeScript?',
      answer: 'any disables all type checking; unknown is a type-safe counterpart requiring narrowing before operations; never represents impossible states (e.g. exhaustive switch cases or functions that throw).'
    }
  ],
  '24-nested-routes': [
    {
      question: 'How do nested (child) routes work in Angular?',
      answer: 'Configured via the children property in route definitions. When a child route activates, its component renders inside the <router-outlet> of its parent component rather than replacing the top-level viewport.'
    },
    {
      question: 'How do child routes access parameters from parent routes?',
      answer: 'By configuring paramsInheritanceStrategy: "always" in the router, or by traversing route.parent.paramMap to read parent path and query parameters.'
    }
  ],
  '27-http-interceptors': [
    {
      question: 'What is an HttpInterceptor in Angular?',
      answer: 'A middleware pattern that inspects, transforms, or handles outgoing HttpRequest objects and incoming HttpResponse events globally (e.g. attaching auth headers, logging, caching, retry logic).'
    },
    {
      question: 'How are modern functional interceptors defined in Angular 15+?',
      answer: 'As pure functions conforming to HttpInterceptorFn: (req, next) => next(req), configured globally via provideHttpClient(withInterceptors([authInterceptor])).'
    }
  ],
  '28-change-detection': [
    {
      question: 'What is the difference between Default and OnPush change detection strategies?',
      answer: 'Default checks the entire component tree on any asynchronous event. OnPush skips component subtrees unless an @Input() reference changes, an event originated inside the component, or a Signal/AsyncPipe triggers an update.'
    },
    {
      question: 'How do Angular Signals improve change detection over Zone.js?',
      answer: 'Signals provide fine-grained, surgical reactivity: Angular knows exactly which template node depends on which signal, enabling localized DOM updates without traversing the entire component hierarchy.'
    }
  ],
  '38-angular-testing-deep-dive': [
    {
      question: 'What is the primary role of TestBed in Angular unit testing?',
      answer: 'TestBed is Angular’s test execution module that configures and initializes a mock dependency injection environment, compiling components and templates in isolation.'
    },
    {
      question: 'What is the difference between ComponentFixture and DebugElement?',
      answer: 'ComponentFixture provides a test harness for the component instance and change detection cycle. DebugElement is an abstraction over native DOM elements with cross-platform inspection utilities.'
    }
  ],
  '40-angular-system-design-case-studies': [
    {
      question: 'How do you design an enterprise notification center with high event volume?',
      answer: 'Use Server-Sent Events (SSE) or WebSockets managed by a singleton service, pipe events through an RxJS buffer/debounce, maintain an in-memory normalized queue, and virtualize the notification dropdown list.'
    },
    {
      question: 'How do you architect multi-tenant SaaS dashboards in Angular?',
      answer: 'Dynamically load tenant configuration via APP_INITIALIZER, inject theme CSS variables at runtime, lazy load tenant-specific feature modules, and enforce tenant-scoped HTTP headers via interceptors.'
    }
  ],
  '41-quick-fire-qa': [
    {
      question: 'What is the difference between declarations, imports, and exports in NgModules?',
      answer: 'declarations are components/directives/pipes belonging to this module; imports bring in external modules needed by this module; exports make internal declarations available to other modules importing this one.'
    },
    {
      question: 'What is tree-shaking and how does Angular achieve it?',
      answer: 'Tree-shaking eliminates dead/unused code from final production bundles using ES modules static analysis and providedIn: "root" injectable metadata.'
    }
  ],
  '02-rxjs-cheat-sheet': [
    {
      question: 'What is the difference between switchMap, mergeMap, concatMap, and exhaustMap?',
      answer: 'switchMap cancels previous in-flight requests (search/typeahead); mergeMap runs requests concurrently; concatMap queues requests in strict sequence; exhaustMap ignores new emissions while the current request is pending (submit buttons).'
    },
    {
      question: 'How do you prevent memory leaks when subscribing to Observables?',
      answer: 'Use the AsyncPipe in templates, takeUntilDestroyed() in component constructors, take(1) / first() for single emissions, or manually unsubscribe in ngOnDestroy.'
    }
  ],
  '06-ngrx-cheat-sheet': [
    {
      question: 'What are the main components of NgRx architecture?',
      answer: 'Store (single source of truth), Actions (dispatched event payloads), Reducers (pure functions creating new state), Selectors (memoized queries), and Effects (handling async side-effects like HTTP calls).'
    }
  ],
  '08-architecture-cheat-sheet': [
    {
      question: 'What is the difference between Core and Shared modules?',
      answer: 'Core contains singleton services, interceptors, and guards loaded once at startup. Shared contains purely reusable dumb components, directives, and pipes imported by multiple feature modules.'
    }
  ],
  '09-interview-day-cheat-sheet': [
    {
      question: 'What are the top 3 architectural topics senior Angular interviewers focus on?',
      answer: '1. Change Detection & Performance (Zone.js vs Signals, OnPush, @defer). 2. Reactive Architecture (RxJS stream management, state layering). 3. Scalable App Structure (modular monolith, Nx domain boundaries, lazy loading).'
    }
  ],
  '37-frontend-system-design': [
    {
      question: 'What is the primary mindset shift in frontend system design interviews?',
      answer: 'Shift focus from framework syntax to large-scale architecture, scalability, maintainability, business domain boundaries, and architectural trade-offs.'
    },
    {
      question: 'What are the 5 core stages of the Angular system design framework?',
      answer: '1. Clarify functional and non-functional requirements. 2. Identify business domains. 3. Define UI architecture & routing. 4. Determine state management strategy. 5. Establish performance, caching, and offline strategies.'
    },
    {
      question: 'How should state management be structured in large-scale Angular applications?',
      answer: 'Categorize state into Local UI state (Signals / component state), Shared feature state (scoped services), and Global entity state (NgRx / Signals Store). Only lift state when multiple decoupled domains require access.'
    },
    {
      question: 'What performance strategies should be considered when designing enterprise dashboards?',
      answer: 'Implement route lazy loading, OnPush change detection with Signals, deferrable views (@defer) for expensive widgets, virtual scrolling for tabular data, and API response caching via HTTP interceptors.'
    },
    {
      question: 'How do you architect real-time event-driven applications in Angular?',
      answer: 'Abstract WebSocket connections behind singleton services, pipe incoming streams into RxJS subjects or signals, normalize entity state in memory, and implement CDK virtual scroll to handle high-frequency renders.'
    }
  ],
  '34-enterprise-architecture': [
    {
      question: 'What is the primary purpose of enterprise frontend architecture?',
      answer: 'To prevent architectural decay, decouple business domains, ensure independent team velocity, and enforce strict module boundaries using patterns like Nx monorepos and clean architecture.'
    },
    {
      question: 'What are the three core architectural layers in a scalable Angular enterprise app?',
      answer: 'Core (singleton services, auth, global error handling), Shared (dumb UI components, reusable pipes, design system tokens), and Features (domain-specific modules, smart containers, routing, local state).'
    },
    {
      question: 'How do you prevent architectural decay and circular dependencies across features?',
      answer: 'Enforce strict unidirectional dependency rules (e.g. via Nx boundary lint rules): features can import from shared/core, but features must never import from peer features directly. Inter-feature communication occurs via URL navigation or global event buses.'
    }
  ],
  '35-micro-frontends': [
    {
      question: 'When should you choose Micro Frontends over a Modular Monolith?',
      answer: 'When multiple autonomous teams require independent deployment pipelines, independent release cadences, and distinct domain ownership. For single teams or small-to-medium apps, a modular monolith with strict domain boundaries is preferred.'
    },
    {
      question: 'What are the architectural trade-offs of Micro Frontends in Angular?',
      answer: 'Benefits include independent deployments and domain isolation. Trade-offs include increased tooling complexity, bundle overhead across remotes, version skew between shared libraries, and complex cross-MFE integration testing.'
    },
    {
      question: 'Should Micro Frontends share a single global NgRx store?',
      answer: 'No. Sharing a single mutable global store creates tight coupling across MFEs, defeating independent deployments. Each MFE should manage its own isolated domain state, communicating across boundaries only via contracts, custom events, or URL state.'
    }
  ],
  '30-state-management-fundamentals': [
    {
      question: 'What are the three categories of state in Angular applications?',
      answer: '1. Component/Local State (UI flags, forms, modal toggles). 2. Shared/Feature State (state shared among a feature’s components via services). 3. Global Application State (authenticated user, global config, cross-domain entities).'
    },
    {
      question: 'When is a dedicated state management library like NgRx necessary?',
      answer: 'When complex state needs to be accessed by many decoupled components across different routes, requires undo/redo or time-travel debugging, has high-frequency updates, or needs strict unidirectional immutability.'
    },
    {
      question: 'What problem does unidirectional data flow solve in state management?',
      answer: 'It eliminates race conditions, unpredictable state mutations, and hard-to-trace bugs by ensuring state changes can only be triggered via explicit actions and flows in one predictable direction to view components.'
    }
  ],
  '31-ngrx-fundamentals': [
    {
      question: 'What is the core data flow in NgRx?',
      answer: 'Components dispatch Actions. Reducers take the current state and action to calculate new state immutably. Selectors allow components to query slices of state reactively. Effects handle side effects like asynchronous HTTP calls.'
    },
    {
      question: 'Why should NgRx state be immutable?',
      answer: 'Immutability allows OnPush change detection to verify object references in O(1) time without dirty checking, guarantees predictable state transitions, and enables deterministic time-travel debugging.'
    }
  ],
  '32-authentication-authorization': [
    {
      question: 'What is the difference between Authentication and Authorization?',
      answer: 'Authentication verifies WHO the user is (e.g. login credentials, JWT validation). Authorization determines WHAT resources, features, or routes that authenticated user is permitted to access (roles, permissions, scopes).'
    },
    {
      question: 'Where should JWT tokens be stored securely in an Angular application?',
      answer: 'Ideally in httpOnly, Secure, SameSite cookies to protect against XSS attacks. If stored in memory or storage, access tokens should be short-lived with refresh tokens handled securely.'
    }
  ],
  '33-error-handling-strategy': [
    {
      question: 'How should global errors be captured and logged in Angular?',
      answer: 'Implement a custom ErrorHandler class to intercept uncaught runtime exceptions globally, extract stack traces, and transmit structured telemetry to monitoring services like Sentry or Application Insights.'
    },
    {
      question: 'How should HTTP errors be handled gracefully across the application?',
      answer: 'Use an HttpInterceptor with RxJS catchError to centralize error mapping (e.g. 401 redirect, 403 forbidden toast, 500 retry mechanism) before re-throwing or providing user-friendly fallback notifications.'
    }
  ],
  '23-route-guards': [
    {
      question: 'What is the difference between canActivate and canMatch in Angular routing?',
      answer: 'canActivate runs after the route matches to check if a component can be activated; if it fails, the route still matched. canMatch runs during route matching; if it returns false, Angular continues searching for alternative routes with the same path (ideal for feature flags or MFE variants).'
    },
    {
      question: 'When would you use a canDeactivate guard?',
      answer: 'To prevent users from accidentally navigating away from a page with unsaved form changes, prompting them with a confirmation dialog before route transition.'
    }
  ],
  '25-route-resolvers': [
    {
      question: 'What is the primary architectural purpose of a Route Resolver in Angular?',
      answer: 'A resolver pre-fetches essential data before the route component activates and renders, preventing UI flickering and blank layout states while waiting for API responses.'
    },
    {
      question: 'What is the trade-off of using Route Resolvers?',
      answer: 'Navigation is delayed until the resolver observable completes. If the API response is slow, the user stays on the previous page with no visual progress unless a global navigation loading indicator is shown.'
    }
  ],
  '14-lifecycle-hooks': [
    {
      question: 'What is the difference between ngOnInit and the constructor in Angular?',
      answer: 'The constructor is standard TypeScript instantiation for dependency injection. ngOnInit is called by Angular after the component’s @Input properties are initialized and data-bound for the first time.'
    },
    {
      question: 'Why is ngOnDestroy critical for enterprise Angular applications?',
      answer: 'It cleans up resources to prevent memory leaks, such as unsubscribing from RxJS observables, disconnecting MutationObservers or WebSockets, and clearing intervals/timeouts.'
    }
  ],
  '16-subjects-and-behaviorsubject': [
    {
      question: 'What is the difference between Subject, BehaviorSubject, and ReplaySubject?',
      answer: 'Subject emits only future events. BehaviorSubject requires an initial value and emits the current/latest value to new subscribers immediately. ReplaySubject buffers a configured number of past values and replays them to new subscribers.'
    },
    {
      question: 'Why should you expose Subjects as Observables in services using asObservable()?',
      answer: 'Encapsulation: it prevents external consumers from calling .next() or manipulating internal state directly, ensuring only the service controls mutations.'
    }
  ],
  '01-angular-cheat-sheet': [
    {
      question: 'What is the fundamental difference between Components and Directives?',
      answer: 'A Component is a Directive with an associated HTML template and styles. Directives without templates attach custom behavior or styling to existing DOM elements.'
    },
    {
      question: 'Why does Angular use Dependency Injection?',
      answer: 'DI provides loose coupling, simplifies unit testing via mock injection, promotes single responsibility, and allows flexible hierarchical scoping (root, feature, or component level).'
    }
  ],
  '03-signals-cheat-sheet': [
    {
      question: 'Do Angular Signals replace RxJS?',
      answer: 'No. Signals are ideal for synchronous reactive UI state, template binding, and localized derivation. RxJS remains the best tool for complex asynchronous streams, WebSocket events, debounce/throttle, and cancellation.'
    },
    {
      question: 'What is the difference between computed() and effect() in Angular Signals?',
      answer: 'computed() produces a read-only derived signal lazily and memoizes the result without side effects. effect() executes side effects (logging, DOM mutations, third-party libraries) whenever its dependent signals change.'
    }
  ],
  '04-routing-cheat-sheet': [
    {
      question: 'How does Angular lazy loading work with standalone components?',
      answer: 'Using loadComponent: () => import("./path").then(m => m.Component) in route configuration, Angular creates a separate chunk loaded only when the route is requested.'
    },
    {
      question: 'What is the role of Route Resolvers?',
      answer: 'Resolvers fetch required API data before the route component is rendered, ensuring the component doesn’t render an empty or partial UI while waiting for initial data.'
    }
  ],
  '05-forms-cheat-sheet': [
    {
      question: 'Why are Reactive Forms preferred over Template-Driven Forms in enterprise applications?',
      answer: 'Reactive Forms are synchronous, programmatic, fully typed, easier to unit test without DOM interaction, and provide observable streams (valueChanges, statusChanges) for complex cross-field validation.'
    },
    {
      question: 'How do Async Validators work in Angular Reactive Forms?',
      answer: 'Async Validators return an Observable or Promise that emits validation errors or null after completing asynchronous operations (such as verifying username availability via an HTTP call).'
    }
  ],
  '07-auth-cheat-sheet': [
    {
      question: 'How should HTTP requests automatically attach JWT tokens in Angular?',
      answer: 'Using an HttpInterceptor (via withInterceptors([authInterceptor])), which clones outgoing HttpRequest objects and appends the Authorization: Bearer <token> header before forwarding the request.'
    },
    {
      question: 'How do you handle 401 Unauthorized errors globally?',
      answer: 'In an HTTP error interceptor, catch 401 responses using RxJS catchError, attempt token refresh if available, or clear session state and redirect to the login route.'
    }
  ]
};

function extractHeadings(content) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    if (/^(Interview Priority|Interview Frequency|Recommended Depth|Relevant For|Table of Contents|navigation)/i.test(text)) {
      continue;
    }
    headings.push({
      level: match[1].length,
      text
    });
  }
  return headings;
}

function extractFlashcards(content, topicTitle, topicId) {
  // If curated flashcards exist for this topic, return them directly
  if (topicId && CURATED_FLASHCARDS[topicId] && CURATED_FLASHCARDS[topicId].length > 0) {
    return CURATED_FLASHCARDS[topicId].map(c => ({
      question: c.question,
      answer: c.answer,
      source: topicTitle
    }));
  }

  const cards = [];
  const lines = content.split(/\r?\n/);
  let inCodeBlock = false;

  // Strategy 1: Quick-fire format: "Question?" on heading / bold line, followed by text answer
  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    // e.g. "# What Is a Service?" or "### Why does Angular use TypeScript?" or "## What is an Attribute Directive?"
    const qMatch = line.match(/^(?:#{1,3})\s*(?:Q:\s*|Question:\s*)?([A-Z][^?\n\r]{8,}\?)/i) ||
                   line.match(/^\*\*(?:Q:\s*|Question:\s*)?([A-Z][^?\n\r]{8,}\?)\*\*/i);

    if (qMatch && !line.startsWith('<!--') && !line.startsWith('# Key') && !line.startsWith('# Interview') && !line.startsWith('# Relevant')) {
      const question = qMatch[1].trim();

      // Collect substantive answer lines, strictly avoiding code blocks and diagrams
      const ansLines = [];
      for (let j = i + 1; j < Math.min(i + 14, lines.length); j++) {
        const next = lines[j].trim();
        if (!next) continue;
        if (next.startsWith('```') || next.startsWith('#') || next.match(/^[A-Z][^?\n\r]{8,}\?/) || next.startsWith('---') || next.startsWith('<!--')) {
          break;
        }
        if (next.startsWith('|') || next.includes('↓') || next.includes('├─') || next.includes('└─') || next.includes('to:') || next.startsWith('-->')) {
          break;
        }
        const cleanLine = next.replace(/^[-*→]\s*/, '').replace(/[*_`]/g, '').trim();
        if (cleanLine.length > 5 && !cleanLine.endsWith(':')) {
          ansLines.push(cleanLine);
        }
        if (ansLines.length >= 3) break;
      }

      let answer = ansLines.join(' ').replace(/:\s*$/, '.').trim();
      if (answer.length >= 30 && !answer.includes('```') && !answer.startsWith('|') && !/^(Imagine|Think of|Consider|For example|Example)/i.test(answer)) {
        cards.push({
          question,
          answer,
          source: topicTitle
        });
      }
    }
  }

  // Strategy 2: "## Common Interview Questions" list
  const qList = [];
  let inQSection = false;
  inCodeBlock = false;
  for (const l of lines) {
    const t = l.trim();
    if (t.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    if (/^##\s+.*Interview Questions/i.test(t)) {
      inQSection = true;
      continue;
    }
    if (inQSection && /^##\s+/.test(t)) {
      inQSection = false;
    }
    if (inQSection && (t.startsWith('-') || t.startsWith('*') || /^\d+[\.\)]/.test(t))) {
      const qText = t.replace(/^[-*\d\.\)]\s+/, '').replace(/^\*\*|\*\*$/g, '').replace(/`[^`]+`/g, '').trim();
      if (qText.length > 10 && !qText.includes('```')) {
        qList.push(qText.endsWith('?') ? qText : `${qText}?`);
      }
    }
  }

  // Strategy 3: Key Takeaways list: clean items
  const takeaways = [];
  let inTakeaways = false;
  inCodeBlock = false;
  for (const l of lines) {
    const t = l.trim();
    if (t.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    if (/^#+\s+(Key Takeaways|Key Message|Summary|Core Architectural Principles)/i.test(t)) {
      inTakeaways = true;
      continue;
    }
    if (inTakeaways && /^#+\s+[^#]/.test(t) && !/Takeaways|Message/i.test(t)) {
      inTakeaways = false;
    }
    if (inTakeaways) {
      const numMatch = t.match(/^\d+[\.\)]\s+(.+)/);
      const text = numMatch ? numMatch[1].trim() : (t.startsWith('-') || t.startsWith('*') ? t.replace(/^[-*]\s+/, '').trim() : '');
      const clean = text.replace(/[*_`]/g, '').trim();
      if (clean.length > 25 && !clean.startsWith('|') && !clean.includes('```')) {
        takeaways.push(clean);
      }
    }
  }

  // Pair questions from Strategy 2 if cards is still low
  if (cards.length < 3 && qList.length > 0) {
    qList.forEach((q, idx) => {
      const ans = takeaways[idx] || takeaways[0] || `Key architectural interview topic in ${topicTitle}. Master the design decisions and trade-offs explained in this module.`;
      cards.push({
        question: q,
        answer: ans,
        source: topicTitle
      });
    });
  }

  // Fallback if still low
  if (cards.length === 0 && takeaways.length > 0) {
    takeaways.slice(0, 4).forEach((item, idx) => {
      cards.push({
        question: `What is a key architectural rule regarding ${topicTitle} (Point ${idx + 1})?`,
        answer: item,
        source: topicTitle
      });
    });
  }

  if (cards.length === 0) {
    cards.push({
      question: `What is the core architectural purpose of ${topicTitle}?`,
      answer: `${topicTitle} provides structured, maintainable patterns for modern Angular enterprise applications. Refer to the deep dive guide for implementation details and trade-offs.`,
      source: topicTitle
    });
  }

  // Deduplicate and filter any invalid cards
  const seen = new Set();
  const uniqueCards = [];
  for (const c of cards) {
    const key = c.question.toLowerCase().trim();
    if (!seen.has(key) && c.answer.length >= 20 && !c.answer.includes('```') && !c.question.includes('```')) {
      seen.add(key);
      uniqueCards.push(c);
    }
  }

  return uniqueCards.slice(0, 8);
}

function extractRecapNotes(content) {
  // Strip any residual navigation blocks
  const cleanContent = content.replace(/<!--\s*navigation-start\s*-->[\s\S]*?<!--\s*navigation-end\s*-->/gi, '');
  const lines = cleanContent.split(/\r?\n/);
  const notes = [];
  let inRecap = false;

  for (const l of lines) {
    const t = l.trim();
    if (/^#+\s+(Key Message|Key Takeaways|Revision Notes|Summary|Key Architectural Principles|Quick Summary|Executive Summary)/i.test(t)) {
      inRecap = true;
      continue;
    }
    if (inRecap && /^#+\s+[^#]/.test(t)) {
      inRecap = false;
    }
    // Hard stop on navigation or horizontal rules
    if (inRecap && (t.startsWith('<!--') || t.startsWith('---') || /previous:|next:|table of contents|⬅️|➡️|🏠/i.test(t))) {
      inRecap = false;
      continue;
    }
    if (inRecap && (t.startsWith('-') || t.startsWith('*') || (t.length > 15 && !t.startsWith('#')))) {
      const clean = t.replace(/^[-*]\s+/, '').trim();
      if (clean.length > 10 && !clean.startsWith('|') && !clean.startsWith('`') && !/previous:|next:|table of contents|⬅️|➡️|🏠/i.test(clean)) {
        notes.push(clean);
      }
    }
  }

  // Fallback: Grab the first 3 substantive bullet points or sentences from early in document, excluding nav lines
  if (notes.length === 0) {
    for (const l of lines.slice(0, 50)) {
      const t = l.trim();
      if (t.startsWith('- ') && t.length > 15 && !/previous:|next:|table of contents|⬅️|➡️|🏠/i.test(t)) {
        notes.push(t.replace(/^-\s+/, ''));
      }
      if (notes.length >= 4) break;
    }
  }

  return notes.slice(0, 6);
}

function extractSearchTokens(title, content, categoryTitle) {
  const tokenSet = new Set();
  
  // Add title & category terms
  title.toLowerCase().split(/[\s\-_,\(\)]+/).forEach(w => {
    if (w.length > 2) tokenSet.add(w);
  });
  categoryTitle.toLowerCase().split(/[\s\-_,\(\)]+/).forEach(w => {
    if (w.length > 2) tokenSet.add(w);
  });

  // Extract inline code keywords e.g. `computed()`, `ChangeDetectionStrategy`
  const codeRegex = /`([a-zA-Z0-9_\$@\-\(\)]+)`/g;
  let m;
  while ((m = codeRegex.exec(content)) !== null) {
    const token = m[1].toLowerCase();
    if (token.length > 2 && token.length < 30) {
      tokenSet.add(token);
    }
  }

  // Extract H2 headings as search phrases
  const h2Regex = /^##\s+([^#\r\n]+)$/gm;
  while ((m = h2Regex.exec(content)) !== null) {
    m[1].toLowerCase().split(/[\s\-_,\(\)]+/).forEach(w => {
      if (w.length > 3) tokenSet.add(w);
    });
  }

  return Array.from(tokenSet).slice(0, 40);
}

function processDirectory(catDir, catKey) {
  const fullPath = path.join(ROOT_DIR, catDir);
  if (!fs.existsSync(fullPath)) return [];

  const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.md') && !f.toLowerCase().includes('readme'));
  const topics = [];

  const meta = CATEGORY_META[catKey] || {
    title: catKey,
    order: 99,
    badge: 'Guide',
    icon: 'book'
  };

  for (const file of files) {
    const filePath = path.join(fullPath, file);
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const content = rawContent.replace(/<!--\s*navigation-start\s*-->[\s\S]*?<!--\s*navigation-end\s*-->/gi, '');

    // Title from first # Heading
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : file.replace('.md', '');

    // Slug / ID
    const id = file.replace('.md', '');
    const numMatch = id.match(/^(\d+[a-z]?)/);
    const orderNum = numMatch ? numMatch[1] : '99';

    // Word count & Reading Time
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const flashcards = extractFlashcards(content, title, id);
    const recapNotes = extractRecapNotes(content);
    const searchTokens = extractSearchTokens(title, content, meta.title);
    const headings = extractHeadings(content);

    // Summary description (skip metadata blocks and pick first substantive descriptive paragraph)
    const paragraphs = content
      .split(/\r?\n\r?\n/)
      .map(p => p.trim())
      .filter(p => {
        if (!p || p.startsWith('#') || p.startsWith('<!--') || p.startsWith('---')) return false;
        const plain = p.replace(/[*_`]/g, '').trim();
        if (plain.length < 25) return false;
        if (/^(Must Know|Very Common|Common|Strong Understanding|Expert Level|Recommended Depth|Interview Priority)/i.test(plain)) return false;
        return true;
      });

    const chosenParagraph = paragraphs.find(p => p.length > 40 && !p.startsWith('-')) || paragraphs[0] || 'In-depth Angular architectural guide and interview preparation module.';
    const summary = chosenParagraph
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\r?\n/g, ' ')
      .trim()
      .slice(0, 160) + (chosenParagraph.length > 160 ? '...' : '');

    topics.push({
      id,
      slug: id,
      title,
      summary,
      category: catKey,
      categoryTitle: meta.title,
      categoryBadge: meta.badge,
      categoryIcon: meta.icon,
      categoryOrder: meta.order,
      order: orderNum,
      fileName: file,
      contentUrl: `assets/content/${catDir}/${file}`,
      wordCount,
      readingTime,
      headings: headings.slice(0, 12),
      flashcards,
      recapNotes,
      searchTokens
    });
  }

  // Sort by filename/number
  topics.sort((a, b) => a.fileName.localeCompare(b.fileName, undefined, { numeric: true }));
  return topics;
}

function run() {
  console.log('Generating Angular Interview Manifest...');
  const allTopics = [];

  const categories = Object.keys(CATEGORY_META);
  for (const cat of categories) {
    const topics = processDirectory(cat, cat);
    console.log(`- Category [${cat}]: ${topics.length} topics parsed`);
    allTopics.push(...topics);
  }

  // Also include web_security_guide.md if present
  const secPath = path.join(ROOT_DIR, 'web_security_guide.md');
  if (fs.existsSync(secPath)) {
    const content = fs.readFileSync(secPath, 'utf-8');
    const wordCount = content.split(/\s+/).length;
    allTopics.push({
      id: 'web-security-guide',
      slug: 'web-security-guide',
      title: 'Web & Angular Security Guide',
      summary: 'Comprehensive enterprise security guide covering XSS, CSRF, CSP, sanitized DOM, and auth tokens.',
      category: '06-senior-architecture',
      categoryTitle: 'Senior Architecture & Enterprise',
      categoryBadge: 'Security',
      categoryIcon: 'shield-check',
      categoryOrder: 6,
      order: '99s',
      fileName: 'web_security_guide.md',
      contentUrl: 'assets/content/web_security_guide.md',
      wordCount,
      readingTime: Math.ceil(wordCount / 200),
      headings: extractHeadings(content).slice(0, 12),
      flashcards: extractFlashcards(content, 'Web & Angular Security'),
      recapNotes: extractRecapNotes(content),
      searchTokens: extractSearchTokens('Web & Angular Security Guide', content, 'Security')
    });
    console.log('- Added web_security_guide.md');
  }

  // Compute category rollups
  const categoryGroups = categories.map(catKey => {
    const meta = CATEGORY_META[catKey];
    const catTopics = allTopics.filter(t => t.category === catKey);
    return {
      key: catKey,
      title: meta.title,
      badge: meta.badge,
      icon: meta.icon,
      order: meta.order,
      topicCount: catTopics.length,
      topics: catTopics.map(t => ({
        id: t.id,
        title: t.title,
        readingTime: t.readingTime,
        flashcardCount: t.flashcards.length
      }))
    };
  });

  const manifest = {
    generatedAt: new Date().toISOString(),
    totalTopics: allTopics.length,
    totalFlashcards: allTopics.reduce((sum, t) => sum + t.flashcards.length, 0),
    categories: categoryGroups,
    topics: allTopics
  };

  // Ensure output directory exists
  if (!fs.existsSync(PORTAL_PUBLIC_ASSETS)) {
    fs.mkdirSync(PORTAL_PUBLIC_ASSETS, { recursive: true });
  }

  const outputPath = path.join(PORTAL_PUBLIC_ASSETS, 'content-manifest.json');
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2), 'utf-8');

  // Copy markdown files to public/assets/content for zero-overhead local serving
  const contentDestRoot = path.join(PORTAL_PUBLIC_ASSETS, 'content');
  for (const cat of categories) {
    const srcCatDir = path.join(ROOT_DIR, cat);
    const destCatDir = path.join(contentDestRoot, cat);
    if (fs.existsSync(srcCatDir)) {
      if (!fs.existsSync(destCatDir)) fs.mkdirSync(destCatDir, { recursive: true });
      const mdFiles = fs.readdirSync(srcCatDir).filter(f => f.endsWith('.md'));
      for (const f of mdFiles) {
        fs.copyFileSync(path.join(srcCatDir, f), path.join(destCatDir, f));
      }
    }
  }

  // Copy web_security_guide.md
  if (fs.existsSync(secPath)) {
    fs.copyFileSync(secPath, path.join(contentDestRoot, 'web_security_guide.md'));
  }

  console.log(`Manifest generated successfully: ${outputPath}`);
  console.log(`Synced content files into: ${contentDestRoot}`);
  console.log(`Indexed ${allTopics.length} topics and ${manifest.totalFlashcards} flashcards!`);
}

run();
