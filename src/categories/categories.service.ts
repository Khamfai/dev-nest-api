import { Injectable } from '@nestjs/common';
import { Categories } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PaginationDto } from 'src/dto/pagination.dto';
import { CRUD } from 'src/interfaces/crud.interface';
import { pageOffset } from 'src/utils/offset.util';
import { CreateCategoriesDto, UpdateCategoriesDto } from './dto/categories.dto';

@Injectable()
export class CategoriesService implements CRUD<Categories> {
  constructor(private client: PrismaService) {}
  count(): Promise<number> {
    const total = this.client.categories.count({ where: { isDeleted: false } });
    return total;
  }

  async findAll(shopId: number, param?: PaginationDto): Promise<Categories[]> {
    const skip = pageOffset(param);
    const data = this.client.categories.findMany({
      where: { shopId, isDeleted: false },
      skip,
      take: param?.limit,
    });
    return data;
  }

  async findOne(id: number): Promise<Categories | null> {
    const result = this.client.categories.findUnique({ where: { id: id } });
    return result;
  }

  async create(data: CreateCategoriesDto): Promise<Categories> {
    const result = this.client.categories.create({
      data: { ...data, createdAt: Date.now() },
    });
    return result;
  }

  async update(id: number, data: UpdateCategoriesDto): Promise<Categories> {
    const result = this.client.categories.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id: id },
    });

    return result;
  }

  async remove(id: number): Promise<Categories> {
    const result = this.client.categories.update({
      data: { updatedAt: Date.now(), isDeleted: true },
      where: { id: id },
    });
    return result;
  }
}
