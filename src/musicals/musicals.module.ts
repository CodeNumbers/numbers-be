import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musical } from './musical.entity';
import { MusicalsService } from './musicals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Musical])],
  providers: [MusicalsService],
})
export class MusicalsModule {}
