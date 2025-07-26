import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PostersModule } from './posters/posters.module';
import { Poster } from './posters/poster.entity';
import { MusicalsModule } from './musicals/musicals.module';
import { Musical } from './musicals/musical.entity';

@Module({
  imports: [
    // Env Configuration
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Poster, Musical],
      synchronize: true, // Shouldn't be used in production
    }),
    // Feature Modules
    PostersModule,
    MusicalsModule,
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
