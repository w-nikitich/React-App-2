import {
  Controller,
  Delete,
  Patch,
  Post,
  Get,
  Param,
  Body,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { updateListsRequest } from './dto/updateLists.request';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  findAll(): object {
    return this.listsService.findAll();
  }

  @Get('byDeskId/:deskId')
  findAllByDeskId(@Param('deskId') deskId: number): object {
    return this.listsService.findAllByDeskId(deskId);
  }

  @Get('byId/:id')
  findOneById(@Param('id') id: number): object {
    return this.listsService.findOneById(id);
  }

  @Post()
  create(
    @Body() data: { deskId: number; name: string; amount: number },
  ): object {
    return this.listsService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: updateListsRequest): object {
    return this.listsService.update(id, data);
  }

  @Delete(':id')
  destroy(@Param('id') id: number): object {
    return this.listsService.destroy(id);
  }
}
