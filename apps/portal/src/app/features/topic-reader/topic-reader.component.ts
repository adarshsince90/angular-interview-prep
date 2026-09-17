import { Component, inject, signal, effect, input, HostListener } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import { ContentService } from '../../core/services/content.service';
import { MarkdownSanitizerService } from '../../core/services/markdown-sanitizer.service';
import { ReaderFacade } from '../../core/state/reader.facade';
import { TopicManifest, ViewMode } from '../../core/models/content.model';
import { FlashcardDeckComponent } from './components/flashcard-deck.component';
import { RecapSummaryComponent } from './components/recap-summary.component';
import { SignalsGraphVisualizerComponent } from '../visualizers/signals-graph-visualizer.component';
import { ChangeDetectionTreeVisualizerComponent } from '../visualizers/change-detection-tree-visualizer.component';

@Component({
  selector: 'app-topic-reader',
  standalone: true,
  imports: [
    RouterLink,
    FlashcardDeckComponent,
    RecapSummaryComponent,
    SignalsGraphVisualizerComponent,
    ChangeDetectionTreeVisualizerComponent
  ],
  template: `
    @if (topic(); as t) {
      <article class="reader-container">
        <!-- Top Metadata & Navigation Banner -->
        <header class="reader-header glass-panel">
          <div class="header-breadcrumb">
            <span class="cat-badge">{{ t.categoryTitle }}</span>
            <span class="sep">/</span>
            <span class="topic-slug">{{ t.id }}</span>
          </div>

          <div class="header-main-row">
            <h1 class="topic-title">{{ t.title }}</h1>
            <div class="action-buttons">
              <button
                class="btn-glass complete-btn"
                [class.completed]="facade.isTopicCompleted(t.id)"
                (click)="facade.toggleTopicCompleted(t.id)">
                @if (facade.isTopicCompleted(t.id)) {
                  <span>✓ Mastered</span>
                } @else {
                  <span>Mark as Mastered</span>
                }
              </button>
              <button class="btn-glass cheat-btn" (click)="facade.toggleDrawer()">
                ⚡ Executive Sheet
              </button>
            </div>
          </div>

          <p class="topic-lead">{{ t.summary }}</p>

          <!-- Metric Badges -->
          <div class="meta-pills">
            <span class="pill">⏱️ {{ t.readingTime }} Min Read</span>
            <span class="pill">🎴 {{ t.flashcards.length }} Flashcards</span>
            <span class="pill">🏷️ {{ t.categoryBadge }}</span>
            <span class="pill">📊 {{ t.wordCount }} Words</span>
          </div>

          <!-- Multi-Mode View Tabs -->
          <nav class="view-tabs">
            <button
              class="tab-btn"
              [class.active]="facade.viewMode() === 'deep-dive'"
              (click)="facade.setViewMode('deep-dive')">
              📖 Deep Dive Guide
            </button>
            <button
              class="tab-btn"
              [class.active]="facade.viewMode() === 'recap'"
              (click)="facade.setViewMode('recap')">
              ⚡ 5-Min Cram Sheet
            </button>
            <button
              class="tab-btn"
              [class.active]="facade.viewMode() === 'flashcards'"
              (click)="facade.setViewMode('flashcards')">
              🎴 Flashcards ({{ t.flashcards.length }})
            </button>
            @if (hasVisualizers(t.id)) {
              <button
                class="tab-btn highlight-tab"
                [class.active]="isVisualizerActive()"
                (click)="toggleVisualizer()">
                📊 Interactive Runtime Lab
              </button>
            }
          </nav>
        </header>

        <!-- Active Tab Content -->
        <main class="reader-body">
          @if (isVisualizerActive()) {
            <section class="visualizer-section">
              @if (t.id.includes('signal') || t.category === '04-reactivity') {
                <app-signals-graph-visualizer />
              }
              <app-cd-tree-visualizer />
            </section>
          } @else if (facade.viewMode() === 'recap') {
            <app-recap-summary [topic]="t" />
          } @else if (facade.viewMode() === 'flashcards') {
            <app-flashcard-deck [cards]="t.flashcards" />
          } @else {
            <!-- Deep Dive Markdown Render -->
            <div class="deep-dive-layout">
              @if (isLoading()) {
                <div class="loading-state glass-panel">
                  <div class="spinner"></div>
                  <p>Streaming architectural guide...</p>
                </div>
              } @else {
                <div
                  class="prose-content markdown-body glass-panel"
                  [innerHTML]="renderedHtml()"
                  (click)="onContentClick($event)">
                </div>
              }
            </div>
          }
        </main>

        <!-- Previous / Next Navigation Footer -->
        <footer class="reader-footer glass-panel">
          @if (prevTopic(); as prev) {
            <a [routerLink]="['/topic', prev.id]" class="btn-glass nav-link-btn prev-btn">
              <span class="nav-dir">← Previous Module</span>
              <span class="nav-title">{{ prev.title }}</span>
            </a>
          } @else {
            <div></div>
          }

          @if (nextTopic(); as next) {
            <a [routerLink]="['/topic', next.id]" class="btn-glass btn-cyan nav-link-btn next-btn">
              <span class="nav-dir">Next Module →</span>
              <span class="nav-title">{{ next.title }}</span>
            </a>
          }
        </footer>
      </article>
    } @else {
      <div class="loading-state glass-panel">
        <div class="spinner"></div>
        <p>Loading curriculum index...</p>
      </div>
    }
  `,
  styles: [`
    .reader-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-width: var(--max-content-width);
      margin: 0 auto;
      padding-bottom: 3rem;
    }

    .reader-header {
      padding: 1.75rem 2rem;
      border-radius: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .header-breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.78rem;
    }

    .cat-badge {
      font-weight: 700;
      color: var(--accent-cyan);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .sep {
      color: var(--text-muted);
    }

    .topic-slug {
      font-family: var(--font-mono);
      color: var(--text-muted);
    }

    .header-main-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    .topic-title {
      font-size: 2.25rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: var(--text-primary);
      flex: 1;
      min-width: 280px;
    }

    .action-buttons {
      display: flex;
      gap: 0.75rem;
    }

    .complete-btn.completed {
      background: rgba(52, 211, 153, 0.15);
      border-color: rgba(52, 211, 153, 0.4);
      color: var(--accent-emerald);
    }

    .topic-lead {
      font-size: 1.05rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .meta-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .pill {
      font-size: 0.75rem;
      padding: 0.25rem 0.65rem;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-secondary);
      font-weight: 600;
    }

    .view-tabs {
      display: flex;
      gap: 0.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 1rem;
      margin-top: 0.5rem;
      overflow-x: auto;
    }

    .tab-btn {
      background: transparent;
      border: 1px solid transparent;
      padding: 0.6rem 1.15rem;
      border-radius: 0.75rem;
      font-family: inherit;
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
      white-space: nowrap;
    }

    .tab-btn:hover {
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.04);
    }

    .tab-btn.active {
      background: rgba(0, 243, 255, 0.12);
      border-color: rgba(0, 243, 255, 0.35);
      color: var(--accent-cyan);
      box-shadow: 0 0 16px rgba(0, 243, 255, 0.15);
    }

    .highlight-tab {
      color: var(--accent-cyan);
      border-color: rgba(0, 243, 255, 0.2);
    }

    .reader-body {
      min-height: 400px;
    }

    .markdown-body {
      padding: 2.5rem;
      border-radius: 1.25rem;
      background: var(--glass-bg);
    }

    .loading-state {
      padding: 4rem 2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      border-radius: 1.25rem;
      color: var(--text-muted);
    }

    .spinner {
      width: 36px;
      height: 36px;
      border: 3px solid rgba(0, 243, 255, 0.2);
      border-top-color: var(--accent-cyan);
      border-radius: 50%;
      animation: spin 800ms linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .reader-footer {
      padding: 1.5rem;
      border-radius: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .nav-link-btn {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.2rem;
      padding: 0.75rem 1.25rem;
      min-width: 220px;
    }

    .next-btn {
      align-items: flex-end;
      margin-left: auto;
    }

    .nav-dir {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.8;
    }

    .nav-title {
      font-size: 0.92rem;
      font-weight: 700;
    }

    @media (max-width: 768px) {
      .markdown-body {
        padding: 1.5rem;
      }
      .reader-header {
        padding: 1.25rem;
      }
      .topic-title {
        font-size: 1.75rem;
      }
      .nav-link-btn {
        width: 100%;
      }
    }
  `]
})
export class TopicReaderComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly contentService = inject(ContentService);
  private readonly markdownSanitizer = inject(MarkdownSanitizerService);
  readonly facade = inject(ReaderFacade);

  // Inputs & Signals
  id = input<string>();
  readonly topic = signal<TopicManifest | null>(null);
  readonly renderedHtml = signal<SafeHtml>('');
  readonly isLoading = signal<boolean>(false);
  readonly isVisualizerActive = signal<boolean>(false);

  // Prev / Next Topics
  readonly prevTopic = signal<TopicManifest | null>(null);
  readonly nextTopic = signal<TopicManifest | null>(null);

  constructor() {
    this.route.paramMap.subscribe(params => {
      const topicId = params.get('id') || '01-why-angular';
      this.loadTopic(topicId);
    });

    effect(() => {
      // Whenever view mode tab changes (deep-dive, cram, flashcards), reset scroll to top
      this.facade.viewMode();
      this.resetScrollToTop();
    });
  }

  private resetScrollToTop(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    const main = document.querySelector('.main-viewport');
    if (main) main.scrollTop = 0;
  }

  private loadTopic(topicId: string): void {
    this.resetScrollToTop();
    this.isLoading.set(true);
    this.isVisualizerActive.set(false);

    this.contentService.getTopic(topicId).subscribe(manifestTopic => {
      if (manifestTopic) {
        this.topic.set(manifestTopic);
        this.facade.setActiveTopicById(manifestTopic.id);
        this.computePrevNext(manifestTopic.id);

        // Fetch raw markdown on demand
        this.contentService.getTopicMarkdown(manifestTopic.contentUrl).subscribe({
          next: md => {
            const html = this.markdownSanitizer.renderMarkdown(md);
            this.renderedHtml.set(html);
            this.isLoading.set(false);
            // Ensure scroll resets after DOM insertion and paint
            requestAnimationFrame(() => {
              this.resetScrollToTop();
              setTimeout(() => this.resetScrollToTop(), 25);
            });
          },
          error: () => this.isLoading.set(false)
        });
      } else {
        // Topic not found in manifest
        this.isLoading.set(false);
      }
    });
  }

  private computePrevNext(currentId: string): void {
    const list = this.facade.filteredTopics();
    const idx = list.findIndex(t => t.id === currentId);
    if (idx >= 0) {
      this.prevTopic.set(idx > 0 ? list[idx - 1] : null);
      this.nextTopic.set(idx < list.length - 1 ? list[idx + 1] : null);
    }
  }

  hasVisualizers(topicId: string): boolean {
    return (
      topicId.includes('signal') ||
      topicId.includes('change-detection') ||
      topicId.includes('rxjs') ||
      topicId.includes('subject')
    );
  }

  toggleVisualizer(): void {
    this.isVisualizerActive.update(v => !v);
  }

  onContentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const link = target.closest('a');
    if (link) {
      const topicId = link.getAttribute('data-topic-id');
      const href = link.getAttribute('href');
      if (topicId) {
        event.preventDefault();
        this.router.navigate(['/topic', topicId]);
      } else if (href && (/readme\.md/i.test(href) || href === '/')) {
        event.preventDefault();
        this.router.navigate(['/topic', '01-why-angular']);
      }
    }
  }
}
