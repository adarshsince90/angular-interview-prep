import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { ReaderFacade } from '../../state/reader.facade';
import { SearchResult } from '../../models/content.model';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [FormsModule],
  template: `
    @if (facade.isSearchOpen()) {
      <div class="search-backdrop" (click)="facade.setSearchOpen(false)"></div>
      <div class="search-dialog">
        <div class="search-header">
          <div class="search-input-box">
            <svg class="search-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              #searchInput
              type="text"
              class="search-input"
              placeholder="Search 54+ Angular architecture topics, flashcards, keywords..."
              [(ngModel)]="searchQuery"
              (ngModelChange)="onSearchChange($event)"
              (keydown.arrowdown)="onKeyDownArrow(1, $event)"
              (keydown.arrowup)="onKeyDownArrow(-1, $event)"
              (keydown.enter)="onKeyDownEnter($event)"
              (keydown.escape)="facade.setSearchOpen(false)"
              autofocus />
          </div>

          <button class="search-close-btn" (click)="facade.setSearchOpen(false)" title="Close Search (Esc)">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <kbd class="esc-kbd">Esc</kbd>
          </button>
        </div>

        <div class="search-results">
          @for (result of results(); track result.topic.id; let idx = $index) {
            <button
              class="result-item"
              [class.selected]="idx === selectedIndex()"
              (click)="selectResult(result)"
              (mouseenter)="selectedIndex.set(idx)">
              <div class="result-top">
                <span class="result-category">{{ result.topic.categoryTitle }}</span>
                <span class="result-match-type">{{ result.matchedOn }}</span>
              </div>
              <h4 class="result-title">{{ result.topic.title }}</h4>
              <p class="result-snippet">{{ result.matchedSnippet }}</p>
            </button>
          } @empty {
            <div class="no-results">
              <p class="no-results-title">No topics matching "{{ searchQuery }}"</p>
              <span class="hint">Try searching for "Signals", "Change Detection", "RxJS", or "DI"</span>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .search-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 2000;
    }

    .search-dialog {
      position: fixed;
      top: 12%;
      left: 50%;
      transform: translateX(-50%);
      width: 680px;
      max-width: 92vw;
      max-height: 75vh;
      z-index: 2001;
      display: flex;
      flex-direction: column;
      border-radius: 1.25rem;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--glass-border-cyan);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px var(--accent-cyan-glow);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      animation: popIn 180ms cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
    }

    [data-theme='light'] .search-dialog {
      background: #ffffff;
      border: 1px solid rgba(2, 132, 199, 0.35);
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18), 0 0 20px rgba(2, 132, 199, 0.15);
    }

    [data-theme='dark'] .search-dialog {
      background: rgba(11, 17, 32, 0.95);
      border: 1px solid rgba(0, 243, 255, 0.35);
    }

    @keyframes popIn {
      from { transform: translateX(-50%) scale(0.96); opacity: 0; }
      to { transform: translateX(-50%) scale(1); opacity: 1; }
    }

    .search-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1.15rem 1.25rem;
      border-bottom: 1px solid var(--glass-border);
    }

    [data-theme='light'] .search-header {
      border-bottom: 1px solid rgba(226, 232, 240, 0.9);
    }

    [data-theme='dark'] .search-header {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .search-input-box {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.55rem 0.85rem;
      border-radius: 0.75rem;
      background: rgba(148, 163, 184, 0.08);
      border: 1px solid rgba(148, 163, 184, 0.2);
    }

    .search-icon {
      color: var(--accent-cyan);
      flex-shrink: 0;
    }

    .search-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      font-family: inherit;
      font-size: 1rem;
      color: var(--text-primary);
      font-weight: 500;
    }

    .search-input::placeholder {
      color: var(--text-muted);
      font-size: 0.92rem;
    }

    .search-close-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 0.75rem;
      border-radius: 0.65rem;
      background: rgba(148, 163, 184, 0.1);
      border: 1px solid rgba(148, 163, 184, 0.2);
      color: var(--text-secondary);
      cursor: pointer;
      font-family: inherit;
      transition: all var(--transition-fast);
    }

    .search-close-btn:hover {
      background: rgba(244, 63, 94, 0.12);
      border-color: rgba(244, 63, 94, 0.35);
      color: #f43f5e;
    }

    .esc-kbd {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      padding: 0.1rem 0.35rem;
      border-radius: 0.3rem;
      background: rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(148, 163, 184, 0.25);
    }

    .search-results {
      flex: 1;
      overflow-y: auto;
      padding: 0.85rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .result-item {
      width: 100%;
      text-align: left;
      padding: 0.95rem 1.15rem;
      border-radius: 0.75rem;
      background: rgba(148, 163, 184, 0.05);
      border: 1px solid rgba(148, 163, 184, 0.12);
      cursor: pointer;
      transition: all var(--transition-fast);
      font-family: inherit;
    }

    .result-item:hover, .result-item:focus, .result-item.selected {
      background: rgba(0, 243, 255, 0.08);
      border-color: var(--accent-cyan);
      transform: translateX(4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }

    [data-theme='light'] .result-item:hover,
    [data-theme='light'] .result-item.selected {
      background: rgba(2, 132, 199, 0.08);
      border-color: rgba(2, 132, 199, 0.4);
    }

    .result-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.3rem;
    }

    .result-category {
      font-size: 0.72rem;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--accent-cyan);
      letter-spacing: 0.05em;
    }

    .result-match-type {
      font-size: 0.65rem;
      padding: 0.1rem 0.4rem;
      border-radius: 0.3rem;
      background: rgba(148, 163, 184, 0.12);
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.04em;
    }

    .result-title {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 0.3rem;
    }

    .result-snippet {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.45;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .no-results {
      padding: 3rem 1rem;
      text-align: center;
    }

    .no-results-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .hint {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: var(--accent-cyan);
      font-weight: 600;
    }

    @media (max-width: 600px) {
      .search-dialog {
        top: 4%;
        width: 95vw;
        max-height: 90vh;
        border-radius: 1rem;
      }
      .search-header {
        padding: 0.85rem;
      }
      .search-results {
        padding: 0.65rem;
      }
      .result-item {
        padding: 0.75rem 0.9rem;
      }
      .result-title {
        font-size: 0.95rem;
      }
    }
  `]
})
export class SearchModalComponent {
  private readonly searchService = inject(SearchService);
  readonly facade = inject(ReaderFacade);
  private readonly router = inject(Router);

  searchQuery = '';
  readonly results = signal<SearchResult[]>([]);
  readonly selectedIndex = signal<number>(0);

  constructor() {
    this.onSearchChange('');
  }

  onSearchChange(query: string): void {
    this.selectedIndex.set(0);
    this.searchService.search(query).subscribe(res => {
      this.results.set(res);
      this.selectedIndex.set(0);
    });
  }

  onKeyDownArrow(direction: number, event: Event): void {
    event.preventDefault();
    const count = this.results().length;
    if (count === 0) return;
    this.selectedIndex.update(idx => {
      const next = idx + direction;
      if (next < 0) return 0;
      if (next >= count) return count - 1;
      return next;
    });
  }

  onKeyDownEnter(event: Event): void {
    event.preventDefault();
    const list = this.results();
    const idx = this.selectedIndex();
    if (list.length > 0 && idx >= 0 && idx < list.length) {
      this.selectResult(list[idx]);
    }
  }

  selectResult(result: SearchResult): void {
    this.facade.setSearchOpen(false);
    this.facade.setActiveTopicById(result.topic.id);
    this.router.navigate(['/topic', result.topic.id]);
  }
}
