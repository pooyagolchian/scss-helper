import CodeBlock from '../components/CodeBlock'
import { Callout, Demo, Page, PageHeader, PropTable, Prose, Section } from '../components/Page'
import styles from './Spacing.module.css'

const steps = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24]
const rems = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6]

export default function Spacing() {
  return (
    <Page>
      <PageHeader
        eyebrow="Utilities"
        title="Spacing"
        description="Padding and margin utilities on a 0.25rem (4px) scale. Every axis variant included — no gaps left for Tailwind to fill."
      />

      <Section title="Padding" id="padding">
        <Prose>
          <p>
            All padding classes follow a consistent naming convention. The number corresponds to
            0.25rem increments.
          </p>
        </Prose>

        <CodeBlock
          lang="css"
          filename="Class patterns"
          code={`/* All directions */
.p-{n}   { padding: {n × 0.25rem}; }

/* Vertical / Horizontal axes */
.py-{n}  { padding-top: ...; padding-bottom: ...; }
.px-{n}  { padding-left: ...; padding-right: ...; }

/* Individual sides */
.pt-{n}  { padding-top: ...; }
.pb-{n}  { padding-bottom: ...; }
.pl-{n}  { padding-left: ...; }
.pr-{n}  { padding-right: ...; }`}
        />

        <div className={styles.scaleTable}>
          <div className={styles.tableHead}>
            <span>Class</span>
            <span>Value</span>
            <span>Pixels</span>
            <span>Visual</span>
          </div>
          {steps.map((s, i) => (
            <div key={s} className={styles.tableRow}>
              <code className={styles.className}>.p-{s}</code>
              <span className={styles.remVal}>{rems[i]}rem</span>
              <span className={styles.pxVal}>{rems[i] * 16}px</span>
              <div
                className={styles.bar}
                style={{
                  width: `${Math.min(rems[i] * 16 * 2, 96)}px`,
                  minWidth: rems[i] > 0 ? '4px' : '0',
                }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Margin" id="margin">
        <CodeBlock
          lang="css"
          filename="Class patterns"
          code={`/* All directions */
.m-{n}   { margin: {n × 0.25rem}; }

/* Vertical / Horizontal axes */
.my-{n}  { margin-top: ...; margin-bottom: ...; }
.mx-{n}  { margin-left: ...; margin-right: ...; }

/* Individual sides */
.mt-{n}  { margin-top: ...; }
.mb-{n}  { margin-bottom: ...; }
.ml-{n}  { margin-left: ...; }
.mr-{n}  { margin-right: ...; }

/* Auto centering */
.mx-auto { margin-left: auto; margin-right: auto; }`}
        />

        <CodeBlock
          lang="html"
          code={`<!-- Centered container -->
<div class="mx-auto" style="max-width: 960px">
  <p class="mb-4">First paragraph (margin-bottom: 1rem)</p>
  <p class="mt-8">Second paragraph (margin-top: 2rem)</p>
  <div class="py-6 px-4">Padded box</div>
</div>`}
        />
      </Section>

      <Section title="Scale reference" id="scale">
        <Callout type="info">
          Steps available:{' '}
          <strong>
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52,
            56, 60, 64, 72, 80, 96
          </strong>
          . Each step = 0.25rem = 4px.
        </Callout>

        <PropTable
          rows={[
            {
              name: '.p-0',
              type: '0',
              default: '0px',
              description: 'Remove all padding',
            },
            {
              name: '.p-1',
              type: '0.25rem',
              default: '4px',
              description: 'Micro gap',
            },
            {
              name: '.p-2',
              type: '0.5rem',
              default: '8px',
              description: 'Compact inline',
            },
            {
              name: '.p-4',
              type: '1rem',
              default: '16px',
              description: 'Default padding',
            },
            {
              name: '.p-6',
              type: '1.5rem',
              default: '24px',
              description: 'Card padding',
            },
            {
              name: '.p-8',
              type: '2rem',
              default: '32px',
              description: 'Large section',
            },
            {
              name: '.p-12',
              type: '3rem',
              default: '48px',
              description: 'Extra breathing room',
            },
            {
              name: '.p-16',
              type: '4rem',
              default: '64px',
              description: 'Hero padding',
            },
          ]}
        />
      </Section>

      <Section title="Combining with Golden Spacing" id="golden">
        <Prose>
          <p>
            For harmonically related spacing, mix the standard scale with Golden Ratio spacing
            tokens:
          </p>
        </Prose>
        <CodeBlock
          lang="html"
          code={`<!-- Standard 4px-scale spacing -->
<div class="py-6 px-4">...</div>

<!-- Golden Ratio spacing (φ-based) -->
<div class="gs-p-5">...</div>  <!-- 1.618rem ≈ 26px -->
<div class="gs-p-6">...</div>  <!-- 2.618rem ≈ 42px -->

<!-- Mix freely -->
<section class="gs-mt-7">
  <div class="p-6">...</div>
</section>`}
        />
      </Section>
    </Page>
  )
}
