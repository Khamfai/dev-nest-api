import { Injectable } from '@nestjs/common';
import { CreateOrderPlanDto, UpdateOrderPlanDto } from './dto/order-plan.dto';
import { PrismaService } from 'nestjs-prisma';
import { CreateOrderTransactionDto } from './dto/order-transaction.dto';
import { OrderPlans } from '@prisma/client';

@Injectable()
export class OrderPlansService {
  constructor(private client: PrismaService) {}

  create(
    orderPlanData: CreateOrderPlanDto,
    transactionData: CreateOrderTransactionDto,
  ) {
    return this.client.orderPlans.create({
      data: {
        ...orderPlanData,
        createdAt: Date.now(),
        orderTransactions: {
          create: {
            ...transactionData,
            createdAt: Date.now(),
          },
        },
      },
    });
  }

  findAll(shopId: number) {
    return this.client.orderPlans.findMany({
      include: {
        orderTransactions: {
          where: { isDeleted: false },
          take: 12,
          orderBy: { createdAt: 'desc' },
        },
      },
      where: { shopId, isDeleted: false },
    });
  }

  async findOne(id: number): Promise<OrderPlans | null> {
    const orderPlan = await this.client.orderPlans.findUnique({
      include: {
        orderTransactions: {
          where: { isDeleted: false },
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
      where: { id },
    });
    return orderPlan;
  }

  update(id: number, data: UpdateOrderPlanDto) {
    return this.client.orderPlans.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id },
    });
  }

  remove(id: number) {
    return this.client.orderPlans.update({
      data: { isDeleted: true, updatedAt: Date.now() },
      where: { id },
    });
  }
}
