import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DataForge — AI Training Data Marketplace',
  description:
    'Source rights-cleared, multimodal training data at scale. Video, audio, images, text, and sensor data with full legal provenance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
