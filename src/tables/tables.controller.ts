import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto, UpdateTableDto } from './dto/table.dto';
import { CurrentUser } from 'src/decorator/user.decorator';
import { User } from 'src/interfaces/user.interface';
import { PaginationDto } from 'src/dto/pagination.dto';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  create(@Body() data: CreateTableDto) {
    return this.tablesService.create(data);
  }

  @Get()
  findAll(@CurrentUser() user: User, @Query() query?: PaginationDto) {
    const total = this.tablesService.count(user.shopId);
    const data = this.tablesService.findAll(user.shopId, query);

    return { total, data };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTableDto) {
    return this.tablesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tablesService.remove(+id);
  }
}
