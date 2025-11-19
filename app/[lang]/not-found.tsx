// app/not-found.tsx

import { Button } from "@/components/ui/button";
import { getErrorIllustration } from "@/config/app-config";
import { DEFAULT_LANGUAGE } from "@/config/translations/translations.config";
import Link from "next/link";
import Image from "next/image";

export default function RootNotFound() {
  const darkPath = getErrorIllustration("404", "dark");
  const lightPath = getErrorIllustration("404", "light");

  const darkSrc =
    darkPath && typeof darkPath === "string" && darkPath.length > 0
      ? darkPath
      : null;
  const lightSrc =
    lightPath && typeof lightPath === "string" && lightPath.length > 0
      ? lightPath
      : null;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-6">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl">
        {/* Dark theme illustration */}
        {darkSrc && (
          <Image
            src={darkSrc}
            alt="404 - Page not found"
            width={400}
            height={400}
            priority
            className="mb-8 dark:block hidden"
          />
        )}

        {/* Light theme illustration */}
        {lightSrc && (
          <Image
            src={lightSrc}
            alt="404 - Page not found"
            width={400}
            height={400}
            priority
            className="mb-8 dark:hidden block"
          />
        )}

        {/* Error heading */}
        <h1 className="text-foreground text-6xl font-bold mb-4">404</h1>

        {/* Error title */}
        <h2 className="text-foreground text-3xl font-semibold mb-3 text-center">
          Page Not Found
        </h2>

        {/* Error description */}
        <p className="text-muted-foreground text-lg text-center mb-8 max-w-md">
          Could not find the requested resource. The page you are looking for
          might have been removed or is temporarily unavailable.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button asChild size="lg" className="w-full">
            <Link href={`/${DEFAULT_LANGUAGE}/home`}>Go to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
