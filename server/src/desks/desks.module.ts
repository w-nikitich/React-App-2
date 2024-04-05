import { Module } from '@nestjs/common';
import { DesksController } from './desks.controller';
import { DesksService } from './desks.service';
import { desksProviders } from './desks.providers';
import { DatabaseModule } from '../database/module';

@Module({
  imports: [DatabaseModule],
  controllers: [DesksController],
  providers: [DesksService, ...desksProviders],
})
export class DesksModule {}
