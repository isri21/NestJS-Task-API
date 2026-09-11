import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity.js';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Error_Codes } from '../common/enums/ErrorCodes.js';

@Injectable()
export class TaskService {
	private readonly logger = new Logger(TaskService.name);

	constructor(
		@InjectRepository(Task) private taskRepo: Repository<Task>,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	create(createTaskDto: CreateTaskDto): Promise<Task> {
		const task = this.taskRepo.create(createTaskDto);
		this.logger.log(`Creating a New Task => (${task.name})`);
		this.invalidateTasks(this.cacheManager);
		return this.taskRepo.save(task);
	}

	findAll(): Promise<Task[]> {
		this.logger.log('Fetching All Tasks from DB');
		return this.taskRepo.find();
	}

	async update(id: string) {
		const task = await this.taskRepo.findOneBy({ id: id });
		this.logger.log(`Getting Task with ID ${id}`);
		if (!task)  {
			this.logger.error(`Task with id: ${id} doesn't exist!`)
			throw new NotFoundException({code: Error_Codes.NOT_FOUND, message: `Task Doesn't Exist`});
		}

		task.status = 'Completed';
		this.logger.log(`Marked Task: ${id} as Completed`);
		this.invalidateTasks(this.cacheManager);
		return this.taskRepo.save(task);
	}

	remove(id: string) {
		this.logger.log(`Deleting Taks ${id}`);
		this.taskRepo.delete(id);
		this.invalidateTasks(this.cacheManager);
	}

	// Invalidates Cached Tasks
	private invalidateTasks(cacheManager: Cache): void {
		cacheManager.del('allTasks');
		this.logger.log(`Invalidating List Tasks Cache`);
	}
}
