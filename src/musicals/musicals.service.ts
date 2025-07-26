import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musical } from './musical.entity';

@Injectable()
export class MusicalsService {
  constructor(
    @InjectRepository(Musical)
    private musicalsRepository: Repository<Musical>,
  ) {}
}
