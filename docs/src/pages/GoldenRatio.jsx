import CodeBlock from '../components/CodeBlock'
import {
  Callout,
  Demo,
  Page,
  PageHeader,
  PropTable,
  Prose,
  Section,
  SubSection,
} from '../components/Page'
import styles from './GoldenRatio.module.css'

const phi = 1.618033988749895

function goldenStep(n, base = 1) {
  let r = base
  if (n > 0) {
    for (let i = 0; i < n; i++) r *= phi
  } else if (n < 0) {
    for (let i = n; i < 0; i++) r /= phi
  }
  return r
}

const typeScale = [-2, -1, 0, 1, 2, 3, 4, 5].map(n => ({
  step: n,
  rem: goldenStep(n).toFixed(4),
  px: (goldenStep(n) * 16).toFixed(1),
  label: [null, null, 'Body', 'Lead / H5', 'H3', 'H1', 'Display', 'Hero'][n + 2],
}))

const spacingScale = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => ({
  step: n,
  n: n - 4,
  rem: goldenStep(n - 4).toFixed(4),
  px: (goldenStep(n - 4) * 16).toFixed(1),
}))

export default function GoldenRatio() {
  return (
    <Page>
      <PageHeader
        eyebrow="Foundations — Golden Ratio"
        title={
          <>
            The Golden Ratio
            <br />
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>φ = 1.618…</span>
          </>
        }
        description="φ (phi) is the ratio where a line divided into two parts has the property that the longer part divided by the smaller equals the whole divided by the longer part. It appears in nature, architecture, and the most harmonious visual systems."
      />

      {/* What is φ */}
      <Section title="What is φ?" id="what-is-phi">
        <div className={styles.phiViz}>
          <div className={styles.phiBar}>
            <div className={styles.phiMajor}>
              <span className={styles.phiLabel}>61.8%</span>
            </div>
            <div className={styles.phiMinor}>
              <span className={styles.phiLabel}>38.2%</span>
            </div>
          </div>
          <p className={styles.phiFormula}>
            <code>a / b = (a + b) / a = φ ≈ 1.618</code>
          </p>
        </div>

        <Prose>
          <p>
            The key insight: <strong>divide any value by φ (÷ 1.618)</strong> to get the minor
            portion.
            <strong>Multiply by φ (× 1.618)</strong> to get the next step up. Chaining these steps
            creates a natural, harmonious scale used in everything from the Parthenon to Apple
            product design.
          </p>
        </Prose>

        <CodeBlock
          lang="scss"
          filename="src/golden/_golden-ratio.scss — available after @import 'scss-helper'"
          code={`// Core constants (all !default — override freely)
$phi:       1.618033988749895;   // Golden Ratio
$phi-minor: 0.618033988749895;   // 1/φ  (the smaller portion)
$phi-sq:    2.618033988749895;   // φ²

// Function: golden-step($n)
// Returns the value at step $n of the golden scale
// $n = 0 → 1rem (base), +1 → ×φ, -1 → ÷φ
@function golden-step($n, $base: 1rem) { ... }

// Examples
font-size: golden-step(0);    // → 1rem
font-size: golden-step(1);    // → 1.618rem
font-size: golden-step(-1);   // → 0.618rem
font-size: golden-step(3);    // → 4.236rem`}
        />
      </Section>

      {/* Typography Scale */}
      <Section title="Golden Typography Scale" id="typography">
        <Prose>
          <p>
            Every step is the previous × φ. This produces the most visually harmonious type
            hierarchy possible — the same proportions used in classical typography.
          </p>
        </Prose>

        <div className={styles.scaleViz}>
          {typeScale.map(({ step, rem, px, label }) => (
            <div key={step} className={styles.scaleRow}>
              <div className={styles.scaleMeta}>
                <code className={styles.scaleStep}>
                  step {step > 0 ? '+' : ''}
                  {step}
                </code>
                <span className={styles.scaleLabel}>{label || ''}</span>
                <span className={styles.scaleValues}>
                  {rem}rem / {px}px
                </span>
              </div>
              <div
                className={styles.scaleSample}
                style={{ fontSize: `clamp(0.75rem, ${rem}rem, ${rem}rem)` }}
              >
                Aa
              </div>
            </div>
          ))}
        </div>

        <CodeBlock
          lang="scss"
          code={`// Utility classes generated automatically:
// .gs-text-{step} where step ∈ {-2, -1, 0, 1, 2, 3, 4, 5}

.subtitle  { @extend .gs-text-1; }   // 1.618rem
.heading   { @extend .gs-text-2; }   // 2.618rem
.display   { @extend .gs-text-4; }   // 6.854rem

// Or use the function directly:
h1 { font-size: golden-step(3); line-height: 1.2; }
h2 { font-size: golden-step(2); line-height: 1.3; }
h3 { font-size: golden-step(1); line-height: 1.4; }
p  { font-size: golden-step(0); line-height: 1.618; } // φ as line-height!`}
        />

        <CodeBlock
          lang="css"
          filename="Generated CSS classes"
          code={`.gs-text--2 { font-size: 0.3820rem; }  /* fine print    */
.gs-text--1 { font-size: 0.6180rem; }  /* caption       */
.gs-text-0  { font-size: 1rem;      }  /* body (base)   */
.gs-text-1  { font-size: 1.618rem;  }  /* h5 / lead     */
.gs-text-2  { font-size: 2.618rem;  }  /* h3            */
.gs-text-3  { font-size: 4.236rem;  }  /* h1            */
.gs-text-4  { font-size: 6.854rem;  }  /* display       */
.gs-text-5  { font-size: 11.09rem;  }  /* hero          */

/* Golden line heights */
.gs-leading-body    { line-height: 1.618; }   /* φ itself   */
.gs-leading-tight   { line-height: 1.272; }   /* √φ ≈ 1.272 */
.gs-leading-compact { line-height: 1.0;   }`}
        />

        <Callout type="tip">
          <strong>Pro tip:</strong> Use <code>φ (1.618)</code> itself as your body line-height — it
          is the natural reading rhythm. Use <code>√φ ≈ 1.272</code> for tight headings.
        </Callout>
      </Section>

      {/* Spacing Scale */}
      <Section title="Golden Spacing Scale" id="spacing">
        <Prose>
          <p>
            Nine spacing steps anchored at 1rem, scaling by φ in both directions. Available as CSS
            custom properties (<code>--gs-space-1</code>…<code>--gs-space-9</code>) and utility
            classes.
          </p>
        </Prose>

        <div className={styles.spacingViz}>
          {spacingScale.map(({ step, rem, px }) => (
            <div key={step} className={styles.spacingRow}>
              <code className={styles.spacingName}>
                --gs-space-{step} / .gs-m-{step}
              </code>
              <div className={styles.spacingBar}>
                <div
                  className={styles.spacingFill}
                  style={{ width: `${Math.min(parseFloat(rem) * 40, 100)}%` }}
                />
              </div>
              <span className={styles.spacingVal}>
                {rem}rem / {px}px
              </span>
            </div>
          ))}
        </div>

        <CodeBlock
          lang="scss"
          code={`// All spacing classes follow the same pattern — replace m with:
// gs-m, gs-mt, gs-mb, gs-ml, gs-mr (margin)
// gs-p, gs-pt, gs-pb, gs-pl, gs-pr (padding)
// gs-gap (gap in flex/grid)

.card    { @extend .gs-p-5;   }   // padding: 1.618rem
.section { @extend .gs-mt-7;  }   // margin-top: 4.236rem
.list    { @extend .gs-gap-4; }   // gap: 1rem

// Use CSS custom properties anywhere:
.hero {
  padding: var(--gs-space-6) var(--gs-space-5);
  // → 2.618rem top/bottom, 1.618rem left/right
}`}
        />

        <PropTable
          rows={[
            {
              name: '--gs-space-1',
              type: '0.236rem',
              default: '~4px',
              description: 'φ⁻³ — micro / icon gap',
            },
            {
              name: '--gs-space-2',
              type: '0.382rem',
              default: '~6px',
              description: 'φ⁻² — tight spacing',
            },
            {
              name: '--gs-space-3',
              type: '0.618rem',
              default: '~10px',
              description: 'φ⁻¹ — compact padding',
            },
            {
              name: '--gs-space-4',
              type: '1rem',
              default: '16px',
              description: 'φ⁰  — base unit',
            },
            {
              name: '--gs-space-5',
              type: '1.618rem',
              default: '~26px',
              description: 'φ¹  — comfortable gap',
            },
            {
              name: '--gs-space-6',
              type: '2.618rem',
              default: '~42px',
              description: 'φ²  — section padding',
            },
            {
              name: '--gs-space-7',
              type: '4.236rem',
              default: '~68px',
              description: 'φ³  — page margin',
            },
            {
              name: '--gs-space-8',
              type: '6.854rem',
              default: '~110px',
              description: 'φ⁴  — large whitespace',
            },
            {
              name: '--gs-space-9',
              type: '11.09rem',
              default: '~177px',
              description: 'φ⁵  — hero spacing',
            },
          ]}
        />
      </Section>

      {/* Grid */}
      <Section title="Golden Ratio Grid" id="grid">
        <Prose>
          <p>
            The classic golden ratio layout: a major column at <strong>61.8%</strong> and minor at{' '}
            <strong>38.2%</strong>. Used by countless great publications, landing pages, and
            editorial designs.
          </p>
        </Prose>

        <Demo label="Golden grid — 61.8% / 38.2%">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '61.8% 38.2%',
              gap: '1rem',
              minHeight: '80px',
            }}
          >
            <div
              style={{
                background: 'rgba(232,224,200,0.12)',
                border: '1px solid rgba(232,224,200,0.2)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
              }}
            >
              61.8% — major
            </div>
            <div
              style={{
                background: 'rgba(232,224,200,0.06)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
              }}
            >
              38.2% — minor
            </div>
          </div>
        </Demo>

        <CodeBlock
          lang="scss"
          code={`// Pre-built grid classes:
// .gs-grid-golden         → 61.8% / 38.2%
// .gs-grid-golden-reverse → 38.2% / 61.8%
// .gs-grid-golden-3       → 23.6% / 38.2% / 38.2%

<div class="gs-grid-golden">
  <main>Main content (61.8%)</main>
  <aside>Sidebar (38.2%)</aside>
</div>

// Mixin — use anywhere:
.layout {
  @include golden-columns(var(--gs-space-5));
  // → grid-template-columns: 61.8% 1fr; gap: 1.618rem;
}

// Flexbox golden pair:
<div class="gs-flex-golden">
  <div>Grows at φ ratio</div>
  <div>Grows at 1 ratio</div>
</div>`}
        />
      </Section>

      {/* Aspect Ratios */}
      <Section title="Golden Aspect Ratios" id="aspect-ratios">
        <Demo label="Golden rectangle, portrait, and landscape">
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
            }}
          >
            {[
              {
                name: '.gs-ratio-golden',
                ratio: `${phi} / 1`,
                w: 120,
                h: 74,
                label: '1.618:1',
              },
              {
                name: '.gs-ratio-golden-portrait',
                ratio: `1 / ${phi}`,
                w: 74,
                h: 120,
                label: '1:1.618',
              },
              {
                name: '.gs-ratio-golden-landscape',
                ratio: `${phi * phi} / 1`,
                w: 140,
                h: 54,
                label: '2.618:1 φ²',
              },
            ].map(r => (
              <div
                key={r.name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <div
                  style={{
                    width: r.w,
                    height: r.h,
                    background: 'rgba(232,224,200,0.1)',
                    border: '1px solid rgba(232,224,200,0.3)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {r.label}
                  </span>
                </div>
                <code style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{r.name}</code>
              </div>
            ))}
          </div>
        </Demo>

        <CodeBlock
          lang="css"
          filename="Generated CSS"
          code={`.gs-ratio-golden          { aspect-ratio: 1.618 / 1; }  /* landscape golden rect */
.gs-ratio-golden-portrait { aspect-ratio: 1 / 1.618; }  /* portrait golden rect  */
.gs-ratio-golden-landscape{ aspect-ratio: 2.618 / 1; }  /* φ² ultra-wide         */`}
        />

        <CodeBlock
          lang="scss"
          filename="Using in SCSS"
          code={`// Cards with a golden image ratio
.product-card__image {
  @extend .gs-ratio-golden;
  width: 100%;
  object-fit: cover;
}

// Full-screen hero with golden portrait split
.hero {
  display: grid;
  @include golden-columns;

  &__visual {
    @extend .gs-ratio-golden-portrait;
  }
}`}
        />
      </Section>

      {/* Border radius */}
      <Section title="Golden Border Radius" id="border-radius">
        <CodeBlock
          lang="css"
          filename="Generated CSS"
          code={`.gs-rounded-phi    { border-radius: 0.618rem; }  /* φ⁻¹ — default card */
.gs-rounded-phi-sm { border-radius: 0.382rem; }  /* φ⁻² — tight/button */
.gs-rounded-phi-lg { border-radius: 1rem;     }  /* φ⁰  — large panel  */`}
        />
      </Section>

      {/* Mixin ref */}
      <Section title="Mixins & Functions Reference" id="reference">
        <PropTable
          rows={[
            {
              name: 'golden-step($n)',
              type: 'function',
              default: 'base: 1rem',
              description:
                'Returns φⁿ rem value. Positive = larger, negative = smaller. Output ∈ {0.236rem → 11.09rem}',
            },
            {
              name: 'golden-ratio-split($width)',
              type: 'function',
              default: '',
              description: 'Returns 61.8% of $width (major portion)',
            },
            {
              name: 'golden-ratio-minor($width)',
              type: 'function',
              default: '',
              description: 'Returns 38.2% of $width (minor portion)',
            },
            {
              name: '@mixin golden-columns($gap)',
              type: 'mixin',
              default: 'gap: 1rem',
              description: 'Two-column grid: 61.8% / 1fr with configurable gap',
            },
            {
              name: '@mixin golden-scale-type($step, $leading)',
              type: 'mixin',
              default: 'step:0, leading:φ',
              description: 'Sets font-size at golden step with line-height',
            },
            {
              name: '$phi',
              type: 'variable',
              default: '1.618…',
              description: 'Golden ratio constant. Override with !default.',
            },
            {
              name: '$phi-minor',
              type: 'variable',
              default: '0.618…',
              description: '1/φ — the minor/smaller portion',
            },
            {
              name: '$phi-base',
              type: 'variable',
              default: '1rem',
              description: 'Anchor for the scale. Change to alter all steps.',
            },
          ]}
        />
      </Section>
    </Page>
  )
}
