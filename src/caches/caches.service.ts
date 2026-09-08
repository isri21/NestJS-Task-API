import { Inject, Injectable } from '@nestjs/common';
import { CreateCachDto } from './dto/create-cach.dto.js';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class CachesService {

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  
  create(createCachDto: CreateCachDto): Promise<string> {
    return this.cacheManager.set(createCachDto.key, createCachDto.value)
  }

  findOne(key: string): Promise<unknown> {
    return this.cacheManager.get(key);
  }

  remove(key: string): Promise<boolean> {
    return this.cacheManager.del(key)
  }

  removeAll(): Promise<boolean> {
    return this.cacheManager.clear()
  }
}
