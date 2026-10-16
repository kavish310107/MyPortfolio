/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter Variable', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'], mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'ui-monospace', 'monospace'] },
      colors: { ink: { 950: '#05060a', 900: '#0a0c14', 800: '#10131d' }, accent: { DEFAULT: '#7c8cff', soft: '#a5b0ff', glow: '#5b6cff' }, aqua: '#5eead4' },
      boxShadow: { glass: '0 8px 32px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.06)', glow: '0 0 40px -8px rgba(124,140,255,.5)' },
    },
  },
  plugins: [],
}
