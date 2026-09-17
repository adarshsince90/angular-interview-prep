import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReaderFacade } from '../../core/state/reader.facade';
import { CategoryGroup, TopicManifest } from '../../core/models/content.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="dashboard-container">
      <!-- Hero Mastery Hub -->
      <section class="hero-card glass-panel-glow">
        <div class="hero-left">
          <div class="hero-badge">
            <span class="pulse-indicator"></span>
            <span>Enterprise Knowledge Repository</span>
          </div>
          <h1 class="hero-title">
            Angular Senior & Lead <span class="gradient-text">Architect Mastery</span>
          </h1>
          <p class="hero-subtitle">
            First-principles curriculum from computer science fundamentals to production micro-frontends,
            signals reactivity, and .NET full-stack integration.
          </p>

          <div class="hero-actions">
            <a [routerLink]="['/topic', facade.lastActiveTopicId()]" class="btn-glass btn-cyan hero-btn">
              <span>⚡ Resume Learning</span>
              <span class="btn-sub">Continue where you left off</span>
            </a>
            <a routerLink="/flashcards" class="btn-glass hero-btn">
              <span>🎴 Flashcard Arena</span>
              <span class="btn-sub">Drill 192 interview prompts</span>
            </a>
            <a routerLink="/labs" class="btn-glass hero-btn">
              <span>📊 Architecture Labs</span>
              <span class="btn-sub">Simulate runtime graphs</span>
            </a>
          </div>
        </div>

        <div class="hero-right">
          <!-- Radial-Style Progress Gauge Card -->
          <div class="mastery-gauge-card glass-panel">
            <div class="gauge-ring-wrap">
              <svg class="gauge-svg" viewBox="0 0 120 120">
                <circle class="gauge-bg" cx="60" cy="60" r="50" />
                <circle
                  class="gauge-progress"
                  cx="60"
                  cy="60"
                  r="50"
                  [style.strokeDashoffset]="gaugeOffset()" />
              </svg>
              <div class="gauge-center">
                <span class="gauge-percent">{{ facade.progressPercent() }}%</span>
                <span class="gauge-label">Mastered</span>
              </div>
            </div>

            <div class="gauge-details">
              <div class="detail-row">
                <span class="detail-label">Topics Completed</span>
                <span class="detail-val">{{ facade.completedCount() }} / {{ facade.totalTopicsCount() }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Total Flashcards</span>
                <span class="detail-val">{{ facade.totalFlashcardsCount() }} Cards</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Est. Completion</span>
                <span class="detail-val">~14 hrs study</span>
              </div>
            </div>

            @if (facade.completedCount() > 0) {
              <button class="reset-link-btn" (click)="facade.resetProgress()" title="Reset study progress">
                Reset Progress
              </button>
            }
          </div>
        </div>
      </section>

      <!-- Fast Track Pathways -->
      <section class="section-block">
        <div class="section-header track-header-row">
          <div class="track-header-left">
            <h2 class="section-title">Specialized Interview Tracks</h2>
            <span class="section-desc">Targeted study paths designed for senior technical interviews</span>
          </div>
          @if (facade.activeTrack() !== 'all') {
            <button class="btn-clear-track-pill" (click)="facade.setActiveTrack('all')" title="Click to show all 54 topics">
              <span>Filter: <strong>{{ getTrackLabel(facade.activeTrack()) }}</strong> ({{ facade.filteredTopics().length }} topics)</span>
              <span class="clear-cross">✕ Clear</span>
            </button>
          }
        </div>

        <div class="track-grid">
          <!-- Architect Track -->
          <div
            class="track-card glass-panel"
            [class.active-track]="facade.activeTrack() === 'architect'"
            (click)="selectTrackAndNavigate('architect')">
            <div class="track-icon-wrap icon-architect">
              <span>🛡️</span>
            </div>
            <div class="track-content">
              <div class="track-header">
                <h3 class="track-name">Enterprise Architect Track</h3>
                <span class="track-pill" [class.active-pill]="facade.activeTrack() === 'architect'">
                  {{ facade.activeTrack() === 'architect' ? '✓ Active Filter' : 'Senior / Staff' }}
                </span>
              </div>
              <p class="track-desc">
                State management strategies, NgRx store architecture, micro-frontends, clean layered boundaries, and .NET backend synergy.
              </p>
              <div class="track-footer">
                <span class="topic-count">12 Core Modules</span>
                <span class="action-arrow">
                  {{ facade.activeTrack() === 'architect' ? 'Active • Click to Clear ✕' : 'Filter by Track →' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Reactivity Track -->
          <div
            class="track-card glass-panel"
            [class.active-track]="facade.activeTrack() === 'reactivity'"
            (click)="selectTrackAndNavigate('reactivity')">
            <div class="track-icon-wrap icon-reactivity">
              <span>⚡</span>
            </div>
            <div class="track-content">
              <div class="track-header">
                <h3 class="track-name">Reactivity & Signals Specialist</h3>
                <span class="track-pill" [class.active-pill]="facade.activeTrack() === 'reactivity'">
                  {{ facade.activeTrack() === 'reactivity' ? '✓ Active Filter' : 'Must Know' }}
                </span>
              </div>
              <p class="track-desc">
                Fine-grained reactivity, Signals push-pull algorithm, glitch-free propagation, RxJS operators deep dive, and Zoneless Angular.
              </p>
              <div class="track-footer">
                <span class="topic-count">6 Modules + Labs</span>
                <span class="action-arrow">
                  {{ facade.activeTrack() === 'reactivity' ? 'Active • Click to Clear ✕' : 'Filter by Track →' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 1-Hr Cram Track -->
          <div
            class="track-card glass-panel"
            [class.active-track]="facade.activeTrack() === 'cram'"
            (click)="selectTrackAndNavigate('cram')">
            <div class="track-icon-wrap icon-cram">
              <span>⏱️</span>
            </div>
            <div class="track-content">
              <div class="track-header">
                <h3 class="track-name">1-Hour Pre-Interview Cram</h3>
                <span class="track-pill" [class.active-pill]="facade.activeTrack() === 'cram'">
                  {{ facade.activeTrack() === 'cram' ? '✓ Active Filter' : 'Rapid Revision' }}
                </span>
              </div>
              <p class="track-desc">
                Rapid cheat sheets, quick-fire Q&A drills, behavioral situational framing, and high-frequency interview trap mitigation.
              </p>
              <div class="track-footer">
                <span class="topic-count">15 Cheat Sheets & Q&A</span>
                <span class="action-arrow">
                  {{ facade.activeTrack() === 'cram' ? 'Active • Click to Clear ✕' : 'Filter by Track →' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Category Explorer Grid -->
      <section class="section-block">
        <div class="section-header">
          <h2 class="section-title">Complete 8-Module Curriculum</h2>
          <span class="section-desc">Systematic first-principles breakdown of the entire Angular ecosystem</span>
        </div>

        <div class="category-grid">
          @for (cat of facade.manifest()?.categories; track cat.key) {
            <div class="cat-card glass-panel">
              <div class="cat-card-top">
                <div class="cat-badge-row">
                  <span class="cat-emoji">{{ getCategoryEmoji(cat.key) }}</span>
                  <span class="cat-badge-pill">{{ cat.badge }}</span>
                </div>
                <span class="cat-order">Module 0{{ cat.order }}</span>
              </div>

              <h3 class="cat-card-title">{{ cat.title }}</h3>

              <div class="cat-progress-wrap">
                <div class="cat-progress-bar">
                  <div
                    class="cat-progress-fill"
                    [style.width.%]="facade.getCategoryProgressPercent(cat.key)"></div>
                </div>
                <div class="cat-progress-labels">
                  <span>{{ facade.getCategoryCompletedCount(cat.key) }} of {{ cat.topicCount }} Mastered</span>
                  <span class="cat-pct">{{ facade.getCategoryProgressPercent(cat.key) }}%</span>
                </div>
              </div>

              <!-- Topic Preview Links -->
              <div class="topic-pills">
                @for (t of cat.topics.slice(0, 3); track t.id) {
                  <a [routerLink]="['/topic', t.id]" class="topic-chip" (click)="facade.setActiveTopicById(t.id)">
                    {{ t.title }}
                  </a>
                }
                @if (cat.topics.length > 3) {
                  <span class="more-topics">+{{ cat.topics.length - 3 }} more</span>
                }
              </div>

              <div class="cat-card-footer">
                <a
                  [routerLink]="['/topic', cat.topics[0].id]"
                  class="btn-glass cat-explore-btn"
                  (click)="facade.setActiveTopicById(cat.topics[0].id)">
                  Explore Module →
                </a>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      max-width: var(--max-content-width);
      margin: 0 auto;
      padding-bottom: 3rem;
    }

    /* Hero Section */
    .hero-card {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 2rem;
      padding: 2.5rem;
      border-radius: 1.5rem;
      align-items: center;
    }

    .hero-left {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      background: rgba(0, 243, 255, 0.1);
      border: 1px solid rgba(0, 243, 255, 0.25);
      color: var(--accent-cyan);
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      width: fit-content;
    }

    .pulse-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-cyan);
      box-shadow: 0 0 8px var(--accent-cyan);
    }

    .hero-title {
      font-size: 2.4rem;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.03em;
      color: var(--text-primary);
    }

    .gradient-text {
      background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-blue) 60%, var(--accent-violet) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-subtitle {
      font-size: 1.05rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 0.5rem;
    }

    .hero-btn {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.15rem;
      padding: 0.65rem 1.15rem;
      min-width: 150px;
    }

    .hero-btn span:first-child {
      font-weight: 700;
      font-size: 0.92rem;
    }

    .btn-sub {
      font-size: 0.7rem;
      opacity: 0.75;
    }

    /* Gauge Card */
    .mastery-gauge-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
      padding: 2rem;
      border-radius: 1.25rem;
      background: rgba(0, 0, 0, 0.2);
    }

    .gauge-ring-wrap {
      position: relative;
      width: 140px;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .gauge-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .gauge-bg {
      fill: none;
      stroke: rgba(255, 255, 255, 0.08);
      stroke-width: 10;
    }

    .gauge-progress {
      fill: none;
      stroke: var(--accent-cyan);
      stroke-width: 10;
      stroke-linecap: round;
      stroke-dasharray: 314.15;
      transition: stroke-dashoffset 800ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .gauge-center {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .gauge-percent {
      font-size: 1.85rem;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -0.03em;
    }

    .gauge-label {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent-cyan);
      font-weight: 700;
    }

    .gauge-details {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 1rem;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.82rem;
    }

    .detail-label {
      color: var(--text-muted);
    }

    .detail-val {
      font-weight: 700;
      color: var(--text-primary);
      font-family: var(--font-mono);
    }

    .reset-link-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 0.72rem;
      cursor: pointer;
      text-decoration: underline;
      padding: 0.2rem;
    }

    .reset-link-btn:hover {
      color: var(--accent-rose);
    }

    /* Section Blocks */
    .section-block {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .section-header {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .section-title {
      font-size: 1.4rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--text-primary);
    }

    .section-desc {
      font-size: 0.88rem;
      color: var(--text-secondary);
    }

    .track-header-row {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .track-header-left {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .btn-clear-track-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.45rem 0.9rem;
      border-radius: 9999px;
      background: rgba(0, 243, 255, 0.12);
      border: 1px solid rgba(0, 243, 255, 0.4);
      color: var(--accent-cyan);
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 700;
      transition: all var(--transition-fast);
      font-family: inherit;
    }

    .btn-clear-track-pill:hover {
      background: rgba(244, 63, 94, 0.15);
      border-color: rgba(244, 63, 94, 0.4);
      color: #f43f5e;
    }

    .clear-cross {
      font-size: 0.72rem;
      background: rgba(0, 0, 0, 0.25);
      padding: 0.1rem 0.4rem;
      border-radius: 0.3rem;
    }

    /* Track Grid */
    .track-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
    }

    .track-card {
      padding: 1.75rem;
      border-radius: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      cursor: pointer;
      transition: all var(--transition-smooth);
      border: 1px solid rgba(255, 255, 255, 0.08);
      position: relative;
    }

    .track-card:hover {
      transform: translateY(-4px);
      border-color: var(--accent-cyan);
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4), 0 0 20px var(--accent-cyan-glow);
    }

    .track-card.active-track {
      border-color: var(--accent-cyan);
      background: linear-gradient(135deg, rgba(0, 243, 255, 0.14) 0%, rgba(15, 23, 42, 0.8) 100%);
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4), 0 0 25px var(--accent-cyan-glow);
    }

    [data-theme='light'] .track-card.active-track {
      background: linear-gradient(135deg, rgba(2, 132, 199, 0.12) 0%, #ffffff 100%);
      border-color: var(--accent-cyan);
      box-shadow: 0 12px 30px rgba(2, 132, 199, 0.18);
    }

    .track-pill.active-pill {
      background: var(--accent-cyan);
      color: #030712;
      font-weight: 800;
    }

    [data-theme='light'] .track-pill.active-pill {
      background: #0284c7;
      color: #ffffff;
    }

    [data-theme='light'] .gauge-container {
      background: rgba(15, 23, 42, 0.04);
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 50%;
    }

    .track-icon-wrap {
      width: 48px;
      height: 48px;
      border-radius: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .icon-architect {
      background: rgba(129, 140, 248, 0.15);
      border: 1px solid rgba(129, 140, 248, 0.3);
    }

    .icon-reactivity {
      background: rgba(0, 243, 255, 0.15);
      border: 1px solid rgba(0, 243, 255, 0.3);
    }

    .icon-cram {
      background: rgba(251, 191, 36, 0.15);
      border: 1px solid rgba(251, 191, 36, 0.3);
    }

    .track-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .track-name {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .track-pill {
      font-size: 0.68rem;
      padding: 0.15rem 0.45rem;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-muted);
      font-weight: 700;
      white-space: nowrap;
    }

    .track-desc {
      font-size: 0.84rem;
      color: var(--text-secondary);
      line-height: 1.5;
      flex: 1;
    }

    .track-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      font-size: 0.78rem;
    }

    .topic-count {
      color: var(--text-muted);
      font-weight: 600;
    }

    .action-arrow {
      color: var(--accent-cyan);
      font-weight: 700;
    }

    /* Category Grid */
    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.25rem;
    }

    .cat-card {
      padding: 1.5rem;
      border-radius: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.07);
      transition: all var(--transition-smooth);
    }

    .cat-card:hover {
      border-color: rgba(0, 243, 255, 0.3);
      transform: translateY(-2px);
    }

    .cat-card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .cat-badge-row {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .cat-emoji {
      font-size: 1.1rem;
    }

    .cat-badge-pill {
      font-size: 0.68rem;
      font-weight: 700;
      padding: 0.15rem 0.45rem;
      border-radius: 0.35rem;
      background: rgba(0, 243, 255, 0.1);
      color: var(--accent-cyan);
    }

    .cat-order {
      font-size: 0.72rem;
      font-family: var(--font-mono);
      color: var(--text-muted);
    }

    .cat-card-title {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--text-primary);
    }

    .cat-progress-wrap {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .cat-progress-bar {
      height: 6px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.08);
      overflow: hidden;
    }

    .cat-progress-fill {
      height: 100%;
      border-radius: 9999px;
      background: linear-gradient(90deg, var(--accent-cyan) 0%, var(--accent-blue) 100%);
      transition: width 600ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .cat-progress-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    .cat-pct {
      font-weight: 700;
      color: var(--accent-cyan);
      font-family: var(--font-mono);
    }

    .topic-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      min-height: 48px;
    }

    .topic-chip {
      font-size: 0.72rem;
      padding: 0.2rem 0.5rem;
      border-radius: 0.4rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--text-secondary);
      text-decoration: none;
      transition: all var(--transition-fast);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 180px;
    }

    .topic-chip:hover {
      color: var(--text-primary);
      border-color: var(--accent-cyan);
    }

    .more-topics {
      font-size: 0.7rem;
      color: var(--text-muted);
      align-self: center;
      padding: 0 0.3rem;
    }

    .cat-card-footer {
      margin-top: auto;
      padding-top: 0.5rem;
    }

    .cat-explore-btn {
      width: 100%;
      text-align: center;
      font-size: 0.82rem;
      padding: 0.5rem;
      display: block;
      text-decoration: none;
    }

    /* Responsive Breakpoints */
    @media (max-width: 900px) {
      .hero-card {
        grid-template-columns: 1fr;
        padding: 1.75rem;
      }
      .track-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 600px) {
      .hero-title {
        font-size: 1.8rem;
      }
      .hero-actions {
        flex-direction: column;
      }
      .hero-btn {
        width: 100%;
      }
      .category-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent {
  readonly facade = inject(ReaderFacade);

  gaugeOffset(): number {
    const circumference = 314.15; // 2 * PI * 50
    const pct = this.facade.progressPercent();
    return circumference - (circumference * pct) / 100;
  }

  selectTrackAndNavigate(track: 'architect' | 'reactivity' | 'cram'): void {
    if (this.facade.activeTrack() === track) {
      // Toggle off to show all 54 topics
      this.facade.setActiveTrack('all');
    } else {
      this.facade.setActiveTrack(track);
      const filtered = this.facade.filteredTopics();
      if (filtered.length > 0) {
        this.facade.setActiveTopicById(filtered[0].id);
      }
    }
  }

  getTrackLabel(track: string): string {
    const map: Record<string, string> = {
      architect: 'Enterprise Architect',
      reactivity: 'Reactivity & Signals',
      cram: '1-Hour Cram'
    };
    return map[track] || track;
  }

  getCategoryEmoji(key: string): string {
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
