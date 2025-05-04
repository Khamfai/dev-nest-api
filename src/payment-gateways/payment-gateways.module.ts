import { Module } from '@nestjs/common';
import { PaymentGatewaysService } from './payment-gateways.service';
import { PaymentGatewaysController } from './payment-gateways.controller';

@Module({
  controllers: [PaymentGatewaysController],
  providers: [PaymentGatewaysService],
})
export class PaymentGatewaysModule {}
