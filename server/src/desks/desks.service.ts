import { Injectable, Inject } from '@nestjs/common';
import { Desks } from '../database/models/desks.entity';
import { updateDesksRequest } from './dto/updateDesks.request';

@Injectable()
export class DesksService {
  constructor(
    @Inject('DESKS_REPOSITORY')
    private desksRepository: typeof Desks,
  ) {}

  async findAll(): Promise<Desks[]> {
    return this.desksRepository.findAll<Desks>({
      order: [['createdAt', 'ASC']],
    });
  }

  async findOne(id: number): Promise<Desks> {
    return this.desksRepository.findOne<Desks>({ where: { id } });
  }

  async create(data: { name: string; amount: number }): Promise<Desks> {
    return this.desksRepository.create<Desks>({
      name: data.name,
      amount: data.amount,
    });
  }

  async update(id: number, data: updateDesksRequest): Promise<Desks> {
    await this.desksRepository.update<Desks>(data, { where: { id } });
    return this.desksRepository.findOne<Desks>({ where: { id } });
  }

  async destroy(id: number): Promise<Desks> {
    const destroyedDesk = this.desksRepository.findOne<Desks>({
      where: { id },
    });
    this.desksRepository.destroy<Desks>({ where: { id } });
    return destroyedDesk;
  }
}
