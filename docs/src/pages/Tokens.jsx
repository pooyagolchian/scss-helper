import CodeBlock from "../components/CodeBlock";
import {
	Callout,
	Demo,
	Grid2,
	Page,
	PageHeader,
	PropTable,
	Prose,
	Section,
	SubSection,
} from "../components/Page";
import styles from "./Tokens.module.css";

const colorTokens = [
	{ name: "--color-white", hex: "#ffffff", text: "dark" },
	{ name: "--color-light", hex: "#f4f4f4", text: "dark" },
	{ name: "--color-lighter", hex: "#e9e9e9", text: "dark" },
	{ name: "--color-lightgray", hex: "#d3d3d3", text: "dark" },
	{ name: "--color-silver", hex: "#c0c0c0", text: "dark" },
	{ name: "--color-gray", hex: "#808080", text: "light" },
	{ name: "--color-dimgray", hex: "#696969", text: "light" },
	{ name: "--color-darkgray", hex: "#a9a9a9", text: "dark" },
	{ name: "--color-dark", hex: "#333333", text: "light" },
	{ name: "--color-darker", hex: "#222222", text: "light" },
	{ name: "--color-black", hex: "#000000", text: "light" },
	{ name: "--color-primary", hex: "#007bff", text: "light" },
	{ name: "--color-secondary", hex: "#6c757d", text: "light" },
	{ name: "--color-success", hex: "#28a745", text: "light" },
	{ name: "--color-warning", hex: "#ffc107", text: "dark" },
	{ name: "--color-error", hex: "#dc3545", text: "light" },
	{ name: "--color-info", hex: "#17a2b8", text: "light" },
];

const fontSizeTokens = [
	{ name: "--font-size-xs", val: "0.75rem", px: "12px" },
	{ name: "--font-size-sm", val: "0.875rem", px: "14px" },
	{ name: "--font-size-base", val: "1rem", px: "16px" },
	{ name: "--font-size-lg", val: "1.125rem", px: "18px" },
	{ name: "--font-size-xl", val: "1.25rem", px: "20px" },
	{ name: "--font-size-2xl", val: "1.5rem", px: "24px" },
	{ name: "--font-size-3xl", val: "1.875rem", px: "30px" },
	{ name: "--font-size-4xl", val: "2.25rem", px: "36px" },
];

export default function Tokens() {
	return (
		<Page>
			<PageHeader
				eyebrow="Foundations"
				title="Design Tokens"
				description="Global CSS custom properties (variables) that power the entire library. Override any token on :root to theme the whole system."
			/>

			<Section title="Colors" id="colors">
				<Prose>
					<p>
						All colors are exposed as CSS custom properties. The Sass{" "}
						<code>$color-*</code> variables are also available for SCSS usage.
					</p>
				</Prose>

				<div className={styles.colorGrid}>
					{colorTokens.map((t) => (
						<div
							key={t.name}
							className={styles.swatch}
							style={{ background: t.hex }}
						>
							<span
								className={styles.swatchName}
								style={{ color: t.text === "light" ? "#fff" : "#000" }}
							>
								{t.name}
							</span>
							<span
								className={styles.swatchHex}
								style={{
									color:
										t.text === "light"
											? "rgba(255,255,255,0.6)"
											: "rgba(0,0,0,0.5)",
								}}
							>
								{t.hex}
							</span>
						</div>
					))}
				</div>

				<CodeBlock
					lang="css"
					filename="Override any color on :root"
					code={`:root {
  --color-primary: #6366f1;   /* indigo */
  --color-success: #10b981;   /* emerald */
  --color-warning: #f59e0b;   /* amber */
  --color-error:   #ef4444;   /* red */
}`}
				/>

				<CodeBlock
					lang="scss"
					filename="Use Sass variables in SCSS"
					code={`@import 'scss-helper/src/tokens/colors';

.button {
  background: $color-primary;
  color: $color-white;

  &:hover {
    background: darken($color-primary, 10%);
  }
}`}
				/>
			</Section>

			<Section title="Spacing" id="spacing">
				<Prose>
					<p>
						Spacing tokens on a <code>0.25rem</code> (4px) scale. 25 steps from
						0 to 96 (0 → 24rem).
					</p>
				</Prose>

				<CodeBlock
					lang="css"
					filename="Key spacing tokens"
					code={`:root {
  --spacing-0:  0;
  --spacing-1:  0.25rem;   /*  4px */
  --spacing-2:  0.5rem;    /*  8px */
  --spacing-3:  0.75rem;   /* 12px */
  --spacing-4:  1rem;      /* 16px */
  --spacing-5:  1.25rem;   /* 20px */
  --spacing-6:  1.5rem;    /* 24px */
  --spacing-8:  2rem;      /* 32px */
  --spacing-10: 2.5rem;    /* 40px */
  --spacing-12: 3rem;      /* 48px */
  --spacing-16: 4rem;      /* 64px */
  --spacing-20: 5rem;      /* 80px */
  --spacing-24: 6rem;      /* 96px */
  --spacing-32: 8rem;      /* 128px */
  --spacing-40: 10rem;     /* 160px */
  --spacing-48: 12rem;     /* 192px */
  --spacing-64: 16rem;     /* 256px */
  --spacing-96: 24rem;     /* 384px */
}`}
				/>

				<CodeBlock
					lang="scss"
					filename="Use Sass spacing map"
					code={`@import 'scss-helper/src/tokens/spacing';

// $spacing-scale is exported as a Sass map
.card {
  padding: map-get($spacing-scale, 4) map-get($spacing-scale, 6);
  // → padding: 1rem 1.5rem
}

// Or use the CSS custom property directly:
.section {
  padding-block: var(--spacing-16);
}`}
				/>
			</Section>

			<Section title="Typography" id="typography">
				<div className={styles.typeTable}>
					{fontSizeTokens.map((t) => (
						<div key={t.name} className={styles.typeRow}>
							<code className={styles.typeName}>{t.name}</code>
							<span
								style={{
									fontSize: t.val,
									lineHeight: 1,
									color: "var(--text)",
									fontFamily: "var(--font-sans)",
								}}
							>
								Ag
							</span>
							<span className={styles.typeVal}>
								{t.val} / {t.px}
							</span>
						</div>
					))}
				</div>

				<CodeBlock
					lang="css"
					filename="All typography tokens"
					code={`:root {
  /* Font sizes */
  --font-size-xs:   0.75rem;
  --font-size-sm:   0.875rem;
  --font-size-base: 1rem;
  --font-size-lg:   1.125rem;
  --font-size-xl:   1.25rem;
  --font-size-2xl:  1.5rem;
  --font-size-3xl:  1.875rem;
  --font-size-4xl:  2.25rem;

  /* Font weights */
  --font-weight-thin:       100;
  --font-weight-light:      300;
  --font-weight-normal:     400;
  --font-weight-medium:     500;
  --font-weight-semibold:   600;
  --font-weight-bold:       700;
  --font-weight-extrabold:  800;
  --font-weight-black:      900;

  /* Line heights */
  --line-height-none:   1;
  --line-height-tight:  1.25;
  --line-height-snug:   1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed:1.625;
  --line-height-loose:  2;
}`}
				/>
			</Section>

			<Section title="Importing the standalone tokens CSS" id="import">
				<Prose>
					<p>
						Use the pre-compiled token bundle without any SCSS tooling — just
						add it to your HTML before any other stylesheet.
					</p>
				</Prose>
				<CodeBlock
					lang="html"
					code={`<!-- NPM -->
<link rel="stylesheet" href="node_modules/scss-helper/dist/tokens.css">

<!-- Import in CSS -->
@import 'scss-helper/dist/tokens.css';`}
				/>
				<CodeBlock
					lang="js"
					filename="In a JS bundler"
					code={`import 'scss-helper/css/tokens'`}
				/>

				<Callout type="tip">
					The tokens CSS output is only ~2KB — safe to import globally in any
					project.
				</Callout>
			</Section>
		</Page>
	);
}
