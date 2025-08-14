import { Musical } from 'src/common/entities/musical.entity';
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';

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
