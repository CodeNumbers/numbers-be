import { MusicalNumberProps } from './musical-number.interface';
import { PosterProps } from './poster.interface';

export interface MusicalProps {
  title: string;

  poster: PosterProps;

  synopsis: string;

  numbers: MusicalNumberProps[];
}
