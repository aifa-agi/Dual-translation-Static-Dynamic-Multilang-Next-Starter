// app/[lang]/@rightStatic/(...)interception_modal/lead-form/(_client)/(_ui_components)/lead-form-content.tsx

"use client";

import { X, Send } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { LeadFormFields } from "./lead-form-fields";
import { submitLeadFormActionNoJS } from "../../(_server)/(_actions)/submit-lead-action";
import type { LeadFormContentProps } from "../../(_shared)/(_types)/lead-form-types";
import { useLeadFormTranslation } from "../../(_shared)/(_translations)/get-lead-form-translation";
import { A11Y_CONFIG } from "../../(_shared)/(_config)/lead-form-config";
import type { SupportedLanguage } from "@/config/translations/translations.config";

/**
 * Submit button component using useFormStatus
 * Works with progressive enhancement
 */
function SubmitButton({ 
  translations,
}: { 
  translations: LeadFormContentProps["translations"];
}) {
  const { pending } = useFormStatus();
  const t = useLeadFormTranslation(translations);

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full px-6 py-3 text-base font-medium
                transition-all duration-200 hover:shadow-lg
                disabled:cursor-not-allowed"
      aria-label={A11Y_CONFIG.SUBMIT_BUTTON_LABEL}
    >
      {pending ? (
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
  );
}

export function LeadFormContent({
  translations,
  onSubmit,
  formState,
  onClose,
  lang,
}: LeadFormContentProps & { lang: SupportedLanguage }) {
  const t = useLeadFormTranslation(translations);

  // Bind lang parameter to server action (for non-JS fallback)
  const submitWithLangNoJS = submitLeadFormActionNoJS.bind(null, lang);

  return (
    <>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
        aria-label={t("Close")}
        disabled={formState.isSubmitting}
      >
        <X size={24} />
      </button>

      <div className="p-6">
        <div className="mb-6 text-center">
          <h2 id="lead-form-title" className="text-2xl font-bold mb-2">
            {t("Try Free")}
          </h2>
          <p className="text-muted-foreground">
            {t("Free Access Description")}
          </p>
        </div>

        {/* 
          Progressive Enhancement Form:
          - WITH JS: Uses onSubmit handler with preventDefault
          - WITHOUT JS: Uses action attribute for native form submission
        */}
        <form 
          action={submitWithLangNoJS}
          onSubmit={(e) => {
            // Only prevent default if JS is enabled
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            onSubmit(formData);
          }}
          className="space-y-4"
        >
          <LeadFormFields
            translations={translations}
            errors={formState.errors}
            isSubmitting={formState.isSubmitting}
          />

          {formState.message && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-md">
              <p className="text-sm text-destructive">{formState.message}</p>
            </div>
          )}

          <div className="pt-2">
            <SubmitButton translations={translations} />
          </div>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          {t("Privacy Agreement")}
        </p>
      </div>
    </>
  );
}
