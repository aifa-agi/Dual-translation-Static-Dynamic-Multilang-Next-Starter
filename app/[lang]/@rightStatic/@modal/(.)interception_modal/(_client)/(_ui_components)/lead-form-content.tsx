// app/[lang]/@rightStatic/(...)interception_modal/lead-form/(_client)/(_ui_components)/lead-form-content.tsx

"use client";

/**
 * Client Component: Lead Form Content
 * 
 * Purpose: Main form content with fields and submit button
 * - Renders form header and description
 * - Displays close button
 * - Renders form fields component
 * - Handles form submission
 * - Shows validation errors and messages
 */

import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadFormFields } from "./lead-form-fields";
import type { LeadFormContentProps } from "../../(_shared)/(_types)/lead-form-types";
import { useLeadFormTranslation } from "../../(_shared)/(_translations)/get-lead-form-translation";
import { A11Y_CONFIG } from "../../(_shared)/(_config)/lead-form-config";

export function LeadFormContent({
  translations,
  onSubmit,
  formState,
  onClose,
}: LeadFormContentProps) {
  const t = useLeadFormTranslation(translations);

  /**
   * Handle form submission
   */
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onSubmit(formData);
  };

  return (
    <>
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
        aria-label={t("Close")}
        disabled={formState.isSubmitting}
      >
        <X size={24} />
      </button>

      <div className="p-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 id="lead-form-title" className="text-2xl font-bold mb-2">
            {t("Try Free")}
          </h2>
          <p className="text-muted-foreground">
            {t("Free Access Description")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Form fields */}
          <LeadFormFields
            translations={translations}
            errors={formState.errors}
            isSubmitting={formState.isSubmitting}
          />

          {/* General error message */}
          {formState.message && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md">
              <p className="text-sm text-destructive">{formState.message}</p>
            </div>
          )}

          {/* Submit button */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={formState.isSubmitting}
              className="w-full px-6 py-3 text-base font-medium
                        transition-all duration-200 hover:shadow-lg
                        disabled:cursor-not-allowed"
              aria-label={A11Y_CONFIG.SUBMIT_BUTTON_LABEL}
            >
              {formState.isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  {t("Sending")}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {t("Submit Lead")}
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Privacy notice */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          {t("Privacy Agreement")}
        </p>
      </div>
    </>
  );
}
