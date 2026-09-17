import { Component, inject } from '@angular/core';
import { ReaderFacade } from '../../state/reader.facade';

@Component({
  selector: 'app-quick-recap-drawer',
  standalone: true,
  template: `
    @if (facade.isDrawerOpen()) {
      <div class="drawer-backdrop" (click)="facade.setDrawerOpen(false)"></div>
      <aside class="drawer-container glass-panel-glow">
        <div class="drawer-header">
          <div class="drawer-title-wrap">
            <span class="drawer-icon">⚡</span>
            <div>
              <h3 class="drawer-title">Executive Recap Sheet</h3>
              <p class="drawer-sub">Instant high-yield architecture takeaways</p>
            </div>
          </div>
          <button class="close-btn" (click)="facade.setDrawerOpen(false)" title="Close Drawer">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="drawer-content">
          @if (facade.activeTopic(); as topic) {
            <!-- Topic Overview -->
            <div class="drawer-card glass-panel">
              <span class="card-badge">{{ topic.categoryTitle }}</span>
              <h4 class="topic-title">{{ topic.title }}</h4>
              <p class="topic-summary">{{ topic.summary }}</p>

              <div class="meta-row">
                <span class="meta-item">⏱️ {{ topic.readingTime }} min read</span>
                <span class="meta-item">🎴 {{ topic.flashcards.length }} Flashcards</span>
              </div>
            </div>

            <!-- Key Takeaways -->
            <div class="section-title">
              <span>Key Architectural Rules</span>
            </div>
            <div class="takeaways-list">
              @for (note of topic.recapNotes; track $index) {
                <div class="takeaway-card glass-panel">
                  <span class="takeaway-num">{{ $index + 1 }}</span>
                  <p class="takeaway-text">{{ note }}</p>
                </div>
              } @empty {
                <p class="empty-text">Review full Deep Dive module for exhaustive notes.</p>
              }
            </div>

            <!-- Quick Action -->
            <div class="quick-actions">
              <button
                class="btn-glass"
                [class.active]="facade.viewMode() === 'flashcards'"
                (click)="facade.setViewMode('flashcards'); facade.setDrawerOpen(false)">
                Practice Flashcards ({{ topic.flashcards.length }})
              </button>
              <button
                class="btn-glass"
                [class.active]="facade.viewMode() === 'recap'"
                (click)="facade.setViewMode('recap'); facade.setDrawerOpen(false)">
                View 5-Min Cram
              </button>
            </div>
          } @else {
            <p class="empty-text">Select a topic from the curriculum to view executive takeaways.</p>
          }
        </div>
      </aside>
    }
  `,
  styles: [`
    .drawer-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(4px);
      z-index: 200;
    }

    .drawer-container {
      position: fixed;
      top: 0;
      right: 0;
      width: var(--drawer-width);
      max-width: 90vw;
      height: 100vh;
      z-index: 201;
      display: flex;
      flex-direction: column;
      border-radius: 1.25rem 0 0 1.25rem;
      box-shadow: -8px 0 32px rgba(0, 0, 0, 0.6);
      animation: slideIn 250ms cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
    }

    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    .drawer-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .drawer-title-wrap {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .drawer-icon {
      font-size: 1.5rem;
    }

    .drawer-title {
      font-size: 1rem;
      font-weight: 800;
      color: var(--text-primary);
    }

    .drawer-sub {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .close-btn {
      width: 32px;
      height: 32px;
      border-radius: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .close-btn:hover {
      color: var(--accent-cyan);
      border-color: var(--accent-cyan);
    }

    .drawer-content {
      flex: 1;
      overflow-y: auto;
      padding: 1.25rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .drawer-card {
      padding: 1rem;
    }

    .card-badge {
      font-size: 0.68rem;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--accent-cyan);
      letter-spacing: 0.05em;
    }

    .topic-title {
      font-size: 1.15rem;
      font-weight: 700;
      margin: 0.35rem 0;
      color: var(--text-primary);
    }

    .topic-summary {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .meta-row {
      display: flex;
      gap: 1rem;
      margin-top: 0.75rem;
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    .section-title {
      font-size: 0.85rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-secondary);
      margin-top: 0.5rem;
    }

    .takeaways-list {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .takeaway-card {
      padding: 0.75rem 1rem;
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .takeaway-num {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(0, 243, 255, 0.15);
      border: 1px solid rgba(0, 243, 255, 0.3);
      color: var(--accent-cyan);
      font-size: 0.72rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .takeaway-text {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.45;
    }

    .quick-actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: auto;
      padding-top: 1rem;
    }

    .empty-text {
      font-size: 0.85rem;
      color: var(--text-muted);
      text-align: center;
      padding: 2rem 0;
    }
  `]
})
export class QuickRecapDrawerComponent {
  readonly facade = inject(ReaderFacade);
}
