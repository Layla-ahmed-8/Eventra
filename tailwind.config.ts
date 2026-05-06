import type { Config } from 'tailwindcss'
import { COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS, CONTAINERS, Z_INDEX, DURATIONS } from './src/utils/designSystem'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Design System Integration
      colors: {
        // Brand Colors
        primary: COLORS.purple,
        secondary: COLORS.orange,
        accent: COLORS.blue,
        success: COLORS.green,
        error: COLORS.red,
        neutral: COLORS.neutral,

        // Semantic Colors
        background: {
          DEFAULT: 'hsl(var(--background))',
          secondary: 'hsl(var(--background-secondary))',
        },
        foreground: {
          DEFAULT: 'hsl(var(--foreground))',
          secondary: 'hsl(var(--foreground-secondary))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },

      // Spacing Scale
      spacing: SPACING,

      // Typography Scale
      fontSize: {
        'display-1': [TYPOGRAPHY.display1.size.replace('text-', ''), {
          lineHeight: TYPOGRAPHY.display1.lineHeight.replace('leading-', ''),
          fontWeight: TYPOGRAPHY.display1.weight.replace('font-', ''),
        }],
        'display-2': [TYPOGRAPHY.display2.size.replace('text-', ''), {
          lineHeight: TYPOGRAPHY.display2.lineHeight.replace('leading-', ''),
          fontWeight: TYPOGRAPHY.display2.weight.replace('font-', ''),
        }],
        'heading-1': [TYPOGRAPHY.h1.size.replace('text-', ''), {
          lineHeight: TYPOGRAPHY.h1.lineHeight.replace('leading-', ''),
          fontWeight: TYPOGRAPHY.h1.weight.replace('font-', ''),
        }],
        'heading-2': [TYPOGRAPHY.h2.size.replace('text-', ''), {
          lineHeight: TYPOGRAPHY.h2.lineHeight.replace('leading-', ''),
          fontWeight: TYPOGRAPHY.h2.weight.replace('font-', ''),
        }],
        'heading-3': [TYPOGRAPHY.h3.size.replace('text-', ''), {
          lineHeight: TYPOGRAPHY.h3.lineHeight.replace('leading-', ''),
          fontWeight: TYPOGRAPHY.h3.weight.replace('font-', ''),
        }],
        'heading-4': [TYPOGRAPHY.h4.size.replace('text-', ''), {
          lineHeight: TYPOGRAPHY.h4.lineHeight.replace('leading-', ''),
          fontWeight: TYPOGRAPHY.h4.weight.replace('font-', ''),
        }],
        'heading-5': [TYPOGRAPHY.h5.size.replace('text-', ''), {
          lineHeight: TYPOGRAPHY.h5.lineHeight.replace('leading-', ''),
          fontWeight: TYPOGRAPHY.h5.weight.replace('font-', ''),
        }],
        'heading-6': [TYPOGRAPHY.h6.size.replace('text-', ''), {
          lineHeight: TYPOGRAPHY.h6.lineHeight.replace('leading-', ''),
          fontWeight: TYPOGRAPHY.h6.weight.replace('font-', ''),
        }],
        'body-large': [TYPOGRAPHY.bodyLarge.size.replace('text-', ''), {
          lineHeight: TYPOGRAPHY.bodyLarge.lineHeight.replace('leading-', ''),
          fontWeight: TYPOGRAPHY.bodyLarge.weight.replace('font-', ''),
        }],
        'body': [TYPOGRAPHY.body.size.replace('text-', ''), {
          lineHeight: TYPOGRAPHY.body.lineHeight.replace('leading-', ''),
          fontWeight: TYPOGRAPHY.body.weight.replace('font-', ''),
        }],
        'body-small': [TYPOGRAPHY.bodySmall.size.replace('text-', ''), {
          lineHeight: TYPOGRAPHY.bodySmall.lineHeight.replace('leading-', ''),
          fontWeight: TYPOGRAPHY.bodySmall.weight.replace('font-', ''),
        }],
        'caption': [TYPOGRAPHY.caption.size.replace('text-', ''), {
          lineHeight: TYPOGRAPHY.caption.lineHeight.replace('leading-', ''),
          fontWeight: TYPOGRAPHY.caption.weight.replace('font-', ''),
        }],
        'caption-bold': [TYPOGRAPHY.captionBold.size.replace('text-', ''), {
          lineHeight: TYPOGRAPHY.captionBold.lineHeight.replace('leading-', ''),
          fontWeight: TYPOGRAPHY.captionBold.weight.replace('font-', ''),
        }],
      },

      // Border Radius
      borderRadius: {
        'ds-sm': RADIUS.sm.replace('rounded-', ''),
        'ds-md': RADIUS.md.replace('rounded-', ''),
        'ds-lg': RADIUS.lg.replace('rounded-', ''),
        'ds-xl': RADIUS.xl.replace('rounded-', ''),
      },

      // Shadows
      boxShadow: {
        'ds-sm': SHADOWS.sm,
        'ds-md': SHADOWS.md,
        'ds-lg': SHADOWS.lg,
        'ds-xl': SHADOWS.xl,
        'ds-2xl': SHADOWS['2xl'],
      },

      // Container Max Widths
      maxWidth: {
        'ds-container': CONTAINERS.container.replace('max-w-', ''),
      },

      // Z-Index Scale
      zIndex: Z_INDEX,

      // Animation Durations
      transitionDuration: {
        'ds-fast': `${DURATIONS.fast}ms`,
        'ds-normal': `${DURATIONS.normal}ms`,
        'ds-slow': `${DURATIONS.slow}ms`,
      },

      // Grid Columns
      gridTemplateColumns: {
        'ds-mobile': GRID.mobile.replace('grid-cols-', ''),
        'ds-tablet': GRID.tablet.replace('md:grid-cols-', ''),
        'ds-desktop': GRID.desktop.replace('lg:grid-cols-', ''),
      },

      // Custom Utilities
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6C4CF1 0%, #00C2FF 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #FF8A00 0%, #F97316 100%)',
        'gradient-accent': 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
      },

      // Component-specific extensions
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config