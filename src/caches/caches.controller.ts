import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CachesService } from './caches.service.js';
import { UpdateCachDto } from './dto/update-cach.dto.js';
import { CreateCachDto } from './dto/create-cach.dto.js';

@Controller('caches')
export class CachesController {
	constructor(private readonly cachesService: CachesService) {}

	@Post()
	create(@Body() createCachDto: CreateCachDto) {
		return this.cachesService.create(createCachDto);
	}

	@Get(':key')
	findOne(@Param('key') key: string) {
		return this.cachesService.findOne(key);
	}

	@Delete(':key')
	remove(@Param('key') key: string) {
		return this.cachesService.remove(key);
	}

	@Delete('/delete/all')
	removeAll() {
		return this.cachesService.removeAll();
	}
}
