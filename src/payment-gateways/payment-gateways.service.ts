import { Injectable } from '@nestjs/common';
import {
  CreatePaymentGatewayDto,
  UpdatePaymentGatewayDto,
} from './dto/payment-gateway.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaymentGateways } from '@prisma/client';
import { PaginationDto } from 'src/dto/pagination.dto';
import { pageOffset } from 'src/utils/offset.util';

@Injectable()
export class PaymentGatewaysService {
  constructor(private client: PrismaService) {}

  async create(data: CreatePaymentGatewayDto): Promise<PaymentGateways> {
    return this.client.paymentGateways.create({
      data: { ...data, createdAt: Date.now() },
    });
  }

  async findAll(param?: PaginationDto): Promise<PaymentGateways[]> {
    const skip = pageOffset(param);
    return this.client.paymentGateways.findMany({
      where: { isDeleted: false },
      skip,
      take: param?.limit,
    });
  }

  async findOne(id: number): Promise<PaymentGateways | null> {
    return this.client.paymentGateways.findUnique({ where: { id } });
  }

  async update(
    id: number,
    data: UpdatePaymentGatewayDto,
  ): Promise<PaymentGateways> {
    return this.client.paymentGateways.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id },
    });
  }

  async remove(id: number): Promise<PaymentGateways> {
    return this.client.paymentGateways.update({
      data: { isDeleted: true, updatedAt: Date.now() },
      where: { id },
    });
  }
}
