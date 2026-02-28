import CodeBlock from '../components/CodeBlock'
import { Page, PageHeader, Prose, Section } from '../components/Page'
import styles from './Tokens.module.css'

export default function Tokens() {
  return (
    <Page>
      <PageHeader
        eyebrow="Foundations"
        title="Design Tokens"
        description="All design variables exposed as CSS custom properties. Use in vanilla CSS, Tailwind v4 @theme, or any framework."
      />

      <Section title="Colors" id="colors">
        <CodeBlock
          lang="css"
          code={`:root {
  --color-white:     #fff;
  --color-black:     #000;

  --color-gray-100:  #f8f9fa;
  --color-gray-200:  #e9ecef;
  --color-gray-300:  #dee2e6;
  --color-gray-400:  #ced4da;
  --color-gray-500:  #adb5bd;
  --color-gray-600:  #6c757d;
  --color-gray-700:  #495057;
  --color-gray-800:  #343a40;
  --color-gray-900:  #212529;

  --color-blue:      #0d6efd;
  --color-indigo:    #6610f2;
  --color-purple:    #6f42c1;
  --color-pink:      #d63384;
  --color-red:       #dc3545;
  --color-orange:    #fd7e14;
  --color-yellow:    #ffc107;
  --color-green:     #28a745;
  --color-teal:      #20c997;
  --color-cyan:      #17a2b8;

  --color-primary:   #0d6efd;
  --color-secondary: #6c757d;
  --color-success:   #28a745;
  --color-info:      #17a2b8;
  --color-warning:   #ffc107;
  --color-danger:    #dc3545;
  --color-light:     #f8f9fa;
  --color-dark:      #343a40;
}`}
        />
      </Section>

      <Section title="Spacing" id="spacing">
        <Prose>
          <p>
            A 30-step spacing scale based on 0.25rem (4px) increments, matching Tailwind's default
            spacing.
          </p>
        </Prose>
        <CodeBlock
          lang="css"
          code={`:root {
  --spacing-0:   0;
  --spacing-1:   0.25rem;   /*  4px */
  --spacing-2:   0.5rem;    /*  8px */
  --spacing-3:   0.75rem;   /* 12px */
  --spacing-4:   1rem;      /* 16px */
  --spacing-5:   1.25rem;   /* 20px */
  --spacing-6:   1.5rem;    /* 24px */
  --spacing-8:   2rem;      /* 32px */
  --spacing-10:  2.5rem;    /* 40px */
  --spacing-12:  3rem;      /* 48px */
  --spacing-16:  4rem;      /* 64px */
  --spacing-20:  5rem;      /* 80px */
  --spacing-24:  6rem;      /* 96px */
  /* ... through --spacing-96: 24rem */
}`}
        />
      </Section>

      <Section title="Typography" id="typography">
        <CodeBlock
          lang="css"
          code={`:root {
  --font-size-sm:   0.875rem;
  --font-size-base: 1rem;
  --font-size-lg:   1.25rem;
  --font-size-xl:   1.5rem;
  --font-size-2xl:  1.875rem;
  --font-size-3xl:  2.25rem;
  --font-size-4xl:  3rem;

  --font-size-h1:   2.5rem;
  --font-size-h2:   2rem;
  --font-size-h3:   1.75rem;
  --font-size-h4:   1.5rem;
  --font-size-h5:   1.25rem;
  --font-size-h6:   1rem;

  --font-weight-lighter: lighter;
  --font-weight-light:   300;
  --font-weight-normal:  400;
  --font-weight-bold:    700;
  --font-weight-bolder:  bolder;

  --line-height-sm:   1.25;
  --line-height-base: 1.5;
  --line-height-lg:   2;
}`}
        />
      </Section>

      <Section title="Using Tokens" id="usage">
        <Prose>
          <p>Three ways to consume design tokens:</p>
        </Prose>

        <CodeBlock
          lang="scss"
          filename="1. SCSS variables (in your .scss files)"
          code={`@use 'scss-helper/src/variables' as vars;

.card {
  color: vars.$primary;
  font-size: vars.$font-size-lg;
  padding: vars.$font-size-base;
}`}
        />

        <CodeBlock
          lang="css"
          filename="2. CSS custom properties (in any CSS)"
          code={`.card {
  color: var(--color-primary);
  font-size: var(--font-size-lg);
  padding: var(--spacing-4);
}`}
        />

        <CodeBlock
          lang="css"
          filename="3. Standalone tokens CSS"
          code={`/* Import just the tokens (2KB) */
@import 'scss-helper/css/tokens';`}
        />
      </Section>

      <Section title="Customization" id="custom">
        <CodeBlock
          lang="scss"
          code={`// Override any token before @use
@use 'scss-helper/src/variables' with (
  $primary: #8b5cf6,
  $font-size-base: 1.125rem,
);
@use 'scss-helper';`}
        />
      </Section>
    </Page>
  )
}
