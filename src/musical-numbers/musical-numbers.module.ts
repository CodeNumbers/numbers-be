import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicalNumber } from 'src/common/entities/musical-number.entity';
import { MusicalNumbersService } from './musical-numbers.service';
import { ActorsModule } from 'src/actors/actors.module';

@Module({
  imports: [TypeOrmModule.forFeature([MusicalNumber]), ActorsModule],
  providers: [MusicalNumbersService],
  exports: [MusicalNumbersService],
})
export class MusicalNumbersModule {}
