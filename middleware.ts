// middleware.ts 

import { NextRequest, NextResponse } from 'next/server';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './config/translations.config';

const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a language prefix
  const pathnameHasLocale = SUPPORTED_LANGUAGES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract locale from pathname and save to cookie
    const currentLocale = pathname.split('/')[1];
    
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE_NAME, currentLocale, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/',
    });
    
    return response;
  }

  // Priority: Cookie > Accept-Language > Default
  let detectedLocale = DEFAULT_LANGUAGE;

  // 1. Check cookie first (user's manual choice)
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (cookieLocale && SUPPORTED_LANGUAGES.includes(cookieLocale)) {
    detectedLocale = cookieLocale;
  } else {
    // 2. Detect from Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      const languages = acceptLanguage
        .split(',')
        .map((lang) => {
          const [code, priority] = lang.trim().split(';q=');
          return {
            code: code.split('-')[0].toLowerCase(),
            priority: priority ? parseFloat(priority) : 1.0,
          };
        })
        .sort((a, b) => b.priority - a.priority);

      const matchedLanguage = languages.find((lang) =>
        SUPPORTED_LANGUAGES.includes(lang.code)
      );

      if (matchedLanguage) {
        detectedLocale = matchedLanguage.code;
      }
    }
  }

  // Redirect to detected locale
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname}`;
  
  const response = NextResponse.redirect(url);
  
  // Save detected locale to cookie
  response.cookies.set(LOCALE_COOKIE_NAME, detectedLocale, {
    maxAge: 365 * 24 * 60 * 60,
    path: '/',
  });

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next/data).*)',
  ],
};
