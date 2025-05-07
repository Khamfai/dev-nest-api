import { Injectable } from '@nestjs/common';
import { CreateTableDto, UpdateTableDto } from './dto/table.dto';
import { Tables } from '@prisma/client';
import { CRUD } from 'src/interfaces/crud.interface';
import { PrismaService } from 'nestjs-prisma';
import { pageOffset } from 'src/utils/offset.util';
import { PaginationDto } from 'src/dto/pagination.dto';

@Injectable()
export class TablesService implements CRUD<Tables> {
  constructor(private client: PrismaService) {}

  count(shopId: number): Promise<number> {
    return this.client.tables.count({ where: { shopId } });
  }

  create(data: CreateTableDto) {
    return this.client.tables.create({
      data: { ...data, createdAt: Date.now() },
    });
  }

  findAll(shopId: number, params?: PaginationDto) {
    const skip = pageOffset(params);
    return this.client.tables.findMany({
      where: { isDeleted: false },
      skip,
      take: params?.limit,
    });
  }

  findOne(id: number) {
    return this.client.tables.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateTableDto) {
    return this.client.tables.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id },
    });
  }

  remove(id: number) {
    return this.client.tables.update({
      data: { isDeleted: true, updatedAt: Date.now() },
      where: { id },
    });
  }
}
