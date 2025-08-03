import { Poster } from 'src/common/interface/poster.interface';

export class MusicalDto {
  id: number;
  title: string;
  poster: Poster;

  constructor(musicalData: MusicalDto) {
    Object.assign(this, musicalData);
  }
}
