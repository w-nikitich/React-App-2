import { Module } from '@nestjs/common';
import { ActivityLogsController } from './activityLogs.controller';
import { ActivityLogsService } from './activityLogs.service';
import { activityLogsProviders } from './activityLogs.providers';
import { DatabaseModule } from '../database/module';

@Module({
  imports: [DatabaseModule],
  controllers: [ActivityLogsController],
  providers: [ActivityLogsService, ...activityLogsProviders],
})
export class ActivityLogsModule {}
