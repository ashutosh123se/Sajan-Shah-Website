import api from '@/lib/api';

const IMAGE_KEY_HINTS = [
  'image',
  'photo',
  'thumbnail',
  'poster',
  'avatar',
  'cover',
  'logo',
  'img',
  'picture',
  'banner',
];

/** True when a CMS/form field key represents an image (not a link/CTA URL). */
export function isImageFieldKey(key: string): boolean {
  const k = key.toLowerCase();
  return IMAGE_KEY_HINTS.some((h) => k.includes(h));
}

export async function uploadAdminImage(file: File, folder = 'uploads'): Promise<string> {
  const data = new FormData();
  data.append('image', file);
  data.append('folder', folder);
  const res = await api.post('/upload', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  const imageUrl = res.data?.data?.imageUrl;
  if (!imageUrl) throw new Error('Upload succeeded but no image URL was returned');
  return imageUrl;
}
