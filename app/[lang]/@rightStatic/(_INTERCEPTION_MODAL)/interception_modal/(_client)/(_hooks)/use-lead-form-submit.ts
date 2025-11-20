// app/[lang]/@rightStatic/(...)interception_modal/lead-form/(_client)/(_hooks)/use-lead-form-submit.ts

"use client";

/**
 * Custom Hook: Lead Form Submit Logic
 * 
 * UPDATED: Pass language parameter to server action for localized errors
 * - Track submission state (isSubmitting, isSuccess)
 * - Handle form data submission via server action with lang parameter
 * - Process server response with translated error messages
 * - Manage automatic redirect after success
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { submitLeadFormAction } from "../../(_server)/(_actions)/submit-lead-action";
import type { FormState } from "../../(_shared)/(_types)/lead-form-types";
import type { SupportedLanguage } from "@/config/translations/translations.config";
import { 
  SUCCESS_CONFIG, 
  getRedirectUrl, 
  logFormEvent 
} from "../../(_shared)/(_config)/lead-form-config";

export function useLeadFormSubmit(lang: SupportedLanguage) {
  const router = useRouter();
  
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    errors: {},
    message: "",
  });

  /**
   * Handle automatic redirect after success
   * Fixed: Close intercepted modal before redirect
   */
  useEffect(() => {
    if (!formState.isSuccess) return;

    logFormEvent("Success! Scheduling redirect...");

    const timer = setTimeout(() => {
      logFormEvent("Closing modal and redirecting to thank-you page");

      // Step 1: Close the intercepted modal
      router.back();

      // Step 2: Navigate to thank-you page after modal closes
      setTimeout(() => {
        const redirectUrl = getRedirectUrl(lang);
        
        // Use window.location for full page navigation
        if (typeof window !== "undefined") {
          window.location.href = redirectUrl;
        }
      }, SUCCESS_CONFIG.REDIRECT_DELAY + 200);

    }, SUCCESS_CONFIG.DISPLAY_DURATION);

    return () => clearTimeout(timer);
  }, [formState.isSuccess, router, lang]);

  /**
   * Handle form submission with language parameter
   * UPDATED: Pass lang to server action for translated error messages
   */
  const handleSubmit = async (formData: FormData) => {
    logFormEvent("Form submission started", { lang });
    
    setFormState({
      isSubmitting: true,
      isSuccess: false,
      errors: {},
      message: "",
    });

    try {
      // Call server action WITH language parameter
      const result = await submitLeadFormAction(formData, lang);

      if (result.success) {
        logFormEvent("Form submitted successfully");
        
        setFormState({
          isSubmitting: false,
          isSuccess: true,
          errors: {},
          message: "",
        });
      } else {
        logFormEvent("Form submission failed", result.errors);
        
        setFormState({
          isSubmitting: false,
          isSuccess: false,
          errors: result.errors || {},
          message: result.message || "Submission failed",
        });
      }
    } catch (error) {
      console.error("[useLeadFormSubmit] Unexpected error:", error);
      
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        errors: {},
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return {
    formState,
    handleSubmit,
  };
}
