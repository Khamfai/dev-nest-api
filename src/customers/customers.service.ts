import { Injectable } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { CRUD } from 'src/interfaces/crud.interface';
import { Customers } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PaginationDto } from 'src/dto/pagination.dto';
import { pageOffset } from 'src/utils/offset.util';

@Injectable()
export class CustomersService implements CRUD<Customers> {
  constructor(private client: PrismaService) {}
  count(shopId: number): Promise<number> {
    return this.client.customers.count({ where: { shopId, isDeleted: false } });
  }

  create(data: CreateCustomerDto) {
    return this.client.customers.create({
      data: { ...data, createdAt: Date.now() },
    });
  }

  findAll(shopId: number, params?: PaginationDto) {
    const skip = pageOffset(params);
    return this.client.customers.findMany({
      where: { shopId, isDeleted: false },
      skip,
      take: params?.limit,
    });
  }

  findOne(id: number) {
    return this.client.customers.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateCustomerDto) {
    return this.client.customers.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id },
    });
  }

  remove(id: number) {
    return this.client.customers.update({
      data: { isDeleted: true, updatedAt: Date.now() },
      where: { id },
    });
  }
}
