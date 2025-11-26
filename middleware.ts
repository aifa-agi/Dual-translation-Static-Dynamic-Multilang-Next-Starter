// middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './config/translations/translations.config';

const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Добавляем реальный путь в заголовок для серверных компонентов AIFA
  const responseWithPath = NextResponse.next();
  responseWithPath.headers.set('x-pathname', pathname);

  // Check if pathname already has a language prefix
  const pathnameHasLocale = SUPPORTED_LANGUAGES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    const currentLocale = pathname.split('/')[1];

    responseWithPath.cookies.set(LOCALE_COOKIE_NAME, currentLocale, {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
    });

    return responseWithPath;
  }

  let detectedLocale = DEFAULT_LANGUAGE;

  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (cookieLocale && SUPPORTED_LANGUAGES.includes(cookieLocale)) {
    detectedLocale = cookieLocale;
  } else {
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
        SUPPORTED_LANGUAGES.includes(lang.code),
      );

      if (matchedLanguage) {
        detectedLocale = matchedLanguage.code;
      }
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname}`;

  const redirectResponse = NextResponse.redirect(url);
  redirectResponse.headers.set('x-pathname', url.pathname); // после редиректа путь меняется
  redirectResponse.cookies.set(LOCALE_COOKIE_NAME, detectedLocale, {
    maxAge: 365 * 24 * 60 * 60,
    path: '/',
  });

  return redirectResponse;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next/data).*)'],
};
