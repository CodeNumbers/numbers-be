import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostersController } from './posters.controller';
import { PostersService } from './posters.service';
import { Poster } from '../common/entities/poster.entity';
import { MusicalsModule } from 'src/musicals/musicals.module';
import { ConfigModule } from '@nestjs/config';
import { S3Service } from './s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Poster]), MusicalsModule, ConfigModule],
  providers: [PostersService, S3Service],
  controllers: [PostersController],
})
export class PostersModule {}
