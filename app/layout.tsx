import type { Metadata, Viewport } from 'next';
import './globals.css';
import './cinema.css';
import './discovery.css';
import { createPreviewMetadata } from '@/lib/seo.mjs';
export const metadata: Metadata = createPreviewMetadata() as Metadata;
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#020303' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
