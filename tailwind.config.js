/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // Medical blue (blue-600)
        'primary-50': '#EFF6FF', // Light blue (blue-50)
        'primary-100': '#DBEAFE', // Light blue (blue-100)
        'primary-500': '#3B82F6', // Medium blue (blue-500)
        'primary-600': '#2563EB', // Primary blue (blue-600)
        'primary-700': '#1D4ED8', // Dark blue (blue-700)
        
        // Secondary Colors
        'secondary': '#64748B', // Sophisticated slate (slate-500)
        'secondary-100': '#F1F5F9', // Light slate (slate-100)
        'secondary-200': '#E2E8F0', // Light slate (slate-200)
        'secondary-300': '#CBD5E1', // Medium slate (slate-300)
        'secondary-400': '#94A3B8', // Medium slate (slate-400)
        'secondary-500': '#64748B', // Secondary slate (slate-500)
        'secondary-600': '#475569', // Dark slate (slate-600)
        'secondary-700': '#334155', // Darker slate (slate-700)
        
        // Accent Colors
        'accent': '#059669', // Calming teal (emerald-600)
        'accent-50': '#ECFDF5', // Light teal (emerald-50)
        'accent-100': '#D1FAE5', // Light teal (emerald-100)
        'accent-500': '#10B981', // Medium teal (emerald-500)
        'accent-600': '#059669', // Accent teal (emerald-600)
        
        // Background Colors
        'background': '#FAFBFC', // Soft off-white (gray-50)
        'surface': '#FFFFFF', // Pure white (white)
        
        // Text Colors
        'text-primary': '#1E293B', // Rich charcoal (slate-800)
        'text-secondary': '#64748B', // Balanced gray (slate-500)
        
        // Status Colors
        'success': '#059669', // Success teal (emerald-600)
        'success-50': '#ECFDF5', // Light success (emerald-50)
        'success-100': '#D1FAE5', // Light success (emerald-100)
        
        'warning': '#D97706', // Warm amber (amber-600)
        'warning-50': '#FFFBEB', // Light warning (amber-50)
        'warning-100': '#FEF3C7', // Light warning (amber-100)
        
        'error': '#DC2626', // Clear red (red-600)
        'error-50': '#FEF2F2', // Light error (red-50)
        'error-100': '#FEE2E2', // Light error (red-100)
        
        // Border Colors
        'border': '#E2E8F0', // Light gray border (slate-200)
        'border-light': '#F1F5F9', // Very light border (slate-100)
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'data': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 25px rgba(0, 0, 0, 0.15)',
        'xl': '0 20px 40px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      zIndex: {
        '1000': '1000',
        '1010': '1010',
        '1020': '1020',
        '1030': '1030',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}