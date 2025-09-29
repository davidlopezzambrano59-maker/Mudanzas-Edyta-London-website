/**
 * Design Tokens Type Definitions
 * 
 * These match the CSS custom properties defined in pro-theme.css
 * Use for TypeScript projects that need design token references
 */

export interface DesignTokens {
  // Brand Colors
  brand: string;           // #F97316 (PRIMARY)
  brandDark: string;       // #C2410C (PRIMARY_DARK)
  brandAccent: string;     // #F59E0B (ACCENT)
  background: string;      // #FFFFFF (BACKGROUND)
  text: string;           // #0F172A (TEXT)

  // Extended Colors
  muted: string;          // #64748B
  border: string;         // #E2E8F0
  borderLight: string;    // #F1F5F9
  success: string;        // #10B981
  warning: string;        // #F59E0B
  error: string;          // #EF4444

  // Spacing Scale (in rem)
  spaceXs: string;        // 0.25rem (4px)
  spaceSm: string;        // 0.5rem (8px)
  spaceMd: string;        // 1rem (16px)
  spaceLg: string;        // 1.5rem (24px)
  spaceXl: string;        // 2rem (32px)
  space2xl: string;       // 3rem (48px)
  space3xl: string;       // 4rem (64px)

  // Typography Scale (in rem)
  textXs: string;         // 0.75rem (12px)
  textSm: string;         // 0.875rem (14px)
  textBase: string;       // 1rem (16px)
  textLg: string;         // 1.125rem (18px)
  textXl: string;         // 1.25rem (20px)
  text2xl: string;        // 1.5rem (24px)
  text3xl: string;        // 1.875rem (30px)
  text4xl: string;        // 2.25rem (36px)
  text5xl: string;        // 3rem (48px)

  // Layout
  container: string;      // 1200px
  section: string;        // 6rem (96px)
  radius: string;         // 0.75rem (12px)
  radiusSm: string;       // 0.375rem (6px)
  radiusLg: string;       // 1rem (16px)

  // Shadows
  shadow: string;
  shadowMd: string;
  shadowLg: string;
  shadowXl: string;

  // Typography
  fontDisplay: string;
  fontBody: string;

  // Transitions
  transition: string;
  transitionFast: string;
  transitionSlow: string;
}

// CSS Custom Property names for reference
export const CSS_VARS = {
  // Brand Colors
  BRAND: '--brand',
  BRAND_DARK: '--brand-700',
  BRAND_ACCENT: '--brand-accent',
  BACKGROUND: '--bg',
  TEXT: '--ink',

  // Spacing
  SPACE_XS: '--space-xs',
  SPACE_SM: '--space-sm',
  SPACE_MD: '--space-md',
  SPACE_LG: '--space-lg',
  SPACE_XL: '--space-xl',
  SPACE_2XL: '--space-2xl',
  SPACE_3XL: '--space-3xl',

  // Layout
  CONTAINER: '--container',
  SECTION: '--section',
  RADIUS: '--radius',

  // Shadows
  SHADOW: '--shadow',
  SHADOW_MD: '--shadow-md',
  SHADOW_LG: '--shadow-lg',
  SHADOW_XL: '--shadow-xl',
} as const;

// Helper function to get CSS custom property values
export const getCSSVar = (varName: string): string => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
  }
  return '';
};

// Pre-defined design token values for server-side rendering
export const DESIGN_TOKENS: DesignTokens = {
  // Brand Colors
  brand: '#F97316',
  brandDark: '#C2410C',
  brandAccent: '#F59E0B',
  background: '#FFFFFF',
  text: '#0F172A',

  // Extended Colors
  muted: '#64748B',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',

  // Spacing Scale
  spaceXs: '0.25rem',
  spaceSm: '0.5rem',
  spaceMd: '1rem',
  spaceLg: '1.5rem',
  spaceXl: '2rem',
  space2xl: '3rem',
  space3xl: '4rem',

  // Typography Scale
  textXs: '0.75rem',
  textSm: '0.875rem',
  textBase: '1rem',
  textLg: '1.125rem',
  textXl: '1.25rem',
  text2xl: '1.5rem',
  text3xl: '1.875rem',
  text4xl: '2.25rem',
  text5xl: '3rem',

  // Layout
  container: '1200px',
  section: '6rem',
  radius: '0.75rem',
  radiusSm: '0.375rem',
  radiusLg: '1rem',

  // Shadows
  shadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
  shadowMd: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
  shadowLg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
  shadowXl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',

  // Typography
  fontDisplay: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontBody: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

  // Transitions
  transition: 'all 0.2s ease',
  transitionFast: 'all 0.15s ease',
  transitionSlow: 'all 0.3s ease',
};


