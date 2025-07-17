export class PostersDto {
  id: number;
  url: string;

  constructor(data: PostersDto) {
    Object.assign(this, data);
  }
}
