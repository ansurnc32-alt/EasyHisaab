export const theme = {
  colors: {
    primary: '#0F766E', // Teal 700
    primaryHover: '#115E59', // Teal 800
    accent: '#14B8A6', // Teal 500
    background: '#F8FAFC', // Slate 50
    surface: '#FFFFFF',
    text: {
      main: '#1E293B', // Slate 800
      secondary: '#475569', // Slate 600
      light: '#94A3B8', // Slate 400
    },
    border: '#E2E8F0', // Slate 200
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
  },
  shadows: {
    soft: '0 4px 20px rgba(0, 0, 0, 0.05)',
    medium: '0 8px 30px rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: '"Noto Sans Devanagari", sans-serif',
    lineHeights: {
      normal: 1.6,
      heading: 1.3,
    },
    sizes: {
      sm: '15px',
      base: '17px',
      lg: '20px',
      xl: '26px',
      xxl: '36px',
      xxxl: '52px',
      hero: '64px'
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    }
  },
  transitions: {
    default: 'all 0.2s ease',
    transform: 'transform 0.2s ease, box-shadow 0.2s ease',
    colors: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease'
  }
};
