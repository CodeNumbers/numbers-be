import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/common/entities/actor.entity';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
  ) {}

  async createActors(actors: string[]): Promise<Actor[]> {
    const actorInstances: Actor[] = [];

    for (const name of actors) {
      let actor = await this.actorsRepository.findOne({ where: { name } });
      if (!actor) {
        actor = this.actorsRepository.create({ name });
        await this.actorsRepository.save(actor);
      }
      actorInstances.push(actor);
    }

    return actorInstances;
  }
}
