import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostersController } from './posters.controller';
import { PostersService } from './posters.service';
import { Poster } from '../common/entities/poster.entity';
import { MusicalsModule } from 'src/musicals/musicals.module';

@Module({
  imports: [TypeOrmModule.forFeature([Poster]), MusicalsModule],
  providers: [PostersService],
  controllers: [PostersController],
})
export class PostersModule {}
