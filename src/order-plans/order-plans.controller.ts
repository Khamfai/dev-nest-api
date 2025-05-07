import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderPlansService } from './order-plans.service';
import { CreateOrderPlanDto, UpdateOrderPlanDto } from './dto/order-plan.dto';
import { CreateOrderTransactionDto } from './dto/order-transaction.dto';
import { CurrentUser } from 'src/decorator/user.decorator';
import { User } from 'src/interfaces/user.interface';

@Controller('order-plans')
export class OrderPlansController {
  constructor(private readonly orderPlansService: OrderPlansService) {}

  @Post()
  create(
    @Body() orderPlanDto: CreateOrderPlanDto,
    ts: CreateOrderTransactionDto,
  ) {
    return this.orderPlansService.create(orderPlanDto, ts);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.orderPlansService.findAll(+user.shopId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderPlansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() orderPlanDto: UpdateOrderPlanDto) {
    return this.orderPlansService.update(+id, orderPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderPlansService.remove(+id);
  }
}
