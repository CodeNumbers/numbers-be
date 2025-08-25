import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musical } from '../common/entities/musical.entity';
import { MusicalsService } from './musicals.service';
import { MusicalsController } from './musicals.controller';
import { MusicalNumbersModule } from 'src/musical-numbers/musical-numbers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Musical]), MusicalNumbersModule],
  controllers: [MusicalsController],
  providers: [MusicalsService],
  exports: [MusicalsService],
})
export class MusicalsModule {}
