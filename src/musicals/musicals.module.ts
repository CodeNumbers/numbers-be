import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musical } from '../common/entities/musical.entity';
import { MusicalsService } from './musicals.service';
import { MusicalsController } from './musicals.controller';
import { PostersModule } from 'src/posters/posters.module';
import { MusicalNumbersModule } from 'src/musical-numbers/musical-numbers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Musical]),
    PostersModule,
    MusicalNumbersModule,
  ],
  controllers: [MusicalsController],
  providers: [MusicalsService],
})
export class MusicalsModule {}
