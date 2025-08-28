import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostersController } from './posters.controller';
import { PostersService } from './posters.service';
import { Poster } from '../common/entities/poster.entity';
import { MusicalsModule } from 'src/musicals/musicals.module';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from 'src/common/s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Poster]),
    MusicalsModule,
    ConfigModule,
    S3Module,
  ],
  providers: [PostersService],
  controllers: [PostersController],
})
export class PostersModule {}
