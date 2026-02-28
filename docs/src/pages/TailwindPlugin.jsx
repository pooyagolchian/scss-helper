import CodeBlock from '../components/CodeBlock'
import { Page, PageHeader, Prose, Section } from '../components/Page'

export default function TailwindPlugin() {
  return (
    <Page>
      <PageHeader
        eyebrow="Advanced"
        title="Tailwind CSS Plugin"
        description="Use scss-helper's design tokens and utilities alongside Tailwind CSS v3. Tokens inject automatically, theme is extended."
      />

      <Section title="Setup" id="setup">
        <CodeBlock
          lang="js"
          filename="tailwind.config.js"
          code={`const scssHelper = require('scss-helper/plugin');

module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  plugins: [
    scssHelper,
    // or with options:
    scssHelper({ injectTokens: true }),
  ],
};`}
        />
      </Section>

      <Section title="What Gets Injected" id="injected">
        <Prose>
          <p>The plugin automatically provides:</p>
          <ol>
            <li>
              <strong>Design tokens</strong> as <code>:root</code> CSS custom properties (colors,
              spacing, typography, timing)
            </li>
            <li>
              <strong>Dark mode</strong> token overrides under <code>[data-theme="dark"]</code> and{' '}
              <code>prefers-color-scheme: dark</code>
            </li>
            <li>
              <strong>Fluid typography</strong> utilities: <code>sh-text-fluid-xs</code> through{' '}
              <code>sh-text-fluid-4xl</code>
            </li>
            <li>
              <strong>Container query</strong> utilities: <code>sh-cq</code>,{' '}
              <code>sh-cq-size</code>, <code>sh-cq-normal</code>
            </li>
            <li>
              <strong>Transition</strong> utilities: <code>sh-transition-colors</code>,{' '}
              <code>sh-transition-shadow</code>
            </li>
            <li>
              <strong>Animation</strong> utilities: <code>sh-animate-fade-in</code>,{' '}
              <code>sh-animate-spin</code>, etc.
            </li>
          </ol>
        </Prose>
      </Section>

      <Section title="Theme Extensions" id="theme">
        <Prose>
          <p>
            The Tailwind theme is automatically extended with scss-helper tokens:
          </p>
        </Prose>

        <CodeBlock
          lang="js"
          filename="Auto-extended theme"
          code={`// Colors — use with bg-primary, text-danger, etc.
colors: {
  primary:   'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  success:   'var(--color-success)',
  info:      'var(--color-info)',
  warning:   'var(--color-warning)',
  danger:    'var(--color-danger)',
}

// Font sizes — use with text-fluid-lg, etc.
fontSize: {
  'fluid-xs':   'clamp(0.75rem, 2vw, 0.875rem)',
  'fluid-sm':   'clamp(0.875rem, 2.5vw, 1rem)',
  'fluid-base': 'clamp(1rem, 3vw, 1.125rem)',
  // ... through fluid-4xl
}

// Transition durations
transitionDuration: {
  fast: 'var(--duration-fast, 100ms)',
  slow: 'var(--duration-slow, 400ms)',
}`}
        />
      </Section>

      <Section title="Options" id="options">
        <CodeBlock
          lang="js"
          code={`scssHelper({
  injectTokens: true,  // default: true — inject :root CSS custom properties
})`}
        />

        <Prose>
          <p>
            Set <code>injectTokens: false</code> to skip the <code>:root</code> variable injection
            (useful if you import <code>scss-helper/css/tokens</code> separately).
          </p>
        </Prose>
      </Section>

      <Section title="Usage Example" id="example">
        <CodeBlock
          lang="html"
          code={`<!-- Tailwind classes using scss-helper tokens -->
<div class="bg-primary text-white p-4 rounded-lg">
  <h2 class="text-fluid-2xl font-bold">Card Title</h2>
  <p class="text-fluid-base">Card content using fluid typography.</p>
</div>

<!-- scss-helper utilities alongside Tailwind -->
<div class="sh-animate-fade-in sh-transition-colors hover:bg-primary">
  Animated card with smooth hover
</div>`}
        />
      </Section>
    </Page>
  )
}
