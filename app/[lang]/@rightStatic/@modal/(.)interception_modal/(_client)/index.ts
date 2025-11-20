// app/[lang]/@rightStatic/(...)interception_modal/lead-form/(_client)/index.tsx

/**
 * Client Layer Exports
 * 
 * Purpose: Centralized export point for all client-side resources
 * - UI components
 * - Custom hooks
 * - Client-side utilities
 * 
 * Usage: import { LeadFormModalOverlay } from "./(_client)";
 */

// ============================================================================
// UI COMPONENTS
// ============================================================================

export { LeadFormModalOverlay } from "./(_ui_components)/lead-form-modal-overlay";
export { LeadFormContent } from "./(_ui_components)/lead-form-content";
export { LeadFormSuccess } from "./(_ui_components)/lead-form-success";
export { LeadFormFields } from "./(_ui_components)/lead-form-fields";

// ============================================================================
// HOOKS
// ============================================================================

export { useLeadFormSubmit } from "./(_hooks)/use-lead-form-submit";
