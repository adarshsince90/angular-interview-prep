Why does Angular use TypeScript?
Angular is designed for large enterprise applications, and TypeScript provides the foundation that makes that practical. It adds static typing, interfaces, generics, decorators, and rich tooling support. Angular relies heavily on decorators and metadata for features such as components, services, dependency injection, routing, and framework configuration. TypeScript also improves maintainability, refactoring safety, and developer productivity when working with large codebases.

How does angular help Components?
Data Binding
→ Update Component UI
DI
→ Give Components Services
Lifecycle Hooks
→ Manage Component Lifecycle
Change Detection
→ Refresh Component UI
Signals
→ Reactive Component State
Routing
→ Display Components


What is the role of a Component?
Responsible for UI and user interaction.

What is the role of a Service?
Contains reusable business logic and data access logic.

Why does Angular use Dependency Injection?
To reduce coupling and improve testing and maintainability.

How does Angular communicate with a backend?
Through HttpClient, typically consuming REST APIs.

How does Angular navigate without page refresh?
Using Angular Router.

Explain Angular Architecture Overview
Angular follows a layered architecture where Components handle presentation, Services encapsulate business logic, Dependency Injection manages object creation, Routing controls navigation, and HttpClient communicates with backend services. This separation of concerns improves maintainability, testability, and scalability for enterprise applications.

Why does Angular use TypeScript?
Angular targets enterprise-scale applications. TypeScript provides static typing, interfaces, decorators, metadata support, generics, and excellent tooling, which improve maintainability, scalability, refactoring, and developer productivity.

What is a Standalone Component?
A Standalone Component is a Component that can be used without being declared inside an NgModule. It reduces boilerplate, simplifies application structure, and is the recommended approach in modern Angular.

Why must reducers be pure?
Reducers must be pure because given the same state and action they should always produce the same next state. They should not perform side effects such as API calls, navigation, logging, or asynchronous operations. This makes state transitions predictable, testable, and enables powerful debugging features such as time-travel debugging.

How would you manage state across Micro Frontends?
I would avoid a large shared store because it creates tight coupling and reduces team independence. I would keep business state owned by the respective micro frontend and only share truly global concerns such as authentication, current user, theme, locale, and feature flags through the shell or a shared platform service.