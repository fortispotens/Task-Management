import { TaskRespository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRespository)
    private taskRepository: TaskRespository,
  ) { }


  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto) {
  //   const { status, search } = filterDto;

  //   let tasks = this.getAllTasks();

  //   if (search) {
  //     tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
  //   }

  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status)
  //   }

  //   return tasks;
  // }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id)

    if (!found) {
      throw new NotFoundException(`Task with ID '${id}' not found`)
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto)
  }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id)
  //   task.status = status

  //   return task;

  // }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID '${id}' not found`)
    }
  }
}
