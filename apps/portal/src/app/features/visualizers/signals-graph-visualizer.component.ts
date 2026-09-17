import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-signals-graph-visualizer',
  standalone: true,
  template: `
    <div class="visualizer-root glass-panel">
      <div class="viz-header">
        <div>
          <span class="viz-badge">Interactive Runtime Model</span>
          <h3 class="viz-title">Signals Reactive Graph & Glitch-Free Propagation</h3>
        </div>
        <div class="viz-controls">
          <button class="btn-glass" (click)="decrement()">- 1</button>
          <button class="btn-glass btn-cyan" (click)="increment()">+ Increment Signal</button>
          <button class="btn-glass" (click)="reset()">Reset</button>
        </div>
      </div>

      <!-- Graph Diagram -->
      <div class="graph-stage">
        <!-- Root Signal Node -->
        <div class="node-wrapper">
          <div class="graph-node signal-node glow-pulse">
            <span class="node-type">ROOT SIGNAL</span>
            <div class="node-code">count = signal({{ count() }})</div>
            <div class="node-val">Value: <strong>{{ count() }}</strong></div>
          </div>
          <div class="edge-down">
            <span class="edge-arrow">↓ notifies</span>
          </div>
        </div>

        <!-- Derived Computed Layer -->
        <div class="computed-layer">
          <div class="node-wrapper">
            <div class="graph-node computed-node">
              <span class="node-type">COMPUTED (DERIVED)</span>
              <div class="node-code">double = computed(() => count() * 2)</div>
              <div class="node-val">Value: <strong>{{ double() }}</strong></div>
            </div>
            <div class="edge-down">
              <span class="edge-arrow">↓ notifies</span>
            </div>
          </div>

          <div class="node-wrapper">
            <div class="graph-node computed-node">
              <span class="node-type">COMPUTED (DERIVED)</span>
              <div class="node-code">isEven = computed(() => count() % 2 === 0)</div>
              <div class="node-val">Value: <strong>{{ isEven() ? 'TRUE' : 'FALSE' }}</strong></div>
            </div>
            <div class="edge-down">
              <span class="edge-arrow">↓ notifies</span>
            </div>
          </div>
        </div>

        <!-- Effect & Consumer Layer -->
        <div class="consumer-layer">
          <div class="node-wrapper full-width">
            <div class="graph-node effect-node">
              <span class="node-type">EFFECT (SIDE-EFFECT SINK)</span>
              <div class="node-code">effect(() => syncDOM(double(), isEven()))</div>
              <div class="node-val">Last Synced Frame: <strong>double={{ double() }}, isEven={{ isEven() }}</strong> (Executions: {{ effectRuns() }})</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Architectural Insights -->
      <div class="viz-notes">
        <div class="note-box glass-panel">
          <span class="note-title">⚡ Push-Pull Algorithm</span>
          <p class="note-desc">Dirty flag is pushed down the tree in O(1); derived value is pulled lazily only when read. Zero glitch / diamond problem.</p>
        </div>
        <div class="note-box glass-panel">
          <span class="note-title">🛡️ Memory Safety</span>
          <p class="note-desc">Unlike RxJS BehaviorSubject, signals require no unsubscribe(), no takeUntilDestroyed(), and clean up automatically.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .visualizer-root {
      padding: 1.75rem;
      border-radius: 1.25rem;
      margin: 1.5rem 0;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .viz-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 1rem;
    }

    .viz-badge {
      font-size: 0.72rem;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--accent-cyan);
      letter-spacing: 0.05em;
    }

    .viz-title {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--text-primary);
      margin-top: 0.2rem;
    }

    .viz-controls {
      display: flex;
      gap: 0.5rem;
    }

    .graph-stage {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
      padding: 1rem 0;
    }

    .node-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .node-wrapper.full-width {
      width: 100%;
      max-width: 600px;
    }

    .graph-node {
      padding: 1rem 1.5rem;
      border-radius: 0.85rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(12px);
      text-align: center;
      min-width: 250px;
      transition: all var(--transition-smooth);
    }

    .signal-node {
      border-color: rgba(0, 243, 255, 0.5);
      box-shadow: 0 0 20px rgba(0, 243, 255, 0.2);
    }

    .computed-node {
      border-color: rgba(129, 140, 248, 0.4);
      box-shadow: 0 0 16px rgba(129, 140, 248, 0.15);
    }

    .effect-node {
      border-color: rgba(52, 211, 153, 0.4);
      box-shadow: 0 0 16px rgba(52, 211, 153, 0.15);
      width: 100%;
    }

    .node-type {
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      display: block;
      margin-bottom: 0.25rem;
      color: var(--text-muted);
    }

    .signal-node .node-type { color: var(--accent-cyan); }
    .computed-node .node-type { color: var(--accent-violet); }
    .effect-node .node-type { color: var(--accent-emerald); }

    .node-code {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--text-primary);
      margin-bottom: 0.4rem;
    }

    .node-val {
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    .node-val strong {
      color: var(--text-primary);
      font-weight: 800;
      font-family: var(--font-mono);
    }

    .edge-down {
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .edge-arrow {
      font-size: 0.72rem;
      color: var(--accent-cyan);
      font-family: var(--font-mono);
    }

    .computed-layer {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .viz-notes {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 1.25rem;
    }

    .note-box {
      padding: 1rem;
    }

    .note-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-primary);
      display: block;
      margin-bottom: 0.25rem;
    }

    .note-desc {
      font-size: 0.8rem;
      color: var(--text-secondary);
      line-height: 1.45;
    }
  `]
})
export class SignalsGraphVisualizerComponent {
  count = signal<number>(2);
  double = computed(() => this.count() * 2);
  isEven = computed(() => this.count() % 2 === 0);
  effectRuns = signal<number>(1);

  constructor() {
    effect(() => {
      // track dependencies
      this.double();
      this.isEven();
      this.effectRuns.update(r => r + 1);
    });
  }

  increment(): void {
    this.count.update(c => c + 1);
  }

  decrement(): void {
    this.count.update(c => Math.max(0, c - 1));
  }

  reset(): void {
    this.count.set(1);
    this.effectRuns.set(1);
  }
}
