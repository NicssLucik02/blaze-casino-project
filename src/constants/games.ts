import rocketGameImage from '@/assets/images/rocketgame.jpg';
import CaseGameImage from '@/assets/images/case-game.png';
import MinesGameImage from '@/assets/images/mines-game.png';
import PlinkoGameImage from '@/assets/images/plinko-game.jpg';
import { GamesTypes } from '@/types/enums';
import { GameCardInfo } from '@/types/games';

export const gameCardsInfo: GameCardInfo[] = [
  {
    slug: GamesTypes.CRASH,
    title: 'Crash',
    label: 'Top',
    description: 'Watch the multiplier rise and cash out before it`s gone',
    backgroundImage: rocketGameImage,
  },
  {
    slug: GamesTypes.CASES,
    title: 'Case',
    label: 'Popular',
    description: 'Open cases and win random rewards',
    backgroundImage: CaseGameImage,
  },
  {
    slug: GamesTypes.MINES,
    title: 'Mines',
    label: 'Hot',
    description: 'Avoid the mines and collect bigger rewards',
    backgroundImage: MinesGameImage,
  },
  {
    slug: GamesTypes.PLINKO,
    title: 'Plinko',
    label: 'New',
    description: 'Drop the ball, watch it bounce, and win prizes',
    backgroundImage: PlinkoGameImage,
  },
];
