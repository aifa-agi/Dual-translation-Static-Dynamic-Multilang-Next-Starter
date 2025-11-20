// app/[lang]/@rightStatic/(...)interception_modal/lead-form/(_client)/(_ui_components)/lead-form-success.tsx

"use client";



import { CheckCircle } from "lucide-react";
import type { LeadFormSuccessProps } from "../../(_shared)/(_types)/lead-form-types";
import { useLeadFormTranslation } from "../../(_shared)/(_translations)/get-lead-form-translation";
import { ANIMATION_CONFIG } from "../../(_shared)/(_config)/lead-form-config";

export function LeadFormSuccess({ translations }: LeadFormSuccessProps) {
  const t = useLeadFormTranslation(translations);

  return (
    <div className="p-8">
      <div className="text-center">
        {/* Success icon with animation */}
        <CheckCircle 
          className={`w-16 h-16 text-green-600 mx-auto mb-4 ${ANIMATION_CONFIG.SUCCESS_ICON_ANIMATE}`}
          aria-hidden="true"
        />
        
        {/* Success heading */}
        <h2 className="text-2xl font-bold mb-4">
          {t("Lead Form Submitted")}
        </h2>
        
        {/* Thank you message */}
        <p className="text-muted-foreground mb-6">
          {t("Lead Form Thank You")}
        </p>
        
        {/* Auto-close notification */}
        <p className="text-sm text-muted-foreground">
          {t("Auto Close Window")}
        </p>
      </div>
    </div>
  );
}
