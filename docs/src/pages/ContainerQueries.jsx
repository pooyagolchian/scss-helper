import { Page, PageHeader, Section, Prose, Callout, PropTable } from '../components/Page'
import CodeBlock from '../components/CodeBlock'

export default function ContainerQueries() {
  return (
    <Page>
      <PageHeader
        eyebrow="Utilities"
        title="Container Queries"
        description="Responsive layouts that react to their container's width rather than the viewport. A major gap in Tailwind CSS that scss-helper fills natively."
      />

      <Section title="Why container queries?" id="why">
        <Prose>
          <p>
            Media queries respond to the <em>viewport</em>. Container queries respond to the <em>parent element</em>.
            This lets you build truly reusable components — a card that rearranges itself based on whether it's in a sidebar (narrow) or a main content area (wide), regardless of screen size.
          </p>
        </Prose>

        <Callout type="info">
          Container Queries are now <strong>baseline 2023</strong> — available in all modern browsers. No polyfill needed.
        </Callout>
      </Section>

      <Section title="Setup" id="setup">
        <Prose>
          <p>Wrap any component in a <em>container</em> element, then use container-responsive child classes inside it.</p>
        </Prose>

        <CodeBlock
          lang="html"
          code={`<!-- Step 1: Mark a container -->
<div class="cq">
  <!-- Step 2: Children respond to container width -->
  <div class="c-col-1 c-col-2-md c-col-3-lg">
    <div>A</div>
    <div>B</div>
    <div>C</div>
  </div>
</div>`}
        />

        <CodeBlock
          lang="css"
          filename="Generated .cq classes"
          code={`.cq        { container-type: inline-size; }
.cq-size   { container-type: size; }
.cq-normal { container-type: normal; }

/* Named container for nested queries */
.cq-named  { container: layout / inline-size; }`}
        />
      </Section>

      <Section title="Container-responsive columns" id="columns">
        <CodeBlock
          lang="css"
          filename="Pattern: .c-col-{n}-{breakpoint}"
          code={`/* No breakpoint = always */
.c-col-1 { grid-template-columns: repeat(1, 1fr); }
.c-col-2 { grid-template-columns: repeat(2, 1fr); }
.c-col-3 { grid-template-columns: repeat(3, 1fr); }
.c-col-4 { grid-template-columns: repeat(4, 1fr); }

/* At container >= 480px */
@container (min-width: 480px) {
  .c-col-2-sm { grid-template-columns: repeat(2, 1fr); }
  .c-col-3-sm { grid-template-columns: repeat(3, 1fr); }
}

/* At container >= 640px */
@container (min-width: 640px) {
  .c-col-2-md { grid-template-columns: repeat(2, 1fr); }
  .c-col-3-md { grid-template-columns: repeat(3, 1fr); }
  .c-col-4-md { grid-template-columns: repeat(4, 1fr); }
}

/* At container >= 960px */
@container (min-width: 960px) {
  .c-col-3-lg { grid-template-columns: repeat(3, 1fr); }
  .c-col-4-lg { grid-template-columns: repeat(4, 1fr); }
  .c-col-5-lg { grid-template-columns: repeat(5, 1fr); }
  .c-col-6-lg { grid-template-columns: repeat(6, 1fr); }
}`}
        />
      </Section>

      <Section title="The container-bp() mixin" id="mixin">
        <Prose>
          <p>Use this mixin to write arbitrary styles that respond to any named or unnamed container breakpoint.</p>
        </Prose>

        <CodeBlock
          lang="scss"
          code={`// @mixin container-bp($name, $breakpoint)
// $name: container name (use '' for unnamed)
// $breakpoint: CSS length

.product-card {
  display: block;

  @include container-bp('', 600px) {
    display: grid;
    grid-template-columns: 200px 1fr;
  }

  @include container-bp('', 900px) {
    grid-template-columns: 300px 1fr;
  }

  &__image {
    @include container-bp('', 600px) {
      height: 100%;
      object-fit: cover;
    }
  }
}

// Named container (for nested queries):
.sidebar {
  container: sidebar / inline-size;
}

.widget {
  @include container-bp('sidebar', 240px) {
    flex-direction: column;
  }
}`}
        />
      </Section>

      <Section title="Real-world example" id="example">
        <CodeBlock
          lang="html"
          code={`<!-- A card that is "narrow" in a sidebar and "wide" in main content -->
<style>
.card {
  padding: 1rem;
  .card__body { display: block; }

  @container (min-width: 480px) {
    .card__body {
      display: flex;
      gap: 1rem;
    }
  }
}
</style>

<!-- Works correctly in BOTH layout contexts -->
<aside class="cq">
  <div class="card">...</div>  <!-- renders as stacked/narrow -->
</aside>

<main class="cq">
  <div class="card">...</div>  <!-- renders as side-by-side/wide -->
</main>`}
        />
      </Section>
    </Page>
  )
}
