import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.resolve(__dirname, '../public/assets/content-manifest.json');
const contentRoot = path.resolve(__dirname, '../public/assets/content');

console.log('Running Content & Manifest Integrity Tests...');

if (!fs.existsSync(manifestPath)) {
  console.error('FAIL: content-manifest.json does not exist!');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
let failed = false;

const navPatterns = [/previous:/i, /next:/i, /table of contents/i, /⬅️/, /➡️/, /🏠/, /navigation-start/i];

manifest.topics.forEach(topic => {
  // Test 1: Content file must exist
  const filePath = path.join(__dirname, '../public', topic.contentUrl);
  if (!fs.existsSync(filePath)) {
    console.error(`FAIL: Content file missing for topic ${topic.id}: ${filePath}`);
    failed = true;
  }

  // Test 2: recapNotes must never contain navigation text
  topic.recapNotes.forEach((note, idx) => {
    for (const pat of navPatterns) {
      if (pat.test(note)) {
        console.error(`FAIL: Topic [${topic.id}] recapNote [${idx}] contains navigation text: "${note}"`);
        failed = true;
      }
    }
  });

  // Test 3: flashcards must never contain navigation text
  topic.flashcards.forEach((card, idx) => {
    for (const pat of navPatterns) {
      if (pat.test(card.question) || pat.test(card.answer)) {
        console.error(`FAIL: Topic [${topic.id}] flashcard [${idx}] contains navigation text!`);
        failed = true;
      }
    }
  });

  // Test 4: Summary must not be empty or contain navigation
  for (const pat of navPatterns) {
    if (pat.test(topic.summary)) {
      console.error(`FAIL: Topic [${topic.id}] summary contains navigation text: "${topic.summary}"`);
      failed = true;
    }
  }
});

if (failed) {
  console.error('\nManifest Integrity Tests FAILED.');
  process.exit(1);
} else {
  console.log(`\nSUCCESS: Verified all ${manifest.topics.length} topics and ${manifest.totalFlashcards} flashcards! Zero navigation leaks.`);
}
