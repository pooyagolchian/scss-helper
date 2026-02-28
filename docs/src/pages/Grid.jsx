import CodeBlock from '../components/CodeBlock'
import { Callout, Demo, Page, PageHeader, Prose, Section } from '../components/Page'

export default function Grid() {
  return (
    <Page>
      <PageHeader
        eyebrow="Utilities"
        title="CSS Grid"
        description="A 12-column CSS Grid system with responsive breakpoints, auto-fit, and gap utilities. All classes use the sh- prefix."
      />

      <Section title="Basic Grid" id="basic">
        <Prose>
          <p>
            Use <code>.sh-grid</code> to activate the grid, then{' '}
            <code>.sh-col-{'{n}'}</code> to set column spans (1–12).
          </p>
        </Prose>

        <Demo label=".sh-grid .sh-col-4">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
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
          code={`<div class="sh-grid sh-gap-4">
  <div class="sh-col-8">Main content</div>
  <div class="sh-col-4">Sidebar</div>
</div>`}
        />
      </Section>

      <Section title="Responsive Columns" id="responsive">
        <Prose>
          <p>
            Every column class has responsive variants: <code>-xs</code>, <code>-sm</code>,{' '}
            <code>-md</code>, <code>-lg</code>, <code>-xl</code>.
          </p>
        </Prose>

        <CodeBlock
          lang="html"
          code={`<!-- Full width on mobile → 2 cols at sm → 4 cols at lg -->
<div class="sh-grid sh-gap-4">
  <div class="sh-col-12 sh-col-6-sm sh-col-3-lg">Card</div>
  <div class="sh-col-12 sh-col-6-sm sh-col-3-lg">Card</div>
  <div class="sh-col-12 sh-col-6-sm sh-col-3-lg">Card</div>
  <div class="sh-col-12 sh-col-6-sm sh-col-3-lg">Card</div>
</div>`}
        />

        <CodeBlock
          lang="css"
          filename="Breakpoints"
          code={`/* xs  ≥ 32rem (512px) */
/* sm  ≥ 48rem (768px) */
/* md  ≥ 64rem (1024px) */
/* lg  ≥ 80rem (1280px) */
/* xl  ≥ 90rem (1440px) */`}
        />
      </Section>

      <Section title="Auto-fit Grid" id="auto">
        <Prose>
          <p>Automatically fit columns based on minimum width — no media queries needed.</p>
        </Prose>

        <CodeBlock
          lang="html"
          code={`<!-- Cards auto-fit with 15rem minimum -->
<div class="sh-grid-auto-md sh-gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>`}
        />

        <CodeBlock
          lang="css"
          filename="Auto-fit sizes"
          code={`.sh-grid-auto-xs  { --col-min-width: 8rem;  }
.sh-grid-auto-sm  { --col-min-width: 10rem; }
.sh-grid-auto-md  { --col-min-width: 15rem; }
.sh-grid-auto-lg  { --col-min-width: 20rem; }
.sh-grid-auto-xl  { --col-min-width: 25rem; }`}
        />
      </Section>

      <Section title="Gap Utilities" id="gap">
        <CodeBlock
          lang="css"
          code={`.sh-gap-0   { gap: 0; }
.sh-gap-1   { gap: 0.25rem; }
.sh-gap-2   { gap: 0.5rem; }
.sh-gap-3   { gap: 0.75rem; }
.sh-gap-4   { gap: 1rem; }
.sh-gap-6   { gap: 1.5rem; }
.sh-gap-8   { gap: 2rem; }
.sh-gap-12  { gap: 3rem; }
.sh-gap-16  { gap: 4rem; }

/* Axis-specific */
.sh-gap-x-4 { column-gap: 1rem; }
.sh-gap-y-2 { row-gap: 0.5rem; }`}
        />
      </Section>

      <Section title="Column Utilities" id="columns">
        <CodeBlock
          lang="css"
          filename="Column span, start, end"
          code={`.sh-col-{1-12}         /* Set column span */
.sh-col-start-{1-12}   /* Set start line */
.sh-col-end-{2-13}     /* Set end line */
.sh-col-start           /* Start at 1 */
.sh-col-end             /* End at -1 (full width) */
.sh-col-start-auto      /* Auto start */
.sh-col-end-auto        /* Auto end */

/* All support responsive suffixes: */
.sh-col-6-md, .sh-col-start-1-lg, etc.`}
        />
      </Section>

      <Callout type="tip">
        <strong>Standalone build:</strong> Use{' '}
        <code>@import 'scss-helper/css/grid'</code> for just the grid without other utilities (~12 KB).
      </Callout>
    </Page>
  )
}
