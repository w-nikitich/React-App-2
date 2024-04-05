import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DesksModule } from './desks/desks.module';
import { ListsModule } from './lists/lists.module';
import { TasksModule } from './tasks/tasks.module';
import { ActivityLogsModule } from './activityLogs/activityLogs.module';

@Module({
  imports: [DesksModule, ListsModule, TasksModule, ActivityLogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
