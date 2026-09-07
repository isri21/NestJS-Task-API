import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module.js';
import { CacheModule } from '@nestjs/cache-manager';
import { CachesModule } from './caches/caches.module.js';
import { createKeyv, Keyv } from '@keyv/redis';
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
     isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
      type: 'postgres',
      host: config.get('DB_HOST'),
      port: config.get('DB_PORT'),
      username: config.get('DB_USERNAME'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
      autoLoadEntities: true,
      synchronize: true,
    })
  }),
  CacheModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    isGlobal: true,
    useFactory: async (config: ConfigService) => {
      const keyv: Keyv = createKeyv(`redis://${config.get('REDIS_HOST')}:${config.get('REDIS_PORT')}`)
      keyv.on('error', (err) => console.error('KEYV/REDIS ERROR:', err))
      return { stores: [keyv] }
    }
  }),
  TaskModule,
  CachesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
