import CodeBlock from '../components/CodeBlock'
import { Page, PageHeader, Prose, Section } from '../components/Page'

export default function ContainerQueries() {
  return (
    <Page>
      <PageHeader
        eyebrow="Utilities"
        title="Container Queries"
        description="Component-level responsive design using CSS @container. Respond to parent width instead of viewport."
      />

      <Section title="Container Types" id="types">
        <CodeBlock
          lang="html"
          code={`<!-- Make a parent a container -->
<div class="sh-cq">
  <div>Responds to container width</div>
</div>

<!-- Size container (width + height) -->
<div class="sh-cq-size">…</div>

<!-- Reset to normal -->
<div class="sh-cq-normal">…</div>`}
        />

        <CodeBlock
          lang="css"
          filename="Generated classes"
          code={`.sh-cq        { container-type: inline-size; }
.sh-cq-size   { container-type: size; }
.sh-cq-normal { container-type: normal; }`}
        />
      </Section>

      <Section title="Container Grid Columns" id="grid">
        <Prose>
          <p>
            Responsive grid columns that respond to container width instead of viewport.
            Uses the same breakpoint scale as the main grid.
          </p>
        </Prose>

        <CodeBlock
          lang="html"
          code={`<div class="sh-cq sh-grid sh-gap-4">
  <div class="sh-c-col-12-xs sh-c-col-6-sm sh-c-col-4-md">
    Card
  </div>
  <div class="sh-c-col-12-xs sh-c-col-6-sm sh-c-col-4-md">
    Card
  </div>
</div>`}
        />
      </Section>

      <Section title="SCSS Mixin" id="mixin">
        <Prose>
          <p>
            Use the <code>container-bp</code> mixin for custom container queries in your SCSS.
          </p>
        </Prose>

        <CodeBlock
          lang="scss"
          code={`@use 'scss-helper/src/container/container-query' as cq;

// Named container query
.card {
  @include cq.container-bp('card', sm) {
    font-size: 1.25rem;
    grid-template-columns: 1fr 1fr;
  }
}

// Unnamed container query
.widget {
  @include cq.container-bp(none, md) {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}`}
        />
      </Section>
    </Page>
  )
}
