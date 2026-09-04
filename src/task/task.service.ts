import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity.js';
import { Repository } from 'typeorm';
import { takeCoverage } from 'v8';

@Injectable()
export class TaskService {

  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}
  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepo.create(createTaskDto)
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
    return this.taskRepo.save(task)
  }

  remove(id: string) {
    return this.taskRepo.delete(id)
  }
}
