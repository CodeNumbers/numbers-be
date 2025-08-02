export class PosterDto {
  id: number;
  imageUrl: string;

  constructor(posterData: PosterDto) {
    Object.assign(this, posterData);
  }
}
