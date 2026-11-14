import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/world/', '/vault/'].map((path) => ({ url: `${site.url}${path}` }));
}
