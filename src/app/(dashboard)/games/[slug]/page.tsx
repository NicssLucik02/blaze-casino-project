import { CasesGame } from '@/components/Games/CasesGame/CasesGame';
import { CrashGame } from '@/components/Games/CrashGame/CrashGame';
import { MinesGame } from '@/components/Games/MinesGame/MinesGame';
import { PlinkoGame } from '@/components/Games/PlinkoGame/PlinkoGame';
import { GamesTypes } from '@/types/enums';
import { notFound } from 'next/navigation';

const GAMES: Record<GamesTypes, React.ComponentType> = {
  crash: CrashGame,
  cases: CasesGame,
  mines: MinesGame,
  plinko: PlinkoGame,
};

interface GamePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;

  if (!(slug in GAMES)) {
    notFound();
  }

  const GameComponent = GAMES[slug as GamesTypes];

  return (
    <main>
      <GameComponent />
    </main>
  );
}
