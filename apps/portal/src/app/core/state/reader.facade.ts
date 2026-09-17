import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ContentService } from '../services/content.service';
import { ContentManifest, TopicManifest, ViewMode } from '../models/content.model';

export type TrackFilter = 'all' | 'architect' | 'cram' | 'reactivity';

@Injectable({
  providedIn: 'root'
})
export class ReaderFacade {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly contentService = inject(ContentService);
  private readonly COMPLETED_STORAGE_KEY = 'aip_portal_completed_topics';
  private readonly LAST_TOPIC_STORAGE_KEY = 'aip_portal_last_active_topic';

  // Signals state
  readonly manifest = signal<ContentManifest | null>(null);
  readonly activeTopic = signal<TopicManifest | null>(null);
  readonly viewMode = signal<ViewMode>('deep-dive');
  readonly isDrawerOpen = signal<boolean>(false);
  readonly isSearchOpen = signal<boolean>(false);
  readonly isMobileMenuOpen = signal<boolean>(false);
  readonly activeTrack = signal<TrackFilter>('all');
  readonly completedTopicIds = signal<Set<string>>(this.loadCompletedTopics());
  readonly lastActiveTopicId = signal<string>(this.loadLastActiveTopic());

  // Computed signals
  readonly totalTopicsCount = computed(() => this.manifest()?.totalTopics ?? 0);
  readonly totalFlashcardsCount = computed(() => this.manifest()?.totalFlashcards ?? 0);
  readonly completedCount = computed(() => this.completedTopicIds().size);
  readonly progressPercent = computed(() => {
    const total = this.totalTopicsCount();
    if (total === 0) return 0;
    return Math.min(100, Math.round((this.completedCount() / total) * 100));
  });

  readonly filteredTopics = computed(() => {
    const m = this.manifest();
    if (!m) return [];
    const track = this.activeTrack();
    if (track === 'all') return m.topics;
    if (track === 'architect') {
      return m.topics.filter(t => t.category === '06-senior-architecture' || t.categoryBadge === 'Architect');
    }
    if (track === 'cram') {
      return m.topics.filter(t => t.category === '08-cheat-sheets' || t.category === '07-interview-preparation');
    }
    if (track === 'reactivity') {
      return m.topics.filter(t => t.category === '04-reactivity');
    }
    return m.topics;
  });

  constructor() {
    this.loadManifest();
  }

  loadManifest(): void {
    this.contentService.getManifest().subscribe({
      next: data => {
        this.manifest.set(data);
        // If no active topic, default to the last accessed or first one
        if (!this.activeTopic() && data.topics.length > 0) {
          const lastId = this.lastActiveTopicId();
          const found = data.topics.find(t => t.id === lastId);
          this.activeTopic.set(found || data.topics[0]);
        }
      },
      error: err => console.error('ReaderFacade failed to load manifest:', err)
    });
  }

  setActiveTopicById(id: string): void {
    const m = this.manifest();
    if (!m) return;
    const found = m.topics.find(t => t.id === id || t.slug === id);
    if (found) {
      this.activeTopic.set(found);
      this.saveLastActiveTopic(found.id);
    }
    // Auto close mobile drawer on navigation
    this.setMobileMenuOpen(false);
  }

  setViewMode(mode: ViewMode): void {
    this.viewMode.set(mode);
  }

  toggleDrawer(): void {
    this.isDrawerOpen.update(v => !v);
  }

  setDrawerOpen(isOpen: boolean): void {
    this.isDrawerOpen.set(isOpen);
  }

  toggleSearch(): void {
    this.isSearchOpen.update(v => !v);
  }

  setSearchOpen(isOpen: boolean): void {
    this.isSearchOpen.set(isOpen);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  setMobileMenuOpen(isOpen: boolean): void {
    this.isMobileMenuOpen.set(isOpen);
  }

  setActiveTrack(track: TrackFilter): void {
    this.activeTrack.set(track);
  }

  toggleTopicCompleted(topicId: string): void {
    this.completedTopicIds.update(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      this.saveCompletedTopics(next);
      return next;
    });
  }

  isTopicCompleted(topicId: string): boolean {
    return this.completedTopicIds().has(topicId);
  }

  getCategoryCompletedCount(catKey: string): number {
    const m = this.manifest();
    if (!m) return 0;
    const catTopics = m.topics.filter(t => t.category === catKey);
    const completed = this.completedTopicIds();
    return catTopics.filter(t => completed.has(t.id)).length;
  }

  getCategoryProgressPercent(catKey: string): number {
    const m = this.manifest();
    if (!m) return 0;
    const catTopics = m.topics.filter(t => t.category === catKey);
    if (catTopics.length === 0) return 0;
    const done = this.getCategoryCompletedCount(catKey);
    return Math.min(100, Math.round((done / catTopics.length) * 100));
  }

  resetProgress(): void {
    this.completedTopicIds.set(new Set());
    this.saveCompletedTopics(new Set());
  }

  private loadCompletedTopics(): Set<string> {
    if (!isPlatformBrowser(this.platformId)) {
      return new Set();
    }
    try {
      const raw = localStorage.getItem(this.COMPLETED_STORAGE_KEY);
      if (raw) {
        return new Set(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
    return new Set();
  }

  private saveCompletedTopics(set: Set<string>): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.setItem(this.COMPLETED_STORAGE_KEY, JSON.stringify(Array.from(set)));
    } catch {
      // ignore
    }
  }

  private loadLastActiveTopic(): string {
    if (!isPlatformBrowser(this.platformId)) return '01-why-angular';
    try {
      return localStorage.getItem(this.LAST_TOPIC_STORAGE_KEY) || '01-why-angular';
    } catch {
      return '01-why-angular';
    }
  }

  private saveLastActiveTopic(id: string): void {
    this.lastActiveTopicId.set(id);
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.setItem(this.LAST_TOPIC_STORAGE_KEY, id);
    } catch {
      // ignore
    }
  }
}
