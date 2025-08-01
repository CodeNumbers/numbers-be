// src/seeds/seed.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poster } from '../posters/poster.entity';
import { Musical } from '../musicals/musical.entity';
import { ConfigModule } from '@nestjs/config';
import { MusicalSeeder } from './musical.seeder';

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
      entities: [Poster, Musical],
      charset: 'utf8mb4',
      synchronize: true, // false on production level
    }),
    TypeOrmModule.forFeature([Poster, Musical]),
  ],
  providers: [MusicalSeeder],
})
export class SeedModule {}
