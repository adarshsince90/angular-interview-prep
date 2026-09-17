import { Component, signal } from '@angular/core';

type CDStrategy = 'Default' | 'OnPush' | 'Zoneless';

@Component({
  selector: 'app-cd-tree-visualizer',
  standalone: true,
  template: `
    <div class="visualizer-root glass-panel">
      <div class="viz-header">
        <div>
          <span class="viz-badge">Performance Architecture</span>
          <h3 class="viz-title">Angular Change Detection Engine Visualizer</h3>
        </div>
        <div class="strategy-picker">
          <button
            class="mode-btn"
            [class.active]="strategy() === 'Default'"
            (click)="setStrategy('Default')">
            Default (Dirty Checks All)
          </button>
          <button
            class="mode-btn"
            [class.active]="strategy() === 'OnPush'"
            (click)="setStrategy('OnPush')">
            OnPush (Subtree Skipping)
          </button>
          <button
            class="mode-btn"
            [class.active]="strategy() === 'Zoneless'"
            (click)="setStrategy('Zoneless')">
            ⚡ Zoneless (Fine-Grained)
          </button>
        </div>
      </div>

      <div class="action-bar">
        <button class="btn-glass btn-cyan" (click)="triggerEventOnLeaf()">
          ⚡ Fire Event on Leaf Component (Node C2)
        </button>
        <span class="action-status">{{ statusMessage() }}</span>
      </div>

      <!-- Component Tree Layout -->
      <div class="tree-stage">
        <!-- Root -->
        <div class="tree-node root-node" [class.checked]="isNodeChecked('AppRoot')">
          <span class="node-tag">APP ROOT</span>
          <span class="node-label">AppComponent</span>
          <span class="node-cd">{{ strategy() }}</span>
        </div>

        <div class="tree-branch-lines">
          <div class="line-left"></div>
          <div class="line-right"></div>
        </div>

        <!-- Tier 1 -->
        <div class="tree-tier">
          <div class="tree-node" [class.checked]="isNodeChecked('Header')">
            <span class="node-tag">PARENT 1</span>
            <span class="node-label">HeaderComponent</span>
            <span class="node-cd">{{ strategy() === 'Default' ? 'Default' : 'OnPush' }}</span>
          </div>

          <div class="tree-node" [class.checked]="isNodeChecked('Dashboard')">
            <span class="node-tag">PARENT 2</span>
            <span class="node-label">DashboardComponent</span>
            <span class="node-cd">{{ strategy() === 'Default' ? 'Default' : 'OnPush' }}</span>
          </div>
        </div>

        <!-- Tier 2 (Leaves) -->
        <div class="tree-branch-lines">
          <div class="line-left"></div>
          <div class="line-right"></div>
        </div>

        <div class="tree-tier leaves">
          <div class="tree-node" [class.checked]="isNodeChecked('Profile')">
            <span class="node-tag">LEAF</span>
            <span class="node-label">UserBadge</span>
          </div>
          <div class="tree-node" [class.checked]="isNodeChecked('MetricCard')">
            <span class="node-tag">LEAF</span>
            <span class="node-label">MetricCard</span>
          </div>
          <div class="tree-node target-node" [class.checked]="isNodeChecked('WidgetC2')">
            <span class="node-tag target-tag">TARGET</span>
            <span class="node-label">Node C2 (Clicked)</span>
          </div>
        </div>
      </div>

      <!-- Comparative Summary -->
      <div class="comparison-summary glass-panel">
        <div class="stat-col">
          <span class="stat-val">{{ nodesCheckedCount() }} / 6</span>
          <span class="stat-lbl">Components Dirty Checked</span>
        </div>
        <div class="stat-col">
          <span class="stat-val">{{ strategy() === 'Default' ? '60-120ms' : strategy() === 'OnPush' ? '12ms' : '< 1ms' }}</span>
          <span class="stat-lbl">Typical Frame Latency</span>
        </div>
        <div class="stat-col">
          <span class="stat-val">{{ strategy() === 'Zoneless' ? 'No Zone.js' : 'Zone.js monkey-patches' }}</span>
          <span class="stat-lbl">Runtime Mechanism</span>
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

    .strategy-picker {
      display: flex;
      background: rgba(0, 0, 0, 0.2);
      padding: 0.25rem;
      border-radius: 0.6rem;
      gap: 0.25rem;
    }

    .mode-btn {
      background: transparent;
      border: none;
      padding: 0.4rem 0.75rem;
      border-radius: 0.45rem;
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-secondary);
      cursor: pointer;
      font-family: inherit;
      transition: all var(--transition-fast);
    }

    .mode-btn:hover {
      color: var(--text-primary);
    }

    .mode-btn.active {
      background: rgba(0, 243, 255, 0.15);
      color: var(--accent-cyan);
      border: 1px solid rgba(0, 243, 255, 0.3);
      box-shadow: 0 0 10px rgba(0, 243, 255, 0.15);
    }

    .action-bar {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .action-status {
      font-size: 0.85rem;
      color: var(--accent-cyan);
      font-weight: 600;
    }

    .tree-stage {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 0;
    }

    .tree-node {
      padding: 0.75rem 1.25rem;
      border-radius: 0.75rem;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 140px;
      transition: all 300ms ease;
    }

    .tree-node.checked {
      border-color: #f43f5e;
      background: rgba(244, 63, 94, 0.15);
      box-shadow: 0 0 16px rgba(244, 63, 94, 0.4);
      transform: scale(1.04);
    }

    .target-node {
      border-color: var(--accent-cyan);
    }

    .node-tag {
      font-size: 0.65rem;
      font-weight: 800;
      color: var(--text-muted);
      letter-spacing: 0.05em;
    }

    .target-tag {
      color: var(--accent-cyan);
    }

    .node-label {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0.15rem 0;
    }

    .node-cd {
      font-size: 0.68rem;
      color: var(--accent-cyan);
      font-family: var(--font-mono);
    }

    .tree-tier {
      display: flex;
      gap: 2rem;
      justify-content: center;
    }

    .tree-tier.leaves {
      gap: 1rem;
    }

    .comparison-summary {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      padding: 1.25rem;
      text-align: center;
    }

    .stat-val {
      display: block;
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--accent-cyan);
      font-family: var(--font-mono);
    }

    .stat-lbl {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    /* Light Theme Overrides */
    [data-theme='light'] .tree-node {
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.9);
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
    }

    [data-theme='light'] .tree-node.checked {
      background: rgba(244, 63, 94, 0.12);
      border-color: #f43f5e;
      box-shadow: 0 0 16px rgba(244, 63, 94, 0.3);
    }

    [data-theme='light'] .target-node {
      background: #f0f9ff;
      border-color: #0284c7;
      box-shadow: 0 4px 16px rgba(2, 132, 199, 0.14);
    }

    [data-theme='light'] .node-label {
      color: #0f172a;
    }

    [data-theme='light'] .node-cd {
      color: #0284c7;
      font-weight: 700;
    }

    [data-theme='light'] .strategy-picker {
      background: rgba(15, 23, 42, 0.05);
      border: 1px solid rgba(15, 23, 42, 0.1);
    }

    [data-theme='light'] .mode-btn {
      color: #475569;
    }

    [data-theme='light'] .mode-btn.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #0284c7;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
    }

    [data-theme='light'] .viz-header {
      border-color: rgba(226, 232, 240, 0.9);
    }
  `]
})
export class ChangeDetectionTreeVisualizerComponent {
  strategy = signal<CDStrategy>('Default');
  checkedNodes = signal<Set<string>>(new Set());
  statusMessage = signal<string>('Select a strategy and click the leaf button to simulate change detection traversal.');

  setStrategy(s: CDStrategy): void {
    this.strategy.set(s);
    this.checkedNodes.set(new Set());
    this.statusMessage.set(`Switched to ${s} mode. Ready to simulate.`);
  }

  isNodeChecked(nodeId: string): boolean {
    return this.checkedNodes().has(nodeId);
  }

  nodesCheckedCount(): number {
    return this.checkedNodes().size;
  }

  triggerEventOnLeaf(): void {
    const s = this.strategy();
    if (s === 'Default') {
      // Default: dirty-checks EVERY component in the entire tree
      this.checkedNodes.set(new Set(['AppRoot', 'Header', 'Dashboard', 'Profile', 'MetricCard', 'WidgetC2']));
      this.statusMessage.set('Default: Zone.js intercepted event and re-checked all 6 components down the tree!');
    } else if (s === 'OnPush') {
      // OnPush: Skips unchanged subtrees (Header, Profile, MetricCard are skipped!)
      this.checkedNodes.set(new Set(['AppRoot', 'Dashboard', 'WidgetC2']));
      this.statusMessage.set('OnPush: Skipped HeaderComponent and untouched leaves! Only 3 nodes checked.');
    } else {
      // Zoneless: Direct pinpoint notification to the targeted node without top-down tree walk!
      this.checkedNodes.set(new Set(['WidgetC2']));
      this.statusMessage.set('Zoneless: Direct signal notification! Only 1 node updated. Zero top-down tree check.');
    }
  }
}
