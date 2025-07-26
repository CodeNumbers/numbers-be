import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Poster } from 'src/posters/poster.entity';

@Entity()
export class Musical {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  title: string;

  @OneToOne(() => Poster, (poster) => poster.id, { nullable: false })
  @JoinColumn({ name: 'poster_id' })
  posterId: Poster; // Foreign key

  @Column('text')
  synopsis: string;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
