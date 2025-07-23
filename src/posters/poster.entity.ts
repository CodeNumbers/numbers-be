import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Poster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  imageUrl: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
