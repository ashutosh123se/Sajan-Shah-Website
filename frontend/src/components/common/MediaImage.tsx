'use client';

import React from 'react';
import { resolveMediaUrl } from '@/lib/resolveMediaUrl';

type MediaImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src?: string | null;
};

/** Renders CMS / upload images with correct production URL resolution. */
export function MediaImage({ src, alt = '', ...props }: MediaImageProps) {
  const resolved = resolveMediaUrl(src);
  if (!resolved) return null;
  return <img {...props} src={resolved} alt={alt} />;
}
