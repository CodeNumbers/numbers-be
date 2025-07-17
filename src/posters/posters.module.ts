import { Module } from '@nestjs/common';
import { PostersController } from './posters.controller';
import { PostersService } from './posters.service';

@Module({
  imports: [],
  controllers: [PostersController],
  providers: [PostersService],
})
export class PostersModule {}
