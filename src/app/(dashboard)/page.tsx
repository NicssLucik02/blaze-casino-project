import { AppRoutes } from '@/types/enums';
import { redirect } from 'next/navigation';

export default function Dashboard() {
  redirect(AppRoutes.LOGIN);
  return (
    <div>
      <main></main>
    </div>
  );
}
