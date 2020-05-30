import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks()
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    const task = this.tasksService.createTask(createTaskDto)
    return task
  }

  @Patch(':id/status')
  updatedTask(@Param('id') id: string, @Body('status') taskStatus: TaskStatus): Task {
    return this.tasksService.updateTaskStatus(id, taskStatus)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id)
  }
}
