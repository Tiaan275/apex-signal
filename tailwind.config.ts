import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green:  '#10B981',
          navy:   '#0F172A',
          gold:   '#F59E0B',
          card:   '#1E293B',
          text:   '#F8FAFC',
          muted:  '#94A3B8',
          border: '#334155',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease-out forwards',
        'slide-up':   'slideUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'counter':    'counter 2s ease-out forwards',
        'glow':       'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        glow:    { '0%': { boxShadow: '0 0 5px #10B981' }, '100%': { boxShadow: '0 0 20px #10B981, 0 0 40px #10B981' } },
      },
      backgroundImage: {
        'grid-emerald': `
          linear-gradient(rgba(16,185,129,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16,185,129,0.05) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
}

export default config
