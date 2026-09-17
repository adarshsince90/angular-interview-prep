import { Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  template: `
    <button
      type="button"
      class="scroll-top-btn"
      [class.visible]="isVisible()"
      (click)="scrollToTop()"
      aria-label="Scroll back to top"
      title="Scroll back to top">
      <svg
        class="arrow-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.8"
        stroke-linecap="round"
        stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
      <span class="btn-label">Top</span>
    </button>
  `,
  styles: [`
    :host {
      position: fixed;
      bottom: 2.25rem;
      right: 2.25rem;
      z-index: 99999;
      pointer-events: none;
    }

    .scroll-top-btn {
      pointer-events: auto;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.6rem 1rem 0.6rem 0.8rem;
      border-radius: 9999px;
      background: var(--bg-surface-elevated);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1.5px solid var(--accent-cyan);
      color: var(--accent-cyan);
      font-family: var(--font-sans);
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35), 0 0 16px var(--accent-cyan-glow);
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px) scale(0.9);
      transition: opacity 200ms ease, transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1), background 150ms ease, border-color 150ms ease, box-shadow 150ms ease;
    }

    .scroll-top-btn.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }

    .scroll-top-btn:hover {
      background: var(--accent-cyan);
      color: #030712;
      border-color: var(--accent-cyan);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 24px var(--accent-cyan);
      transform: translateY(-3px) scale(1.05);
    }

    .scroll-top-btn:active {
      transform: translateY(0) scale(0.96);
    }

    .arrow-icon {
      width: 16px;
      height: 16px;
      transition: transform 150ms ease;
    }

    .scroll-top-btn:hover .arrow-icon {
      transform: translateY(-2px);
    }

    .btn-label {
      line-height: 1;
    }

    @media (max-width: 768px) {
      :host {
        bottom: 1.25rem;
        right: 1.25rem;
      }
      .scroll-top-btn {
        padding: 0.5rem 0.8rem 0.5rem 0.65rem;
        font-size: 0.75rem;
      }
    }
  `]
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  readonly isVisible = signal<boolean>(false);
  private cleanupListener?: () => void;

  ngOnInit(): void {
    const handleScroll = () => {
      const winScroll = window.pageYOffset || window.scrollY || 0;
      const docScroll = document.documentElement?.scrollTop || 0;
      const bodyScroll = document.body?.scrollTop || 0;
      const scrollPos = Math.max(winScroll, docScroll, bodyScroll);
      this.isVisible.set(scrollPos > 100);
    };

    // Capture phase listener ensures scroll events on window, html, body or any container are captured
    const captureListener = (event: Event) => {
      let scrollPos = window.pageYOffset || window.scrollY || 0;
      scrollPos = Math.max(scrollPos, document.documentElement?.scrollTop || 0, document.body?.scrollTop || 0);
      const target = event.target as HTMLElement;
      if (target && typeof target.scrollTop === 'number') {
        scrollPos = Math.max(scrollPos, target.scrollTop);
      }
      this.isVisible.set(scrollPos > 100);
    };

    window.addEventListener('scroll', captureListener, { capture: true, passive: true });
    document.addEventListener('scroll', captureListener, { capture: true, passive: true });

    this.cleanupListener = () => {
      window.removeEventListener('scroll', captureListener, true);
      document.removeEventListener('scroll', captureListener, true);
    };

    handleScroll();
  }

  ngOnDestroy(): void {
    this.cleanupListener?.();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.documentElement?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.body?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const main = document.querySelector('.main-viewport');
    if (main) main.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
