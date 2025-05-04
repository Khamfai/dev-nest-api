import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/permission.dto';
import { UpdatePermissionDto } from './dto/permission.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationDto } from 'src/dto/pagination.dto';
import { Permissions } from '@prisma/client';
import { pageOffset } from 'src/utils/offset.util';

@Injectable()
export class PermissionsService {
  constructor(private client: PrismaService) {}

  async findAll(param?: PaginationDto): Promise<Permissions[]> {
    const skip = pageOffset(param);
    return this.client.permissions.findMany({
      where: { isDeleted: false },
      skip,
      take: param?.limit,
    });
  }

  async findOne(id: number): Promise<Permissions | null> {
    return this.client.permissions.findUnique({ where: { id: id } });
  }

  create(data: CreatePermissionDto): Promise<Permissions> {
    return this.client.permissions.create({
      data: { ...data, createdAt: Date.now() },
    });
  }

  update(id: number, data: UpdatePermissionDto): Promise<Permissions> {
    return this.client.permissions.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id: id },
    });
  }

  remove(id: number): Promise<Permissions> {
    return this.client.permissions.update({
      data: { updatedAt: Date.now(), isDeleted: true },
      where: { id: id },
    });
  }
}
