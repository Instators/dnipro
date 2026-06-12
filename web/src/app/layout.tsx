// web/src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/layout/Providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Dnipro — Universal Yield Adapter Standard',
  description:
    'The open-source yield routing layer for Solana DeFi. ' +
    'Deposit into Kamino, MarginFi, Jupiter LP, Maple, and Drift through one unified interface.',
  keywords: ['solana', 'defi', 'yield', 'adapter', 'kamino', 'marginfi', 'jupiter', 'maple', 'drift'],
  openGraph: {
    title: 'Dnipro — Universal Yield Adapter Standard',
    description: 'One interface. Every yield protocol on Solana.',
    url: 'https://dnipro.finance',
    siteName: 'Dnipro',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dnipro — Universal Yield Adapter Standard',
    description: 'One interface. Every yield protocol on Solana.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
