import { PosterProps } from './poster.interface';

export interface Musical {
  id: number;

  title: string;

  firstChoseong: string;

  poster: PosterProps;

  synopsis: string;

  views: number;

  createdAt: Date;
}
