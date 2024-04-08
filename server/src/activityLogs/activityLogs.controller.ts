import { Controller, Delete, Post, Get, Param, Body } from '@nestjs/common';
import { ActivityLogsService } from './activityLogs.service';
import { updateActivityLogsRequest } from './dto/updateActivityLogs.request';

@Controller('activityLogs')
export class ActivityLogsController {
  constructor(private readonly activityLogsService: ActivityLogsService) {}

  @Get()
  findAll(): object {
    return this.activityLogsService.findAll();
  }

  @Get(':taskId')
  findMany(@Param('taskId') taskId: number): object {
    return this.activityLogsService.findMany(taskId);
  }

  @Post()
  create(@Body() data: updateActivityLogsRequest): object {
    return this.activityLogsService.create(data);
  }

  @Delete(':id')
  destroy(@Param('id') id: number): object {
    return this.activityLogsService.destroy(id);
  }
}
