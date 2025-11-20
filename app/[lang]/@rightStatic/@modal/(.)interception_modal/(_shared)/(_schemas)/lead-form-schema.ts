// app/[lang]/@rightStatic/(...)interception_modal/lead-form/(_shared)/(_schemas)/lead-form-schema.ts

/**
 * Zod Validation Schema for Lead Form with i18n support
 * 
 * Purpose: Define validation rules with translatable error messages
 * - Name: required, 2-100 characters
 * - Phone: required, international format support
 * - Email: required, valid email format
 * 
 * UPDATED: Added translation function for dynamic error messages
 */

import { z } from "zod";

/**
 * Translation function type for error messages
 */
type TranslationFunction = (key: string) => string;

/**
 * Create lead form schema with translated error messages
 * 
 * @param t - Translation function that returns translated string by key
 * @returns Zod schema with localized error messages
 */
export function createLeadFormSchema(t: TranslationFunction) {
  return z.object({
    name: z
      .string()
      .min(1, { message: t("Name is required") })
      .min(2, { message: t("Name must be at least 2 characters long") })
      .max(100, { message: t("Name must not exceed 100 characters") })
      .trim(),

    phone: z
      .string()
      .min(1, { message: t("Phone number is required") })
      .min(8, { message: t("Phone number must be at least 8 characters") })
      .max(20, { message: t("Phone number must not exceed 20 characters") })
      .regex(
        /^[\d\s\-\+\(\)]+$/,
        { message: t("Phone number contains invalid characters") }
      )
      .trim(),

    email: z
      .string()
      .min(1, { message: t("Email is required") })
      .email({ message: t("Please enter a valid email address") })
      .max(255, { message: t("Email must not exceed 255 characters") })
      .toLowerCase()
      .trim(),
  });
}

/**
 * Default schema with English messages (for backwards compatibility)
 */
export const leadFormSchema = createLeadFormSchema((key) => key);

/**
 * Inferred TypeScript type from Zod schema
 */
export type LeadFormSchemaType = z.infer<typeof leadFormSchema>;

/**
 * Safe parse wrapper with custom error formatting and translations
 * 
 * @param data - Data to validate
 * @param t - Translation function (optional, defaults to English)
 * @returns Validation result with formatted errors
 */
export function validateLeadForm(
  data: unknown,
  t?: TranslationFunction
) {
  // Use translated schema if translation function provided
  const schema = t ? createLeadFormSchema(t) : leadFormSchema;
  const result = schema.safeParse(data);
  
  if (!result.success) {
    // Transform Zod errors to FormErrors format
    const formattedErrors: Record<string, string[]> = {};
    
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      if (!formattedErrors[field]) {
        formattedErrors[field] = [];
      }
      formattedErrors[field].push(issue.message);
    });
    
    return {
      success: false as const,
      errors: formattedErrors,
    };
  }
  
  return {
    success: true as const,
    data: result.data,
  };
}
