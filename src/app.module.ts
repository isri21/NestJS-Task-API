import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module.js';
import { CacheModule } from '@nestjs/cache-manager';
import { CachesModule } from './caches/caches.module.js';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true, // dev only, never in production
  }),
  TaskModule,
  CacheModule.register({
    isGlobal: true
  }),
  CachesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
