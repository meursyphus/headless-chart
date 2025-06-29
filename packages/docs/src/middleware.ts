import type { MiddlewareHandler } from "astro";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "./i18n";

function detectLanguage(
  context: Parameters<MiddlewareHandler>[0],
): (typeof SUPPORTED_LANGUAGES)[number] {
  const acceptLanguage = context.request.headers.get("accept-language");

  if (!acceptLanguage) {
    return DEFAULT_LANGUAGE;
  }

  const langs = acceptLanguage.split(",").map((lang) => lang.split(";")[0]);
  for (const lang of langs) {
    const shortLang = lang.slice(0, 2).toLowerCase();
    if (
      SUPPORTED_LANGUAGES.includes(
        shortLang as (typeof SUPPORTED_LANGUAGES)[number],
      )
    ) {
      return shortLang as (typeof SUPPORTED_LANGUAGES)[number];
    }
  }

  return DEFAULT_LANGUAGE;
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = new URL(context.request.url);

  // Handle /docs routes
  if (url.pathname.startsWith("/docs")) {
    const pathSegments = url.pathname.split("/").filter(Boolean);
    
    // Handle exact /docs redirect
    if (pathSegments.length === 1 && pathSegments[0] === "docs") {
      const preferredLang = detectLanguage(context);
      return context.redirect(`/docs/${preferredLang}/getting-started/introduction`);
    }
    
    // Handle /docs/[lang] redirect (no specific page)
    if (pathSegments.length === 2) {
      const [, lang] = pathSegments;
      if (SUPPORTED_LANGUAGES.includes(lang as (typeof SUPPORTED_LANGUAGES)[number])) {
        return context.redirect(`/docs/${lang}/getting-started/introduction`);
      }
    }
    
    // Handle missing language in path
    if (pathSegments.length >= 2) {
      const [, possibleLang] = pathSegments;
      
      // If second segment is not a language, insert the detected language
      if (!SUPPORTED_LANGUAGES.includes(possibleLang as (typeof SUPPORTED_LANGUAGES)[number])) {
        const preferredLang = detectLanguage(context);
        const restPath = pathSegments.slice(1).join("/");
        return context.redirect(`/docs/${preferredLang}/${restPath}`);
      }
    }
  }

  return next();
};
