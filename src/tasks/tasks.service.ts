import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    private taskRepository: TaskRepository
  ) {}

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.taskRepository.find()
    return tasks
  }

  async getTasksByFilter(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const tasks = await this.taskRepository.getTasksByFilter(filterDto)
    return tasks
  }

  getTaskById(id: string): Promise<Task> {
    const found = this.taskRepository.findOne(id)

    if (!found) 
      throw new NotFoundException(`Task with id ${id} not found`)

    return found
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = await this.taskRepository.createTask(createTaskDto, user)
    return task
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.taskRepository.updateTaskStatus(id, status)
    return task
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id)
    
    if (result.affected === 0)
      throw new NotFoundException(`Task with id ${id} not found`)
  }
}
