import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostersController } from './posters.controller';
import { PostersService } from './posters.service';
import { Poster } from '../common/entities/poster.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poster])],
  providers: [PostersService],
  controllers: [PostersController],
})
export class PostersModule {}
