import { Musical } from 'src/musicals/musical.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Poster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 500, name: 'image_url', unique: true })
  imageUrl: string;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  // 양방향 1:1
  @OneToOne(() => Musical, (musical) => musical.poster)
  musical: Musical;
}
