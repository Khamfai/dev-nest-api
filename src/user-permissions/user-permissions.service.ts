import { Injectable } from '@nestjs/common';
import {
  CreateUserPermissionDto,
  UpdateUserPermissionDto,
} from './dto/create-user-permission.dto';
import { PrismaService } from 'nestjs-prisma';
import { UserPermissions } from '@prisma/client';
import { CRUD } from 'src/interfaces/crud.interface';

@Injectable()
export class UserPermissionsService implements CRUD<UserPermissions> {
  constructor(private client: PrismaService) {}
  count(shopId: number): Promise<number> {
    return this.client.userPermissions.count({
      where: { shopId, isDeleted: false },
    });
  }

  async create(data: CreateUserPermissionDto): Promise<UserPermissions> {
    return this.client.userPermissions.create({
      data: { ...data, createdAt: Date.now() },
    });
  }

  async findAll(shopId: number): Promise<UserPermissions[]> {
    return this.client.userPermissions.findMany({
      where: { shopId, isDeleted: false },
    });
  }

  async findOne(id: number): Promise<UserPermissions | null> {
    return this.client.userPermissions.findUnique({ where: { id } });
  }

  async update(
    id: number,
    data: UpdateUserPermissionDto,
  ): Promise<UserPermissions> {
    return this.client.userPermissions.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id },
    });
  }

  async remove(id: number): Promise<UserPermissions> {
    return this.client.userPermissions.update({
      data: { isDeleted: true, updatedAt: Date.now() },
      where: { id },
    });
  }
}
