import { Module } from '@nestjs/common';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { listsProviders } from './lists.providers';
import { DatabaseModule } from '../database/module';

@Module({
  imports: [DatabaseModule],
  controllers: [ListsController],
  providers: [ListsService, ...listsProviders],
})
export class ListsModule {}
