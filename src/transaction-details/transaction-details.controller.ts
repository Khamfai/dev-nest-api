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
import { TransactionDetailsService } from './transaction-details.service';
import { CreateTransactionDetailDto } from './dto/create-transaction-detail.dto';
import { UpdateTransactionDetailDto } from './dto/update-transaction-detail.dto';
import { CurrentUser } from 'src/decorator/user.decorator';
import { User } from 'src/interfaces/user.interface';
import { PaginationDto } from 'src/dto/pagination.dto';

@Controller('transaction-details')
export class TransactionDetailsController {
  constructor(
    private readonly transactionDetailsService: TransactionDetailsService,
  ) {}

  @Post()
  create(@Body() data: CreateTransactionDetailDto) {
    return this.transactionDetailsService.create(data);
  }

  @Get()
  findAll(@CurrentUser() user: User, @Query() qeury?: PaginationDto) {
    const total = this.transactionDetailsService.count(user.shopId);
    const data = this.transactionDetailsService.findAll(user.shopId, qeury);

    return { total, data };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTransactionDetailDto) {
    return this.transactionDetailsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionDetailsService.remove(+id);
  }
}
