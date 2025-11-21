//components/cookie-banner/(_shared)/(_schemas)/cookie-consent-schema.ts

import { z } from 'zod';

export const CookieConsentSchema = z.object({
  essential: z.literal(true), // Essential always true
  analytics: z.boolean(),
  marketing: z.boolean(),
  timestamp: z.number().int().nonnegative(),
  version: z.string().min(1),
});

export type CookieConsent = z.infer<typeof CookieConsentSchema>;

/**
 * Validate cookie consent data.
 * Throws if invalid.
 * 
 * @param data - Unknown data to validate
 * @returns Validated CookieConsent object
 */
export function validateCookieConsent(data: unknown): CookieConsent {
  return CookieConsentSchema.parse(data);
}

/**
 * Safe parse cookie consent data.
 * Returns boolean success flag and parsed data or errors.
 * 
 * @param data - Unknown data to validate
 */
export function safeParseCookieConsent(data: unknown): {
  success: boolean;
  data?: CookieConsent;
  error?: z.ZodError;
} {
  const result = CookieConsentSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
