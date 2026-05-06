// Design System - Strict 8px Spacing Scale & Visual Tokens

// 8px Base Spacing System
export const SPACING = {
  0: '0',
  1: '0.5rem',   // 8px
  2: '1rem',     // 16px
  3: '1.5rem',   // 24px
  4: '2rem',     // 32px
  5: '2.5rem',   // 40px
  6: '3rem',     // 48px
  7: '3.5rem',   // 56px
  8: '4rem',     // 64px
  9: '4.5rem',   // 72px
  10: '5rem',    // 80px
  12: '6rem',    // 96px
  16: '8rem',    // 128px
  20: '10rem',   // 160px
  24: '12rem',   // 192px
} as const;

// Brand Colors - Strict Token System
export const COLORS = {
  // Primary Purple
  purple: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },
  // Secondary Orange
  orange: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316',
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
  },
  // Accent Blue
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  // Success Green
  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  // Error Red
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  // Neutrals
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
} as const;

// Typography Scale - Poppins
export const TYPOGRAPHY = {
  // Display
  display1: {
    size: 'text-7xl',      // 72px
    weight: 'font-bold',
    lineHeight: 'leading-[1.1]',
  },
  display2: {
    size: 'text-6xl',      // 60px
    weight: 'font-bold',
    lineHeight: 'leading-[1.1]',
  },
  // Headings
  h1: {
    size: 'text-5xl',      // 48px
    weight: 'font-bold',
    lineHeight: 'leading-tight',
  },
  h2: {
    size: 'text-4xl',      // 36px
    weight: 'font-bold',
    lineHeight: 'leading-tight',
  },
  h3: {
    size: 'text-3xl',      // 30px
    weight: 'font-bold',
    lineHeight: 'leading-snug',
  },
  h4: {
    size: 'text-2xl',      // 24px
    weight: 'font-semibold',
    lineHeight: 'leading-snug',
  },
  h5: {
    size: 'text-xl',       // 20px
    weight: 'font-semibold',
    lineHeight: 'leading-normal',
  },
  h6: {
    size: 'text-lg',       // 18px
    weight: 'font-semibold',
    lineHeight: 'leading-normal',
  },
  // Body
  bodyLarge: {
    size: 'text-lg',       // 18px
    weight: 'font-normal',
    lineHeight: 'leading-relaxed',
  },
  body: {
    size: 'text-base',     // 16px
    weight: 'font-normal',
    lineHeight: 'leading-relaxed',
  },
  bodySmall: {
    size: 'text-sm',       // 14px
    weight: 'font-normal',
    lineHeight: 'leading-relaxed',
  },
  // Caption
  caption: {
    size: 'text-xs',       // 12px
    weight: 'font-normal',
    lineHeight: 'leading-normal',
  },
  captionBold: {
    size: 'text-xs',       // 12px
    weight: 'font-semibold',
    lineHeight: 'leading-normal',
  },
} as const;

// Border Radius
export const RADIUS = {
  none: 'rounded-none',
  sm: 'rounded-lg',      // 8px
  md: 'rounded-xl',      // 12px
  lg: 'rounded-2xl',     // 16px
  xl: 'rounded-3xl',     // 24px
  full: 'rounded-full',
} as const;

// Shadows
export const SHADOWS = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
} as const;

// Container Max Widths
export const CONTAINERS = {
  sm: 'max-w-screen-sm',    // 640px
  md: 'max-w-screen-md',    // 768px
  lg: 'max-w-screen-lg',    // 1024px
  xl: 'max-w-screen-xl',    // 1280px
  '2xl': 'max-w-screen-2xl', // 1536px
  full: 'max-w-full',
  container: 'max-w-[1440px]', // Design system max
} as const;

// Breakpoints (for reference)
export const BREAKPOINTS = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
} as const;

// Grid Columns
export const GRID = {
  mobile: 'grid-cols-4',
  tablet: 'md:grid-cols-8',
  desktop: 'lg:grid-cols-12',
} as const;

// Z-Index Scale
export const Z_INDEX = {
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const;

// Animation Durations
export const DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Component Variants
export const COMPONENT_STATES = {
  default: 'default',
  hover: 'hover',
  active: 'active',
  focus: 'focus',
  disabled: 'disabled',
  loading: 'loading',
  error: 'error',
  success: 'success',
} as const;

// Icon Sizes
export const ICON_SIZES = {
  xs: 'w-3 h-3',      // 12px
  sm: 'w-4 h-4',      // 16px
  md: 'w-5 h-5',      // 20px
  lg: 'w-6 h-6',      // 24px
  xl: 'w-8 h-8',      // 32px
  '2xl': 'w-10 h-10', // 40px
  '3xl': 'w-12 h-12', // 48px
} as const;

// Helper function to combine classes
export const cn = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(' ');
};
