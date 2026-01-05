import '@/styles/globals.scss';
import { inter, satoshi } from '@/styles/fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${satoshi.variable}`}>
        {children}
      </body>
    </html>
  );
}
