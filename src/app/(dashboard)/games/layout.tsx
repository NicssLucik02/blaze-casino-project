import { BackDashboardLink } from '@/components/uikit/BackDashboardLink/BackDashboardLink';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <BackDashboardLink />
      {children}
    </div>
  );
}
