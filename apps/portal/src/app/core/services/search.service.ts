import { Injectable, inject } from '@angular/core';
import { ContentService } from './content.service';
import { TopicManifest, SearchResult } from '../models/content.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly contentService = inject(ContentService);

  search(query: string): Observable<SearchResult[]> {
    const q = query.trim().toLowerCase();
    if (!q) {
      return this.contentService.getManifest().pipe(
        map(manifest =>
          manifest.topics.slice(0, 8).map(topic => ({
            topic,
            matchedOn: 'title',
            matchedSnippet: topic.summary,
            score: 1
          }))
        )
      );
    }

    const queryTerms = q.split(/\s+/).filter(Boolean);

    return this.contentService.getManifest().pipe(
      map(manifest => {
        const results: SearchResult[] = [];

        for (const topic of manifest.topics) {
          let score = 0;
          let matchedOn: SearchResult['matchedOn'] = 'keyword';
          let matchedSnippet = topic.summary;

          const titleLower = topic.title.toLowerCase();
          const summaryLower = topic.summary.toLowerCase();
          const catLower = topic.categoryTitle.toLowerCase();

          // Title exact match bonus
          if (titleLower.includes(q)) {
            score += 100;
            matchedOn = 'title';
            matchedSnippet = topic.title;
          }

          // Category match
          if (catLower.includes(q)) {
            score += 40;
          }

          // Term matching in title & summary
          for (const term of queryTerms) {
            if (titleLower.includes(term)) score += 30;
            if (summaryLower.includes(term)) {
              score += 15;
              if (matchedOn !== 'title') {
                matchedOn = 'summary';
                matchedSnippet = topic.summary;
              }
            }
          }

          // Search tokens matching
          for (const token of topic.searchTokens) {
            const tokenLower = token.toLowerCase();
            for (const term of queryTerms) {
              if (tokenLower === term) score += 20;
              else if (tokenLower.includes(term)) score += 10;
            }
          }

          // Flashcard question matches
          for (const card of topic.flashcards) {
            const cardQLower = card.question.toLowerCase();
            if (cardQLower.includes(q)) {
              score += 35;
              matchedOn = 'flashcard';
              matchedSnippet = `Q: ${card.question}`;
              break;
            }
          }

          if (score > 0) {
            results.push({ topic, matchedOn, matchedSnippet, score });
          }
        }

        // Sort descending by relevance score
        return results.sort((a, b) => b.score - a.score).slice(0, 15);
      })
    );
  }
}
