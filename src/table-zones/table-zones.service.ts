import { Injectable } from '@nestjs/common';
import { CreateTableZoneDto, UpdateTableZoneDto } from './dto/table-zone.dto';
import { CRUD } from 'src/interfaces/crud.interface';
import { TableZones } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PaginationDto } from 'src/dto/pagination.dto';
import { pageOffset } from 'src/utils/offset.util';

@Injectable()
export class TableZonesService implements CRUD<TableZones> {
  constructor(private client: PrismaService) {}

  count(shopId?: number): Promise<number> {
    return this.client.tableZones.count({
      where: { shopId, isDeleted: false },
    });
  }

  create(data: CreateTableZoneDto) {
    return this.client.tableZones.create({
      data: { ...data, createdAt: Date.now() },
    });
  }

  findAll(shopId: number, param?: PaginationDto) {
    const skip = pageOffset(param);
    return this.client.tableZones.findMany({
      where: { shopId, isDeleted: false },
      skip,
      take: param?.limit,
    });
  }

  findOne(id: number) {
    return this.client.tableZones.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateTableZoneDto) {
    return this.client.tableZones.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id },
    });
  }

  remove(id: number) {
    return this.client.tableZones.update({
      data: { isDeleted: true, updatedAt: Date.now() },
      where: { id },
    });
  }
}
