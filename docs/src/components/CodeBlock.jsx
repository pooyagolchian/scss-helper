import { useState } from "react";
import styles from "./CodeBlock.module.css";

// Lightweight tokenizer for noir syntax highlighting
function tokenize(code, lang) {
	if (!code) return [];

	const tokens = [];
	let rest = code;

	const patterns = {
		scss: [
			{ type: "comment", re: /^(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/ },
			{ type: "string", re: /^(["'`][^"'`]*["'`])/ },
			{ type: "property", re: /^(--[\w-]+)/ },
			{ type: "at-rule", re: /^(@[\w-]+)/ },
			{ type: "variable", re: /^(\$[\w-]+)/ },
			{ type: "function", re: /^([\w-]+(?=\())/ },
			{ type: "keyword", re: /^(true|false|null|and|or|not)(?=\W)/ },
			{ type: "number", re: /^([\d.]+(%|rem|em|px|vh|vw|s|ms)?)(?=\W|$)/ },
			{ type: "punct", re: /^([{}();:,])/ },
			{
				type: "selector",
				re: /^([.#&>~+*[\]()^$|=@][\w-.*[\]()^$|=@:\s]*)(?={)/,
			},
			{ type: "plain", re: /^([\w-]+)/ },
			{ type: "ws", re: /^(\s+)/ },
			{ type: "other", re: /^(.)/ },
		],
		css: [],
		bash: [
			{ type: "comment", re: /^(#[^\n]*)/ },
			{ type: "string", re: /^(["'][^"']*["'])/ },
			{ type: "keyword", re: /^(pnpm|npm|yarn|sass|postcss|node)\b/ },
			{ type: "flag", re: /^(--[\w-]+|-\w)\b/ },
			{ type: "plain", re: /^([\w./\-@:]+)/ },
			{ type: "ws", re: /^(\s+)/ },
			{ type: "other", re: /^(.)/ },
		],
		js: [
			{ type: "comment", re: /^(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/ },
			{ type: "string", re: /^(["'`][^"'`\n]*["'`])/ },
			{
				type: "keyword",
				re: /^(import|export|from|const|let|var|function|return|require|module|default|true|false|null)\b/,
			},
			{ type: "property", re: /^(--[\w-]+)/ },
			{ type: "function", re: /^([\w$]+(?=\())/ },
			{ type: "plain", re: /^([\w$]+)/ },
			{ type: "punct", re: /^([{}();:,./=<>!&|+\-*[\]])/ },
			{ type: "ws", re: /^(\s+)/ },
			{ type: "other", re: /^(.)/ },
		],
	};

	patterns.css = patterns.scss;

	const ruleset = patterns[lang] || patterns.scss;

	while (rest.length > 0) {
		let matched = false;
		for (const { type, re } of ruleset) {
			const m = rest.match(re);
			if (m) {
				tokens.push({ type, value: m[1] });
				rest = rest.slice(m[1].length);
				matched = true;
				break;
			}
		}
		if (!matched) {
			tokens.push({ type: "other", value: rest[0] });
			rest = rest.slice(1);
		}
	}
	return tokens;
}

const colorMap = {
	comment: "#555",
	string: "#c8b97a",
	property: "#a0c4ff",
	"at-rule": "#e8a0a0",
	variable: "#d4a8f0",
	function: "#8dcfb0",
	keyword: "#e8a0a0",
	number: "#c8b97a",
	punct: "#666",
	selector: "#c0c0c0",
	flag: "#a0c4ff",
	plain: "#ccc",
	ws: null,
	other: "#888",
};

function Highlighted({ code, lang }) {
	const tokens = tokenize(code.trim(), lang);
	return (
		<code>
			{tokens.map((t, i) => {
				const color = colorMap[t.type];
				if (!color) return t.value;
				return (
					<span key={`${t.type}-${i}`} style={{ color }}>
						{t.value}
					</span>
				);
			})}
		</code>
	);
}

export default function CodeBlock({ code, lang = "scss", filename }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code.trim());
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// fallback for non-secure contexts
			const el = document.createElement("textarea");
			el.value = code.trim();
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className={styles.wrap}>
			<div className={styles.bar}>
				<span className={styles.lang}>{filename || lang}</span>
				<button					type="button"					className={`${styles.copy} ${copied ? styles.copied : ""}`}
					onClick={handleCopy}
					aria-label="Copy code"
				>
					{copied ? "✓ Copied" : "Copy"}
				</button>
			</div>
			<pre className={styles.pre}>
				<Highlighted code={code} lang={lang} />
			</pre>
		</div>
	);
}
