import CodeBlock from '../components/CodeBlock'
import { Demo, Page, PageHeader, Prose, Section, SubSection } from '../components/Page'

export default function Animations() {
  return (
    <Page>
      <PageHeader
        eyebrow="Utilities"
        title="Animations & Transitions"
        description="Pre-built keyframe animations and transition helpers, all prefixed with sh- to avoid Tailwind collisions. Includes a prefers-reduced-motion guard."
      />

      <Section title="Animations" id="animations">
        <Prose>
          <p>
            12 keyframe animations with customizable timing via CSS custom properties.
          </p>
        </Prose>

        <CodeBlock
          lang="html"
          code={`<div class="sh-animate-fade-in">Fades in</div>
<div class="sh-animate-slide-up sh-delay-200">Slides up after 200ms</div>
<div class="sh-animate-spin">Loading spinner</div>`}
        />

        <CodeBlock
          lang="css"
          filename="Available animations"
          code={`.sh-animate-fade-in      /* Opacity 0 → 1 */
.sh-animate-fade-out     /* Opacity 1 → 0 */
.sh-animate-slide-up     /* Slide from below */
.sh-animate-slide-down   /* Slide from above */
.sh-animate-slide-left   /* Slide from right */
.sh-animate-slide-right  /* Slide from left */
.sh-animate-scale-in     /* Scale 95% → 100% */
.sh-animate-spin         /* Continuous rotation */
.sh-animate-ping         /* Ping/ripple effect */
.sh-animate-pulse        /* Opacity pulse */
.sh-animate-bounce       /* Bounce */
.sh-animate-wiggle       /* Wiggle rotation */
.sh-animate-none         /* Remove animation */`}
        />
      </Section>

      <Section title="Animation Modifiers" id="modifiers">
        <SubSection title="Delays">
          <CodeBlock
            lang="css"
            code={`.sh-delay-75    { animation-delay:  75ms; }
.sh-delay-100   { animation-delay: 100ms; }
.sh-delay-150   { animation-delay: 150ms; }
.sh-delay-200   { animation-delay: 200ms; }
.sh-delay-300   { animation-delay: 300ms; }
.sh-delay-500   { animation-delay: 500ms; }
.sh-delay-700   { animation-delay: 700ms; }
.sh-delay-1000  { animation-delay:   1s;  }`}
          />
        </SubSection>

        <SubSection title="Iteration & Fill">
          <CodeBlock
            lang="css"
            code={`.sh-animate-once      { animation-iteration-count: 1; }
.sh-animate-twice     { animation-iteration-count: 2; }
.sh-animate-infinite  { animation-iteration-count: infinite; }

.sh-animate-fill-both     { animation-fill-mode: both; }
.sh-animate-fill-forwards { animation-fill-mode: forwards; }`}
          />
        </SubSection>
      </Section>

      <Section title="Custom Timing" id="custom">
        <Prose>
          <p>
            Override duration and easing per-element using CSS custom properties.
          </p>
        </Prose>
        <CodeBlock
          lang="html"
          code={`<div class="sh-animate-fade-in" style="--duration: 500ms; --easing: ease-in-out">
  Custom timing
</div>`}
        />
      </Section>

      <Section title="Transitions" id="transitions">
        <CodeBlock
          lang="css"
          code={`.sh-transition           /* All properties */
.sh-transition-none      /* No transition */
.sh-transition-colors    /* Color, bg, border */
.sh-transition-opacity   /* Opacity */
.sh-transition-transform /* Transform */
.sh-transition-shadow    /* Box-shadow */

/* Duration */
.sh-duration-fast  { --duration: 100ms; }
.sh-duration-slow  { --duration: 400ms; }

/* Easing */
.sh-ease-in      { --easing: cubic-bezier(0.4, 0, 1, 1); }
.sh-ease-out     { --easing: cubic-bezier(0, 0, 0.2, 1); }
.sh-ease-bounce  { --easing: cubic-bezier(0.34, 1.56, 0.64, 1); }`}
        />

        <CodeBlock
          lang="html"
          code={`<button class="sh-transition-colors sh-duration-fast">
  Hover me for a smooth color change
</button>`}
        />
      </Section>

      <Section title="SCSS Mixin" id="mixin">
        <CodeBlock
          lang="scss"
          code={`@use 'scss-helper/src/animation/transitions' as tr;

.button {
  @include tr.transition(opacity transform, 200ms, ease-out);
}`}
        />
      </Section>

      <Section title="Accessibility" id="a11y">
        <Prose>
          <p>
            All animations and transitions are automatically disabled for users who set{' '}
            <code>prefers-reduced-motion: reduce</code> in their OS settings.
          </p>
        </Prose>
        <CodeBlock
          lang="css"
          code={`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}
        />
      </Section>
    </Page>
  )
}
