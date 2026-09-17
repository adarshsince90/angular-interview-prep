import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AppTheme } from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'aip_portal_theme';

  readonly theme = signal<AppTheme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      if (isPlatformBrowser(this.platformId)) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem(this.STORAGE_KEY, currentTheme);
      }
    });
  }

  toggleTheme(): void {
    this.theme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }

  setTheme(newTheme: AppTheme): void {
    this.theme.set(newTheme);
  }

  private getInitialTheme(): AppTheme {
    if (!isPlatformBrowser(this.platformId)) {
      return 'light';
    }
    const saved = localStorage.getItem(this.STORAGE_KEY) as AppTheme | null;
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Default to light theme
    return 'light';
  }
}
