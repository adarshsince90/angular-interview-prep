import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SignalsGraphVisualizerComponent } from '../visualizers/signals-graph-visualizer.component';
import { ChangeDetectionTreeVisualizerComponent } from '../visualizers/change-detection-tree-visualizer.component';

type LabTab = 'signals' | 'change-detection';

@Component({
  selector: 'app-visualizer-lab',
  standalone: true,
  imports: [
    RouterLink,
    SignalsGraphVisualizerComponent,
    ChangeDetectionTreeVisualizerComponent
  ],
  template: `
    <div class="lab-container">
      <!-- Header -->
      <header class="lab-header glass-panel">
        <div class="header-left">
          <span class="lab-badge">Runtime Simulation Studio</span>
          <h1 class="lab-title">Interactive <span class="gradient-text">Architecture Labs</span></h1>
          <p class="lab-desc">
            Visual interactive simulations of modern Angular runtime mechanics: glitch-free reactive graphs and change detection subtree traversal.
          </p>
        </div>

        <nav class="lab-tabs">
          <button
            class="tab-btn"
            [class.active]="activeTab() === 'signals'"
            (click)="activeTab.set('signals')">
            ⚡ Signals Reactive Graph
          </button>
          <button
            class="tab-btn"
            [class.active]="activeTab() === 'change-detection'"
            (click)="activeTab.set('change-detection')">
            🌳 Change Detection Engine
          </button>
        </nav>
      </header>

      <!-- Active Visualizer -->
      <main class="lab-stage">
        @if (activeTab() === 'signals') {
          <section class="stage-section">
            <app-signals-graph-visualizer />

            <!-- Architectural Comparison Card -->
            <div class="intel-card glass-panel">
              <h3 class="intel-title">Signals vs RxJS: Core Architectural Trade-offs</h3>
              <div class="table-scroll-wrapper">
                <table class="lab-table">
                  <thead>
                    <tr>
                      <th>Dimension</th>
                      <th>Angular Signals</th>
                      <th>RxJS Observables</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Model</strong></td>
                      <td>Synchronous Reactive Value Graph (Push/Pull)</td>
                      <td>Asynchronous Event Stream (Push/Push)</td>
                    </tr>
                    <tr>
                      <td><strong>Subscription Management</strong></td>
                      <td>Zero. No unsubscribe(), auto-garbage collected</td>
                      <td>Manual subscription disposal or takeUntilDestroyed()</td>
                    </tr>
                    <tr>
                      <td><strong>Glitch-Free Guarantees</strong></td>
                      <td>Yes. Solves the Diamond Problem natively</td>
                      <td>Requires combineLatest / distinctUntilChanged manually</td>
                    </tr>
                    <tr>
                      <td><strong>Ideal For</strong></td>
                      <td>Synchronous state, UI bindings, computed derivation</td>
                      <td>Async streaming, WebSocket, event debouncing, retry backoff</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="intel-footer">
                <a [routerLink]="['/topic', '18-signals']" class="guide-link">
                  📖 Open Topic 18: Signals Deep Dive Guide →
                </a>
              </div>
            </div>
          </section>
        } @else {
          <section class="stage-section">
            <app-cd-tree-visualizer />

            <!-- Change Detection Analysis Card -->
            <div class="intel-card glass-panel">
              <h3 class="intel-title">Change Detection Strategy Comparison</h3>
              <div class="table-scroll-wrapper">
                <table class="lab-table">
                  <thead>
                    <tr>
                      <th>Strategy</th>
                      <th>Trigger Condition</th>
                      <th>Subtree Behavior</th>
                      <th>Performance Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Default (CheckAlways)</strong></td>
                      <td>Any microtask / DOM event (Zone.js intercepted)</td>
                      <td>Dirty-checks every single component from AppRoot downwards</td>
                      <td>O(N) component checks. High overhead on large enterprise trees</td>
                    </tr>
                    <tr>
                      <td><strong>OnPush</strong></td>
                      <td>Input ref change (===), event within component, async pipe, markForCheck()</td>
                      <td>Prunes clean subtrees; traverses only invalidated branches</td>
                      <td>O(log N) to O(K) checks. Subtree skipping prevents CPU waste</td>
                    </tr>
                    <tr>
                      <td><strong>Zoneless (provideExperimentalZonelessChangeDetection)</strong></td>
                      <td>Signals notification, ComponentRef.setInput, async scheduler</td>
                      <td>Zero Zone.js monkey patching. Scheduled microtask sync</td>
                      <td>Maximum efficiency, smaller bundle (~35kB shaved), fine-grained</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="intel-footer">
                <a [routerLink]="['/topic', '28-change-detection']" class="guide-link">
                  📖 Open Topic 28: Change Detection Deep Dive Guide →
                </a>
              </div>
            </div>
          </section>
        }
      </main>
    </div>
  `,
  styles: [`
    .lab-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-width: 960px;
      margin: 0 auto;
      padding-bottom: 3rem;
    }

    .lab-header {
      padding: 1.75rem 2rem;
      border-radius: 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    .lab-badge {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--accent-cyan);
    }

    .lab-title {
      font-size: 1.85rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--text-primary);
      margin: 0.2rem 0;
    }

    .gradient-text {
      background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-blue) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .lab-desc {
      font-size: 0.88rem;
      color: var(--text-secondary);
    }

    .lab-tabs {
      display: flex;
      gap: 0.5rem;
      background: rgba(0, 0, 0, 0.2);
      padding: 0.35rem;
      border-radius: 0.85rem;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .tab-btn {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      font-family: inherit;
      font-size: 0.85rem;
      font-weight: 700;
      padding: 0.5rem 1rem;
      border-radius: 0.6rem;
      cursor: pointer;
      transition: all var(--transition-fast);
      white-space: nowrap;
    }

    .tab-btn:hover {
      color: var(--text-primary);
    }

    .tab-btn.active {
      background: rgba(0, 243, 255, 0.15);
      color: var(--accent-cyan);
      box-shadow: 0 0 12px rgba(0, 243, 255, 0.2);
    }

    .stage-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .intel-card {
      padding: 2rem;
      border-radius: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .intel-title {
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--text-primary);
    }

    .table-scroll-wrapper {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .lab-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
    }

    .lab-table th {
      text-align: left;
      padding: 0.75rem 1rem;
      background: rgba(0, 243, 255, 0.08);
      color: var(--accent-cyan);
      font-weight: 700;
      border-bottom: 1px solid rgba(0, 243, 255, 0.2);
    }

    .lab-table td {
      padding: 0.85rem 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .lab-table tr:hover td {
      background: rgba(255, 255, 255, 0.02);
      color: var(--text-primary);
    }

    .intel-footer {
      display: flex;
      justify-content: flex-end;
      padding-top: 0.5rem;
    }

    .guide-link {
      color: var(--accent-cyan);
      font-weight: 700;
      font-size: 0.85rem;
      text-decoration: none;
    }

    .guide-link:hover {
      text-decoration: underline;
    }

    /* Light Theme Styling */
    [data-theme='light'] .lab-tabs {
      background: rgba(15, 23, 42, 0.05);
      border: 1px solid rgba(15, 23, 42, 0.1);
    }

    [data-theme='light'] .tab-btn {
      color: #475569;
    }

    [data-theme='light'] .tab-btn.active {
      background: #0284c7;
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
    }

    [data-theme='light'] .lab-table th {
      background: rgba(2, 132, 199, 0.08);
      color: #0369a1;
      border-bottom: 1px solid rgba(2, 132, 199, 0.25);
    }

    [data-theme='light'] .lab-table td {
      border-bottom: 1px solid rgba(226, 232, 240, 0.9);
      color: #334155;
    }

    [data-theme='light'] .lab-table tr:hover td {
      background: rgba(2, 132, 199, 0.04);
      color: #0f172a;
    }

    @media (max-width: 600px) {
      .lab-header {
        padding: 1.25rem;
      }
      .lab-tabs {
        width: 100%;
        flex-direction: column;
      }
      .intel-card {
        padding: 1.25rem;
      }
    }
  `]
})
export class VisualizerLabComponent {
  readonly activeTab = signal<LabTab>('signals');
}
