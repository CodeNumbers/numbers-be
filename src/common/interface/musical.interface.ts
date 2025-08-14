import { Poster } from './poster.interface';

export interface Musical {
  id: number;

  title: string;

  poster: Poster;

  synopsis: string;

  createdAt: Date;
}
