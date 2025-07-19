export class PostersDto {
  id: number;
  url: string;
  createdAt?: Date;

  constructor(posterData: PostersDto) {
    Object.assign(this, posterData);
  }
}
