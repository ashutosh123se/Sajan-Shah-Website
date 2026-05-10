import type { Metadata } from 'next';
import { Poppins, Open_Sans } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import EventPopup from '@/components/common/EventPopup';
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
      </head>
      <body className={`${poppins.variable} ${openSans.variable} font-body antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
          }}
        />
        <EventPopup />
      </body>
    </html>
  );
}
