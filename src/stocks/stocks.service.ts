import { Injectable } from '@nestjs/common';
import { CreateStockDto, UpdateStockDto } from './dto/stock.dto';
import { CRUD } from 'src/interfaces/crud.interface';
import { Stocks } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PaginationDto } from 'src/dto/pagination.dto';
import { pageOffset } from 'src/utils/offset.util';

@Injectable()
export class StocksService implements CRUD<Stocks> {
  constructor(private client: PrismaService) {}

  count(shopId: number): Promise<number> {
    return this.client.stocks.count({ where: { shopId, isDeleted: false } });
  }

  async create(data: CreateStockDto): Promise<Stocks> {
    return this.client.stocks.create({
      data: { ...data, createdAt: Date.now() },
    });
  }

  findAll(shopId: number, params?: PaginationDto) {
    const skip = pageOffset(params);
    return this.client.stocks.findMany({
      include: {
        products: { select: { categories: { select: { name: true } } } },
      },
      where: { shopId, isDeleted: false, products: { isDeleted: false } },
      skip,
      take: params?.limit,
    });
  }

  findOne(id: number) {
    return this.client.stocks.findUnique({
      include: {
        products: { select: { categories: { select: { name: true } } } },
      },
      where: { id, products: { isDeleted: false } },
    });
  }

  update(id: number, data: UpdateStockDto) {
    return this.client.stocks.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id },
    });
  }

  remove(id: number) {
    return this.client.stocks.update({
      data: { isDeleted: true, updatedAt: Date.now() },
      where: { id },
    });
  }
}
