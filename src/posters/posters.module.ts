import { Module } from '@nestjs/common';
import { PostersController } from './posters.controller';
import { PostersService } from './posters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poster } from './poster.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poster])],
  providers: [PostersService],
  controllers: [PostersController],
})
export class PostersModule {}
