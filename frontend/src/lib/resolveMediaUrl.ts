/** Turn stored image paths into a browser-loadable URL on any environment. */
export function resolveMediaUrl(url?: string | null): string {
  if (!url) return '';

  // Already absolute and not localhost — use as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    if (!url.includes('localhost') && !url.includes('127.0.0.1')) {
      return url;
    }
    // Rewrite localhost upload URLs saved during local dev / misconfigured server
    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '') || '';
    if (apiBase) {
      const path = url.replace(/^https?:\/\/[^/]+/, '');
      return `${apiBase}${path}`;
    }
    return url;
  }

  // Relative upload path from backend
  if (url.startsWith('/uploads/')) {
    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '') || '';
    return apiBase ? `${apiBase}${url}` : url;
  }

  // Frontend public assets (/LOGO.png, etc.)
  return url;
}
