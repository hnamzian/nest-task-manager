import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  async getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
    const tasks = await this.tasksService.getTasksByFilter(filterDto)
    return tasks
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    const found = await this.tasksService.getTaskById(id)

    if (!found)
      throw new NotFoundException(`Task with id ${id} not found`)

    return found
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // async createTask(@Body() createTaskDto: CreateTaskDto) {
  //   const task = await this.tasksService.createTask(createTaskDto)
  //   return task
  // }

  // @Patch(':id/status')
  // updatedTask(
  //   @Param('id') id: string, 
  //   @Body('status', TaskStatusValidationPipe) taskStatus: TaskStatus
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, taskStatus)
  // }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): void {
  //   this.tasksService.deleteTaskById(id)
  // }
}
