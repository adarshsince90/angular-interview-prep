export type ViewMode = 'deep-dive' | 'recap' | 'flashcards';

export type AppTheme = 'dark' | 'light';

export interface HeadingItem {
  level: number;
  text: string;
}

export interface Flashcard {
  question: string;
  answer: string;
  source: string;
}

export interface TopicManifest {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  categoryTitle: string;
  categoryBadge: string;
  categoryIcon: string;
  categoryOrder: number;
  order: string;
  fileName: string;
  contentUrl: string;
  wordCount: number;
  readingTime: number;
  headings: HeadingItem[];
  flashcards: Flashcard[];
  recapNotes: string[];
  searchTokens: string[];
}

export interface CategorySummaryTopic {
  id: string;
  title: string;
  readingTime: number;
  flashcardCount: number;
}

export interface CategoryGroup {
  key: string;
  title: string;
  badge: string;
  icon: string;
  order: number;
  topicCount: number;
  topics: CategorySummaryTopic[];
}

export interface ContentManifest {
  generatedAt: string;
  totalTopics: number;
  totalFlashcards: number;
  categories: CategoryGroup[];
  topics: TopicManifest[];
}

export interface SearchResult {
  topic: TopicManifest;
  matchedOn: 'title' | 'summary' | 'keyword' | 'flashcard';
  matchedSnippet: string;
  score: number;
}
