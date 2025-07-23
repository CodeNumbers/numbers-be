import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostersModule } from './posters/posters.module';
import { DataSource } from 'typeorm';
import { Poster } from './posters/poster.entity';

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
      entities: [Poster],
      synchronize: true, // Shouldn't be used in production
    }),
    // Feature Modules
    PostersModule,
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
