import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        zbg: '#14102A',
        zsurface: '#221940',
        zborder: '#2A1F4A',
        zgold: '#F4B942',
        zgoldDeep: '#D89A25',
        zcoral: '#E07C6E',
        zsage: '#7BA89A',
        ztext: '#F5F0EB',
        zdim: '#8A84A8',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        ui: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
}

export default config
