import { Component, input, signal, computed, effect } from '@angular/core';
import { Flashcard } from '../../../core/models/content.model';

@Component({
  selector: 'app-flashcard-deck',
  standalone: true,
  template: `
    <div class="deck-container">
      <div class="deck-header">
        <div class="deck-counter">
          <span class="card-num">Card {{ currentDisplayIndex() }} of {{ cards().length }}</span>
          <div class="counter-bar">
            <div class="counter-fill" [style.width.%]="progressPercent()"></div>
          </div>
        </div>
        <button class="shuffle-btn" (click)="resetDeck()">Reset Deck</button>
      </div>

      @if (currentCard(); as card) {
        <div
          class="card-stage"
          (click)="toggleReveal()">
          <div class="flashcard glass-panel" [class.revealed]="isRevealed()">
            <div class="card-badge">
              <span>{{ card.source }}</span>
              <span class="click-hint">{{ isRevealed() ? 'Tap to hide answer' : 'Tap to reveal answer' }}</span>
            </div>

            <div class="card-question">
              <span class="q-icon">Q</span>
              <h3 class="q-text">{{ card.question }}</h3>
            </div>

            @if (isRevealed()) {
              <div class="card-answer-wrap">
                <div class="divider"></div>
                <div class="card-answer">
                  <span class="a-icon">A</span>
                  <p class="a-text">{{ card.answer }}</p>
                </div>
              </div>
            } @else {
              <div class="reveal-placeholder">
                <span>Click anywhere on the card to reveal the answer</span>
              </div>
            }
          </div>
        </div>

        <div class="deck-controls">
          <button
            class="btn-glass nav-btn"
            [disabled]="currentIndex() === 0"
            (click)="prevCard()">
            ← Previous
          </button>

          <button
            class="btn-glass reveal-toggle-btn"
            (click)="toggleReveal()">
            {{ isRevealed() ? 'Hide Answer' : 'Reveal Answer' }}
          </button>

          <button
            class="btn-glass nav-btn"
            [disabled]="currentIndex() === cards().length - 1"
            (click)="nextCard()">
            Next →
          </button>
        </div>
      } @else {
        <div class="empty-deck glass-panel">
          <p>No flashcards available for this topic yet.</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .deck-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-width: 760px;
      margin: 1rem auto;
    }

    .deck-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .deck-counter {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .card-num {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-secondary);
      font-family: var(--font-mono);
    }

    .counter-bar {
      width: 180px;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 9999px;
      overflow: hidden;
    }

    .counter-fill {
      height: 100%;
      background: linear-gradient(90deg, #00f3ff, #818cf8);
      transition: width var(--transition-smooth);
    }

    .shuffle-btn {
      background: transparent;
      border: none;
      color: var(--accent-cyan);
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
    }

    .card-stage {
      cursor: pointer;
      user-select: none;
      perspective: 1000px;
    }

    .flashcard {
      min-height: 280px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 1.25rem;
      transition: all var(--transition-smooth);
    }

    .flashcard:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 20px var(--accent-cyan-glow);
    }

    .flashcard.revealed {
      border-color: rgba(0, 243, 255, 0.4);
      background: var(--glass-bg-accent);
    }

    .card-badge {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--accent-cyan);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .click-hint {
      color: var(--text-muted);
      font-size: 0.7rem;
      text-transform: none;
      font-weight: 500;
    }

    .card-question {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin: 1.5rem 0;
    }

    .q-icon {
      width: 32px;
      height: 32px;
      border-radius: 0.5rem;
      background: rgba(0, 243, 255, 0.15);
      border: 1px solid rgba(0, 243, 255, 0.35);
      color: var(--accent-cyan);
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .q-text {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.4;
    }

    .divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 1.25rem 0;
    }

    .card-answer-wrap {
      animation: fadeIn 200ms ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .card-answer {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .a-icon {
      width: 32px;
      height: 32px;
      border-radius: 0.5rem;
      background: rgba(52, 211, 153, 0.15);
      border: 1px solid rgba(52, 211, 153, 0.35);
      color: var(--accent-emerald);
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .a-text {
      font-size: 1.05rem;
      color: var(--text-primary);
      line-height: 1.6;
    }

    .reveal-placeholder {
      padding: 1.5rem 0;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.85rem;
      font-style: italic;
    }

    .deck-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .nav-btn {
      flex: 1;
    }

    .nav-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .reveal-toggle-btn {
      flex: 1.5;
      color: var(--accent-cyan);
      border-color: rgba(0, 243, 255, 0.3);
    }

    .empty-deck {
      padding: 3rem;
      text-align: center;
      color: var(--text-muted);
    }
  `]
})
export class FlashcardDeckComponent {
  cards = input.required<Flashcard[]>();

  readonly currentIndex = signal<number>(0);
  readonly isRevealed = signal<boolean>(false);

  constructor() {
    effect(() => {
      // Whenever cards input changes, reset state to card 1 with answer hidden
      this.cards();
      this.currentIndex.set(0);
      this.isRevealed.set(false);
    });
  }

  readonly currentDisplayIndex = computed(() => {
    const total = this.cards().length;
    if (total === 0) return 0;
    return Math.min(this.currentIndex() + 1, total);
  });

  readonly currentCard = computed(() => {
    const list = this.cards();
    if (!list || list.length === 0) return null;
    const idx = Math.min(Math.max(0, this.currentIndex()), list.length - 1);
    return list[idx] || null;
  });

  readonly progressPercent = computed(() => {
    const total = this.cards().length;
    if (total === 0) return 0;
    const idx = Math.min(Math.max(0, this.currentIndex()), total - 1);
    return Math.round(((idx + 1) / total) * 100);
  });

  toggleReveal(): void {
    this.isRevealed.update(r => !r);
  }

  nextCard(): void {
    if (this.currentIndex() < this.cards().length - 1) {
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

  resetDeck(): void {
    this.currentIndex.set(0);
    this.isRevealed.set(false);
  }
}
