import { Module } from '@nestjs/common';
import { OrderPlansService } from './order-plans.service';
import { OrderPlansController } from './order-plans.controller';

@Module({
  controllers: [OrderPlansController],
  providers: [OrderPlansService],
})
export class OrderPlansModule {}
