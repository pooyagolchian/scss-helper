import CodeBlock from '../components/CodeBlock'
import { Page, PageHeader, Prose, Section } from '../components/Page'

export default function DarkMode() {
  return (
    <Page>
      <PageHeader
        eyebrow="Utilities"
        title="Dark Mode"
        description="Dual-strategy dark mode — works with JavaScript toggles ([data-theme]) and OS preferences (prefers-color-scheme) simultaneously."
      />

      <Section title="How It Works" id="how">
        <Prose>
          <p>
            Dark mode activates under two conditions:
          </p>
          <ul>
            <li>
              <code>[data-theme="dark"]</code> on an ancestor element (JS-controlled)
            </li>
            <li>
              <code>@media (prefers-color-scheme: dark)</code> from the OS, unless overridden by{' '}
              <code>[data-theme="light"]</code>
            </li>
          </ul>
        </Prose>
      </Section>

      <Section title="Token Overrides" id="tokens">
        <Prose>
          <p>
            Semantic color tokens automatically shift in dark mode.
          </p>
        </Prose>

        <CodeBlock
          lang="css"
          code={`/* Automatic shifts in dark mode */
--color-primary:   #0d6efd → #60a5fa
--color-secondary: #6c757d → #9ca3af
--color-success:   #28a745 → #4ade80
--color-danger:    #dc3545 → #f87171
/* ... and more */`}
        />
      </Section>

      <Section title="Utility Classes" id="utilities">
        <Prose>
          <p>
            Text and background utilities scoped to dark mode. Work under both strategies.
          </p>
        </Prose>

        <CodeBlock
          lang="html"
          code={`<p class="sh-dark-text-white">White text in dark mode</p>
<div class="sh-dark-bg-gray-900">Dark background in dark mode</div>
<span class="sh-dark-text-primary">Primary color (light: blue-600, dark: blue-400)</span>`}
        />

        <CodeBlock
          lang="css"
          filename="Available utilities"
          code={`.sh-dark-text-{color}  /* Set text color in dark mode */
.sh-dark-bg-{color}    /* Set background in dark mode */

/* Colors: white, black, gray-50, gray-100, gray-200,
   gray-700, gray-800, gray-900, primary, secondary,
   success, info, warning, danger */`}
        />
      </Section>

      <Section title="SCSS Mixin" id="mixin">
        <CodeBlock
          lang="scss"
          code={`@use 'scss-helper/src/dark/dark-mode' as dark;

.card {
  background: white;
  color: #333;

  @include dark.dark-mode {
    background: #1a1a1a;
    color: #f1f1f1;
  }
}`}
        />
      </Section>

      <Section title="JavaScript Toggle" id="toggle">
        <CodeBlock
          lang="js"
          code={`// Toggle dark mode
const toggle = () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
};

// Respect OS preference on load
if (!html.dataset.theme) {
  html.dataset.theme = matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark' : 'light';
}`}
        />
      </Section>

      <Section title="Custom Dark Palette" id="custom">
        <CodeBlock
          lang="scss"
          code={`// Override the dark palette with your own colors
$dark-palette: (
  "brand": #a78bfa,
  "surface": #1e1e2e,
  "on-surface": #cdd6f4,
) !default;

@use 'scss-helper';`}
        />
      </Section>
    </Page>
  )
}
