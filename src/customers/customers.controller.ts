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
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { CurrentUser } from 'src/decorator/user.decorator';
import { User } from 'src/interfaces/user.interface';
import { PaginationDto } from 'src/dto/pagination.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() data: CreateCustomerDto) {
    return this.customersService.create(data);
  }

  @Get()
  findAll(@CurrentUser() user: User, @Query() query?: PaginationDto) {
    const total = this.customersService.count(user.shopId);
    const data = this.customersService.findAll(user.shopId, query);

    return { total, data };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCustomerDto) {
    return this.customersService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
