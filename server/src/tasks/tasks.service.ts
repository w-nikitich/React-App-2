import { Injectable, Inject } from '@nestjs/common';
import { Tasks } from '../database/models/tasks.entity';
import { updateTaskRequest } from './dto/updateTasks.request';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private tasksRepository: typeof Tasks,
  ) {}

  async findAll(): Promise<Tasks[]> {
    return this.tasksRepository.findAll<Tasks>({
      order: [['createdAt', 'DESC']],
    });
  }

  async findAllByListId(listId: number): Promise<Tasks[]> {
    return this.tasksRepository.findAll<Tasks>({ where: { listId: listId } });
  }

  async findOne(id: number): Promise<Tasks> {
    return this.tasksRepository.findOne<Tasks>({ where: { id } });
  }

  async create(data: updateTaskRequest): Promise<Tasks> {
    return this.tasksRepository.create<Tasks>({
      name: data.name,
      listId: data.listId,
      status: data.status,
      date: data.date,
      priority: data.priority,
      description: data.description,
    });
  }

  async update(id: number, data: updateTaskRequest): Promise<Tasks> {
    await this.tasksRepository.update<Tasks>(data, { where: { id } });
    return this.tasksRepository.findOne<Tasks>({ where: { id } });
  }

  async destroy(id: number): Promise<Tasks> {
    const destroyedTask = this.tasksRepository.findOne<Tasks>({
      where: { id },
    });
    this.tasksRepository.destroy<Tasks>({ where: { id } });
    return destroyedTask;
  }
}
