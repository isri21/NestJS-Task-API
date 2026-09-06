import { Module } from '@nestjs/common';
import { CachesService } from './caches.service.js';
import { CachesController } from './caches.controller.js';

@Module({
  controllers: [CachesController],
  providers: [CachesService],
})
export class CachesModule {}
