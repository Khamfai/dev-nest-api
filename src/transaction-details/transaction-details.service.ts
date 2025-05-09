import { Injectable } from '@nestjs/common';
import { CreateTransactionDetailDto } from './dto/create-transaction-detail.dto';
import { UpdateTransactionDetailDto } from './dto/update-transaction-detail.dto';
import { CRUD } from 'src/interfaces/crud.interface';
import { TransactionDetails } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PaginationDto } from 'src/dto/pagination.dto';
import { pageOffset } from 'src/utils/offset.util';

@Injectable()
export class TransactionDetailsService implements CRUD<TransactionDetails> {
  constructor(private client: PrismaService) {}
  count(shopId?: number): Promise<number> {
    return this.client.transactionDetails.count({
      where: { shopId, isDeleted: false },
    });
  }

  create(data: CreateTransactionDetailDto) {
    return this.client.transactionDetails.create({
      data: { ...data, createdAt: Date.now() },
    });
  }

  findAll(shopId: number, params?: PaginationDto) {
    const skip = pageOffset(params);
    return this.client.transactionDetails.findMany({
      where: { shopId, isDeleted: false },
      skip,
      take: params?.limit,
    });
  }

  findOne(id: number) {
    return this.client.transactionDetails.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateTransactionDetailDto) {
    return this.client.transactionDetails.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id },
    });
  }

  remove(id: number) {
    return this.client.transactionDetails.update({
      data: { isDeleted: true, updatedAt: Date.now() },
      where: { id },
    });
  }
}
