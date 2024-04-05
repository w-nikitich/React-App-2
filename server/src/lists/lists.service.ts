import { Injectable, Inject } from '@nestjs/common';
import { Lists } from '../database/models/lists.entity';
import { updateListsRequest } from './dto/updateLists.request';

@Injectable()
export class ListsService {
  constructor(
    @Inject('LISTS_REPOSITORY')
    private listsRepository: typeof Lists,
  ) {}

  async findAll(): Promise<Lists[]> {
    return this.listsRepository.findAll<Lists>({
      order: [['createdAt', 'ASC']],
    });
  }

  async findOne(id: number): Promise<Lists> {
    return this.listsRepository.findOne<Lists>({ where: { id } });
  }

  async create(data: {
    deskId: number;
    name: string;
    amount: number;
  }): Promise<Lists> {
    return this.listsRepository.create<Lists>({
      deskId: data.deskId,
      name: data.name,
      amount: data.amount,
    });
  }

  async update(id: number, data: updateListsRequest): Promise<Lists> {
    await this.listsRepository.update<Lists>(data, { where: { id } });
    return this.listsRepository.findOne<Lists>({ where: { id } });
  }

  async destroy(id: number): Promise<Lists> {
    const destroyedList = this.listsRepository.findOne<Lists>({
      where: { id },
    });
    this.listsRepository.destroy<Lists>({ where: { id } });
    return destroyedList;
  }
}
