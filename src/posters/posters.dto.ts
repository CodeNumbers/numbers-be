export class PostersDto {
  id: number;
  url: string;

  constructor(posterData: PostersDto) {
    Object.assign(this, posterData);
  }
}
