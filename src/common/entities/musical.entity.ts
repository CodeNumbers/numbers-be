import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Poster } from 'src/common/entities/poster.entity';
import { MusicalNumber } from 'src/common/entities/musical-number.entity';
import { Actor } from './actor.entity';

@Entity()
export class Musical {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  title: string;

  @Column({ type: 'char', name: 'first_choseong' })
  firstChoseong: string;

  @OneToOne(() => Poster, (poster) => poster.musical)
  @JoinColumn({ name: 'poster_id' })
  poster: Poster; // Foreign key

  @OneToMany(() => MusicalNumber, (number) => number.musical)
  numbers: MusicalNumber[];

  @Column('text')
  synopsis: string;

  @Column({ default: 0 })
  views: number;

  @ManyToMany(() => Actor, (actor) => actor.musical)
  @JoinTable({
    name: 'participation',
    joinColumn: {
      name: 'musical_id', // 현재 엔티티 기준 FK 컬럼 이름
      referencedColumnName: 'id', // Musical.id와 매핑
    },
    inverseJoinColumn: {
      name: 'actor_id', // 상대 엔티티 기준 FK 컬럼 이름
      referencedColumnName: 'id', // Actor.id와 매핑
    },
  })
  actors: Actor[];

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
