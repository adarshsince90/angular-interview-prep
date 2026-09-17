# Component-Based Architecture

## Interview Priority

**Must Know**

## Interview Frequency

**Very Common**

## Recommended Depth

**Strong Understanding**

## Relevant For

- Mid-Level Interviews
- Senior Developer Interviews
- Lead Developer Interviews
- Architect Discussions

---

# What Is Component-Based Architecture?

Component-Based Architecture is a software design approach where the user interface is composed of smaller, reusable, independent, and self-contained building blocks called **Components**.

Instead of building an entire user interface as one large, monolithic page, the application is divided into cohesive, decoupled pieces.

Example:
```text
Enterprise Portal
├── HeaderComponent
├── SearchBarComponent
├── NavigationMenuComponent
├── ProductListComponent
├── ShoppingCartComponent
└── FooterComponent
```

Each section encapsulates its own:
1. **Template**: Declares the HTML markup and view structure.
2. **Logic**: Controls state, user interactions, and view logic in TypeScript.
3. **Styles**: Scoped CSS rules applying exclusively to this component.

---

# Why Does It Exist?

As web applications grew from simple text documents into massive enterprise platforms, maintaining monolithic codebases became unmanageable.

Problems included:
- **Code Duplication**: Re-writing identical HTML, CSS, and event listeners across dozens of screens.
- **Fragile Maintenance**: Changing a CSS class or JavaScript function in one place unexpectedly broke unrelated sections.
- **Tight Coupling**: Presentation logic was deeply tangled with backend API calls and global browser events.
- **Poor Testability**: Isolating a single feature for automated testing required spinning up entire pages.
- **Team Collaboration Friction**: Multiple engineers working on the same HTML and JavaScript files constantly suffered merge conflicts.

Component-Based Architecture introduces **modularity and encapsulation** to frontend engineering, applying the same software engineering best practices that backend systems have used for decades.

---

# Historical Context

```text
1995–2005                     2006–2012                     2013–Present
Monolithic Pages         ───► jQuery Era               ───► Component-Based Frameworks
Large index.html              DOM manipulation utilities    Angular, React, Vue
Global CSS & JS               Selectors: $('#btn').click()  UI = Tree of Components
Tightly coupled scripts       No application architecture   Encapsulated State, View & Styles
```

### 1. Early Web Applications
Applications were structured around pages (`index.html`, `dashboard.html`). All CSS lived in global stylesheets, and JavaScript existed in sprawling script files.

### 2. The jQuery Era
jQuery revolutionized DOM selection and animation, but it provided zero architectural guidance. State was stored directly inside DOM elements (e.g. data attributes), and business logic was scattered across hundreds of ad-hoc event listeners.

### 3. The Component Revolution
Modern frameworks established Components as the foundational building block of frontend engineering. Today, developers design applications as hierarchical trees of reusable UI blocks rather than disconnected HTML documents.

---

# Problem It Solves

Consider an Employee Directory in an enterprise application:

### Without Components:
The HTML markup and click handlers for an "Employee Card" are copied across 4 different views:
- Dashboard
- Employee List
- Organization Chart
- Audit Reports

```text
Dashboard.html ──────► Copies Employee Card HTML (25 lines)
EmployeeList.html ───► Copies Employee Card HTML (25 lines)
OrgChart.html ───────► Copies Employee Card HTML (25 lines)
Reports.html ────────► Copies Employee Card HTML (25 lines)
```

If product requirements change (e.g. adding an avatar or department badge), developers must find and edit every copy manually. Inconsistencies and regressions are inevitable.

### With Components:
```text
<app-employee-card [employee]="emp" />
```
The markup, styling, and behavior are implemented once in `EmployeeCardComponent`. Every view imports and renders the component, guaranteeing 100% UI and behavioral consistency.

---

# First Principles Explanation

In backend architecture (such as ASP.NET Core or Java Spring), developers never write an entire enterprise system inside a single `Program.cs` or controller.

Instead, they separate concerns:
```text
Controller ──► Application Service ──► Repository ──► Domain Entity
```

Angular applies this exact principle of **decomposition and single responsibility** to the user interface:

$$\text{Application UI} = \sum_{i=1}^{n} \text{Component}_i$$

Each component acts as a bounded context on the screen, managing its own inputs, internal state, and output events.

---

# Real World Analogy

Think about modern automobile manufacturing on an assembly line:

```text
Automobile Assembly
├── Engine Block
├── Wheels & Braking System
├── Climate Control Dashboard
├── Ergonomic Seats
└── Passenger Doors
```

- Each part has an explicit, engineered responsibility.
- A wheel does not care what brand of engine powers the vehicle, provided the wheel lugs match the axle contract.
- If a headlight bulb fails, you replace the headlight component without rebuilding the car's transmission.

Angular applications work identically: the application is an assembly of swappable, testable, independent components conforming to strict interface contracts.

---

# Angular's Component Model

In Angular, a Component is a TypeScript class decorated with `@Component`:

```typescript
@Component({
  selector: 'app-employee-card',
  standalone: true,
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeCardComponent {
  // Controller logic, state, inputs, and outputs
}
```

A component encompasses four key facets:
1. **Selector**: The custom HTML tag name (e.g., `<app-employee-card>`) used to place this component in templates.
2. **Template**: The declarative HTML structure defining what renders on screen.
3. **Styles**: CSS/SCSS encapsulated to the component via Angular's View Encapsulation.
4. **Class & Metadata**: TypeScript class holding reactive state, signals, and interaction handlers.

---

# The Component Tree

Every Angular application is structured as a hierarchical **Component Tree** with `AppComponent` as the root:

```text
┌─────────────────────────────────────────────────────────────────┐
│                          AppComponent                           │
└────────────────────────────────┬────────────────────────────────┘
                                 │
        ┌────────────────────────┴────────────────────────┐
        ▼                                                 ▼
┌───────────────────────┐                         ┌───────────────────────┐
│   AppHeaderComponent  │                         │   MainLayoutComponent │
└───────────────────────┘                         └───────────┬───────────┘
                                                              │
                                  ┌───────────────────────────┴───────────────────────────┐
                                  ▼                                                       ▼
                      ┌───────────────────────┐                               ┌───────────────────────┐
                      │    SidebarComponent   │                               │  DashboardComponent   │ (Smart)
                      └───────────────────────┘                               └───────────┬───────────┘
                                                                                          │
                                                  ┌───────────────────────────────────────┴───────────────────┐
                                                  ▼                                                           ▼
                                      ┌───────────────────────┐                                   ┌───────────────────────┐
                                      │ EmployeeListComponent │ (Dumb)                            │  SummaryStatsComponent│ (Dumb)
                                      └───────────┬───────────┘                                   └───────────────────────┘
                                                  │
                                      ┌───────────┴───────────┐
                                      ▼                       ▼
                          ┌───────────────────────┐ ┌───────────────────────┐
                          │ EmployeeCardComponent │ │ EmployeeCardComponent │
                          └───────────────────────┘ └───────────────────────┘
```

This tree hierarchy dictates:
- **Change Detection Propagation**: Traversal order for checking updates.
- **Dependency Injection Resolution**: Hierarchical resolution of scoped services.
- **DOM Rendering Hierarchy**: Structural containment in the rendered browser document.

---

# Parent and Child Components: Unidirectional Data Flow

A fundamental tenet of modern component architecture is **Unidirectional Data Flow**:

$$\text{Data Flows Down via Inputs} \quad \big\Downarrow \quad \text{Events Flow Up via Outputs}$$

```text
┌────────────────────────────────────────────────────────┐
│               Smart / Parent Component                 │
│         (Fetches Data, Owns State & Business Logic)    │
└──────────────────────────┬─────────────────────────────┘
                           │
                           │ [input()] Property Binding (Data Down)
                           ▼
┌────────────────────────────────────────────────────────┐
│              Dumb / Child Component                    │
│       (Pure Presentation, Zero External Dependencies)  │
└──────────────────────────┬─────────────────────────────┘
                           │
                           │ (output()) Event Binding (Events Up)
                           ▼
┌────────────────────────────────────────────────────────┐
│               Parent Handles Event                     │
│       (Updates Signal State, Triggers Service Method)  │
└────────────────────────────────────────────────────────┘
```

1. **Inputs (`input()`)**: The parent passes immutable data properties down to the child.
2. **Outputs (`output()`)**: When the user triggers an action in the child, the child emits an event upwards. The child never directly modifies the parent's state.

---

# Smart (Container) vs Dumb (Presentational) Components

In enterprise Angular systems, components are strictly split into two patterns:

| Architectural Dimension | Smart (Container) Components | Dumb (Presentational) Components |
| :--- | :--- | :--- |
| **Primary Responsibility** | Coordinates features, manages routing & state | Renders UI markup, formats data, captures events |
| **Dependency Injection** | Injects domain services, state stores, router | Zero service injections; completely decoupled |
| **Data Ingestion** | Reads from services, APIs, signals, route params | Receives data strictly via `input()` or `@Input()` |
| **Event Emission** | Dispatches actions, mutates state, calls APIs | Emits events strictly via `output()` or `@Output()` |
| **Reusability** | Feature-specific, rarely reused across features | Highly reusable across multiple pages & design systems |
| **Change Detection** | `ChangeDetectionStrategy.OnPush` | `ChangeDetectionStrategy.OnPush` |
| **Testability** | Tested with mock services & injected stores | Unit tested purely via inputs, outputs, and DOM asserts |

---

# Code Example: Modern Angular (Standalone & Signals)

### 1. Dumb (Presentational) Component
```typescript
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

export interface Employee {
  id: number;
  name: string;
  role: string;
}

@Component({
  selector: 'app-employee-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="card">
      <header>
        <h3>{{ employee().name }}</h3>
        <span class="badge">{{ employee().role }}</span>
      </header>
      <button (click)="select.emit(employee().id)">View Profile</button>
    </article>
  `,
  styles: [`
    .card { border: 1px solid #e2e8f0; padding: 1.25rem; border-radius: 8px; }
    .badge { font-size: 0.85rem; color: #4a5568; background: #edf2f7; padding: 2px 8px; border-radius: 4px; }
  `]
})
export class EmployeeCardComponent {
  // Required signal input
  readonly employee = input.required<Employee>();

  // Standard output event
  readonly select = output<number>();
}
```

### 2. Smart (Container) Component
```typescript
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { EmployeeService } from './employee.service';
import { EmployeeCardComponent } from './employee-card.component';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [EmployeeCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="dashboard">
      <h2>Active Team Members ({{ employees().length }})</h2>

      <div class="grid">
        @for (emp of employees(); track emp.id) {
          <app-employee-card 
            [employee]="emp" 
            (select)="onEmployeeSelected($event)" 
          />
        } @empty {
          <p class="empty-state">No team members found.</p>
        }
      </div>
    </section>
  `
})
export class EmployeeDashboardComponent {
  private readonly employeeService = inject(EmployeeService);

  // Read-only signal state from service
  readonly employees = this.employeeService.employees;

  onEmployeeSelected(employeeId: number): void {
    this.employeeService.selectEmployee(employeeId);
  }
}
```

---

# Common Architectural Mistakes

1. **God Components**: Creating monolithic components exceeding 500 lines containing API calls, business logic, form validation, and complex markup.
2. **Mutating Inputs in Children**: Modifying an object passed via input directly in the child, violating unidirectional data flow and causing subtle change detection bugs.
3. **Prop Drilling**: Passing data through 5 layers of intermediate components that don't need it. (Remedy: Use a feature service or state store).
4. **Direct DOM Manipulation**: Bypassing Angular by using `document.querySelector` or raw DOM mutations instead of template bindings, template reference variables (`#ref`), or `ElementRef`.
5. **Omitting OnPush**: Leaving components on the `Default` change detection strategy, forcing Angular to check every single component on every asynchronous event.

---

# Common Interview Questions

## What is Component-Based Architecture?

Component-Based Architecture is a software design methodology where user interfaces are constructed from independent, modular, and reusable units (components) that encapsulate their own view template, TypeScript logic, and scoped styles.

---

## What is the difference between Smart and Dumb components?

Smart (Container) components coordinate features, inject business services, manage route parameters, and orchestrate application state. Dumb (Presentational) components are visual; they receive data exclusively through inputs, emit user interactions through outputs, inject zero domain services, and are 100% deterministic and reusable.

---

## How do components communicate in Angular?

1. **Parent-to-Child**: Property binding via `input()` or `@Input()`.
2. **Child-to-Parent**: Custom event binding via `output()` or `@Output()` event emitters.
3. **Parent-to-Child Direct Access**: Using `viewChild()` or `@ViewChild()` to query a child's public API.
4. **Decoupled / Sibling Communication**: Shared `@Injectable` services exposing Angular Signals, RxJS `BehaviorSubject`, or NgRx state stores.

---

## What is the Component Tree and how does change detection relate to it?

The Component Tree is the hierarchy of components starting from the root `AppComponent`. Angular traverses this tree from top to bottom during change detection. By using `ChangeDetectionStrategy.OnPush`, Angular skips entire subtrees whose input references have not changed, maximizing runtime rendering efficiency.

---

## Why did Angular introduce Signal-based component inputs (`input()`) and outputs (`output()`)?

Signal-based inputs produce read-only signals that integrate seamlessly with Angular's fine-grained reactivity system (`computed()`, `effect()`). They guarantee compile-time type safety (via `input.required()`), eliminate boilerplate `ngOnChanges` hooks, and facilitate zoneless, fine-grained DOM updates.

---

## How does View Encapsulation work in Angular components?

Angular provides three View Encapsulation modes:
1. **Emulated (Default)**: Scopes styles to the component by appending unique HTML attributes (e.g. `_ngcontent-c42`) to elements, simulating Shadow DOM.
2. **ShadowDom**: Uses the browser's native Shadow DOM API to achieve true DOM and CSS isolation.
3. **None**: Strips all scoping; component styles are injected globally into the document head.

---

# Senior-Level Discussion: Backend Parallels & Micro-Frontends

In modern enterprise architectures, components represent **bounded contexts on the UI**:
- **Blazor & ASP.NET Parallels**: In .NET, Blazor components (`[Parameter]`, `EventCallback`) operate on identical principles to Angular components (`input()`, `output()`).
- **Micro-Frontend Slicing**: When architecting large enterprise micro-frontends (using Module Federation), components serve as the atomic unit of federation. Container apps import federated remote components across independent release pipelines.

---

# Architecture Considerations

```text
                       COMPONENT DESIGN CHECKLIST
                                   │
      ┌────────────────────────────┼────────────────────────────┐
      ▼                            ▼                            ▼
SINGLE RESPONSIBILITY        CLEAN BOUNDARIES             ONPUSH BY DEFAULT
- Does this component        - Inputs strictly for data   - Always enforce OnPush
  do exactly ONE thing?      - Outputs strictly for event - Use Signals for local state
- Split if > 250 lines       - Zero HTTP in dumb comps    - Inject services in containers
```

---

# Key Takeaways

1. **Atomic Building Block**: Components encapsulate template, styles, and TypeScript controller logic into reusable units.
2. **Unidirectional Data Flow**: Data flows down via `input()`, and user events flow up via `output()`.
3. **Smart vs Dumb Separation**: Decoupling business logic (containers) from visual presentation (dumb components) dramatically improves testability and reusability.
4. **Component Hierarchy**: Applications are structured as trees originating from `AppComponent`, driving change detection and dependency injection scoping.
5. **Modern Signal APIs**: Angular's `input()` and `output()` APIs replace legacy `@Input()`/`@Output()` decorators with compile-safe, fine-grained reactive primitives.

---

# Interview Notes (Revision Version)

## Definition
Component-Based Architecture divides the user interface into independent, reusable, self-contained building blocks combining HTML templates, TypeScript logic, and scoped styles.

## Core Rules
- Unidirectional Data Flow: Data In (`input()`), Events Out (`output()`).
- Smart Components handle business logic, services, and routing.
- Dumb Components are pure, deterministic, and handle only presentation.
- Always use `ChangeDetectionStrategy.OnPush` for optimal performance.

## Common Interview Questions
- What is the difference between Smart and Dumb components?
- How do decoupled components communicate? (Shared service with Signals/RxJS)
- Why use Signal inputs over `@Input`? (Compile-time safety, reactive integration, zoneless compatibility).

<!-- navigation-start -->

<br/>
<br/>

---

<br/>

⬅️ **Previous:** [Single Page Application (SPA)](02-spa-concepts.md) &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; ➡️ **Next:** [Angular Architecture Overview](04-angular-architecture-overview.md)

<br/>
<!-- navigation-end -->
