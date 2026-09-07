import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module.js';
import { CacheModule } from '@nestjs/cache-manager';
import { CachesModule } from './caches/caches.module.js';
import { createKeyv, Keyv } from '@keyv/redis';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
  }),
  TaskModule,
  CacheModule.registerAsync({
    isGlobal: true,
    useFactory: async () => {
      const keyv: Keyv = createKeyv('redis://localhost:6379')
      keyv.on('error', (err) => console.error('KEYV/REDIS ERROR:', err))
      return { stores: [keyv] }
    }
  }),
  CachesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
