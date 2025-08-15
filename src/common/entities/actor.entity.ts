import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Musical } from './musical.entity';
import { MusicalNumber } from './musical-number.entity';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 16, unique: true })
  name: string;

  @ManyToMany(() => Musical, (musical) => musical.actors)
  musical: Musical[];

  @ManyToMany(() => MusicalNumber, (musicalNumber) => musicalNumber.actors)
  numbers: MusicalNumber[];

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;
}
