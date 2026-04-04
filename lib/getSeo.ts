import { cache } from "react";

export const getSeo = cache(async (path: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/seo/page/${encodeURIComponent(path)}`,
      { cache: "no-store" },
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
});

export const cleanHtmlString = (htmlStr?: string) => {
  if (!htmlStr) return "";
  return htmlStr
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/<\/?p[^>]*>/gi, '')
    // Extract actual URLs from WYSIWYG wrapper anchor tags
    .replace(/<a\b[^>]*href="([^"]*)"[^>]*>.*?<\/a>/gi, '$1');
};

export const extractSchemaScript = (htmlStr?: string) => {
  if (!htmlStr) return "";
  
  // First un-escape any HTML entities in case the script tag itself was escaped
  const cleaned = cleanHtmlString(htmlStr);
  
  // Match only the content inside <script> tags for application/ld+json
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  const scripts = [];
  let match;
  while ((match = scriptRegex.exec(cleaned)) !== null) {
    scripts.push(match[1]);
  }
  
  return scripts.length > 0 ? scripts.join('\n') : "";
};

export const parseOpenGraph = (htmlStr?: string) => {
  const cleaned = cleanHtmlString(htmlStr);
  const tags: Record<string, string> = {};
  const metaRegex = /<meta\s+([^>]+)>/gi;
  const regexContent = /content=["'](.*?)["']/i;
  const regexProperty = /property=["']og:([^"']+)["']/i;
  
  let match;
  while ((match = metaRegex.exec(cleaned)) !== null) {
      const attrs = match[1];
      const propMatch = attrs.match(regexProperty);
      const contentMatch = attrs.match(regexContent);
      if (propMatch && contentMatch) {
          tags[propMatch[1]] = contentMatch[1].trim();
      }
  }

  // Next.js requires a valid OG type. Default to "website" if missing or empty.
  if (!tags.type || tags.type === "") {
    tags.type = "website";
  }

  return tags;
};
