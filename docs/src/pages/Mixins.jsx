import CodeBlock from '../components/CodeBlock'
import { Page, PageHeader, Prose, Section } from '../components/Page'

export default function Mixins() {
  return (
    <Page>
      <PageHeader
        eyebrow="Advanced"
        title="Mixins & Functions"
        description="Reusable SCSS mixins and functions for your own components."
      />

      <Section title="Breakpoint Mixin" id="breakpoint">
        <Prose>
          <p>
            Mobile-first breakpoint mixin using the shared <code>$breakpoints</code> map.
          </p>
        </Prose>

        <CodeBlock
          lang="scss"
          code={`@use 'scss-helper/src/variables' as vars;

.sidebar {
  display: none;

  @include vars.breakpoint(md) {
    display: block;
    width: 280px;
  }

  @include vars.breakpoint(lg) {
    width: 320px;
  }
}

// Breakpoints: xs (32rem), sm (48rem), md (64rem), lg (80rem), xl (90rem)`}
        />
      </Section>

      <Section title="Border Stroke" id="border-stroke">
        <CodeBlock
          lang="scss"
          code={`@use 'scss-helper/src/mixin' as mx;

.card {
  @include mx.border-stroke(light);          // 1px solid black
}

.alert {
  @include mx.border-stroke(medium, red);    // 3px solid red
}

.hero {
  @include mx.border-stroke(heavy, #333);    // 6px solid #333
}

// Values: light (1px), medium (3px), heavy (6px), or any other → none`}
        />
      </Section>

      <Section title="Modifiers (Map Walker)" id="modifiers">
        <Prose>
          <p>
            Generate modifier classes from a Sass map. Supports nested maps for recursive
            generation.
          </p>
        </Prose>

        <CodeBlock
          lang="scss"
          code={`@use 'scss-helper/src/mixin' as mx;

$sizes: (sm: 0.875rem, md: 1rem, lg: 1.25rem, xl: 1.5rem);

.text {
  @include mx.modifiers($sizes, "font-size");
}

// Output:
// .text-sm { font-size: 0.875rem; }
// .text-md { font-size: 1rem; }
// .text-lg { font-size: 1.25rem; }
// .text-xl { font-size: 1.5rem; }`}
        />
      </Section>

      <Section title="Dark Mode Mixin" id="dark-mode">
        <CodeBlock
          lang="scss"
          code={`@use 'scss-helper/src/dark/dark-mode' as dark;

.card {
  background: white;

  @include dark.dark-mode {
    background: #1a1a1a;
    color: white;
  }
}`}
        />
      </Section>

      <Section title="Transition Mixin" id="transition">
        <CodeBlock
          lang="scss"
          code={`@use 'scss-helper/src/animation/transitions' as tr;

.button {
  @include tr.transition(opacity transform, 200ms, ease-out);
}

// Output:
// .button {
//   transition-property: opacity, transform;
//   transition-duration: 200ms;
//   transition-timing-function: ease-out;
// }`}
        />
      </Section>

      <Section title="Container Query Mixin" id="container-bp">
        <CodeBlock
          lang="scss"
          code={`@use 'scss-helper/src/container/container-query' as cq;

.widget {
  @include cq.container-bp('widget', md) {
    grid-template-columns: 1fr 1fr;
  }
}

// Output:
// @container widget (min-width: 64rem) {
//   .widget { grid-template-columns: 1fr 1fr; }
// }`}
        />
      </Section>

      <Section title="Golden Ratio Functions" id="golden">
        <CodeBlock
          lang="scss"
          code={`@use 'scss-helper/src/golden/golden-ratio' as golden;

h1 {
  font-size: golden.golden-step(3);       // 4.236rem
  margin-bottom: golden.golden-step(1);   // 1.618rem
}

.layout {
  @include golden.golden-columns;         // 61.8% / 38.2% grid
}

.hero {
  @include golden.golden-scale-type(2);   // 2.618rem, line-height: φ
}`}
        />
      </Section>
    </Page>
  )
}
