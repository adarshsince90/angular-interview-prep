import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, map, catchError, of } from 'rxjs';
import { ContentManifest, TopicManifest } from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly http = inject(HttpClient);
  private manifestCache$?: Observable<ContentManifest>;

  getManifest(): Observable<ContentManifest> {
    if (!this.manifestCache$) {
      this.manifestCache$ = this.http.get<ContentManifest>('/assets/content-manifest.json').pipe(
        catchError(err => {
          console.error('Failed to load content manifest from /assets/, falling back to assets/content-manifest.json', err);
          return this.http.get<ContentManifest>('assets/content-manifest.json');
        }),
        shareReplay(1)
      );
    }
    return this.manifestCache$;
  }

  getTopic(id: string): Observable<TopicManifest | undefined> {
    return this.getManifest().pipe(
      map(manifest => manifest.topics.find(t => t.id === id || t.slug === id))
    );
  }

  getTopicMarkdown(contentUrl: string): Observable<string> {
    // Ensure relative path starts clean
    const cleanUrl = contentUrl.startsWith('/') ? contentUrl.slice(1) : contentUrl;
    return this.http.get(cleanUrl, { responseType: 'text' }).pipe(
      catchError(err => {
        console.warn(`Could not load markdown from ${cleanUrl}, attempting with leading slash`, err);
        return this.http.get(`/${cleanUrl}`, { responseType: 'text' }).pipe(
          catchError(innerErr => {
            console.error(`Failed to fetch markdown content from ${cleanUrl}:`, innerErr);
            return of(`# Content Not Found\n\nUnable to stream markdown for: \`${cleanUrl}\`. Please verify asset routing.`);
          })
        );
      })
    );
  }
}
