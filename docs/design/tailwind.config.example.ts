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
        wdai: {
          // Primary Brand Colors
          pink: {
            DEFAULT: '#BE336A',
            hover: '#A02956',
            light: '#E74C8C',
          },

          // Background Colors
          navy: {
            DEFAULT: '#1A1F2E',
            medium: '#252B3A',
            light: '#3D4451',
          },

          turquoise: {
            DEFAULT: '#6ACCC9',
            dark: '#2C5F5D',
            light: '#8EDDD9',
          },

          coral: {
            DEFAULT: '#E8956B',
            dark: '#2C1810',
            light: '#F1B38F',
          },

          // Text Colors
          text: {
            white: '#FFFFFF',
            light: '#E5E7EB',
            'turquoise-dark': '#2C5F5D',
            'coral-dark': '#2C1810',
          },

          // Accent Colors (from hero illustration)
          accent: {
            magenta: '#E74C8C',
            orange: '#FF8C42',
            blue: '#4CC9E8',
            purple: '#8B5CF6',
          },

          // UI Elements
          border: {
            light: '#3D4451',
          },
        },
      },

      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },

      fontSize: {
        // Display & Headings
        display: ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        h1: ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        h2: ['40px', { lineHeight: '1.25', fontWeight: '600' }],
        h3: ['24px', { lineHeight: '1.4', fontWeight: '600' }],

        // Body Text
        'body-lg': ['18px', { lineHeight: '1.7' }],
        body: ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],

        // Special Elements
        stat: ['48px', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: '700' }],
        nav: ['16px', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '500' }],
        button: ['16px', { lineHeight: '1', letterSpacing: '0.03em', fontWeight: '600' }],
        'button-sm': ['14px', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '600' }],

        // Labels
        label: ['16px', { lineHeight: '1.3', fontWeight: '600' }],
        role: ['13px', { lineHeight: '1.2' }],
      },

      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      spacing: {
        // Section Spacing
        'section': '80px',
        'section-sm': '60px',
        'subsection': '48px',

        // Content Spacing
        'content': '24px',
        'paragraph': '16px',
      },

      maxWidth: {
        'content': '65ch',    // Optimal reading width
        'prose': '75ch',
      },

      borderRadius: {
        card: '8px',
      },

      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 12px 24px rgba(0, 0, 0, 0.15)',
      },

      transitionProperty: {
        'card': 'transform, box-shadow',
      },

      transitionDuration: {
        'card': '200ms',
      },

      transitionTimingFunction: {
        'card': 'ease',
      },

      // Responsive Breakpoints (default Tailwind values, documented for reference)
      screens: {
        sm: '640px',   // Small tablets
        md: '768px',   // Tablets
        lg: '1024px',  // Desktops
        xl: '1280px',  // Large desktops
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    // Add typography plugin for rich text content
    require('@tailwindcss/typography'),
  ],
}

export default config
