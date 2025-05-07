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
import { TableZonesService } from './table-zones.service';
import { CreateTableZoneDto, UpdateTableZoneDto } from './dto/table-zone.dto';
import { CurrentUser } from 'src/decorator/user.decorator';
import { PaginationDto } from 'src/dto/pagination.dto';
import { User } from 'src/interfaces/user.interface';

@Controller('table-zones')
export class TableZonesController {
  constructor(private readonly tableZonesService: TableZonesService) {}

  @Post()
  create(@Body() data: CreateTableZoneDto) {
    return this.tableZonesService.create(data);
  }

  @Get()
  findAll(@CurrentUser() user: User, @Query() query?: PaginationDto) {
    const total = this.tableZonesService.count(user.shopId);
    const data = this.tableZonesService.findAll(user.shopId, query);

    return { total, data };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableZonesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTableZoneDto) {
    return this.tableZonesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableZonesService.remove(+id);
  }
}
