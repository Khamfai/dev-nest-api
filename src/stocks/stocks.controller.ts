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
import { StocksService } from './stocks.service';
import { CreateStockDto, UpdateStockDto } from './dto/stock.dto';
import { CurrentUser } from 'src/decorator/user.decorator';
import { User } from 'src/interfaces/user.interface';
import { PaginationDto } from 'src/dto/pagination.dto';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  create(@Body() data: CreateStockDto) {
    return this.stocksService.create(data);
  }

  @Get()
  findAll(@CurrentUser() user: User, @Query() query?: PaginationDto) {
    const total = this.stocksService.count(user.shopId);
    const data = this.stocksService.findAll(user.shopId, query);
    return { total, data };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateStockDto) {
    return this.stocksService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stocksService.remove(+id);
  }
}
