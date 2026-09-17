import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ReaderFacade } from '../../state/reader.facade';
import { CategoryGroup, TopicManifest } from '../../models/content.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar glass-panel" [class.mobile-open]="facade.isMobileMenuOpen()">
      <div class="sidebar-header">
        <div class="sidebar-title">
          <span>Curriculum Outline</span>
          <span class="count-pill">{{ facade.filteredTopics().length }} Topics</span>
        </div>
        <button
          type="button"
          class="sidebar-close-btn"
          (click)="facade.setMobileMenuOpen(false)"
          aria-label="Close curriculum outline"
          title="Close Navigation">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      @if (facade.activeTrack() !== 'all') {
        <div class="sidebar-filter-alert">
          <div class="filter-alert-text">
            <span class="filter-track-icon">⚡</span>
            <span class="filter-track-name">{{ getTrackTitle(facade.activeTrack()) }}</span>
          </div>
          <button class="btn-clear-track" (click)="facade.setActiveTrack('all')" title="Reset to all 54 topics">
            Clear ✕
          </button>
        </div>
      }

      <div class="category-list">
        @for (category of facade.manifest()?.categories; track category.key) {
          @let catTopics = getCategoryTopics(category.key);
          <div
            class="category-group"
            [class.collapsed]="isCollapsed(category.key)"
            [class.dimmed]="facade.activeTrack() !== 'all' && catTopics.length === 0">
            <button class="category-header-btn" (click)="toggleCategory(category.key)">
              <div class="cat-title-wrap">
                <span class="cat-icon">{{ getCategoryIcon(category.key) }}</span>
                <span class="cat-title">{{ category.title }}</span>
              </div>
              <div class="cat-meta">
                <span class="cat-count-pill" [class.zero-count]="catTopics.length === 0">
                  {{ catTopics.length }}
                </span>
                <span class="cat-badge">{{ category.badge }}</span>
                <svg class="chevron-icon" [class.rotated]="isCollapsed(category.key)" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </button>

            @if (!isCollapsed(category.key)) {
              <div class="topic-items">
                @for (topic of catTopics; track topic.id) {
                  <a
                    [routerLink]="['/topic', topic.id]"
                    routerLinkActive="active"
                    class="topic-link"
                    (click)="onTopicSelected(topic.id)">
                    <div class="topic-link-left">
                      <button
                        type="button"
                        class="status-dot"
                        [class.completed]="facade.isTopicCompleted(topic.id)"
                        (click)="$event.stopPropagation(); $event.preventDefault(); facade.toggleTopicCompleted(topic.id)"
                        title="Toggle completion">
                        @if (facade.isTopicCompleted(topic.id)) {
                          <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        }
                      </button>
                      <span class="topic-name">{{ topic.title }}</span>
                    </div>
                    <span class="read-time">{{ topic.readingTime }}m</span>
                  </a>
                } @empty {
                  <div class="empty-category-msg">
                    <span>0 topics in this track</span>
                    <button class="btn-sidebar-clear" (click)="facade.setActiveTrack('all')">
                      Show all
                    </button>
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: var(--sidebar-width);
      height: calc(100vh - var(--header-height) - 2.5rem);
      position: sticky;
      top: var(--sticky-offset);
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border-radius: 1rem;
    }

    .sidebar-header {
      padding: 1rem 1.25rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
    }

    .sidebar-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .sidebar-close-btn {
      display: none;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border-radius: 0.5rem;
      background: rgba(148, 163, 184, 0.1);
      border: 1px solid rgba(148, 163, 184, 0.2);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
      flex-shrink: 0;
    }

    .sidebar-close-btn:hover {
      background: rgba(244, 63, 94, 0.15);
      border-color: rgba(244, 63, 94, 0.35);
      color: #f43f5e;
    }

    .count-pill {
      font-size: 0.7rem;
      background: rgba(0, 243, 255, 0.1);
      color: var(--accent-cyan);
      border: 1px solid rgba(0, 243, 255, 0.25);
      padding: 0.15rem 0.5rem;
      border-radius: 9999px;
      font-weight: 700;
    }

    .sidebar-filter-alert {
      margin: 0.5rem 0.75rem 0 0.75rem;
      padding: 0.45rem 0.75rem;
      border-radius: 0.6rem;
      background: rgba(0, 243, 255, 0.1);
      border: 1px solid rgba(0, 243, 255, 0.3);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      font-size: 0.76rem;
    }

    .filter-alert-text {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      color: var(--text-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .filter-track-icon {
      color: var(--accent-cyan);
      font-size: 0.85rem;
    }

    .filter-track-name {
      font-weight: 700;
      color: var(--accent-cyan);
    }

    .btn-clear-track {
      background: rgba(244, 63, 94, 0.15);
      border: 1px solid rgba(244, 63, 94, 0.35);
      color: #f43f5e;
      padding: 0.15rem 0.45rem;
      border-radius: 0.35rem;
      font-size: 0.7rem;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
      transition: all var(--transition-fast);
      flex-shrink: 0;
    }

    .btn-clear-track:hover {
      background: rgba(244, 63, 94, 0.25);
      transform: scale(1.04);
    }

    .category-list {
      flex: 1;
      overflow-y: auto;
      padding: 0.75rem 0.5rem 1.5rem 0.5rem;
    }

    .category-group {
      margin-bottom: 0.5rem;
      transition: opacity var(--transition-fast);
    }

    .category-group.dimmed {
      opacity: 0.45;
    }

    .category-group.dimmed:hover {
      opacity: 0.85;
    }

    .empty-category-msg {
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      border-radius: 0.4rem;
      background: rgba(148, 163, 184, 0.05);
    }

    .btn-sidebar-clear {
      background: transparent;
      border: none;
      color: var(--accent-cyan);
      font-size: 0.72rem;
      font-weight: 700;
      cursor: pointer;
      text-decoration: underline;
      padding: 0;
      font-family: inherit;
    }

    .cat-count-pill {
      font-size: 0.65rem;
      padding: 0.1rem 0.38rem;
      border-radius: 9999px;
      background: rgba(0, 243, 255, 0.12);
      color: var(--accent-cyan);
      font-weight: 800;
      font-family: var(--font-mono);
    }

    .cat-count-pill.zero-count {
      background: rgba(148, 163, 184, 0.1);
      color: var(--text-muted);
      opacity: 0.7;
    }

    .category-header-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: transparent;
      border: none;
      padding: 0.55rem 0.65rem;
      border-radius: 0.5rem;
      color: var(--text-primary);
      cursor: pointer;
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 700;
      transition: all var(--transition-fast);
      text-align: left;
    }

    .category-header-btn:hover {
      background: var(--sidebar-item-hover-bg);
      color: var(--sidebar-item-hover-text);
    }

    .cat-title-wrap {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .cat-icon {
      font-size: 1rem;
    }

    .cat-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .cat-meta {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .cat-badge {
      font-size: 0.65rem;
      background: rgba(255, 255, 255, 0.07);
      padding: 0.1rem 0.4rem;
      border-radius: 0.35rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    .chevron-icon {
      transition: transform var(--transition-fast);
      color: var(--text-muted);
    }

    .chevron-icon.rotated {
      transform: rotate(-90deg);
    }

    .topic-items {
      margin-top: 0.2rem;
      margin-left: 0.5rem;
      padding-left: 0.5rem;
      border-left: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .topic-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.45rem 0.65rem;
      border-radius: 0.5rem;
      font-size: 0.8rem;
      color: var(--text-secondary);
      text-decoration: none;
      transition: all var(--transition-fast);
      border: 1px solid transparent;
    }

    .topic-link:hover {
      background: var(--sidebar-item-hover-bg);
      color: var(--sidebar-item-hover-text);
      border-color: var(--sidebar-item-hover-border);
      transform: translateX(3px);
    }

    .topic-link.active {
      background: linear-gradient(135deg, rgba(var(--accent-cyan-rgb), 0.14) 0%, rgba(56, 189, 248, 0.06) 100%);
      color: var(--accent-cyan);
      border-color: var(--sidebar-item-hover-border);
      font-weight: 700;
      box-shadow: 0 0 12px rgba(var(--accent-cyan-rgb), 0.12);
    }

    .topic-link-left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      overflow: hidden;
    }

    .status-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1.5px solid rgba(148, 163, 184, 0.4);
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      color: #030712;
      flex-shrink: 0;
      transition: all var(--transition-fast);
    }

    .status-dot.completed {
      background: var(--accent-emerald);
      border-color: var(--accent-emerald);
      color: #030712;
      box-shadow: 0 0 8px rgba(52, 211, 153, 0.5);
    }

    .topic-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .read-time {
      font-size: 0.7rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
      flex-shrink: 0;
    }

    @media (max-width: 900px) {
      .sidebar {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        height: 100vh;
        width: min(320px, 86vw);
        margin-left: 0;
        border-radius: 0;
        border-right: 1px solid var(--glass-border-cyan);
        z-index: 2500;
        transform: translateX(-100%);
        transition: transform var(--transition-smooth);
        box-shadow: none;
        background: var(--bg-surface-elevated);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
      }

      [data-theme='dark'] .sidebar {
        background: rgba(11, 17, 32, 0.96);
      }

      [data-theme='light'] .sidebar {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 4px 0 24px rgba(15, 23, 42, 0.15);
      }

      .sidebar.mobile-open {
        transform: translateX(0);
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 243, 255, 0.2);
      }

      .sidebar-close-btn {
        display: flex;
      }
    }
  `]
})
export class SidebarComponent {
  readonly facade = inject(ReaderFacade);
  private collapsedCategories = signal<Set<string>>(new Set());

  toggleCategory(key: string): void {
    this.collapsedCategories.update(set => {
      const next = new Set(set);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  isCollapsed(key: string): boolean {
    return this.collapsedCategories().has(key);
  }

  getCategoryTopics(categoryKey: string): TopicManifest[] {
    return this.facade.filteredTopics().filter(t => t.category === categoryKey);
  }

  onTopicSelected(topicId: string): void {
    this.facade.setActiveTopicById(topicId);
    this.facade.setMobileMenuOpen(false);
  }

  getTrackTitle(track: string): string {
    const map: Record<string, string> = {
      architect: 'Architect Track',
      reactivity: 'Reactivity Track',
      cram: '1-Hour Cram'
    };
    return map[track] || track;
  }

  getCategoryIcon(key: string): string {
    const map: Record<string, string> = {
      '01-foundations': '🧱',
      '02-core-angular': '⚙️',
      '03-intermediate': '🔀',
      '04-reactivity': '⚡',
      '05-advanced': '🚀',
      '06-senior-architecture': '🛡️',
      '07-interview-preparation': '🎯',
      '08-cheat-sheets': '📑'
    };
    return map[key] || '📁';
  }
}
