// app/[lang]/@rightStatic/(...)interception_modal/lead-form/(_server)/index.ts

/**
 * Server Layer Exports
 * 
 * Purpose: Centralized export point for all server-side resources
 * - Server actions
 * - Server utilities
 * - Server-side data fetching functions
 * 
 * Usage: import { submitLeadFormAction } from "./(_server)";
 */

// ============================================================================
// SERVER ACTIONS
// ============================================================================

export {
  submitLeadFormAction,
  testLeadFormAction,
} from "./(_actions)/submit-lead-action";
