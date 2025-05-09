import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { PrismaService } from 'nestjs-prisma';
import { CRUD } from 'src/interfaces/crud.interface';
import { Products } from '@prisma/client';
import { PaginationDto } from 'src/dto/pagination.dto';
import { pageOffset } from 'src/utils/offset.util';

@Injectable()
export class ProductsService implements CRUD<Products> {
  constructor(private client: PrismaService) {}

  async count(shopId?: number): Promise<number> {
    return this.client.products.count({ where: { shopId, isDeleted: false } });
  }

  async create(data: CreateProductDto): Promise<Products> {
    return this.client.products.create({
      data: { ...data, createdAt: Date.now() },
    });
  }

  async findAll(shopId: number, params?: PaginationDto): Promise<Products[]> {
    const skip = pageOffset(params);
    return this.client.products.findMany({
      include: {
        categories: true,
        stocks: {
          where: {
            remaining: { gt: 0 },
            expDate: { gt: Date.now() },
            isDeleted: false,
          },
          take: 5,
          orderBy: { createdAt: 'asc' },
        },
      },
      where: { shopId, isDeleted: false },
      skip,
      take: params?.limit,
    });
  }

  async findOne(id: number): Promise<Products | null> {
    return this.client.products.findUnique({
      include: {
        categories: true,
        stocks: {
          where: { isDeleted: false },
          take: 2,
          orderBy: { createdAt: 'asc' },
        },
      },
      where: { id },
    });
  }

  async update(id: number, data: UpdateProductDto): Promise<Products> {
    return this.client.products.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id },
    });
  }

  async remove(id: number): Promise<Products> {
    return this.client.products.update({
      data: { isDeleted: true, updatedAt: Date.now() },
      where: { id },
    });
  }
}
