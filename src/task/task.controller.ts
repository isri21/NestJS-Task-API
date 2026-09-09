import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	HttpStatus,
	UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { apiResponse } from '../common/dto/api-response.dto.js';

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Post()
	async create(@Body() createTaskDto: CreateTaskDto) {
		const data = await this.taskService.create(createTaskDto);
		return apiResponse(data);
	}

	@Get()
	@UseInterceptors(CacheInterceptor)
	@CacheTTL(30000)
	@CacheKey('allTasks')
	async findAll() {
		const data = await this.taskService.findAll();
		return apiResponse(data);
	}

	@Patch(':id/done')
	async update(@Param('id') id: string) {
		const data = await this.taskService.update(id);
		return apiResponse(data);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	remove(@Param('id') id: string): void {
		this.taskService.remove(id);
	}
}
