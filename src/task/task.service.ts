import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity.js';
import { Repository } from 'typeorm';
import { takeCoverage } from 'v8';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>, 
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepo.create(createTaskDto)
    this.invalidateTasks(this.cacheManager)
    return this.taskRepo.save(task)
  }

  findAll(): Promise<Task[]> {
    return this.taskRepo.find();
  }

  async update(id: string) {
    const task = await this.taskRepo.findOneBy({id: id});
    if (!task)
      return "Not Found!"
    task.status = "Completed"
    this.invalidateTasks(this.cacheManager)
    return this.taskRepo.save(task)
  }

  remove(id: string) {
    this.invalidateTasks(this.cacheManager)
    return this.taskRepo.delete(id)
  }

  // Invalidates Cached Tasks
  private invalidateTasks(cacheManager: Cache): void {
    cacheManager.del("allTasks")
  }
}
