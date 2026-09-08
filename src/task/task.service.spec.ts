import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service.js';
import { Task } from './entities/task.entity.js';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('TaskService', () => {
  let service: TaskService;

  const mockTaskRepo = {
    find: vi.fn(),
    findOneBy: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    delete: vi.fn()
  };

  const mockCacheManager = {
    del: vi.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService, 
        {provide: getRepositoryToken(Task), useValue: mockTaskRepo},
        {provide: CACHE_MANAGER, useValue: mockCacheManager}
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Test create()", () => {
    it("Should Create a New Task", async () => {
      const taskDto: CreateTaskDto = { name: 'Test Task 1', status: '' };
      const newTask = {id: 'xxx', name: 'Test Task 1', status: 'Todo'}

      mockTaskRepo.create.mockReturnValue(newTask);
      mockTaskRepo.save.mockResolvedValue(newTask);


      const savedTask = await service.create(taskDto);

      expect(savedTask).toEqual(newTask);
      expect(mockTaskRepo.save).toHaveBeenCalledWith("newTask");
      expect(mockCacheManager.del).toHaveBeenCalled();
    })
  })

  describe("Test findAll()", () => {
    it("Should Call The Repositories findAll method", async () => {
      await service.findAll()
      expect(mockTaskRepo.find).toHaveBeenCalled()
    })
  })

  describe("Test update() method", () => {
    it("Should Mark a Task that Exists as Completed", async () => {
      const oldTask = {id: "1", name: "Test Taks", status: "Todo"}
      const newTask = {id: "1", name: "Test Taks", status: "Completed"}

      mockTaskRepo.findOneBy.mockReturnValue(oldTask)
      mockTaskRepo.save.mockReturnValue(newTask)
      await service.update("1")

      expect(mockTaskRepo.findOneBy).toHaveBeenCalledWith({id: "1"})
      expect(mockTaskRepo.save).toHaveBeenCalled();
      expect(mockCacheManager.del).toHaveBeenCalled();
    })
  })

  describe("Test remove() method", () => {
    it("Should Delete a Task", async () => {
      service.remove("1")
      expect(mockTaskRepo.delete).toHaveBeenCalled()
      expect(mockCacheManager.del).toHaveBeenCalled()
    })
  })
});
