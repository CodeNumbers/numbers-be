// src/seeds/seed.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Poster } from '../common/entities/poster.entity';
import { Musical } from '../common/entities/musical.entity';
import { MusicalSeeder } from './musical.seeder';
import { MusicalNumber } from 'src/common/entities/musical-number.entity';
import { Actor } from 'src/common/entities/actor.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }), // .env 사용
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Poster, Musical, MusicalNumber, Actor],
      charset: 'utf8mb4',
      synchronize: true, // false on production level
    }),
    TypeOrmModule.forFeature([Poster, Musical, MusicalNumber, Actor]),
  ],
  providers: [MusicalSeeder],
})
export class SeedModule {}
