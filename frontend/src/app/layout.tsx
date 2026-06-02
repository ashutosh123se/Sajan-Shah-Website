import type { Metadata } from 'next';
import { Poppins, Open_Sans } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import ClientToaster from '@/components/common/ClientToaster';
import EventPopup from '@/components/common/EventPopup';
import DailyCardDeck from '@/components/common/DailyCardDeck';
import './globals.css';

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const openSans = Open_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Sajan Shah - Memory Man of India',
    template: '%s | Sajan Shah'
  },
  description: 'Sajan Shah - Memory Man of India, Global Youth Speaker, Neuroscience-Backed Educator, and Corporate Trainer. Transform your life with proven memory techniques.',
  keywords: ['memory training', 'youth speaker', 'education', 'neuroscience', 'sajan shah', 'memory man of india'],
  authors: [{ name: 'Sajan Shah' }],
  creator: 'Sajan Shah',
  publisher: 'Sajan Shah',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'Sajan Shah - Memory Man of India',
    description: 'Sajan Shah - Memory Man of India, Global Youth Speaker, Neuroscience-Backed Educator.',
    siteName: 'Sajan Shah',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sajan Shah - Memory Man of India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sajan Shah - Memory Man of India',
    description: 'Sajan Shah - Memory Man of India, Global Youth Speaker, Neuroscience-Backed Educator.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon-192.png',
    apple: '/favicon-192.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'} />
        <link rel="icon" href="/favicon-192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/favicon-192.png" sizes="96x96" type="image/png" />
        <link rel="icon" href="/favicon-192.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/favicon-192.png" sizes="32x32" type="image/png" />
        <link rel="shortcut icon" href="/favicon-192.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon-192.png" sizes="192x192" />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className={`${poppins.variable} ${openSans.variable} font-body antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <ClientToaster />
        <EventPopup />
        <DailyCardDeck />
      </body>
    </html>
  );
}

