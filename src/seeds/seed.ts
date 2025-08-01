// src/seeds/seed.ts
import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { MusicalSeeder } from './musical.seeder';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);
  const seeder = appContext.get(MusicalSeeder);
  await seeder.seed(10);
  await appContext.close();
}
bootstrap();
