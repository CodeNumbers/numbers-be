import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musical } from './musical.entity';
import { MusicalsService } from './musicals.service';
import { MusicalsController } from './musical.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Musical])],
  controllers: [MusicalsController],
  providers: [MusicalsService],
})
export class MusicalsModule {}
