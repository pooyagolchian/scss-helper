import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
import { Badge, Page, PageHeader, Prose, Section } from "../components/Page";
import styles from "./Home.module.css";

const features = [
	{
		icon: "✦",
		label: "Golden Ratio",
		desc: "φ-derived typography, spacing, grid, and aspect ratios",
		to: "/golden-ratio",
		badge: "new",
	},
	{
		icon: "⬛",
		label: "Design Tokens",
		desc: "All variables as CSS custom properties — works with Tailwind v4",
		to: "/tokens",
		badge: "utility",
	},
	{
		icon: "◈",
		label: "Fluid Typography",
		desc: "clamp()-based font scaling with zero media queries",
		to: "/typography",
		badge: "utility",
	},
	{
		icon: "▦",
		label: "CSS Grid",
		desc: "12-column grid with responsive breakpoint variants",
		to: "/grid",
		badge: "utility",
	},
	{
		icon: "◐",
		label: "Dark Mode",
		desc: '[data-theme="dark"] + prefers-color-scheme auto toggling',
		to: "/dark-mode",
		badge: "utility",
	},
	{
		icon: "◻",
		label: "Container Queries",
		desc: "Component-level breakpoints with @container",
		to: "/container-queries",
		badge: "new",
	},
	{
		icon: "▷",
		label: "Animations",
		desc: "12 keyframe animations with reduced-motion guard",
		to: "/animations",
		badge: "utility",
	},
	{
		icon: "⚡",
		label: "Tailwind Plugin",
		desc: "Inject all tokens and utilities into Tailwind v3/v4",
		to: "/tailwind-plugin",
		badge: "new",
	},
];

export default function Home() {
	return (
		<Page>
			<div className={styles.hero}>
				<div className={styles.heroEyebrow}>
					<span className={styles.phi}>φ</span>
					<span>scss-helper v3.0</span>
				</div>
				<h1 className={styles.heroTitle}>
					Fill the Gaps.
					<br />
					Design with Precision.
				</h1>
				<p className={styles.heroDesc}>
					A SCSS utility toolkit that bridges what Tailwind can't. Design
					tokens, fluid typography, container queries, dark mode, golden ratio
					proportions — all in one composable system.
				</p>
				<div className={styles.heroCtas}>
					<Link to="/getting-started" className={styles.ctaPrimary}>
						Get Started
					</Link>
					<a
						href="https://github.com/pooyagolchian/scss-helper"
						target="_blank"
						rel="noreferrer"
						className={styles.ctaGhost}
					>
						GitHub ↗
					</a>
				</div>
				<div className={styles.heroInstall}>
					<CodeBlock lang="bash" code={`pnpm add scss-helper`} />
				</div>
			</div>

			<Section title="What's inside">
				<div className={styles.featureGrid}>
					{features.map((f) => (
						<Link key={f.to} to={f.to} className={styles.featureCard}>
							<span className={styles.featureIcon}>{f.icon}</span>
							<div className={styles.featureBody}>
								<div className={styles.featureTop}>
									<span className={styles.featureName}>{f.label}</span>
									<Badge variant={f.badge}>{f.badge}</Badge>
								</div>
								<p className={styles.featureDesc}>{f.desc}</p>
							</div>
						</Link>
					))}
				</div>
			</Section>

			<Section title="Three ways to use it">
				<Prose>
					<p>Pick whatever integration fits your workflow.</p>
				</Prose>

				<CodeBlock
					lang="scss"
					filename="1. SCSS source — @import everything"
					code={`// In your main SCSS file
@import 'scss-helper';          // via node_modules + sass load path

// Or cherry-pick individual modules:
@import '~scss-helper/src/tokens/index';
@import '~scss-helper/src/typography/fluid';
@import '~scss-helper/src/golden/golden-ratio';`}
				/>

				<CodeBlock
					lang="css"
					filename="2. Pre-compiled CSS drop-in"
					code={`/* All utilities */
<link rel="stylesheet" href="node_modules/scss-helper/dist/style.css">

/* Grid only */
<link rel="stylesheet" href="node_modules/scss-helper/dist/only-css-grid.css">

/* Design tokens only (:root vars, 2KB) */
<link rel="stylesheet" href="node_modules/scss-helper/dist/tokens.css">`}
				/>

				<CodeBlock
					lang="js"
					filename="3. Tailwind v3 plugin (tailwind.config.js)"
					code={`const scssHelper = require('scss-helper/plugin');

module.exports = {
  plugins: [
    scssHelper({
      injectTokens: true,   // inject :root CSS custom properties
    }),
  ],
  // Theme extensions are added automatically:
  // colors: { primary, secondary, success, info, warning, danger }
  // fontSize: { 'fluid-xs' … 'fluid-4xl' }
};`}
				/>
			</Section>
		</Page>
	);
}
