import { Component, inject, signal, input, HostListener, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { SafeHtml } from '@angular/platform-browser';
import { ContentService } from '../../core/services/content.service';
import { MarkdownSanitizerService } from '../../core/services/markdown-sanitizer.service';
import { ReaderFacade } from '../../core/state/reader.facade';
import { HeadingItem, TopicManifest } from '../../core/models/content.model';
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
    <!-- Top Reading Progress Indicator -->
    <div class="reading-progress-bar" [style.width.%]="scrollProgress()"></div>

    @if (topic(); as t) {
      <article class="reader-container">
        <!-- Top Metadata & Navigation Banner -->
        <header class="reader-header glass-panel">
          <div class="header-breadcrumb">
            <a routerLink="/dashboard" class="bc-link">Dashboard</a>
            <span class="sep">/</span>
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
              <button class="btn-glass cheat-btn" (click)="facade.toggleDrawer()" title="Open Executive Recap">
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
            <!-- Deep Dive Markdown Render with Responsive Table of Contents Layout -->
            <div class="deep-dive-grid">
              <div class="prose-column">
                <!-- Mobile Outline Collapsible Bar (Tablet/Phone only) -->
                @if (filteredHeadings(t.headings).length > 2) {
                  <div class="mobile-toc-bar glass-panel">
                    <button class="mobile-toc-toggle" (click)="toggleMobileToc()">
                      <span class="toc-bar-title">📑 Outline ({{ filteredHeadings(t.headings).length }} Sections)</span>
                      <span class="toc-bar-arrow">{{ isMobileTocOpen() ? '▲ Close' : '▼ Jump to Section' }}</span>
                    </button>
                    @if (isMobileTocOpen()) {
                      <nav class="mobile-toc-dropdown">
                        @for (h of filteredHeadings(t.headings); track h.text) {
                          <a
                            href="javascript:void(0)"
                            (click)="scrollToHeading(h.text)"
                            [class.h3-indent]="h.level === 3"
                            class="mobile-toc-link">
                            {{ h.text }}
                          </a>
                        }
                      </nav>
                    }
                  </div>
                }

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

              <!-- Sticky Desktop Table of Contents Rail -->
              @if (filteredHeadings(t.headings).length > 2) {
                <aside class="desktop-toc-rail">
                  <div class="toc-sticky-card glass-panel">
                    <div class="toc-header">
                      <span class="toc-icon">📑</span>
                      <span class="toc-title">On This Page</span>
                    </div>
                    <nav class="toc-nav">
                      @for (h of filteredHeadings(t.headings); track h.text) {
                        <a
                          href="javascript:void(0)"
                          (click)="scrollToHeading(h.text)"
                          [class.h3-indent]="h.level === 3"
                          class="toc-nav-item"
                          title="{{ h.text }}">
                          {{ h.text }}
                        </a>
                      }
                    </nav>
                  </div>
                </aside>
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
            <a routerLink="/dashboard" class="btn-glass nav-link-btn prev-btn">
              <span class="nav-dir">← Dashboard</span>
              <span class="nav-title">Curriculum Overview</span>
            </a>
          }

          @if (nextTopic(); as next) {
            <a [routerLink]="['/topic', next.id]" class="btn-glass btn-cyan nav-link-btn next-btn">
              <span class="nav-dir">Next Module →</span>
              <span class="nav-title">{{ next.title }}</span>
            </a>
          } @else {
            <a routerLink="/dashboard" class="btn-glass btn-cyan nav-link-btn next-btn">
              <span class="nav-dir">Complete 🎉</span>
              <span class="nav-title">Return to Dashboard</span>
            </a>
          }
        </footer>
      </article>
    } @else {
      <div class="loading-state glass-panel">
        <div class="spinner"></div>
        <p>Loading curriculum topic...</p>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
    }

    .reading-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--accent-cyan) 0%, var(--accent-blue) 100%);
      box-shadow: 0 0 10px var(--accent-cyan-glow);
      z-index: 1001;
      transition: width 100ms ease-out;
    }

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
      flex-wrap: wrap;
    }

    .bc-link {
      color: var(--text-muted);
      text-decoration: none;
      font-weight: 600;
    }

    .bc-link:hover {
      color: var(--accent-cyan);
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
      min-width: 260px;
    }

    .action-buttons {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
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
      -webkit-overflow-scrolling: touch;
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

    /* Deep Dive Grid Layout */
    .deep-dive-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 240px;
      gap: 1.5rem;
      align-items: start;
    }

    .prose-column {
      min-width: 0; /* Prevents overflow */
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .markdown-body {
      padding: 2.5rem;
      border-radius: 1.25rem;
      background: var(--glass-bg);
      overflow-wrap: break-word;
    }

    /* Mobile TOC Bar */
    .mobile-toc-bar {
      display: none;
      padding: 0.75rem 1rem;
      border-radius: 0.85rem;
      flex-direction: column;
      gap: 0.5rem;
    }

    .mobile-toc-toggle {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: transparent;
      border: none;
      color: var(--text-primary);
      font-family: inherit;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
    }

    .toc-bar-title {
      color: var(--accent-cyan);
    }

    .toc-bar-arrow {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .mobile-toc-dropdown {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      padding-top: 0.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      max-height: 300px;
      overflow-y: auto;
    }

    .mobile-toc-link {
      font-size: 0.82rem;
      color: var(--text-secondary);
      text-decoration: none;
      padding: 0.3rem 0;
      transition: color var(--transition-fast);
    }

    .mobile-toc-link:hover {
      color: var(--accent-cyan);
    }

    /* Desktop Sticky TOC Rail */
    .desktop-toc-rail {
      position: sticky;
      top: var(--sticky-offset);
      height: fit-content;
      max-height: calc(100vh - var(--header-height) - 3rem);
    }

    .toc-sticky-card {
      padding: 1.25rem;
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-height: calc(100vh - var(--header-height) - 4rem);
    }

    .toc-header {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.82rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--accent-cyan);
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
      padding-bottom: 0.5rem;
    }

    .toc-nav {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      overflow-y: auto;
      padding-right: 0.25rem;
    }

    .toc-nav-item {
      font-size: 0.78rem;
      color: var(--text-secondary);
      text-decoration: none;
      line-height: 1.4;
      padding: 0.2rem 0;
      transition: all var(--transition-fast);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }

    .toc-nav-item:hover {
      color: var(--accent-cyan);
      transform: translateX(3px);
    }

    .h3-indent {
      padding-left: 0.75rem;
      opacity: 0.85;
      font-size: 0.74rem;
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
      min-width: 200px;
      text-decoration: none;
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

    /* Responsive Rules */
    @media (max-width: 1100px) {
      .deep-dive-grid {
        grid-template-columns: 1fr;
      }
      .desktop-toc-rail {
        display: none;
      }
      .mobile-toc-bar {
        display: flex;
      }
    }

    @media (max-width: 768px) {
      .markdown-body {
        padding: 1.5rem;
      }
      .reader-header {
        padding: 1.25rem;
      }
      .topic-title {
        font-size: 1.65rem;
      }
      .nav-link-btn {
        width: 100%;
        min-width: 0;
      }
      .next-btn {
        align-items: flex-start;
      }
    }
  `]
})
export class TopicReaderComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly contentService = inject(ContentService);
  private readonly markdownSanitizer = inject(MarkdownSanitizerService);
  readonly facade = inject(ReaderFacade);

  // Signals
  id = input<string>();
  readonly topic = signal<TopicManifest | null>(null);
  readonly renderedHtml = signal<SafeHtml>('');
  readonly isLoading = signal<boolean>(false);
  readonly isVisualizerActive = signal<boolean>(false);
  readonly isMobileTocOpen = signal<boolean>(false);
  readonly scrollProgress = signal<number>(0);

  // Prev / Next Topics
  readonly prevTopic = signal<TopicManifest | null>(null);
  readonly nextTopic = signal<TopicManifest | null>(null);

  constructor() {
    this.route.paramMap.subscribe(params => {
      const topicId = params.get('id') || '01-why-angular';
      this.loadTopic(topicId);
    });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const pct = Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100)));
      this.scrollProgress.set(pct);
    }
  }

  private loadTopic(topicId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    this.isLoading.set(true);
    this.isVisualizerActive.set(false);
    this.isMobileTocOpen.set(false);
    this.scrollProgress.set(0);

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
          },
          error: () => this.isLoading.set(false)
        });
      } else {
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

  filteredHeadings(headings: HeadingItem[]): HeadingItem[] {
    if (!headings) return [];
    // Filter out generic meta headings or noise
    return headings.filter(h =>
      h.level >= 2 &&
      h.level <= 3 &&
      !/^(interview priority|interview frequency|recommended depth|relevant for|key message|navigation)/i.test(h.text)
    );
  }

  toggleMobileToc(): void {
    this.isMobileTocOpen.update(v => !v);
  }

  scrollToHeading(text: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const slug = text
      .toLowerCase()
      .replace(/<[^>]+>/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    const el = document.getElementById(slug);
    if (el) {
      const yOffset = -90; // offset for sticky app header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    this.isMobileTocOpen.set(false);
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

    // 1. Handle Code Copy Button
    const copyBtn = target.closest('.code-copy-btn');
    if (copyBtn) {
      event.preventDefault();
      const wrapper = copyBtn.closest('.code-block-wrapper');
      const code = wrapper?.querySelector('code')?.innerText || '';
      if (code && isPlatformBrowser(this.platformId)) {
        navigator.clipboard.writeText(code).then(() => {
          copyBtn.classList.add('copied');
          const label = copyBtn.querySelector('.btn-copy-label');
          if (label) label.textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            if (label) label.textContent = 'Copy';
          }, 2000);
        });
      }
      return;
    }

    // 2. Handle internal anchor links
    const link = target.closest('a');
    if (link) {
      const topicId = link.getAttribute('data-topic-id');
      const href = link.getAttribute('href');
      if (topicId) {
        event.preventDefault();
        if (topicId === 'dashboard') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/topic', topicId]);
        }
      } else if (href && (/readme\.md/i.test(href) || href === '/')) {
        event.preventDefault();
        this.router.navigate(['/dashboard']);
      }
    }
  }
}
