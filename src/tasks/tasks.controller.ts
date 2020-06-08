import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  async getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User): Promise<Task[]> {
    const tasks = await this.tasksService.getTasksByFilter(filterDto, user)
    return tasks
  }

  @Get('/:id')
  async getTaskById(
    @Param('id') id: string,
    @GetUser() user: User): Promise<Task> {
    const found = await this.tasksService.getTaskById(id, user)

    if (!found)
      throw new NotFoundException(`Task with id ${id} not found`)

    return found
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User) {
    const task = await this.tasksService.createTask(createTaskDto, user)
    return task
  }

  @Patch(':id/status')
  updatedTask(
    @Param('id') id: string, 
    @Body('status', TaskStatusValidationPipe) taskStatus: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    const task = this.tasksService.updateTaskStatus(id, taskStatus, user)
    return task
  }

  @Delete('/:id')
  async deleteTaskById(
    @Param('id') id: string,
    @GetUser() user: User): Promise<void> {
    await this.tasksService.deleteTaskById(id, user)
  }
}
