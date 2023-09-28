import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-text)"],
        title: ["var(--font-title)"]
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        red: {
          '500': "#EA1919",
          '300': "#AC1717"
        },
        black: "#1B1A1D",
        gray: "#353441",
        white: "#D9D9D9",
        bege: "#B18B8B"

      }
    },
  },
  plugins: [],
}
export default config
