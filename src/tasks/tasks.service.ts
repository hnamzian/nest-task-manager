import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

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
    let tasks = await this.getAllTasks()

    if (filterDto.status) {
      tasks = tasks.filter(task => task.status === filterDto.status)
    }

    if (filterDto.search) {
      tasks = tasks.filter(task => 
        task.title.includes(filterDto.search) ||
        task.description.includes(filterDto.search))
    }

    return tasks
  }

  getTaskById(id: string): Promise<Task> {
    const found = this.taskRepository.findOne(id)

    if (!found) 
      throw new NotFoundException(`Task with id ${id} not found`)

    return found
  }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto

  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN
  //   }

  //   this.tasks.push(task)
  //   return task
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id)
  //   task.status = status
  //   return task
  // }

  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id)
  //   this.tasks = this.tasks.filter(task => task.id !== found.id)
  // }
}
