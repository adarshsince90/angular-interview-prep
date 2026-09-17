import { Component, inject, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { ReaderFacade, TrackFilter } from '../../state/reader.facade';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="app-header glass-panel">
      <div class="header-left">
        <!-- Mobile Menu Toggle Button (< 900px) -->
        <button
          class="icon-btn mobile-menu-btn"
          (click)="facade.toggleMobileMenu()"
          title="Toggle Navigation Menu">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <a routerLink="/dashboard" class="brand-link" title="Return to Dashboard">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-title">Angular Mastery</span>
            <span class="brand-badge">Architect Edition</span>
          </div>
        </a>

        <!-- Primary Feature Hub Links -->
        <nav class="feature-nav-links">
          <a routerLink="/dashboard" routerLinkActive="active" class="feat-link" title="Curriculum Overview">
            <span class="feat-icon">🏠</span>
            <span class="feat-label">Dashboard</span>
          </a>
          <a routerLink="/flashcards" routerLinkActive="active" class="feat-link" title="Practice 192 Flashcards">
            <span class="feat-icon">🎴</span>
            <span class="feat-label">Flashcards</span>
          </a>
          <a routerLink="/labs" routerLinkActive="active" class="feat-link" title="Runtime Architecture Simulations">
            <span class="feat-icon">📊</span>
            <span class="feat-label">Labs</span>
          </a>
        </nav>
      </div>

      <div class="header-right">
        <!-- Quick Search Trigger -->
        <button class="search-trigger-btn" (click)="facade.toggleSearch()" title="Search Topics (Cmd+K)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span class="search-label">Quick Search...</span>
          <kbd class="search-kbd">Ctrl K</kbd>
        </button>

        <!-- Progress Indicator -->
        <div class="progress-pill" title="{{ facade.completedCount() }} of {{ facade.totalTopicsCount() }} completed">
          <span class="progress-dot"></span>
          <span class="progress-text">{{ facade.progressPercent() }}%</span>
          <span class="progress-long-text">Mastered</span>
        </div>

        <!-- Quick Recap Slideout Toggle -->
        <button class="icon-btn" (click)="facade.toggleDrawer()" title="Toggle Executive Recap Sheet">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        </button>

        <!-- Theme Toggle -->
        <button class="icon-btn theme-btn" (click)="themeService.toggleTheme()" title="Toggle Light/Dark Theme">
          @if (themeService.theme() === 'dark') {
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          } @else {
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          }
        </button>
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
      width: 100%;
    }

    .app-header {
      height: var(--header-height);
      margin: 0.5rem 1rem 0.75rem 1rem;
      padding: 0 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      backdrop-filter: var(--glass-blur-heavy);
      -webkit-backdrop-filter: var(--glass-blur-heavy);
      border: var(--glass-border);
      background: var(--glass-bg);
      border-radius: 1rem;
      box-shadow: var(--glass-shadow);
      transition: all var(--transition-fast);
    }

    .header-left, .header-right {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .mobile-menu-btn {
      display: none !important;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: inherit;
      flex-shrink: 0;
    }

    .logo-icon {
      width: 38px;
      height: 38px;
      border-radius: 0.6rem;
      background: linear-gradient(135deg, rgba(0, 243, 255, 0.2) 0%, rgba(56, 189, 248, 0.1) 100%);
      border: 1px solid var(--accent-cyan);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-cyan);
      box-shadow: 0 0 12px var(--accent-cyan-glow);
    }

    .brand-text {
      display: flex;
      flex-direction: column;
    }

    .brand-title {
      font-weight: 800;
      font-size: 1.05rem;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-cyan) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    }

    .brand-badge {
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent-cyan);
      font-weight: 700;
      white-space: nowrap;
    }

    /* Primary Links */
    .feature-nav-links {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      margin-left: 0.5rem;
      border-left: 1px solid rgba(255, 255, 255, 0.08);
      padding-left: 0.75rem;
    }

    .feat-link {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.35rem 0.65rem;
      border-radius: 0.5rem;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-secondary);
      text-decoration: none;
      transition: all var(--transition-fast);
      border: 1px solid transparent;
    }

    .feat-link:hover {
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.05);
    }

    .feat-link.active {
      color: var(--accent-cyan);
      background: rgba(0, 243, 255, 0.1);
      border-color: rgba(0, 243, 255, 0.25);
    }

    .search-trigger-btn {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.45rem 0.85rem;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 0.6rem;
      color: var(--text-muted);
      cursor: pointer;
      font-family: inherit;
      font-size: 0.82rem;
      transition: all var(--transition-fast);
    }

    .search-trigger-btn:hover {
      border-color: var(--accent-cyan);
      color: var(--text-primary);
      box-shadow: 0 0 12px var(--accent-cyan-glow);
    }

    .search-kbd {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      padding: 0.15rem 0.4rem;
      border-radius: 0.3rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: var(--text-secondary);
    }

    .progress-pill {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.35rem 0.75rem;
      border-radius: 9999px;
      background: rgba(52, 211, 153, 0.1);
      border: 1px solid rgba(52, 211, 153, 0.3);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--accent-emerald);
      white-space: nowrap;
    }

    .progress-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-emerald);
      box-shadow: 0 0 6px var(--accent-emerald);
    }

    .icon-btn {
      width: 36px;
      height: 36px;
      border-radius: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
      flex-shrink: 0;
    }

    .icon-btn:hover {
      color: var(--accent-cyan);
      border-color: var(--accent-cyan);
      box-shadow: 0 0 12px var(--accent-cyan-glow);
    }

    /* Light Theme Overrides */
    [data-theme='light'] .search-trigger-btn {
      background: rgba(15, 23, 42, 0.04);
      border: 1px solid rgba(15, 23, 42, 0.12);
      color: var(--text-secondary);
    }

    [data-theme='light'] .search-kbd {
      background: rgba(15, 23, 42, 0.07);
      border: 1px solid rgba(15, 23, 42, 0.15);
      color: var(--text-secondary);
    }

    [data-theme='light'] .icon-btn {
      background: rgba(15, 23, 42, 0.04);
      border: 1px solid rgba(15, 23, 42, 0.12);
      color: var(--text-secondary);
    }

    [data-theme='light'] .feat-link:hover {
      background: rgba(15, 23, 42, 0.06);
    }

    /* Responsive Breakpoints */
    @media (max-width: 1024px) {
      .search-label, .search-kbd {
        display: none;
      }
      .progress-long-text {
        display: none;
      }
    }

    @media (max-width: 900px) {
      .mobile-menu-btn {
        display: flex !important;
      }
      .feat-label {
        display: none;
      }
      .feature-nav-links {
        padding-left: 0.4rem;
        margin-left: 0.3rem;
      }
    }

    @media (max-width: 600px) {
      .app-header {
        margin: 0.35rem 0.5rem 0.5rem 0.5rem;
        padding: 0 0.85rem;
      }
      .brand-badge {
        display: none;
      }
      .brand-title {
        font-size: 0.95rem;
      }
      .progress-pill {
        display: none;
      }
    }
  `]
})
export class HeaderComponent {
  readonly themeService = inject(ThemeService);
  readonly facade = inject(ReaderFacade);

  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.facade.toggleSearch();
    }
  }
}
