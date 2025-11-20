// app/[lang]/@rightStatic/(...)interception_modal/lead-form/(_shared)/index.ts

/**
 * Shared Layer Exports
 * 
 * Purpose: Centralized export point for all shared resources
 * - Types and interfaces
 * - Validation schemas
 * - Configuration constants
 * - Translation helpers
 * 
 * Usage: import { leadFormSchema, FormErrors } from "./(_shared)";
 */

// ============================================================================
// TYPES
// ============================================================================

export type {
  PageProps,
  LeadFormData,
  FormErrors,
  ApiResponse,
  FormState,
  LeadFormTranslationKeys,
  LeadFormTranslations,
  LeadFormModalOverlayProps,
  LeadFormContentProps,
  LeadFormSuccessProps,
  LeadFormFieldsProps,
  ServerActionResult,
} from "./(_types)/lead-form-types";

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

export {
  leadFormSchema,
  validateLeadForm,
  type LeadFormSchemaType,
} from "./(_schemas)/lead-form-schema";

// ============================================================================
// CONFIGURATION
// ============================================================================

export {
  SUCCESS_CONFIG,
  MODAL_CONFIG,
  FIELD_CONSTRAINTS,
  API_CONFIG,
  ANIMATION_CONFIG,
  A11Y_CONFIG,
  DEBUG_CONFIG,
  getRedirectUrl,
  logFormEvent,
} from "./(_config)/lead-form-config";

// ============================================================================
// TRANSLATIONS
// ============================================================================

export {
  getLeadFormTranslation,
  useLeadFormTranslation,
} from "./(_translations)/get-lead-form-translation";
