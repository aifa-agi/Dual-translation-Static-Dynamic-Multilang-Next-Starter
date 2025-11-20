// app/[lang]/@rightStatic/(...)interception_modal/lead-form/(_client)/(_ui_components)/lead-form-modal-overlay.tsx

"use client";

/**
 * Client Component: Lead Form Modal Overlay
 * 
 * Purpose: Main modal wrapper with overlay and state management
 * - Manages modal open/close state
 * - Handles backdrop clicks
 * - Coordinates form submission flow
 * - Routes between form and success states
 * - Handles navigation and redirects
 */

import { useRouter } from "next/navigation";
import { LeadFormContent } from "./lead-form-content";
import { LeadFormSuccess } from "./lead-form-success";
import { useLeadFormSubmit } from "../(_hooks)/use-lead-form-submit";
import type { LeadFormModalOverlayProps } from "../../(_shared)/(_types)/lead-form-types";
import { MODAL_CONFIG, ANIMATION_CONFIG } from "../../(_shared)/(_config)/lead-form-config";

export function LeadFormModalOverlay({ 
  lang, 
  translations 
}: LeadFormModalOverlayProps) {
  const router = useRouter();
  const { formState, handleSubmit } = useLeadFormSubmit(lang);

  /**
   * Handle backdrop click - close modal if not submitting
   */
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      // Prevent close during submission or success
      if (
        (MODAL_CONFIG.BLOCK_CLOSE_ON_SUBMIT && formState.isSubmitting) ||
        (MODAL_CONFIG.BLOCK_CLOSE_ON_SUCCESS && formState.isSuccess)
      ) {
        return;
      }
      router.back();
    }
  };

  /**
   * Handle close button click
   */
  const handleClose = () => {
    if (formState.isSubmitting) {
      return;
    }
    router.back();
  };

  return (
    <div
      className={`absolute inset-0 ${ANIMATION_CONFIG.OVERLAY_BG} ${ANIMATION_CONFIG.BACKDROP_BLUR} flex items-center justify-center p-4`}
      style={{ zIndex: MODAL_CONFIG.Z_INDEX }}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-background rounded-lg shadow-2xl relative w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-form-title"
      >
        {formState.isSuccess ? (
          <LeadFormSuccess translations={translations} />
        ) : (
          <LeadFormContent
  translations={translations}
  onSubmit={handleSubmit}
  formState={formState}
  onClose={handleClose}
  lang={lang} // NEW: Pass lang prop
/>

        )}
      </div>
    </div>
  );
}
