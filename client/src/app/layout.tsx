import type { Metadata } from 'next';
import { Inter, Noto_Sans, Poppins } from 'next/font/google';

import { APP_DESCRIPTION } from '@/shared/config/constants.config';

import './globals.css';
import { ThemeProvider } from './providers';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const notoSans = Noto_Sans({
  weight: ['400', '500'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-noto',
});

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Splashy',
    template: '%s | Splashy',
  },
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${notoSans.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
