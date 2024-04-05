import {
  Controller,
  Delete,
  Patch,
  Post,
  Get,
  Param,
  Body,
} from '@nestjs/common';
import { DesksService } from './desks.service';
import { updateDesksRequest } from './dto/updateDesks.request';

@Controller('desks')
export class DesksController {
  constructor(private readonly desksService: DesksService) {}

  @Get()
  findAll(): object {
    return this.desksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): object {
    return this.desksService.findOne(id);
  }

  @Post()
  create(@Body() data: { name: string; amount: number }): object {
    return this.desksService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: updateDesksRequest): object {
    return this.desksService.update(id, data);
  }

  @Delete(':id')
  destroy(@Param('id') id: number): object {
    return this.desksService.destroy(id);
  }
}
