import { Injectable } from '@nestjs/common';
import { CreateShopDto, UpdateShopDto } from './dto/shop.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationDto } from 'src/dto/pagination.dto';
import { pageOffset } from 'src/utils/offset.util';
import { Shops } from '@prisma/client';

@Injectable()
export class ShopsService {
  constructor(private client: PrismaService) {}

  async create(data: CreateShopDto): Promise<Shops> {
    return this.client.shops.create({
      data: { ...data, createdAt: Date.now() },
    });
  }

  async findAll(params?: PaginationDto): Promise<Shops[]> {
    const skip = pageOffset(params);
    return this.client.shops.findMany({
      where: { isDeleted: false },
      skip,
      take: params?.limit,
    });
  }

  async findOne(id: number): Promise<Shops | null> {
    return this.client.shops.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateShopDto): Promise<Shops> {
    return this.client.shops.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id },
    });
  }

  async remove(id: number): Promise<Shops> {
    return this.client.shops.update({
      data: { isDeleted: true, updatedAt: Date.now() },
      where: { id },
    });
  }
}
