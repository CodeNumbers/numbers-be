import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Poster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { name: 'image_url' })
  imageUrl: string;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
