// app/layout.tsx

import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { constructMetadata } from '@/lib/construct-metadata';
import { META_THEME_COLORS, appConfig } from '@/config/app-config';
import { fontVariables } from '@/lib/fonts';
import './styles/globals.css';
import { Toaster } from 'sonner';

import { GoogleAnalytics } from '@next/third-parties/google';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { cn } from '@/lib/utils';
import { ActiveThemeProvider } from '@/providers/active-theme';
import { ThemeProvider } from '@/providers/theme-provider';
import { LayoutProvider } from '@/hooks/use-layout';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = constructMetadata({
  pathname: '/',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: appConfig.pwa.backgroundColor },
    { media: '(prefers-color-scheme: dark)', color: appConfig.pwa.themeColor },
  ],
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: appConfig.name,
  url: appConfig.url,
  description: appConfig.description,
  inLanguage: appConfig.lang,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${appConfig.url}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: appConfig.name,
  url: appConfig.url,
  logo: `${appConfig.url}${appConfig.logo}`,
  description: appConfig.description,
  email: appConfig.mailSupport,
  sameAs: [
    appConfig.seo?.social?.github,
    appConfig.seo?.social?.twitter
      ? `https://twitter.com/${appConfig.seo.social.twitter.replace('@', '')}`
      : null,
    appConfig.seo?.social?.linkedin,
    appConfig.seo?.social?.facebook,
  ].filter(Boolean),
  contactPoint: {
    '@type': 'ContactPoint',
    email: appConfig.mailSupport,
    contactType: 'Customer Support',
    availableLanguage: appConfig.seo?.locales || [appConfig.lang],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang={appConfig.lang} suppressHydrationWarning>
      <head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        {/* PWA-related meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={appConfig.short_name} />
        <meta name="application-name" content={appConfig.short_name} />
        <meta name="msapplication-TileColor" content={appConfig.pwa.themeColor} />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="theme-color" content={META_THEME_COLORS.light} />

        {/* Theme script - must be inline for no-flash dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
              } catch (_) {}
            `,
          }}
        />

        {/* JSON-LD schemas for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebSite),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrganization),
          }}
        />
      </head>
      <body
        className={cn(
          'text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]',
          fontVariables
        )}
      >
        
        <ThemeProvider>
          <LayoutProvider>
            <ActiveThemeProvider>
              {children}
            </ActiveThemeProvider>
          </LayoutProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'development' && <TailwindIndicator />}
        <Toaster position="top-center" />
        {process.env.NODE_ENV === 'production' && (
          <>
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!} />
            <Analytics />
          </>
        )}
      </body>
    </html>
  );
}