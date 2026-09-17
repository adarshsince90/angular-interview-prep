import { TestBed } from '@angular/core/testing';
import { MarkdownSanitizerService } from './markdown-sanitizer.service';

describe('MarkdownSanitizerService', () => {
  let service: MarkdownSanitizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkdownSanitizerService]
    });
    service = TestBed.inject(MarkdownSanitizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should rewrite README.md links to /topic/01-why-angular', () => {
    const markdown = 'Check the [Table of Contents](../README.md) here.';
    const result = service.renderMarkdown(markdown) as any;
    const htmlString = result.changingThisBreaksApplicationSecurity || '';
    expect(htmlString).toContain('href="/topic/01-why-angular"');
    expect(htmlString).toContain('data-topic-id="01-why-angular"');
  });

  it('should rewrite relative topic .md links to SPA routes', () => {
    const markdown = 'Go to [SPA Concepts](02-spa-concepts.md).';
    const result = service.renderMarkdown(markdown) as any;
    const htmlString = result.changingThisBreaksApplicationSecurity || '';
    expect(htmlString).toContain('href="/topic/02-spa-concepts"');
    expect(htmlString).toContain('data-topic-id="02-spa-concepts"');
  });

  it('should format code blocks with IDE window header, language tag, and copy button', () => {
    const markdown = '```typescript\nconst x = 10;\n```';
    const result = service.renderMarkdown(markdown) as any;
    const htmlString = result.changingThisBreaksApplicationSecurity || '';
    expect(htmlString).toContain('code-block-wrapper');
    expect(htmlString).toContain('code-block-header');
    expect(htmlString).toContain('code-window-dots');
    expect(htmlString).toContain('code-copy-btn');
    expect(htmlString).toContain('TYPESCRIPT');
  });
});
