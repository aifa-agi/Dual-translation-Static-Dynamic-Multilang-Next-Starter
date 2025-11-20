//app/[lang]/@rightStatic/(_INTERCEPTION_MODAL)/thank-you/(_client)/(_ui_components)/theme-aware-illustration.tsx

"use client";



import Image from "next/image";
import { CheckCircle } from "lucide-react";

interface ThemeAwareIllustrationProps {
  /**
   * Path to dark theme illustration
   */
  darkSrc: string | null;
  
  /**
   * Path to light theme illustration
   */
  lightSrc: string | null;
  
  /**
   * Alt text for accessibility
   */
  alt: string;
  
  /**
   * Optional CSS classes
   */
  className?: string;
}

/**
 * Theme-aware illustration with success checkmark
 * Renders different images based on current theme
 */
export function ThemeAwareIllustration({
  darkSrc,
  lightSrc,
  alt,
  className = "",
}: ThemeAwareIllustrationProps) {
  return (
    <div className={`mb-8 ${className}`}>
      {/* Dark theme illustration */}
      {darkSrc && (
        <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 dark:block hidden">
          <Image
            src={darkSrc}
            alt={alt}
            fill
            className="object-contain"
            priority
          />
        </div>
      )}

      {/* Light theme illustration */}
      {lightSrc && (
        <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 dark:hidden block">
          <Image
            src={lightSrc}
            alt={alt}
            fill
            className="object-contain"
            priority
          />
        </div>
      )}

      {/* Success checkmark - always visible */}
      <CheckCircle 
        className="w-16 h-16 text-green-500 mx-auto" 
        aria-hidden="true" 
      />
    </div>
  );
}
