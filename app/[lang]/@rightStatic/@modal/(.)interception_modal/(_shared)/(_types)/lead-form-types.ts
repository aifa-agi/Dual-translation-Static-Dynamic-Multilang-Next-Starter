// app/[lang]/@rightStatic/(...)interception_modal/lead-form/(_shared)/(_types)/lead-form-types.ts

/**
 * TypeScript Type Definitions for Lead Form Modal
 * 
 * UPDATED: Added validation error message translation keys
 */

import type { SupportedLanguage } from "@/config/translations/translations.config";

/**
 * Page component props with Next.js 15 params pattern
 */
export type PageProps = {
  params: Promise<{
    lang: SupportedLanguage;
  }>;
};

/**
 * Lead form input data structure
 */
export type LeadFormData = {
  name: string;
  phone: string;
  email: string;
};

/**
 * Form field validation errors
 */
export type FormErrors = {
  name?: string[];
  phone?: string[];
  email?: string[];
};

/**
 * API response structure from server action
 */
export type ApiResponse = {
  success: boolean;
  message?: string;
  errors?: FormErrors;
  mock?: boolean;
};

/**
 * Form submission state for client components
 */
export type FormState = {
  isSubmitting: boolean;
  isSuccess: boolean;
  errors: FormErrors;
  message: string;
};

/**
 * Translation keys for lead form UI
 */
export type LeadFormTranslationKeys =
  | "Try Free"
  | "Free Access Description"
  | "Name"
  | "Phone"
  | "Email"
  | "Required Field"
  | "Name Placeholder"
  | "Phone Placeholder"
  | "Email Placeholder"
  | "Submit Lead"
  | "Sending"
  | "Close"
  | "Lead Form Submitted"
  | "Lead Form Thank You"
  | "Auto Close Window"
  | "Submit Error"
  | "Privacy Agreement";

/**
 * NEW: Translation keys for validation error messages
 */
export type ValidationErrorTranslationKeys =
  | "Name is required"
  | "Name must be at least 2 characters long"
  | "Name must not exceed 100 characters"
  | "Phone number is required"
  | "Phone number must be at least 8 characters"
  | "Phone number must not exceed 20 characters"
  | "Phone number contains invalid characters"
  | "Email is required"
  | "Please enter a valid email address"
  | "Email must not exceed 255 characters"
  | "Validation failed. Please check your input."
  | "An unexpected error occurred. Please try again later.";

/**
 * Combined translation keys (UI + Validation errors)
 */
export type AllTranslationKeys = 
  | LeadFormTranslationKeys 
  | ValidationErrorTranslationKeys;

/**
 * Translation dictionary returned by translation helper
 */
export type LeadFormTranslations = Record<AllTranslationKeys, string>;

/**
 * Props for modal overlay component
 */
export type LeadFormModalOverlayProps = {
  lang: SupportedLanguage;
  translations: LeadFormTranslations;
};

/**
 * Props for form content component
 */
export type LeadFormContentProps = {
  translations: LeadFormTranslations;
  onSubmit: (formData: FormData) => Promise<void>;
  formState: FormState;
  onClose: () => void;
};

/**
 * Props for success component
 */
export type LeadFormSuccessProps = {
  translations: LeadFormTranslations;
};

/**
 * Props for form fields component
 */
export type LeadFormFieldsProps = {
  translations: LeadFormTranslations;
  errors: FormErrors;
  isSubmitting: boolean;
};

/**
 * Server action return type
 */
export type ServerActionResult = {
  success: boolean;
  message?: string;
  errors?: FormErrors;
};
