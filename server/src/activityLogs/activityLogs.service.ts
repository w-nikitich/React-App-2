import { Injectable, Inject } from '@nestjs/common';
import { ActivityLogs } from '../database/models/activityLogs.entity';
import { updateActivityLogsRequest } from './dto/updateActivityLogs.request';

@Injectable()
export class ActivityLogsService {
  constructor(
    @Inject('ACTIVITY_LOGS_REPOSITORY')
    private activityLogsRepository: typeof ActivityLogs,
  ) {}

  async findAll(): Promise<ActivityLogs[]> {
    return this.activityLogsRepository.findAll<ActivityLogs>({
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number): Promise<ActivityLogs> {
    return this.activityLogsRepository.findOne<ActivityLogs>({ where: { id } });
  }

  async create(data: updateActivityLogsRequest): Promise<ActivityLogs> {
    return this.activityLogsRepository.create<ActivityLogs>({
      taskId: data?.taskId,
      taskName: data?.taskName,
      listId: data?.listId,
      listName: data?.listName,
      oldData: data?.oldData,
      newData: data?.newData,
      type: data.type,
    });
  }

  async destroy(id: number): Promise<number> {
    return this.activityLogsRepository.destroy<ActivityLogs>({ where: { id } });
  }
}
