// app/[lang]/@rightStatic/(...)interception_modal/lead-form/(_server)/(_actions)/submit-lead-action.ts

"use server";

import { redirect } from "next/navigation";
import { validateLeadForm } from "../../(_shared)/(_schemas)/lead-form-schema";
import { logFormEvent, getRedirectUrl } from "../../(_shared)/(_config)/lead-form-config";
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
 * Server Action for Progressive Enhancement (without JS)
 * Returns void and uses redirect() on success
 * Used in form action attribute
 */
export async function submitLeadFormActionNoJS(
  lang: SupportedLanguage,
  formData: FormData,
): Promise<void> {
  try {
    logFormEvent("Server Action (No JS): Form submission started", { lang });

    const translations = await getLeadFormTranslation(lang);
    const t = getValidationTranslationFunction(translations);

    const rawData = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
    };

    const validation = validateLeadForm(rawData, t);

    if (!validation.success) {
      logFormEvent("Server Action (No JS): Validation failed", validation.errors);
      // Without JS, we can't show errors inline, just redirect or return
      // For now, just return and let form stay on page
      return;
    }

    const validatedData = validation.data;
    logFormEvent("Server Action (No JS): Validation passed", validatedData);

    // TODO: Save to database
    // await prisma.lead.create({ ... });

    // TODO: Send email
    // await resend.emails.send({ ... });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    logFormEvent("Server Action (No JS): Lead saved successfully, redirecting");

    // Server-side redirect (works WITHOUT JavaScript)
    const redirectUrl = getRedirectUrl(lang);
    redirect(redirectUrl);

  } catch (error) {
    // Check if error is redirect (Next.js throws on redirect)
    if (error && typeof error === 'object' && 'digest' in error) {
      throw error; // Re-throw redirect
    }

    console.error("[Server Action No JS] Error:", error);
    // Can't show error without JS, just return
    return;
  }
}

/**
 * Server Action for JavaScript-enabled clients
 * Returns ServerActionResult for client-side handling
 * Used when calling from client components
 */
export async function submitLeadFormAction(
  formData: FormData,
  lang: SupportedLanguage
): Promise<ServerActionResult> {
  try {
    logFormEvent("Server Action (With JS): Form submission started", { lang });

    const translations = await getLeadFormTranslation(lang);
    const t = getValidationTranslationFunction(translations);

    const rawData = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
    };

    logFormEvent("Server Action (With JS): Raw data extracted", rawData);

    const validation = validateLeadForm(rawData, t);

    if (!validation.success) {
      logFormEvent("Server Action (With JS): Validation failed", validation.errors);
      
      return {
        success: false,
        errors: validation.errors,
        message: t("Validation failed. Please check your input."),
      };
    }

    const validatedData = validation.data;
    logFormEvent("Server Action (With JS): Validation passed", validatedData);

    // TODO: Save to database
    // await prisma.lead.create({ ... });

    // TODO: Send email
    // await resend.emails.send({ ... });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    logFormEvent("Server Action (With JS): Lead saved successfully");

    return {
      success: true,
      message: "Lead form submitted successfully!",
    };

  } catch (error) {
    console.error("[Server Action With JS] Error submitting lead form:", error);

    try {
      const translations = await getLeadFormTranslation(lang);
      const t = getValidationTranslationFunction(translations);
      
      return {
        success: false,
        message: t("An unexpected error occurred. Please try again later."),
      };
    } catch {
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
}
