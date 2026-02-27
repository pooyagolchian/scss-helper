import CodeBlock from "../components/CodeBlock";
import {
	Callout,
	Demo,
	Page,
	PageHeader,
	PropTable,
	Prose,
	Section,
} from "../components/Page";

export default function Typography() {
	return (
		<Page>
			<PageHeader
				eyebrow="Utilities"
				title="Typography"
				description="Font size utilities, fluid type scale, font weight, font family, and text modifiers."
			/>

			<Section title="Font Size Helpers" id="font-size">
				<Prose>
					<p>
						Generated from the <code>$FONTS_MAP</code> Sass map in{" "}
						<code>_variables.scss</code>. Classes follow the{" "}
						<code>.fs-{name}</code> pattern.
					</p>
				</Prose>

				<CodeBlock
					lang="css"
					filename="Generated .fs-* classes"
					code={`.fs-xs    { font-size: 0.75rem;  }  /* 12px */
.fs-sm    { font-size: 0.875rem; }  /* 14px */
.fs-base  { font-size: 1rem;     }  /* 16px */
.fs-md    { font-size: 1.125rem; }  /* 18px */
.fs-lg    { font-size: 1.25rem;  }  /* 20px */
.fs-xl    { font-size: 1.5rem;   }  /* 24px */
.fs-2xl   { font-size: 2rem;     }  /* 32px */
.fs-3xl   { font-size: 2.5rem;   }  /* 40px */
.fs-4xl   { font-size: 3rem;     }  /* 48px */`}
				/>

				<CodeBlock
					lang="html"
					code={`<p class="fs-sm">Small caption text</p>
<p class="fs-base">Base body text</p>
<h3 class="fs-xl">Section heading</h3>
<h1 class="fs-3xl">Page title</h1>`}
				/>
			</Section>

			<Section title="Font Size Modifiers" id="modifiers">
				<Prose>
					<p>
						Named size classes from <code>_modifiers.scss</code>. Use these for
						semantic intent rather than numeric sizing.
					</p>
				</Prose>

				<CodeBlock
					lang="css"
					code={`.font-size-xsmall  { font-size: var(--font-size-xs); }
.font-size-small   { font-size: var(--font-size-sm); }
.font-size-medium  { font-size: var(--font-size-base); }
.font-size-large   { font-size: var(--font-size-lg); }
.font-size-xlarge  { font-size: var(--font-size-xl); }`}
				/>
			</Section>

			<Section title="Fluid Type Scale" id="fluid">
				<Prose>
					<p>
						Uses CSS <code>clamp()</code> to scale font size continuously
						between a minimum viewport width (<code>320px</code>) and a maximum
						(<code>1440px</code>). No media queries needed.
					</p>
				</Prose>

				<Demo label="Resize your window — these scale continuously">
					<div
						style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
					>
						{[
							{ cls: "text-fluid-xs", min: "12px", max: "14px" },
							{ cls: "text-fluid-sm", min: "14px", max: "18px" },
							{ cls: "text-fluid-base", min: "16px", max: "20px" },
							{ cls: "text-fluid-lg", min: "18px", max: "28px" },
							{ cls: "text-fluid-xl", min: "20px", max: "36px" },
							{ cls: "text-fluid-2xl", min: "24px", max: "48px" },
							{ cls: "text-fluid-3xl", min: "30px", max: "60px" },
							{ cls: "text-fluid-4xl", min: "36px", max: "80px" },
						].map(({ cls, min, max }) => (
							<div
								key={cls}
								style={{ display: "flex", alignItems: "center", gap: "1rem" }}
							>
								<code
									style={{
										fontSize: "0.7rem",
										color: "var(--accent)",
										fontFamily: "var(--font-mono)",
										minWidth: "140px",
									}}
								>
									.{cls}
								</code>
								<span
									style={{
										color: "var(--text-muted)",
										fontSize: "0.7rem",
										minWidth: "120px",
										fontFamily: "var(--font-mono)",
									}}
								>
									{min} → {max}
								</span>
							</div>
						))}
					</div>
				</Demo>

				<CodeBlock
					lang="scss"
					filename="src/typography/_fluid.scss"
					code={`// The fluid-type() function uses clamp() for smooth scaling:
// fluid-type($min-size, $max-size, $min-vw: 320px, $max-vw: 1440px)

.hero-title {
  font-size: fluid-type(32px, 80px);
  // → clamp(2rem, calc(2rem + 3vw), 5rem)
}

// Or use the pre-built classes:
.gs-text-fluid-4xl { font-size: clamp(2.25rem, 5vw + 1rem, 5rem); }`}
				/>

				<CodeBlock
					lang="html"
					code={`<h1 class="text-fluid-4xl">Big fluid heading</h1>
<h2 class="text-fluid-2xl">Section fluid heading</h2>
<p  class="text-fluid-base">Body that grows gently</p>`}
				/>

				<Callout type="tip">
					Combine fluid type with the golden ratio scale: use{" "}
					<code>golden-step()</code> to set min/max values for{" "}
					<code>fluid-type()</code>.
				</Callout>
			</Section>

			<Section title="Font Weight" id="font-weight">
				<CodeBlock
					lang="css"
					code={`.font-thin       { font-weight: 100; }
.font-light      { font-weight: 300; }
.font-normal     { font-weight: 400; }
.font-medium     { font-weight: 500; }
.font-semibold   { font-weight: 600; }
.font-bold       { font-weight: 700; }
.font-extrabold  { font-weight: 800; }
.font-black      { font-weight: 900; }`}
				/>
			</Section>

			<Section title="Text Utilities" id="text-utilities">
				<CodeBlock
					lang="css"
					code={`/* Alignment */
.text-left   { text-align: left;   }
.text-center { text-align: center; }
.text-right  { text-align: right;  }

/* Transform */
.uppercase   { text-transform: uppercase;  }
.lowercase   { text-transform: lowercase;  }
.capitalize  { text-transform: capitalize; }

/* Decoration */
.underline   { text-decoration: underline; }
.no-underline{ text-decoration: none;      }

/* Overflow */
.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}`}
				/>
			</Section>
		</Page>
	);
}
