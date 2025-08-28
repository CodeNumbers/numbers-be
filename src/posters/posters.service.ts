import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PosterDto } from './posters.dto';
import { Poster } from '../common/entities/poster.entity';
import { ChoseongFilterMap } from 'src/common/config/query-parameters';
import { MusicalsService } from 'src/musicals/musicals.service';
import { extname } from 'path';
import { S3Service } from '../common/s3/s3.service';
import { Musical } from 'src/common/entities/musical.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostersService {
  constructor(
    @InjectRepository(Poster)
    private readonly postersRepository: Repository<Poster>,
    private readonly musicalsService: MusicalsService,
    private readonly s3Service: S3Service,
  ) {}

  async findPostersByMode(mode: string, limit: number): Promise<PosterDto[]> {
    let posters: Poster[];
    if (mode === 'random') {
      posters = await this.postersRepository
        .createQueryBuilder('poster')
        .select(['musical.id', 'musical.title', 'poster.imageKey'])
        .leftJoin('poster.musical', 'musical')
        .orderBy('RAND()')
        .limit(limit)
        .getMany();
    } else {
      // Based on views
      posters = await this.postersRepository
        .createQueryBuilder('poster')
        .select([
          'musical.id',
          'musical.title',
          'musical.views',
          'poster.imageKey',
        ])
        .leftJoin('poster.musical', 'musical')
        .orderBy('musical.views', 'DESC')
        .orderBy('musical.id', 'ASC')
        .limit(limit)
        .getMany();
    }
    return posters.map((poster) => {
      const imageUrl = this.s3Service.parseImageKeyToImageUrl(poster.imageKey);
      return new PosterDto(poster, imageUrl);
    });
  }

  async findPostersByInitialRange(initialRange: string): Promise<PosterDto[]> {
    const posters = await this.postersRepository
      .createQueryBuilder('poster')
      .select(['musical.id', 'musical.title', 'poster.imageKey'])
      .leftJoin('poster.musical', 'musical')
      .where('musical.firstChoseong IN (:...choseongGroup)', {
        choseongGroup: ChoseongFilterMap[initialRange],
      })
      .getMany();

    let postersInDto = posters.map((poster) => {
      const imageUrl = this.s3Service.parseImageKeyToImageUrl(poster.imageKey);
      return new PosterDto(poster, imageUrl);
    });
    postersInDto = this.sortKoreanAsc(postersInDto);

    return postersInDto;
  }

  sortKoreanAsc(arr: PosterDto[]): PosterDto[] {
    return arr.sort((poster1, poster2) => {
      const title1 = poster1.musicalTitle;
      const title2 = poster2.musicalTitle;
      return title1.localeCompare(title2, 'ko');
    });
  }

  async createPoster(musicalId: number, posterFile: Express.Multer.File) {
    // Check poster already exist
    const musical = await this.musicalsService.findMusicalById(musicalId);
    if (musical.poster)
      throw new BadRequestException('Poster already exist in musical');

    // S3 upload
    const imageKey = this.makeImageKey(musical, posterFile);
    await this.s3Service.uploadPosterFile(
      posterFile.buffer, // Upload File
      imageKey, // File Name
      posterFile.mimetype, // File type
    );

    // Create poster in database
    const poster = this.postersRepository.create({ imageKey });
    await this.postersRepository.save(poster);

    // Make relationship with musical
    await this.musicalsService.makeRelationshipWithPoster(musical, poster);

    return { poster, musicalTitle: musical.title };
  }

  makeImageKey(musical: Musical, posterFile: Express.Multer.File): string {
    const ext = extname(posterFile.originalname);
    const now = new Date();
    const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;

    return `posters/${musical.id}/${formattedDate}/${uuidv4()}${ext}`;
  }
}
