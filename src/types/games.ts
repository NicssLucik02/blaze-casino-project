import { StaticImageData } from 'next/image';
import { GamesTypes } from './enums';

export type GameCardInfo = {
  slug: GamesTypes;
  title: string;
  label: string;
  description: string;
  backgroundImage: StaticImageData;
};
