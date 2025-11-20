// app/[lang]/@rightStatic/(...)interception_modal/lead-form/page.tsx



import { LeadFormModalOverlay } from "./(_client)";
import { getLeadFormTranslation } from "./(_shared)/(_translations)/get-lead-form-translation";
import type { PageProps } from "./(_shared)/(_types)/lead-form-types";

export default async function LeadFormModalPage({ params }: PageProps) {
  // Await params according to Next.js 15 requirements
  const { lang } = await params;

  // Get server-side translations for the current language
  const translations = await getLeadFormTranslation(lang);

  return (
    <LeadFormModalOverlay 
      lang={lang} 
      translations={translations} 
    />
  );
}

/**
 * Generate metadata for the modal page
 * This prevents indexing of the intercepted modal route
 */
export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  
  return {
    title: "Lead Form Modal",
    robots: {
      index: false,
      follow: false,
    },
  };
}
