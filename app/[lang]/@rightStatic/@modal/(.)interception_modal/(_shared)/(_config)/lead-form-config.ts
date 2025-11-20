// app/[lang]/@rightStatic/(...)interception_modal/lead-form/(_shared)/(_config)/lead-form-config.ts

/**
 * Lead Form Configuration
 * 
 * Purpose: Centralized configuration for lead form behavior
 * - Success redirect timing
 * - Modal animation settings
 * - Form field constraints
 * - API endpoints
 * 
 * All timing values in milliseconds
 */

/**
 * Success state configuration
 */
export const SUCCESS_CONFIG = {
  // Time to show success message before redirect (ms)
  DISPLAY_DURATION: 2000,
  
  // Delay before navigation starts (ms)
  REDIRECT_DELAY: 50,
  
  // Redirect path after successful submission
  REDIRECT_PATH: "/thank-you",
} as const;

/**
 * Modal behavior configuration
 */
export const MODAL_CONFIG = {
  // Prevent close during submission
  BLOCK_CLOSE_ON_SUBMIT: true,
  
  // Prevent close during success state
  BLOCK_CLOSE_ON_SUCCESS: true,
  
  // Z-index for modal overlay
  Z_INDEX: 50,
} as const;

/**
 * Form field constraints
 * Should match Zod schema validation rules
 */
export const FIELD_CONSTRAINTS = {
  name: {
    minLength: 2,
    maxLength: 100,
  },
  phone: {
    minLength: 8,
    maxLength: 20,
  },
  email: {
    minLength: 5,
    maxLength: 255,
  },
} as const;

/**
 * API configuration
 */
export const API_CONFIG = {
  // Server action endpoint (handled by Next.js)
  SUBMIT_ENDPOINT: "/api/lead-form",
  
  // Request timeout (ms)
  TIMEOUT: 30000,
} as const;

/**
 * Animation configuration
 */
export const ANIMATION_CONFIG = {
  // Success icon animation
  SUCCESS_ICON_ANIMATE: "animate-pulse",
  
  // Loading spinner animation
  LOADING_SPINNER_ANIMATE: "animate-spin",
  
  // Modal backdrop blur
  BACKDROP_BLUR: "backdrop-blur-sm",
  
  // Modal overlay background opacity
  OVERLAY_BG: "bg-black/50",
} as const;

/**
 * Accessibility configuration
 */
export const A11Y_CONFIG = {
  // ARIA labels
  CLOSE_BUTTON_LABEL: "Close modal",
  SUBMIT_BUTTON_LABEL: "Submit lead form",
  
  // Focus trap enabled
  ENABLE_FOCUS_TRAP: true,
} as const;

/**
 * Development/Debug configuration
 */
export const DEBUG_CONFIG = {
  // Enable console logging
  ENABLE_LOGGING: process.env.NODE_ENV === "development",
  
  // Mock API responses in development
  MOCK_API: false,
} as const;

/**
 * Get full redirect URL with language prefix
 */
export function getRedirectUrl(lang: string): string {
  return `/${lang}${SUCCESS_CONFIG.REDIRECT_PATH}`;
}

/**
 * Log helper (only in development)
 */
export function logFormEvent(event: string, data?: unknown): void {
  if (DEBUG_CONFIG.ENABLE_LOGGING) {
    console.log(`[LeadForm] ${event}`, data || "");
  }
}
