export class PosterDto {
  id: number;
  url: string;

  constructor(posterData: PosterDto) {
    Object.assign(this, posterData);
  }
}
