import { Component, input } from '@angular/core';
import { TopicManifest } from '../../../core/models/content.model';

@Component({
  selector: 'app-recap-summary',
  standalone: true,
  template: `
    <div class="recap-container">
      <div class="recap-banner glass-panel-glow">
        <div class="banner-top">
          <span class="banner-badge">5-Minute Architect Cram</span>
          <span class="read-speed">⚡ Quick Memorization</span>
        </div>
        <h2 class="banner-title">{{ topic().title }}</h2>
        <p class="banner-summary">{{ topic().summary }}</p>
      </div>

      <!-- Key Architectural Principles -->
      <div class="recap-section">
        <h3 class="section-heading">
          <span class="heading-icon">💎</span>
          <span>Core Principles & Interview Answers</span>
        </h3>
        <div class="rules-grid">
          @for (note of topic().recapNotes; track $index) {
            <div class="rule-card glass-panel">
              <div class="rule-header">
                <span class="rule-tag">Rule {{ $index + 1 }}</span>
              </div>
              <p class="rule-body">{{ note }}</p>
            </div>
          } @empty {
            <p class="empty-note">Detailed notes available in the Deep Dive tab.</p>
          }
        </div>
      </div>

      <!-- Common Pitfalls & Interviewer Probes -->
      <div class="recap-section">
        <h3 class="section-heading">
          <span class="heading-icon">⚠️</span>
          <span>Enterprise Traps & Probing Questions</span>
        </h3>
        <div class="pitfalls-list glass-panel">
          <div class="pitfall-item">
            <span class="pitfall-q">What interviewers listen for:</span>
            <span class="pitfall-a">Clear distinction between synchronous UI reactivity (Signals) and asynchronous streaming pipelines (RxJS). Avoid dogmatic statements like "RxJS is obsolete".</span>
          </div>
          <div class="pitfall-item">
            <span class="pitfall-q">System trade-off:</span>
            <span class="pitfall-a">Evaluating zone.js overhead vs zoneless change detection scheduling; OnPush immutability requirements; memory leak prevention.</span>
          </div>
          <div class="pitfall-item">
            <span class="pitfall-q">Enterprise architectural standard:</span>
            <span class="pitfall-a">Strict separation between Presentational (Dumb) components and Facade/Store Smart containers.</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .recap-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 900px;
      margin: 1rem auto;
    }

    .recap-banner {
      padding: 2rem;
      border-radius: 1.25rem;
    }

    .banner-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    .banner-badge {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--accent-cyan);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .read-speed {
      font-size: 0.75rem;
      color: var(--accent-amber);
      font-weight: 600;
    }

    .banner-title {
      font-size: 1.85rem;
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .banner-summary {
      font-size: 1rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .recap-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .section-heading {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .heading-icon {
      font-size: 1.25rem;
    }

    .rules-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
    }

    .rule-card {
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .rule-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .rule-tag {
      font-size: 0.7rem;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--accent-cyan);
      letter-spacing: 0.05em;
    }

    .rule-body {
      font-size: 0.92rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .pitfalls-list {
      padding: 1.25rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .pitfall-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .pitfall-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .pitfall-q {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--accent-cyan);
    }

    .pitfall-a {
      font-size: 0.92rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .empty-note {
      color: var(--text-muted);
      font-size: 0.9rem;
    }
  `]
})
export class RecapSummaryComponent {
  topic = input.required<TopicManifest>();
}
