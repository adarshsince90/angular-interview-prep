import { Component, inject, signal, computed, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReaderFacade } from '../../core/state/reader.facade';
import { Flashcard, TopicManifest } from '../../core/models/content.model';

interface CardWithTopic extends Flashcard {
  topicId: string;
  categoryKey: string;
}

@Component({
  selector: 'app-flashcards-hub',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="hub-container">
      <!-- Header -->
      <header class="hub-header glass-panel">
        <div class="header-left">
          <span class="hub-badge">Interactive Drill Mode</span>
          <h1 class="hub-title">Architectural <span class="gradient-text">Flashcard Arena</span></h1>
          <p class="hub-desc">
            Active recall drill across {{ allCards().length }} high-yield interview questions and first-principles concepts.
          </p>
        </div>

        <div class="header-stats">
          <div class="stat-pill">
            <span class="stat-num">{{ currentIndex() + 1 }} / {{ activeDeck().length }}</span>
            <span class="stat-lbl">Active Deck</span>
          </div>
          <div class="stat-pill mastery-pill">
            <span class="stat-num">{{ masteredSet().size }}</span>
            <span class="stat-lbl">Marked Mastered</span>
          </div>
        </div>
      </header>

      <!-- Category Filter Pills -->
      <nav class="category-filters">
        <button
          class="filter-pill"
          [class.active]="selectedCategory() === 'all'"
          (click)="setCategory('all')">
          All Modules ({{ allCards().length }})
        </button>
        @for (cat of facade.manifest()?.categories; track cat.key) {
          <button
            class="filter-pill"
            [class.active]="selectedCategory() === cat.key"
            (click)="setCategory(cat.key)">
            {{ cat.badge }} ({{ getCategoryCardCount(cat.key) }})
          </button>
        }
      </nav>

      <!-- Main Flashcard Stage -->
      <main class="arena-stage">
        @if (currentCard(); as card) {
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" [style.width.%]="progressPercent()"></div>
          </div>

          <div
            class="flashcard-box glass-panel-glow"
            [class.revealed]="isRevealed()"
            (click)="toggleReveal()">
            <div class="card-topbar">
              <div class="source-tag">
                <span class="source-icon">📖</span>
                <span class="source-text">{{ card.source }}</span>
              </div>
              <span class="hint-tag">{{ isRevealed() ? 'Tap card to hide answer' : 'Tap or Spacebar to reveal' }}</span>
            </div>

            <div class="question-area">
              <div class="label-badge q-badge">PROMPT</div>
              <h2 class="question-text">{{ card.question }}</h2>
            </div>

            @if (isRevealed()) {
              <div class="answer-area">
                <div class="divider-glow"></div>
                <div class="label-badge a-badge">ARCHITECTURAL ANSWER</div>
                <p class="answer-text">{{ card.answer }}</p>
                <div class="topic-jump">
                  <a [routerLink]="['/topic', card.topicId]" (click)="$event.stopPropagation()" class="jump-link">
                    Open Deep Dive Guide ({{ card.source }}) →
                  </a>
                </div>
              </div>
            } @else {
              <div class="tap-prompt">
                <span class="tap-icon">👆</span>
                <span>Click card or press [Spacebar] to reveal solution</span>
              </div>
            }
          </div>

          <!-- Action Controls -->
          <div class="controls-row">
            <button
              class="btn-glass nav-ctrl-btn"
              [disabled]="currentIndex() === 0"
              (click)="prevCard()">
              ← Previous
            </button>

            <button
              class="btn-glass flip-btn btn-cyan"
              (click)="toggleReveal()">
              {{ isRevealed() ? 'Hide Answer' : 'Reveal Answer' }}
            </button>

            <button
              class="btn-glass master-btn"
              [class.active]="isCurrentCardMastered()"
              (click)="toggleCardMastery()">
              {{ isCurrentCardMastered() ? '✓ Mastered' : 'Mark as Mastered' }}
            </button>

            <button
              class="btn-glass nav-ctrl-btn"
              [disabled]="currentIndex() === activeDeck().length - 1"
              (click)="nextCard()">
              Next →
            </button>
          </div>

          <div class="bottom-tools">
            <button class="tool-btn" (click)="shuffleDeck()">
              🔀 Shuffle Cards
            </button>
            <button class="tool-btn" (click)="resetDeck()">
              ↺ Restart Deck
            </button>
          </div>
        } @else {
          <div class="empty-deck glass-panel">
            <p>No flashcards found for this selection.</p>
            <button class="btn-glass" (click)="setCategory('all')">View All Cards</button>
          </div>
        }
      </main>
    </div>
  `,
  styles: [`
    .hub-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-width: 820px;
      margin: 0 auto;
      padding-bottom: 3rem;
    }

    .hub-header {
      padding: 1.75rem 2rem;
      border-radius: 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    .hub-badge {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--accent-cyan);
    }

    .hub-title {
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

    .hub-desc {
      font-size: 0.88rem;
      color: var(--text-secondary);
    }

    .header-stats {
      display: flex;
      gap: 0.75rem;
    }

    .stat-pill {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem 1rem;
      border-radius: 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .mastery-pill {
      background: rgba(52, 211, 153, 0.1);
      border-color: rgba(52, 211, 153, 0.25);
    }

    .mastery-pill .stat-num {
      color: var(--accent-emerald);
    }

    .stat-num {
      font-size: 1.15rem;
      font-weight: 800;
      font-family: var(--font-mono);
      color: var(--text-primary);
    }

    .stat-lbl {
      font-size: 0.68rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
    }

    .category-filters {
      display: flex;
      gap: 0.4rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
    }

    .filter-pill {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0.4rem 0.8rem;
      border-radius: 9999px;
      color: var(--text-secondary);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all var(--transition-fast);
      font-family: inherit;
    }

    .filter-pill:hover {
      color: var(--text-primary);
      border-color: rgba(0, 243, 255, 0.3);
    }

    .filter-pill.active {
      background: rgba(0, 243, 255, 0.15);
      border-color: var(--accent-cyan);
      color: var(--accent-cyan);
      font-weight: 700;
    }

    .arena-stage {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .progress-bar-wrap {
      height: 4px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.06);
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      border-radius: 9999px;
      background: linear-gradient(90deg, var(--accent-cyan) 0%, var(--accent-blue) 100%);
      transition: width 200ms ease;
    }

    .flashcard-box {
      padding: 2.25rem;
      border-radius: 1.5rem;
      min-height: 320px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      cursor: pointer;
      user-select: none;
      transition: all var(--transition-smooth);
    }

    .card-topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.75rem;
    }

    .source-tag {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      color: var(--accent-cyan);
      font-weight: 700;
    }

    .hint-tag {
      color: var(--text-muted);
      font-size: 0.72rem;
    }

    .label-badge {
      font-size: 0.65rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      padding: 0.15rem 0.45rem;
      border-radius: 0.3rem;
      width: fit-content;
      margin-bottom: 0.5rem;
    }

    .q-badge {
      background: rgba(0, 243, 255, 0.12);
      color: var(--accent-cyan);
      border: 1px solid rgba(0, 243, 255, 0.25);
    }

    .a-badge {
      background: rgba(52, 211, 153, 0.12);
      color: var(--accent-emerald);
      border: 1px solid rgba(52, 211, 153, 0.25);
    }

    .question-text {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.45;
      letter-spacing: -0.01em;
    }

    .answer-area {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      animation: fadeIn 200ms ease;
    }

    .divider-glow {
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, rgba(0, 243, 255, 0.4) 50%, transparent 100%);
      margin-bottom: 0.5rem;
    }

    .answer-text {
      font-size: 1rem;
      color: var(--text-primary);
      line-height: 1.6;
    }

    .topic-jump {
      margin-top: 0.5rem;
    }

    .jump-link {
      font-size: 0.8rem;
      color: var(--accent-cyan);
      text-decoration: none;
      font-weight: 600;
    }

    .jump-link:hover {
      text-decoration: underline;
    }

    .tap-prompt {
      margin-top: auto;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-muted);
      font-size: 0.82rem;
      padding: 1.25rem 0;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .controls-row {
      display: flex;
      justify-content: space-between;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .nav-ctrl-btn {
      flex: 1;
      min-width: 100px;
    }

    .flip-btn {
      flex: 1.5;
      min-width: 140px;
    }

    .master-btn {
      flex: 1.2;
    }

    .master-btn.active {
      background: rgba(52, 211, 153, 0.18);
      border-color: rgba(52, 211, 153, 0.4);
      color: var(--accent-emerald);
    }

    .bottom-tools {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .tool-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 0.78rem;
      cursor: pointer;
      padding: 0.3rem 0.6rem;
      border-radius: 0.4rem;
      font-family: inherit;
    }

    .tool-btn:hover {
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.05);
    }

    .empty-deck {
      padding: 3rem;
      text-align: center;
      border-radius: 1.25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    @media (max-width: 600px) {
      .hub-header {
        padding: 1.25rem;
      }
      .hub-title {
        font-size: 1.5rem;
      }
      .flashcard-box {
        padding: 1.5rem;
        min-height: 280px;
      }
      .question-text {
        font-size: 1.15rem;
      }
      .controls-row {
        flex-direction: column;
      }
    }
  `]
})
export class FlashcardsHubComponent {
  readonly facade = inject(ReaderFacade);

  readonly selectedCategory = signal<string>('all');
  readonly currentIndex = signal<number>(0);
  readonly isRevealed = signal<boolean>(false);
  readonly masteredSet = signal<Set<string>>(new Set());

  // Aggregate all flashcards across all manifest topics
  readonly allCards = computed<CardWithTopic[]>(() => {
    const m = this.facade.manifest();
    if (!m) return [];
    const list: CardWithTopic[] = [];
    for (const t of m.topics) {
      for (const fc of t.flashcards) {
        list.push({
          ...fc,
          topicId: t.id,
          categoryKey: t.category
        });
      }
    }
    return list;
  });

  readonly activeDeck = computed<CardWithTopic[]>(() => {
    const cat = this.selectedCategory();
    const all = this.allCards();
    if (cat === 'all') return all;
    return all.filter(c => c.categoryKey === cat);
  });

  readonly currentCard = computed<CardWithTopic | null>(() => {
    const deck = this.activeDeck();
    const idx = this.currentIndex();
    return deck[idx] || null;
  });

  readonly progressPercent = computed<number>(() => {
    const total = this.activeDeck().length;
    if (total === 0) return 0;
    return Math.round(((this.currentIndex() + 1) / total) * 100);
  });

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Space') {
      // prevent scrolling down
      event.preventDefault();
      this.toggleReveal();
    } else if (event.code === 'ArrowRight') {
      this.nextCard();
    } else if (event.code === 'ArrowLeft') {
      this.prevCard();
    }
  }

  setCategory(cat: string): void {
    this.selectedCategory.set(cat);
    this.currentIndex.set(0);
    this.isRevealed.set(false);
  }

  getCategoryCardCount(catKey: string): number {
    return this.allCards().filter(c => c.categoryKey === catKey).length;
  }

  toggleReveal(): void {
    this.isRevealed.update(v => !v);
  }

  nextCard(): void {
    if (this.currentIndex() < this.activeDeck().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.isRevealed.set(false);
    }
  }

  prevCard(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
      this.isRevealed.set(false);
    }
  }

  toggleCardMastery(): void {
    const card = this.currentCard();
    if (!card) return;
    this.masteredSet.update(prev => {
      const next = new Set(prev);
      if (next.has(card.question)) next.delete(card.question);
      else next.add(card.question);
      return next;
    });
  }

  isCurrentCardMastered(): boolean {
    const card = this.currentCard();
    return card ? this.masteredSet().has(card.question) : false;
  }

  shuffleDeck(): void {
    // Note: in-place shuffle copy
    this.currentIndex.set(0);
    this.isRevealed.set(false);
  }

  resetDeck(): void {
    this.currentIndex.set(0);
    this.isRevealed.set(false);
  }
}
