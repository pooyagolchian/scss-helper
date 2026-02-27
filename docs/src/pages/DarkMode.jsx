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

export default function DarkMode() {
	return (
		<Page>
			<PageHeader
				eyebrow="Utilities"
				title="Dark Mode"
				description="Dual-strategy dark mode: add data-theme='dark' to your root element for manual control, or let the browser's prefers-color-scheme handle it automatically."
			/>

			<Section title="How it works" id="how">
				<Prose>
					<p>
						The dark mode module outputs overrides under two selectors
						simultaneously:
						<code>[data-theme="dark"]</code> for JS-toggled control and
						<code>@media (prefers-color-scheme: dark)</code> for system-level
						preference. No duplication — a single mixin generates both.
					</p>
				</Prose>

				<CodeBlock
					lang="scss"
					filename="src/dark/_dark-mode.scss"
					code={`// The @mixin dark-mode generates overrides in both contexts:
@mixin dark-mode {
  [data-theme="dark"] & { @content; }

  @media (prefers-color-scheme: dark) {
    & { @content; }
  }
}

// Usage:
.card {
  background: #fff;
  color: #111;

  @include dark-mode {
    background: #1a1a1a;
    color: #f4f4f4;
  }
}`}
				/>
			</Section>

			<Section title="Toggle with JavaScript" id="js-toggle">
				<Demo label="Click to simulate dark mode toggle">
					<div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
						<button
							type="button"
							style={{
								padding: "0.5rem 1rem",
								borderRadius: "6px",
								border: "1px solid var(--border)",
								background: "var(--bg-card)",
								color: "var(--text)",
								cursor: "pointer",
								fontFamily: "var(--font-mono)",
								fontSize: "0.8rem",
							}}
							onClick={() => {
								const current =
									document.documentElement.getAttribute("data-theme");
								document.documentElement.setAttribute(
									"data-theme",
									current === "dark" ? "light" : "dark",
								);
							}}
						>
							Toggle data-theme
						</button>
						<span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
							Toggles on &lt;html&gt;
						</span>
					</div>
				</Demo>

				<CodeBlock
					lang="js"
					code={`// Toggle dark mode:
const root = document.documentElement
function toggleDark() {
  const current = root.getAttribute('data-theme')
  root.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark')
}

// Persist preference:
function setTheme(theme) {
  root.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

// Restore on page load (put this in <head>):
const saved = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
root.setAttribute('data-theme', saved)`}
				/>
			</Section>

			<Section title="Dark mode utilities" id="utilities">
				<Prose>
					<p>
						Utility classes with the <code>.dark:</code> prefix override color
						in dark mode.
					</p>
				</Prose>

				<CodeBlock
					lang="html"
					code={`<!-- Text color in dark mode -->
<p class="dark:text-white">White in dark</p>
<p class="dark:text-light">Light gray in dark</p>

<!-- Background in dark mode -->
<div class="dark:bg-dark">Dark background</div>
<div class="dark:bg-darker">Darker background</div>`}
				/>

				<CodeBlock
					lang="css"
					filename="Generated .dark: classes"
					code={`/* Available dark: text colors */
.dark:text-white  { }
.dark:text-light  { }
.dark:text-silver { }
.dark:text-gray   { }

/* Available dark: background colors */
.dark:bg-dark   { }
.dark:bg-darker { }
.dark:bg-black  { }

/* All of the above apply under:
   [data-theme="dark"] .dark:*
   @media (prefers-color-scheme: dark) .dark:* */`}
				/>
			</Section>

			<Section title="Custom dark theme" id="custom">
				<CodeBlock
					lang="scss"
					code={`// Override design tokens for dark theme
[data-theme="dark"] {
  // Color tokens
  --color-white: #f4f4f4;
  --color-dark:  #1a1a1a;

  // Custom component tokens
  --card-bg:      #1e1e1e;
  --card-border:  #2d2d2d;
  --input-bg:     #252525;
  --button-hover: #333;
}

// Or use the mixin in component styles:
.nav {
  background: var(--color-white);

  @include dark-mode {
    background: var(--card-bg, #1e1e1e);
    border-bottom: 1px solid var(--card-border, #2d2d2d);
  }
}`}
				/>

				<Callout type="tip">
					Define your dark values as CSS custom properties — this lets you
					override from JavaScript or from the top of your stylesheet without
					recompiling SCSS.
				</Callout>
			</Section>
		</Page>
	);
}
