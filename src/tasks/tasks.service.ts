import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto) {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (search) {
      tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
    }

    if (status) {
      tasks = tasks.filter(task => task.status === status)
    }

    return tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find(task => task.id === id)
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id)
    task.status = status

    return task;

  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id)
  }
}
