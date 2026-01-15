import '@/styles/globals.scss';
import { inter, satoshi } from '@/styles/fonts';
import { QueryProvider } from './providers/queryProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blaze Casino',
  description:
    'Play exciting casino games, compete on leaderboards, and win big at Blaze Casino',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${satoshi.variable}`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
