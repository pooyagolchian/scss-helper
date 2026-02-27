import CodeBlock from '../components/CodeBlock'
import { Callout, Demo, Page, PageHeader, Prose, Section } from '../components/Page'

export default function Grid() {
  return (
    <Page>
      <PageHeader
        eyebrow="Utilities"
        title="CSS Grid"
        description="A complete CSS Grid toolkit: fixed columns, responsive variants, auto flows, gap utilities, and golden ratio layouts."
      />

      <Section title="Basic Grid" id="basic">
        <Prose>
          <p>
            Use <code>.grid</code> to activate the grid, then <code>.col-{'{n}'}</code> to set
            column count (1–12).
          </p>
        </Prose>

        <Demo label=".grid .col-3">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem',
            }}
          >
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div
                key={n}
                style={{
                  background: 'rgba(232,224,200,0.1)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  padding: '0.75rem',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                }}
              >
                {n}
              </div>
            ))}
          </div>
        </Demo>

        <CodeBlock
          lang="html"
          code={`<div class="grid col-3">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>`}
        />

        <CodeBlock
          lang="css"
          filename="Generated classes"
          code={`.grid       { display: grid; }
.col-1      { grid-template-columns: repeat(1, 1fr); }
.col-2      { grid-template-columns: repeat(2, 1fr); }
.col-3      { grid-template-columns: repeat(3, 1fr); }
/* ... through .col-12 */`}
        />
      </Section>

      <Section title="Responsive Columns" id="responsive">
        <Prose>
          <p>
            Every column class has responsive variants: <code>-small</code>, <code>-medium</code>,{' '}
            <code>-large</code>. Columns stack to 1 on mobile by default.
          </p>
        </Prose>

        <CodeBlock
          lang="html"
          code={`<!-- 1 col → 2 col on small+ → 4 col on large+ -->
<div class="grid col-1 col-2-small col-4-large">
  ...
</div>`}
        />

        <CodeBlock
          lang="css"
          filename="Breakpoints"
          code={`/* small  ≥ 576px */
@media (min-width: 576px) {
  .col-2-small { grid-template-columns: repeat(2, 1fr); }
}

/* medium ≥ 768px */
@media (min-width: 768px) {
  .col-3-medium { grid-template-columns: repeat(3, 1fr); }
}

/* large  ≥ 992px */
@media (min-width: 992px) {
  .col-4-large { grid-template-columns: repeat(4, 1fr); }
}`}
        />
      </Section>

      <Section title="Auto-fit / Auto-fill" id="auto">
        <Prose>
          <p>Automatically fill columns based on minimum width — no media queries needed.</p>
        </Prose>

        <Demo label="auto-fit fills and grows, auto-fill preserves ghost tracks">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '0.5rem',
            }}
          >
            {[1, 2, 3, 4].map(n => (
              <div
                key={n}
                style={{
                  background: 'rgba(232,224,200,0.1)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  padding: '0.75rem',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                }}
              >
                {n}
              </div>
            ))}
          </div>
        </Demo>

        <CodeBlock
          lang="css"
          code={`.grid-auto-fit-200 { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
.grid-auto-fit-250 { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
.grid-auto-fit-300 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }

.grid-auto-fill-200 { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
.grid-auto-fill-250 { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }
.grid-auto-fill-300 { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }`}
        />
      </Section>

      <Section title="Gap Utilities" id="gap">
        <CodeBlock
          lang="css"
          code={`.gap-0  { gap: 0; }
.gap-1  { gap: 0.25rem; }   /*  4px */
.gap-2  { gap: 0.5rem;  }   /*  8px */
.gap-3  { gap: 0.75rem; }   /* 12px */
.gap-4  { gap: 1rem;    }   /* 16px */
.gap-5  { gap: 1.25rem; }   /* 20px */
.gap-6  { gap: 1.5rem;  }   /* 24px */
.gap-8  { gap: 2rem;    }   /* 32px */
.gap-10 { gap: 2.5rem;  }   /* 40px */
.gap-12 { gap: 3rem;    }   /* 48px */
.gap-16 { gap: 4rem;    }   /* 64px */

/* Axis-specific */
.gap-x-4 { column-gap: 1rem; }
.gap-y-4 { row-gap: 1rem; }`}
        />
      </Section>

      <Section title="Golden Ratio Grids" id="golden">
        <Prose>
          <p>
            Pre-built layouts based on φ. See the{' '}
            <a href="/golden-ratio" style={{ color: 'var(--accent)' }}>
              Golden Ratio
            </a>{' '}
            page for full reference.
          </p>
        </Prose>

        <CodeBlock
          lang="html"
          code={`<!-- 61.8% / 38.2% -->
<div class="gs-grid-golden">
  <main>Main content</main>
  <aside>Sidebar</aside>
</div>

<!-- Reversed: 38.2% / 61.8% -->
<div class="gs-grid-golden-reverse">
  <aside>Sidebar</aside>
  <main>Main content</main>
</div>

<!-- Three-column: 23.6% / 38.2% / 38.2% -->
<div class="gs-grid-golden-3">
  <nav>Nav</nav>
  <main>Main</main>
  <aside>Aside</aside>
</div>`}
        />
      </Section>

      <Section title="Span & Alignment" id="span">
        <CodeBlock
          lang="css"
          code={`/* Column span */
.col-span-1  { grid-column: span 1; }
.col-span-2  { grid-column: span 2; }
.col-span-3  { grid-column: span 3; }
/* ... through .col-span-12 */
.col-span-full { grid-column: 1 / -1; }

/* Alignment */
.items-start   { align-items: start; }
.items-center  { align-items: center; }
.items-end     { align-items: end; }
.items-stretch { align-items: stretch; }

.justify-start  { justify-content: start; }
.justify-center { justify-content: center; }
.justify-end    { justify-content: end; }
.justify-between{ justify-content: space-between; }`}
        />
      </Section>
    </Page>
  )
}
