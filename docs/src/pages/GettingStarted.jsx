import CodeBlock from '../components/CodeBlock'
import { Callout, Page, PageHeader, Prose, Section, SubSection } from '../components/Page'

export default function GettingStarted() {
  return (
    <Page>
      <PageHeader
        eyebrow="Getting Started"
        title="Installation"
        description="scss-helper works in any Sass project, as a CSS drop-in, or as a Tailwind v3 plugin. Pick one, pick all."
      />

      <Section title="Requirements" id="requirements">
        <Prose>
          <ul>
            <li>
              Sass <code>≥ 1.60</code> (Dart Sass) — for SCSS source usage
            </li>
            <li>
              Node.js <code>≥ 18</code>
            </li>
            <li>
              Tailwind CSS <code>≥ 3.0</code> — optional, for the plugin
            </li>
          </ul>
        </Prose>
      </Section>

      <Section title="Install" id="install">
        <CodeBlock lang="bash" filename="pnpm" code={`pnpm add scss-helper`} />
        <CodeBlock lang="bash" filename="npm" code={`npm install scss-helper`} />
        <CodeBlock lang="bash" filename="yarn" code={`yarn add scss-helper`} />
      </Section>

      <Section title="SCSS source usage" id="scss-usage">
        <Prose>
          <p>
            Import the whole library into your main SCSS file. Make sure <code>node_modules</code>{' '}
            is in the Sass load path.
          </p>
        </Prose>

        <CodeBlock
          lang="scss"
          filename="src/main.scss"
          code={`// Entire library
@import 'scss-helper';

// Now use any utility class, mixin, or function:
.hero {
  font-size: golden-step(3);          // 4.236rem from golden ratio
  @include golden-columns(var(--s5)); // 61.8% / 38.2% grid layout
}

h1 { font-size: fluid-type(2rem, 4rem); } // responsive via clamp()`}
        />

        <SubSection title="Webpack / sass-loader">
          <CodeBlock
            lang="js"
            filename="webpack.config.js"
            code={`module.exports = {
  module: {
    rules: [{
      test: /\\.s[ac]ss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              loadPaths: ['node_modules'],
            },
          },
        },
      ],
    }],
  },
};`}
          />
        </SubSection>

        <SubSection title="Vite">
          <CodeBlock
            lang="js"
            filename="vite.config.js"
            code={`import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['node_modules'],
      },
    },
  },
})`}
          />
        </SubSection>
      </Section>

      <Section title="CSS drop-in" id="css-dropin">
        <Prose>
          <p>Use the pre-compiled CSS files without touching Sass at all.</p>
        </Prose>
        <CodeBlock
          lang="css"
          filename="HTML or CSS @import"
          code={`/* Full utility kit — ~94KB uncompressed */
@import 'scss-helper/css';

/* CSS Grid system only — ~15KB */
@import 'scss-helper/css/grid';

/* Design tokens only — ~2KB (just :root vars) */
@import 'scss-helper/css/tokens';`}
        />
      </Section>

      <Section title="Tailwind v3 plugin" id="tailwind">
        <CodeBlock
          lang="js"
          filename="tailwind.config.js"
          code={`const scssHelper = require('scss-helper/plugin');

module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  plugins: [
    scssHelper,              // default options
    // or with options:
    scssHelper({ injectTokens: true }),
  ],
};`}
        />
        <Callout type="tip">
          <strong>What gets injected?</strong> Design tokens into <code>:root</code>, fluid
          typography utilities, container query helpers, animation classes, and dark mode token
          overrides. The Tailwind theme is also extended with <code>colors.primary</code>,{' '}
          <code>colors.danger</code>, etc.
        </Callout>
      </Section>
    </Page>
  )
}
