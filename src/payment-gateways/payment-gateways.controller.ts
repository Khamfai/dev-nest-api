import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentGatewaysService } from './payment-gateways.service';
import {
  CreatePaymentGatewayDto,
  UpdatePaymentGatewayDto,
} from './dto/payment-gateway.dto';

@Controller('payment-gateways')
export class PaymentGatewaysController {
  constructor(
    private readonly paymentGatewaysService: PaymentGatewaysService,
  ) {}

  @Post()
  create(@Body() data: CreatePaymentGatewayDto) {
    return this.paymentGatewaysService.create(data);
  }

  @Get()
  findAll() {
    return this.paymentGatewaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentGatewaysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdatePaymentGatewayDto) {
    return this.paymentGatewaysService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentGatewaysService.remove(+id);
  }
}
