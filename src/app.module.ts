import { Module } from '@nestjs/common';
import { PostersModule } from './posters/posters.module';

@Module({
  imports: [PostersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
