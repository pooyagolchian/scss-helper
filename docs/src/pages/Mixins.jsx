import { Page, PageHeader, Section, Prose, Callout, PropTable } from '../components/Page'
import CodeBlock from '../components/CodeBlock'

export default function Mixins() {
  return (
    <Page>
      <PageHeader
        eyebrow="Advanced"
        title="Mixins & Functions"
        description="Every mixin and SCSS function provided by scss-helper — copy-paste the @include that fits your need."
      />

      <Section title="Border radius" id="border-radius">
        <CodeBlock
          lang="scss"
          filename="mixin/_border-radius.scss"
          code={`// Mixin with optional per-corner overrides:
@mixin border-radius($tl: 0, $tr: null, $br: null, $bl: null) { ... }

// Usage:
.card     { @include border-radius(8px); }          // all corners
.pill     { @include border-radius(999px); }        // fully rounded
.tab      { @include border-radius(6px, 6px, 0, 0); } // top only`}
        />
      </Section>

      <Section title="Box shadow" id="box-shadow">
        <CodeBlock
          lang="scss"
          filename="mixin/_box-shadow.scss"
          code={`// @mixin box-shadow($shadows...) — accepts comma-separated shadow list
.card {
  @include box-shadow(0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24));
}

.elevated {
  @include box-shadow(0 10px 40px rgba(0,0,0,0.3));
}

// Remove shadow:
.flat {
  @include box-shadow(none);
}`}
        />
      </Section>

      <Section title="Border stroke" id="border-stroke">
        <CodeBlock
          lang="scss"
          filename="mixin/_border-stroke.scss"
          code={`// @mixin border-stroke($width, $style, $color)
// All parameters have defaults, override freely.

.card {
  @include border-stroke(1px, solid, #e0e0e0);
}

.alert {
  @include border-stroke(2px, dashed, $color-warning);
}

.badge {
  @include border-stroke(1px, solid);  // uses $black default
}`}
        />
      </Section>

      <Section title="Clearfix" id="clearfix">
        <CodeBlock
          lang="scss"
          filename="mixin/_clearfix.scss"
          code={`// Classic clearfix — clears floated children
.legacy-layout {
  @include clearfix;
  // Generates: &::after { content: ''; display: table; clear: both; }
}`}
        />
      </Section>

      <Section title="Dark mode" id="dark-mode">
        <CodeBlock
          lang="scss"
          filename="dark/_dark-mode.scss"
          code={`// @mixin dark-mode — outputs overrides for data-theme and prefers-color-scheme
.component {
  background: white;
  color: black;

  @include dark-mode {
    background: #1a1a1a;
    color: #f4f4f4;
  }
}`}
        />
      </Section>

      <Section title="Container breakpoint" id="container-bp">
        <CodeBlock
          lang="scss"
          filename="container/_container-query.scss"
          code={`// @mixin container-bp($name, $min-width)
// $name — container name, use '' for anonymous containers

.grid-component {
  grid-template-columns: 1fr;

  @include container-bp('', 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include container-bp('', 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
}`}
        />
      </Section>

      <Section title="Transition" id="transition-mixin">
        <CodeBlock
          lang="scss"
          filename="animation/_transitions.scss"
          code={`// @mixin transition($properties, $duration: 200ms, $easing: ease-out)
// $properties → space-separated list of CSS property names

.button {
  @include transition(background-color color, 150ms, ease-out);
}

.modal {
  @include transition(opacity transform, 300ms, cubic-bezier(0.4, 0, 0.2, 1));
}`}
        />
      </Section>

      <Section title="Golden ratio" id="golden">
        <CodeBlock
          lang="scss"
          filename="golden/_golden-ratio.scss"
          code={`// @mixin golden-columns($gap: 1rem)
// Creates a two-column grid with φ proportions (61.8% / 1fr)

.layout {
  @include golden-columns(2rem);
  // → display: grid; grid-template-columns: 61.8% 1fr; gap: 2rem;
}

// @mixin golden-scale-type($step: 0, $leading: $phi)
// Sets font-size at given golden scale step with matching line-height

h1 { @include golden-scale-type(3);  }  // 4.236rem
h2 { @include golden-scale-type(2);  }  // 2.618rem
h3 { @include golden-scale-type(1);  }  // 1.618rem
p  { @include golden-scale-type(0);  }  // 1rem, line-height 1.618`}
        />
      </Section>

      <Section title="Functions reference" id="functions">
        <PropTable rows={[
          { name: 'golden-step($n)',              type: 'SCSS function', default: '$base: 1rem', description: 'Returns φⁿ rem. Positive steps grow, negative shrink.' },
          { name: 'golden-ratio-split($width)',   type: 'SCSS function', default: '',            description: 'Returns 61.8% of $width (major golden portion).' },
          { name: 'golden-ratio-minor($width)',   type: 'SCSS function', default: '',            description: 'Returns 38.2% of $width (minor golden portion).' },
          { name: 'fluid-type($min, $max, ...)',  type: 'SCSS function', default: '$min-vw: 320px, $max-vw: 1440px', description: 'Returns a clamp() value for fluid typography.' },
        ]} />
      </Section>
    </Page>
  )
}
