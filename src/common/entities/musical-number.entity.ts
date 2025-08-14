import { Musical } from 'src/common/entities/musical.entity';
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Actor } from './actor.entity';

@Entity()
export class MusicalNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Musical, (musical) => musical.numbers)
  @JoinColumn({ name: 'musical_id' })
  musical: Musical;

  @Column({ type: 'varchar', length: 32 })
  title: string;

  @Column()
  act: number; // 1, 2

  @Column()
  order: number;

  @Column({ name: 'video_url', type: 'varchar', length: 300 })
  videoUrl: string;

  @ManyToMany(() => Actor, (actor) => actor.number)
  @JoinTable({
    name: 'performer',
    joinColumn: {
      name: 'musical_number_id', // 현재 엔티티 기준 FK 컬럼 이름
      referencedColumnName: 'id', // Musical.id와 매핑
    },
    inverseJoinColumn: {
      name: 'actor_id', // 상대 엔티티 기준 FK 컬럼 이름
      referencedColumnName: 'id', // Actor.id와 매핑
    },
  })
  actor: Actor[];

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
