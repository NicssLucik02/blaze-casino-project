import { redirect } from 'next/navigation';

export default function Dashboard() {
  redirect('/login');
  return (
    <div>
      <main></main>
    </div>
  );
}
