import { Page, PageHeader, Section, Prose, Callout, PropTable } from '../components/Page'
import CodeBlock from '../components/CodeBlock'

export default function TailwindPlugin() {
  return (
    <Page>
      <PageHeader
        eyebrow="Advanced"
        title="Tailwind v3 Plugin"
        description="Use scss-helper as a Tailwind CSS plugin. Get all design tokens, utility classes, and extensions injected directly into your Tailwind build — no separate SCSS step needed."
      />

      <Section title="Setup" id="setup">
        <CodeBlock
          lang="bash"
          code={`# Install scss-helper
npm install scss-helper

# Tailwind v3 is a peer dependency
npm install tailwindcss@^3`}
        />

        <CodeBlock
          lang="js"
          filename="tailwind.config.js"
          code={`const scssHelper = require('scss-helper/plugin')

module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  plugins: [
    scssHelper(),
  ],
}`}
        />

        <Callout type="tip">
          That's it — all tokens, utilities, and theme extensions are registered automatically.
        </Callout>
      </Section>

      <Section title="What gets injected" id="what">
        <Prose>
          <p>The plugin uses Tailwind's API to inject content into three layers:</p>
        </Prose>

        <CodeBlock
          lang="js"
          filename="plugin.js — overview"
          code={`plugin(function({ addBase, addUtilities, theme }) {
  // 1. addBase → :root CSS custom properties (all design tokens)
  // 2. addUtilities → New utility classes
  // 3. theme.extend → Extend Tailwind's own theme
})`}
        />

        <PropTable rows={[
          { name: 'addBase :root tokens',    type: 'Layer: base',    default: '', description: 'All --color-*, --spacing-*, --font-size-* custom properties' },
          { name: '.text-fluid-*',           type: 'Layer: utilities', default: '', description: 'Fluid type scale xs → 4xl using clamp()' },
          { name: '.cq, .cq-size',           type: 'Layer: utilities', default: '', description: 'Container query setup classes' },
          { name: '.transition-*',           type: 'Layer: utilities', default: '', description: 'Transition utilities + duration/easing helpers' },
          { name: '.animate-*',              type: 'Layer: utilities', default: '', description: 'All 12 animation classes + delay helpers' },
          { name: '.gs-grid-*',              type: 'Layer: utilities', default: '', description: 'Golden ratio grid layouts' },
          { name: '.gs-text-*',              type: 'Layer: utilities', default: '', description: 'Golden ratio type scale -2 → 5' },
          { name: 'theme.colors.*',          type: 'theme.extend',  default: '', description: 'All scss-helper colors available as Tailwind color names' },
          { name: 'theme.fontSize.*',        type: 'theme.extend',  default: '', description: 'fluid-xs, fluid-sm, fluid-base, fluid-lg, fluid-xl' },
          { name: 'theme.transitionDuration',type: 'theme.extend',  default: '', description: 'Adds 75, 150 durations' },
        ]} />
      </Section>

      <Section title="Using tokens in Tailwind classes" id="tokens">
        <Prose>
          <p>Since the plugin extends Tailwind's color palette, you can reference scss-helper colors with Tailwind's standard syntax:</p>
        </Prose>

        <CodeBlock
          lang="html"
          code={`<!-- scss-helper colors become Tailwind color names -->
<div class="bg-primary text-white">Primary button</div>
<div class="bg-success text-white">Success badge</div>
<div class="border border-lightgray">Card with border</div>

<!-- Fluid type from scss-helper via Tailwind fontSize extension -->
<h1 class="text-fluid-3xl">Fluid heading</h1>
<p  class="text-fluid-base">Fluid body</p>

<!-- All animation classes work the same -->
<div class="animate-fade-in animate-delay-200">Staggered entry</div>`}
        />
      </Section>

      <Section title="Overriding tokens" id="override">
        <Prose>
          <p>Extend or override the plugin defaults by passing an options object:</p>
        </Prose>

        <CodeBlock
          lang="js"
          filename="tailwind.config.js — with options"
          code={`const scssHelper = require('scss-helper/plugin')

module.exports = {
  plugins: [
    scssHelper({
      // Override which base tokens get injected into :root
      baseTokens: {
        '--color-primary': '#6366f1',    // indigo
        '--color-success': '#10b981',    // emerald
      },

      // Disable specific utility groups if you don't need them
      animations: true,
      containerQueries: true,
      goldenRatio: true,
      fluidType: true,
      transitions: true,
    }),
  ],
}`}
        />

        <Callout type="info">
          The plugin is under active development. Options API may expand in future minor versions.
        </Callout>
      </Section>

      <Section title="Tailwind v4" id="v4">
        <Prose>
          <p>Tailwind v4 uses a different plugin API based on CSS <code>@plugin</code> syntax. A v4-compatible adapter is planned for the next major release of scss-helper. For now, use the SCSS source files directly with v4's <code>@source</code> setup.</p>
        </Prose>

        <CodeBlock
          lang="css"
          filename="CSS-first approach for Tailwind v4"
          code={`/* style.css */
@import 'tailwindcss';
@import 'scss-helper/dist/tokens.css';

/* Reference scss-helper CSS custom properties in your own utilities */
@utility card {
  background: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--border-radius-lg);
}`}
        />
      </Section>
    </Page>
  )
}
