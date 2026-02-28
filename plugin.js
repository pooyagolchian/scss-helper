// =============================================================================
// scss-helper Tailwind CSS v3 Plugin
//
// Usage in tailwind.config.js:
//   const scssHelper = require('scss-helper/plugin');
//
//   module.exports = {
//     plugins: [scssHelper],
//     // or with options:
//     plugins: [scssHelper({ darkMode: 'class', injectTokens: true })],
//   };
//
// What this plugin does:
//   1. addBase     — injects :root design tokens (colors, spacing, typography)
//   2. addUtilities — registers scss-helper utility classes (sh-* prefixed)
//   3. theme.extend — exposes tokens into the Tailwind theme
// =============================================================================
const plugin = require('tailwindcss/plugin');

// Design tokens — kept in sync with src/tokens/
const colors = {
  white:       '#fff',
  black:       '#000',
  'gray-100':  '#f8f9fa',
  'gray-200':  '#e9ecef',
  'gray-300':  '#dee2e6',
  'gray-400':  '#ced4da',
  'gray-500':  '#adb5bd',
  'gray-600':  '#6c757d',
  'gray-700':  '#495057',
  'gray-800':  '#343a40',
  'gray-900':  '#212529',
  blue:        '#0d6efd',
  indigo:      '#6610f2',
  purple:      '#6f42c1',
  pink:        '#d63384',
  red:         '#dc3545',
  orange:      '#fd7e14',
  yellow:      '#ffc107',
  green:       '#28a745',
  teal:        '#20c997',
  cyan:        '#17a2b8',
  primary:     '#0d6efd',
  secondary:   '#6c757d',
  success:     '#28a745',
  info:        '#17a2b8',
  warning:     '#ffc107',
  danger:      '#dc3545',
  light:       '#f8f9fa',
  dark:        '#343a40',
};

const spacingScale = {
  1:  '0.25rem',
  2:  '0.5rem',
  3:  '0.75rem',
  4:  '1rem',
  5:  '1.25rem',
  6:  '1.5rem',
  7:  '1.75rem',
  8:  '2rem',
  9:  '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
};

// :root CSS custom property declarations
function buildRootVars() {
  const vars = {};

  for (const [name, value] of Object.entries(colors)) {
    vars[`--color-${name}`] = value;
  }

  for (const [key, value] of Object.entries(spacingScale)) {
    vars[`--spacing-${key}`] = value;
  }

  Object.assign(vars, {
    '--font-size-sm':   '0.875rem',
    '--font-size-base': '1rem',
    '--font-size-lg':   '1.25rem',
    '--font-size-xl':   '1.5rem',
    '--font-size-2xl':  '1.875rem',
    '--font-size-3xl':  '2.25rem',
    '--font-size-4xl':  '3rem',
    '--font-weight-light':   '300',
    '--font-weight-normal':  '400',
    '--font-weight-bold':    '700',
    '--line-height-sm':   '1.25',
    '--line-height-base': '1.5',
    '--line-height-lg':   '2',
    '--duration':       '200ms',
    '--duration-fast':  '100ms',
    '--duration-slow':  '400ms',
    '--easing':         'cubic-bezier(0.4, 0, 0.2, 1)',
  });

  return vars;
}

// Fluid typography helper
const fluidTypeScale = {
  xs:   ['0.75rem',  '0.875rem'],
  sm:   ['0.875rem', '1rem'],
  base: ['1rem',     '1.125rem'],
  lg:   ['1.125rem', '1.375rem'],
  xl:   ['1.25rem',  '1.75rem'],
  '2xl':['1.5rem',   '2.25rem'],
  '3xl':['1.875rem', '3rem'],
  '4xl':['2.25rem',  '4rem'],
};

function fluidType(minSize, maxSize, minVw = '20rem', maxVw = '80rem') {
  return `clamp(${minSize}, calc(${minSize} + (${maxSize.replace('rem', '')} - ${minSize.replace('rem', '')}) * ((100vw - ${minVw}) / (${maxVw.replace('rem', '')} - ${minVw.replace('rem', '')}))), ${maxSize})`;
}

module.exports = plugin.withOptions(
  function (options = {}) {
    return function ({ addBase, addUtilities }) {
      const injectTokens = options.injectTokens !== false;

      // 1. Inject :root design tokens
      if (injectTokens) {
        addBase({ ':root': buildRootVars() });

        // Dark mode token overrides
        addBase({
          '[data-theme="dark"]': {
            '--color-primary':   '#60a5fa',
            '--color-secondary': '#9ca3af',
            '--color-success':   '#4ade80',
            '--color-info':      '#38bdf8',
            '--color-warning':   '#fbbf24',
            '--color-danger':    '#f87171',
            '--color-light':     '#374151',
            '--color-dark':      '#f9fafb',
          },
          '@media (prefers-color-scheme: dark)': {
            ':not([data-theme="light"])': {
              '--color-primary':   '#60a5fa',
              '--color-secondary': '#9ca3af',
              '--color-success':   '#4ade80',
              '--color-info':      '#38bdf8',
              '--color-warning':   '#fbbf24',
              '--color-danger':    '#f87171',
              '--color-light':     '#374151',
              '--color-dark':      '#f9fafb',
            },
          },
        });
      }

      // 2. Fluid typography utilities (sh- prefixed)
      const fluidUtils = {};
      for (const [key, [min, max]] of Object.entries(fluidTypeScale)) {
        fluidUtils[`.sh-text-fluid-${key}`] = { fontSize: fluidType(min, max) };
      }
      addUtilities(fluidUtils);

      // 3. Container query utilities
      addUtilities({
        '.sh-cq':        { 'container-type': 'inline-size' },
        '.sh-cq-size':   { 'container-type': 'size' },
        '.sh-cq-normal': { 'container-type': 'normal' },
      });

      // 4. Transition utilities
      addUtilities({
        '.sh-transition-colors': {
          'transition-property': 'color, background-color, border-color, text-decoration-color, fill, stroke',
          'transition-duration': 'var(--duration, 200ms)',
          'transition-timing-function': 'var(--easing, cubic-bezier(0.4, 0, 0.2, 1))',
        },
        '.sh-transition-shadow': {
          'transition-property': 'box-shadow',
          'transition-duration': 'var(--duration, 200ms)',
          'transition-timing-function': 'var(--easing, cubic-bezier(0.4, 0, 0.2, 1))',
        },
      });

      // 5. Animation utilities
      addUtilities({
        '.sh-animate-fade-in':    { animation: 'sh-fade-in    var(--duration, 200ms) var(--easing, ease) both' },
        '.sh-animate-slide-up':   { animation: 'sh-slide-up   var(--duration, 300ms) var(--easing, ease) both' },
        '.sh-animate-slide-down': { animation: 'sh-slide-down var(--duration, 300ms) var(--easing, ease) both' },
        '.sh-animate-scale-in':   { animation: 'sh-scale-in   var(--duration, 200ms) var(--easing, ease) both' },
        '.sh-animate-spin':       { animation: 'sh-spin       var(--duration, 1000ms) linear infinite' },
        '.sh-animate-pulse':      { animation: 'sh-pulse      var(--duration, 2000ms) cubic-bezier(0.4, 0, 0.6, 1) infinite' },
        '.sh-animate-bounce':     { animation: 'sh-bounce     var(--duration, 1000ms) infinite' },
      });
    };
  },
  function (options = {}) {
    return {
      theme: {
        extend: {
          colors: {
            primary:   'var(--color-primary)',
            secondary: 'var(--color-secondary)',
            success:   'var(--color-success)',
            info:      'var(--color-info)',
            warning:   'var(--color-warning)',
            danger:    'var(--color-danger)',
          },
          fontSize: {
            'fluid-xs':   'clamp(0.75rem, 2vw, 0.875rem)',
            'fluid-sm':   'clamp(0.875rem, 2.5vw, 1rem)',
            'fluid-base': 'clamp(1rem, 3vw, 1.125rem)',
            'fluid-lg':   'clamp(1.125rem, 3.5vw, 1.375rem)',
            'fluid-xl':   'clamp(1.25rem, 4vw, 1.75rem)',
            'fluid-2xl':  'clamp(1.5rem, 5vw, 2.25rem)',
            'fluid-3xl':  'clamp(1.875rem, 6vw, 3rem)',
            'fluid-4xl':  'clamp(2.25rem, 8vw, 4rem)',
          },
          transitionDuration: {
            fast: 'var(--duration-fast, 100ms)',
            slow: 'var(--duration-slow, 400ms)',
          },
        },
      },
    };
  }
);
