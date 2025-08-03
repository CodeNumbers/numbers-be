import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
