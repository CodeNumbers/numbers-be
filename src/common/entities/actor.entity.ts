import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Musical } from './musical.entity';
import { MusicalNumber } from './musical-number.entity';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 16 })
  name: string;

  @ManyToMany(() => Musical, (musical) => musical.actor)
  musical: Musical[];

  @ManyToMany(() => MusicalNumber, (musicalNumber) => musicalNumber.actor)
  number: MusicalNumber[];

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;
}
