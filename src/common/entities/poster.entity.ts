import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Musical } from 'src/common/entities/musical.entity';

@Entity()
export class Poster {
  @PrimaryGeneratedColumn()
  id: number;

  // imageKey로 변환
  @Column('varchar', {
    length: 64,
    name: 'image_key',
    unique: true,
  })
  imageKey: string;

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
