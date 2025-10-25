import type { Metadata } from 'next';
import { Inter, Noto_Sans, Poppins } from 'next/font/google';

import {
  QueryClientProvider,
  ReduxProvider,
  ThemeProvider,
} from '@/app/providers';

import { APP_DESCRIPTION } from '@/shared/config/constants.config';
import { Toaster } from '@/shared/ui';

import './globals.css';

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
        <ThemeProvider>
          <QueryClientProvider>
            <ReduxProvider>
              <Toaster />
              {children}
            </ReduxProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
