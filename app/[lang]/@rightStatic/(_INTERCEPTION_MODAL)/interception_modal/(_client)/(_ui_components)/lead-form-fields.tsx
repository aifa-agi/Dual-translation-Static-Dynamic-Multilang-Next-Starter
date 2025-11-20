// app/[lang]/@rightStatic/(...)interception_modal/lead-form/(_client)/(_ui_components)/lead-form-fields.tsx

"use client";

/**
 * Client Component: Lead Form Fields
 * 
 * Purpose: Render form input fields with validation
 * - Name input field
 * - Phone input field
 * - Email input field
 * - Display field-level validation errors
 * - Handle disabled state during submission
 */

import type { LeadFormFieldsProps } from "../../(_shared)/(_types)/lead-form-types";
import { useLeadFormTranslation } from "../../(_shared)/(_translations)/get-lead-form-translation";

export function LeadFormFields({
  translations,
  errors,
  isSubmitting,
}: LeadFormFieldsProps) {
  const t = useLeadFormTranslation(translations);

  const inputClassName = `w-full px-3 py-2 border border-input rounded-md shadow-sm 
    focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
    bg-background text-foreground
    placeholder:text-muted-foreground
    disabled:opacity-50 disabled:cursor-not-allowed`;

  return (
    <>
      {/* Name field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          {t("Name")} {t("Required Field")}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          disabled={isSubmitting}
          className={inputClassName}
          placeholder={t("Name Placeholder")}
          autoComplete="name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive" role="alert">
            {errors.name[0]}
          </p>
        )}
      </div>

      {/* Phone field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          {t("Phone")} {t("Required Field")}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          disabled={isSubmitting}
          className={inputClassName}
          placeholder={t("Phone Placeholder")}
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-destructive" role="alert">
            {errors.phone[0]}
          </p>
        )}
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          {t("Email")} {t("Required Field")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={isSubmitting}
          className={inputClassName}
          placeholder={t("Email Placeholder")}
          autoComplete="email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive" role="alert">
            {errors.email[0]}
          </p>
        )}
      </div>
    </>
  );
}
