import { PosterProps } from './poster.interface';

export interface Musical {
  id: number;

  title: string;

  poster: PosterProps;

  synopsis: string;

  createdAt: Date;
}
