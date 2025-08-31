import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musical } from '../common/entities/musical.entity';
import { MusicalsService } from './musicals.service';
import { MusicalsController } from './musicals.controller';
import { MusicalNumbersModule } from 'src/musical-numbers/musical-numbers.module';
import { S3Module } from 'src/common/s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Musical]),
    MusicalNumbersModule,
    S3Module,
  ],
  controllers: [MusicalsController],
  providers: [MusicalsService],
  exports: [MusicalsService],
})
export class MusicalsModule {}
