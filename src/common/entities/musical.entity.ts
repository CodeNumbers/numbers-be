import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Poster } from 'src/common/entities/poster.entity';
import { MusicalNumber } from 'src/common/entities/musical-number.entity';

@Entity()
export class Musical {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  title: string;

  @Column({ type: 'char', name: 'first_choseong' })
  firstChoseong: string;

  @OneToOne(() => Poster, (poster) => poster.musical, { nullable: false })
  @JoinColumn({ name: 'poster_id' })
  poster: Poster; // Foreign key

  @OneToMany(() => MusicalNumber, (number) => number.musical)
  numbers: MusicalNumber[];

  @Column('text')
  synopsis: string;

  @Column({ default: 0 })
  views: number;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
