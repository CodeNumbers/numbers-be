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

  @Column({ type: 'char', name: 'first_choseong' })
  firstChoseong: string;

  @OneToOne(() => Poster, (poster) => poster.musical, { nullable: false })
  @JoinColumn({ name: 'poster_id' })
  poster: Poster; // Foreign key

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
}
