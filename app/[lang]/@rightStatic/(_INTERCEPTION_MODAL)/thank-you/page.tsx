//app/[lang]/@rightStatic/(_INTERCEPTION_MODAL)/thank-you/page.tsx
/**
 * Thank You Page - Server Component
 * 
 * Displays confirmation page after successful form submission
 * - Fully server-side rendered with i18n support
 * - Static generation for all supported languages
 * - Theme-aware illustrations
 * - Analytics tracking via client component
 * 
 * @route app/[lang]/@rightStatic/(_INTERCEPTION_MODAL)/thank-you/page.tsx
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import { 
  THANK_YOU_PAGE_CONFIG, 
  getThankYouIllustrations 
} from "./(_shared)/(_config)/thank-you-config";
import { getThankYouTranslation } from "./(_shared)/(_translations)/get-thank-you-translation";
import { AnalyticsTracker } from "./(_client)/(_ui_components)/analytics-tracker";
import { ThemeAwareIllustration } from "./(_client)/(_ui_components)/theme-aware-illustration";
import type { SupportedLanguage } from "@/config/translations/translations.config";

// Static generation configuration
export const dynamic = 'force-static';
export const revalidate = false;

interface ThankYouPageProps {
  params: Promise<{
    lang: SupportedLanguage;
  }>;
}

/**
 * Thank You Page Component
 * Server-side rendered with full i18n support
 * 
 * @description Next.js 15 compatible - params is awaited before use
 */
export default async function ThankYouPage({ params }: ThankYouPageProps) {
  // Next.js 15: Await params before accessing properties
  const { lang } = await params;

  // Load translations for current language
  const t = await getThankYouTranslation(lang);

  // Get theme-aware illustrations
  const illustrations = getThankYouIllustrations();

  // Get navigation URLs from config
  const { navigation } = THANK_YOU_PAGE_CONFIG;

  return (
    <>
      {/* Client component for analytics tracking */}
      <AnalyticsTracker />

      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-2xl w-full">
          <div className="rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            {/* Success Illustration (theme-aware via CSS) */}
            <ThemeAwareIllustration
              darkSrc={illustrations.dark}
              lightSrc={illustrations.light}
              alt={t.successIllustrationAlt}
            />

            {/* Main Content */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t.description}
              </p>
            </div>

            {/* What Happens Next Section */}
            <div className="bg-primary/10 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary mr-2" />
                <h2 className="text-xl font-semibold text-foreground">
                  {t.whatNextTitle}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t.whatNextDescription}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${lang}${navigation.homeUrl}`}>
                <Button
                  className="px-8 py-3 text-base transition-all duration-200 hover:shadow-lg w-full sm:w-auto flex items-center justify-center"
                  size="lg"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.backToHome}
                </Button>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
