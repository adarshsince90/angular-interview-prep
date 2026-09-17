import { Injectable, inject, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked, Renderer } from 'marked';
import DOMPurify from 'dompurify';
import Prism from 'prismjs';

// Load Prism grammar components if available
// @ts-ignore
import 'prismjs/components/prism-typescript';
// @ts-ignore
import 'prismjs/components/prism-javascript';
// @ts-ignore
import 'prismjs/components/prism-json';
// @ts-ignore
import 'prismjs/components/prism-bash';
// @ts-ignore
import 'prismjs/components/prism-css';
// @ts-ignore
import 'prismjs/components/prism-markup';

@Injectable({
  providedIn: 'root'
})
export class MarkdownSanitizerService {
  private readonly sanitizer = inject(DomSanitizer);

  constructor() {
    this.configureMarked();
  }

  private configureMarked(): void {
    const renderer = new Renderer();

    // Link re-writer to handle relative markdown links
    const originalLink = renderer.link.bind(renderer);
    renderer.link = (token: any) => {
      let finalHref = token.href;
      const text = token.tokens ? token.tokens.map((t: any) => ('text' in t ? t.text : '')).join('') : (token.text || '');

      // Check if this is a Table of Contents link pointing to README.md
      if (token.href && /readme\.md/i.test(token.href)) {
        finalHref = `/dashboard`;
        return `<a href="${finalHref}" class="internal-topic-link" data-topic-id="dashboard" title="Curriculum Overview">${text}</a>`;
      }

      // Check if this is an internal link to another markdown file (e.g. `02-spa-concepts.md` or `../02-core-angular/06-xxx.md`)
      if (token.href && !token.href.startsWith('http://') && !token.href.startsWith('https://') && !token.href.startsWith('#')) {
        const match = token.href.match(/([0-9]{2}[a-z]?-[a-zA-Z0-9_-]+)\.md/);
        if (match) {
          finalHref = `/topic/${match[1]}`;
          return `<a href="${finalHref}" class="internal-topic-link" data-topic-id="${match[1]}" title="${token.title || text}">${text}</a>`;
        }
      }

      const linkHtml = (originalLink as any)({ ...token, href: finalHref });
      // External links open in new tab
      if (finalHref.startsWith('http://') || finalHref.startsWith('https://')) {
        return linkHtml.replace('<a ', '<a target="_blank" rel="noopener noreferrer" ');
      }
      return linkHtml;
    };

    // Heading renderer with unique slug IDs for anchor jumps
    renderer.heading = ({ text, depth }: any) => {
      const slug = text
        .toLowerCase()
        .replace(/<[^>]+>/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      return `<h${depth} id="${slug}" class="heading-anchor-target">${text}</h${depth}>`;
    };

    // Table renderer with responsive overflow container
    renderer.table = (token: any) => {
      // @ts-ignore
      const originalHtml = Renderer.prototype.table.call(renderer, token);
      return `<div class="table-scroll-wrapper">${originalHtml}</div>`;
    };

    // Syntax highlighting in code blocks
    renderer.code = ({ text, lang }) => {
      const language = lang && Prism.languages[lang] ? lang : 'typescript';
      const grammar = Prism.languages[language] || Prism.languages['typescript'] || Prism.languages['javascript'];
      let highlighted = text;
      try {
        if (grammar) {
          highlighted = Prism.highlight(text, grammar, language);
        }
      } catch (err) {
        console.warn('Prism highlight failed for lang:', lang, err);
      }

      const displayLang = (lang || 'code').toUpperCase();
      return `<div class="code-block-wrapper"><div class="code-block-header"><div class="code-header-left"><span class="code-window-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></span><span class="code-lang-tag">${displayLang}</span></div><button type="button" class="code-copy-btn" title="Copy code snippet"><svg class="copy-svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span class="btn-copy-label">Copy</span></button></div><pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre></div>`;
    };

    marked.setOptions({
      renderer,
      gfm: true,
      breaks: false
    });
  }

  private preprocessMarkdown(markdown: string): string {
    if (!markdown) return '';

    // 1. Strip raw navigation blocks: <!-- navigation-start --> ... <!-- navigation-end -->
    let clean = markdown.replace(/<!--\s*navigation-start\s*-->[\s\S]*?<!--\s*navigation-end\s*-->/gi, '');

    // Strip standalone navigation lines at bottom if any
    clean = clean.replace(/\n\s*⬅️[\s\S]*?➡️[^\n]*/gi, '');
    clean = clean.replace(/\n\s*⬅️[\s\S]*?🏠[^\n]*/gi, '');

    // 2. Transform the initial Interview Priority block into an Interview Intelligence Card
    const metaRegex = /##\s*Interview Priority\s*\n+([^\n#]+)\n+##\s*Interview Frequency\s*\n+([^\n#]+)\n+##\s*Recommended Depth\s*\n+([^\n#]+)\n+##\s*Relevant For\s*\n+([\s\S]*?)(?=\n\s*---\s*|\n\s*#+|$)/i;

    clean = clean.replace(metaRegex, (_match, priorityRaw, freqRaw, depthRaw, rolesRaw) => {
      const cleanVal = (s: string) => s.replace(/^\*+|\*+$/g, '').trim();
      const priority = cleanVal(priorityRaw);
      const frequency = cleanVal(freqRaw);
      const depth = cleanVal(depthRaw);

      const roles = rolesRaw
        .split(/\r?\n/)
        .map((r: string) => r.replace(/^[-*]\s+/, '').trim())
        .filter((r: string) => r.length > 0 && !r.startsWith('#') && !r.startsWith('-'));

      const roleBadges = roles
        .map((r: string) => `<span class="role-pill">${r}</span>`)
        .join('');

      return `
<div class="interview-intel-card">
  <div class="intel-header">
    <span class="intel-title">⚡ Interview Intelligence Matrix</span>
    <span class="intel-badge">Readiness Target</span>
  </div>
  <div class="intel-grid">
    <div class="intel-metric">
      <span class="metric-label">Interview Priority</span>
      <span class="metric-val priority-val">${priority}</span>
    </div>
    <div class="intel-metric">
      <span class="metric-label">Interview Frequency</span>
      <span class="metric-val freq-val">${frequency}</span>
    </div>
    <div class="intel-metric">
      <span class="metric-label">Recommended Depth</span>
      <span class="metric-val depth-val">${depth}</span>
    </div>
    <div class="intel-metric roles-metric">
      <span class="metric-label">Relevant For</span>
      <div class="roles-wrapper">${roleBadges}</div>
    </div>
  </div>
</div>
`;
    });

    // Strip immediate trailing separator if left by metadata replacement
    clean = clean.replace(/(<\/div>\s*)\n\s*---\s*\n/g, '$1\n\n');

    return clean;
  }

  renderMarkdown(markdown: string): SafeHtml {
    if (!markdown) return '';
    try {
      const processed = this.preprocessMarkdown(markdown);
      const rawHtml = marked.parse(processed) as string;
      const cleanHtml = DOMPurify.sanitize(rawHtml, {
        ADD_ATTR: ['target', 'rel', 'data-topic-id', 'class', 'id', 'title'],
        ADD_TAGS: ['button', 'div', 'span', 'svg', 'path', 'rect', 'polyline', 'circle', 'line']
      });
      return this.sanitizer.bypassSecurityTrustHtml(cleanHtml);
    } catch (err) {
      console.error('Error rendering markdown:', err);
      return `<p class="error-text">Failed to parse markdown content.</p>`;
    }
  }
}
