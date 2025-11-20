// app/[lang]/@rightStatic/(...)interception_modal/lead-form/(_server)/(_actions)/submit-lead-action.ts

/**
 * Server Action: Submit Lead Form
 * 
 * UPDATED: Added language parameter for translated validation messages
 * - Validate form data with Zod schema
 * - Return localized error messages
 * - Save lead to database (Prisma/Neon)
 * - Send notification email (Resend)
 */

"use server";

import { validateLeadForm } from "../../(_shared)/(_schemas)/lead-form-schema";
import { logFormEvent } from "../../(_shared)/(_config)/lead-form-config";
import { 
  getLeadFormTranslation,
  getValidationTranslationFunction 
} from "../../(_shared)/(_translations)/get-lead-form-translation";
import type { 
  ServerActionResult 
} from "../../(_shared)/(_types)/lead-form-types";
import type { 
  SupportedLanguage 
} from "@/config/translations/translations.config";

/**
 * Submit lead form data with localized validation
 * 
 * @param formData - FormData object from client form submission
 * @param lang - Language code for error message translations
 * @returns ServerActionResult with success status and translated errors
 */
export async function submitLeadFormAction(
  formData: FormData,
  lang: SupportedLanguage
): Promise<ServerActionResult> {
  try {
    logFormEvent("Server Action: Form submission started", { lang });

    // Get translations for the current language
    const translations = await getLeadFormTranslation(lang);
    const t = getValidationTranslationFunction(translations);

    // Extract form data
    const rawData = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
    };

    logFormEvent("Server Action: Raw data extracted", rawData);

    // Validate with Zod schema using translated messages
    const validation = validateLeadForm(rawData, t);

    if (!validation.success) {
      logFormEvent("Server Action: Validation failed", validation.errors);
      return {
        success: false,
        errors: validation.errors,
        message: t("Validation failed. Please check your input."),
      };
    }

    const validatedData = validation.data;
    logFormEvent("Server Action: Validation passed", validatedData);

    // TODO: Save to database using Prisma
    // Example:
    // const lead = await prisma.lead.create({
    //   data: {
    //     name: validatedData.name,
    //     phone: validatedData.phone,
    //     email: validatedData.email,
    //     source: "lead_form_modal",
    //     language: lang,
    //     createdAt: new Date(),
    //   },
    // });

    // TODO: Send notification email using Resend
    // Example:
    // await resend.emails.send({
    //   from: process.env.EMAIL_FROM!,
    //   to: process.env.ADMIN_EMAIL!,
    //   subject: `New Lead Submission (${lang})`,
    //   html: `
    //     <h2>New Lead Form Submission</h2>
    //     <p><strong>Language:</strong> ${lang}</p>
    //     <p><strong>Name:</strong> ${validatedData.name}</p>
    //     <p><strong>Phone:</strong> ${validatedData.phone}</p>
    //     <p><strong>Email:</strong> ${validatedData.email}</p>
    //   `,
    // });

    // Simulate async operation (remove in production)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    logFormEvent("Server Action: Lead saved successfully");

    return {
      success: true,
      message: "Lead form submitted successfully!",
    };
  } catch (error) {
    console.error("[Server Action] Error submitting lead form:", error);

    // Get translation for generic error message
    try {
      const translations = await getLeadFormTranslation(lang);
      const t = getValidationTranslationFunction(translations);
      
      return {
        success: false,
        message: t("An unexpected error occurred. Please try again later."),
      };
    } catch {
      // Fallback to English if translation fails
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
}

/**
 * Test server action (development only)
 * Validates form without saving to database
 */
export async function testLeadFormAction(
  formData: FormData,
  lang: SupportedLanguage
): Promise<ServerActionResult> {
  const translations = await getLeadFormTranslation(lang);
  const t = getValidationTranslationFunction(translations);

  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
  };

  const validation = validateLeadForm(rawData, t);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
      message: "Validation test failed",
    };
  }

  return {
    success: true,
    message: "Validation test passed (not saved to database)",
  };
}
