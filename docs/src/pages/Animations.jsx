import { useState } from "react";
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

const animations = [
	{ name: "fade-in", desc: "Fade from opacity 0 to 1" },
	{ name: "fade-out", desc: "Fade from opacity 1 to 0" },
	{ name: "slide-up", desc: "Slide up from 20px below" },
	{ name: "slide-down", desc: "Slide down from 20px above" },
	{ name: "slide-left", desc: "Slide in from right (20px)" },
	{ name: "slide-right", desc: "Slide in from left (20px)" },
	{ name: "spin", desc: "Continuous 360° rotation" },
	{ name: "ping", desc: "Scale + fade pulse (notification dot)" },
	{ name: "pulse", desc: "Opacity pulse (skeleton loading)" },
	{ name: "bounce", desc: "Vertical bounce" },
	{ name: "scale-in", desc: "Scale from 0.95 with fade" },
	{ name: "wiggle", desc: "Side-to-side wiggle" },
];

export default function Animations() {
	const [active, setActive] = useState(null);

	return (
		<Page>
			<PageHeader
				eyebrow="Utilities"
				title="Animations & Transitions"
				description="12 ready-to-use keyframe animations, transition utility classes, delay helpers — all with a prefers-reduced-motion guard built in."
			/>

			<Section title="Animation classes" id="animations">
				<Prose>
					<p>
						Add <code>.animate-{"{name}"}</code> to any element. Click a card to
						preview.
					</p>
				</Prose>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
						gap: "0.5rem",
						margin: "1.5rem 0",
					}}
				>
					{animations.map(({ name, desc }) => (
						<button
							type="button"
							key={name}
							style={{
								padding: "1rem",
								background: "var(--bg-card)",
								border: "1px solid var(--border)",
								borderRadius: "8px",
								cursor: "pointer",
								textAlign: "left",
								width: "100%",
							}}
							onClick={() => setActive(active === name ? null : name)}
						>
							<div
								style={{
									height: "40px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginBottom: "0.5rem",
								}}
							>
								<div
									style={{
										width: "24px",
										height: "24px",
										borderRadius: "50%",
										background: "var(--accent)",
										opacity: active === name ? 1 : 0.4,
										animation:
											active === name ? `${name} 1s ease infinite` : "none",
									}}
								/>
							</div>
							<code
								style={{
									fontSize: "0.7rem",
									color: "var(--accent)",
									display: "block",
									fontFamily: "var(--font-mono)",
									marginBottom: "0.25rem",
								}}
							>
								.animate-{name}
							</code>
							<span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
								{desc}
							</span>
						</button>
					))}
				</div>

				<CodeBlock
					lang="html"
					code={`<div class="animate-fade-in">Fades in</div>
<div class="animate-slide-up">Slides up</div>
<div class="animate-scale-in">Scales in</div>

<!-- Loading states -->
<div class="animate-spin">⚙</div>
<div class="animate-pulse">Loading skeleton</div>
<div class="animate-ping">🔴 Notification</div>`}
				/>
			</Section>

			<Section title="Animation delay helpers" id="delays">
				<CodeBlock
					lang="css"
					code={`.animate-delay-75  { animation-delay: 75ms;  }
.animate-delay-100 { animation-delay: 100ms; }
.animate-delay-150 { animation-delay: 150ms; }
.animate-delay-200 { animation-delay: 200ms; }
.animate-delay-300 { animation-delay: 300ms; }
.animate-delay-500 { animation-delay: 500ms; }
.animate-delay-700 { animation-delay: 700ms; }
.animate-delay-1000{ animation-delay: 1000ms;}`}
				/>

				<CodeBlock
					lang="html"
					code={`<!-- Stagger cards on page load: -->
<div class="animate-slide-up animate-delay-100">Card 1</div>
<div class="animate-slide-up animate-delay-200">Card 2</div>
<div class="animate-slide-up animate-delay-300">Card 3</div>`}
				/>
			</Section>

			<Section title="Transition utilities" id="transitions">
				<PropTable
					rows={[
						{
							name: ".transition",
							type: "all 200ms ease",
							default: "",
							description: "Transition all properties",
						},
						{
							name: ".transition-colors",
							type: "color, background-color, border-color",
							default: "200ms",
							description: "Smooth color changes",
						},
						{
							name: ".transition-opacity",
							type: "opacity",
							default: "200ms",
							description: "Fade in/out",
						},
						{
							name: ".transition-transform",
							type: "transform",
							default: "200ms",
							description: "Move/scale/rotate",
						},
						{
							name: ".transition-shadow",
							type: "box-shadow",
							default: "200ms",
							description: "Shadow hover effects",
						},
						{
							name: ".duration-75",
							type: "animation-duration",
							default: "",
							description: "75ms",
						},
						{
							name: ".duration-100",
							type: "",
							default: "",
							description: "100ms",
						},
						{
							name: ".duration-200",
							type: "",
							default: "",
							description: "200ms",
						},
						{
							name: ".duration-300",
							type: "",
							default: "",
							description: "300ms (default)",
						},
						{
							name: ".duration-500",
							type: "",
							default: "",
							description: "500ms",
						},
						{
							name: ".ease-linear",
							type: "linear",
							default: "",
							description: "Linear easing",
						},
						{
							name: ".ease-in",
							type: "ease-in",
							default: "",
							description: "Ease in",
						},
						{
							name: ".ease-out",
							type: "ease-out",
							default: "",
							description: "Ease out (most natural)",
						},
						{
							name: ".ease-in-out",
							type: "ease-in-out",
							default: "",
							description: "Ease in + out",
						},
					]}
				/>

				<CodeBlock
					lang="html"
					code={`<button class="transition-colors duration-200 ease-out">
  Smooth color transition
</button>

<div class="transition-transform duration-300 ease-out">
  Smooth scale/move animation
</div>

<img class="transition-opacity duration-500">
  Fade in image
</img>`}
				/>

				<CodeBlock
					lang="scss"
					filename="Use the mixin for custom transitions"
					code={`// @mixin transition($properties, $duration, $easing)
.button {
  @include transition(background-color border-color, 150ms, ease-out);
}

// Use timing custom properties in your own SCSS:
.card {
  transition: transform var(--duration, 200ms) var(--easing, ease-out);
}

:root {
  --duration: 200ms;
  --easing: cubic-bezier(0.4, 0, 0.2, 1);
}`}
				/>
			</Section>

			<Section title="Reduced motion" id="a11y">
				<Callout type="tip">
					Every <code>.animate-*</code> and <code>.transition-*</code> class is
					automatically disabled for users who have{" "}
					<strong>prefers-reduced-motion: reduce</strong> set in their OS
					settings. No extra work required.
				</Callout>

				<CodeBlock
					lang="css"
					filename="Built-in accessibility guard"
					code={`@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-slide-up,
  /* ... all animate classes ... */
  .transition,
  .transition-colors {
    animation: none !important;
    transition: none !important;
  }
}`}
				/>
			</Section>
		</Page>
	);
}
