import CodeBlock from '../components/CodeBlock'
import { Page, PageHeader, Prose, Section } from '../components/Page'

export default function Typography() {
  return (
    <Page>
      <PageHeader
        eyebrow="Utilities"
        title="Typography"
        description="Fluid typography using CSS clamp() — font sizes scale smoothly between viewport widths without media queries."
      />

      <Section title="Fluid Type Classes" id="fluid">
        <Prose>
          <p>
            Each class uses <code>clamp()</code> to interpolate between a minimum and maximum font
            size across the viewport range of 320px–1280px.
          </p>
        </Prose>

        <CodeBlock
          lang="html"
          code={`<h1 class="sh-text-fluid-4xl">Headline</h1>
<h2 class="sh-text-fluid-2xl">Subheading</h2>
<p class="sh-text-fluid-base">Body text</p>
<small class="sh-text-fluid-xs">Fine print</small>`}
        />

        <CodeBlock
          lang="css"
          filename="Fluid type scale"
          code={`.sh-text-fluid-xs   /* 0.75rem → 0.875rem  (12–14px) */
.sh-text-fluid-sm   /* 0.875rem → 1rem     (14–16px) */
.sh-text-fluid-base /* 1rem → 1.125rem     (16–18px) */
.sh-text-fluid-lg   /* 1.125rem → 1.375rem (18–22px) */
.sh-text-fluid-xl   /* 1.25rem → 1.75rem   (20–28px) */
.sh-text-fluid-2xl  /* 1.5rem → 2.25rem    (24–36px) */
.sh-text-fluid-3xl  /* 1.875rem → 3rem     (30–48px) */
.sh-text-fluid-4xl  /* 2.25rem → 4rem      (36–64px) */`}
        />
      </Section>

      <Section title="SCSS Function" id="function">
        <Prose>
          <p>
            Use <code>fluid-type()</code> in your own SCSS for custom fluid sizes.
          </p>
        </Prose>

        <CodeBlock
          lang="scss"
          code={`@use 'scss-helper/src/typography/fluid' as fluid;

h1 {
  font-size: fluid.fluid-type(1.5rem, 3rem);
}

// Custom viewport range
.hero-title {
  font-size: fluid.fluid-type(2rem, 5rem, 30rem, 100rem);
}`}
        />

        <CodeBlock
          lang="css"
          filename="Output"
          code={`h1 {
  font-size: clamp(1.5rem, calc(1.5rem + (3 - 1.5) * ((100vw - 20rem) / (80 - 20))), 3rem);
}`}
        />
      </Section>

      <Section title="Custom Scale" id="custom">
        <Prose>
          <p>
            Override the built-in scale with your own values using Sass <code>!default</code>.
          </p>
        </Prose>

        <CodeBlock
          lang="scss"
          code={`// Define before @use
$fluid-type-scale: (
  sm: (1rem, 1.25rem),
  lg: (1.5rem, 2.5rem),
  hero: (2rem, 6rem),
) !default;

@use 'scss-helper';`}
        />
      </Section>

      <Section title="Design Tokens" id="tokens">
        <Prose>
          <p>
            Typography design tokens are also available as CSS custom properties via the tokens
            module.
          </p>
        </Prose>

        <CodeBlock
          lang="css"
          filename="From dist/tokens.css"
          code={`:root {
  --font-size-sm:   0.875rem;
  --font-size-base: 1rem;
  --font-size-lg:   1.25rem;
  --font-size-xl:   1.5rem;
  --font-size-2xl:  1.875rem;
  --font-size-3xl:  2.25rem;
  --font-size-4xl:  3rem;

  --font-weight-light:  300;
  --font-weight-normal: 400;
  --font-weight-bold:   700;

  --line-height-sm:   1.25;
  --line-height-base: 1.5;
  --line-height-lg:   2;
}`}
        />
      </Section>
    </Page>
  )
}
