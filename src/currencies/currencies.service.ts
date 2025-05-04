import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto, UpdateCurrencyDto } from './dto/currency.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationDto } from 'src/dto/pagination.dto';
import { pageOffset } from 'src/utils/offset.util';
import { Currencies } from '@prisma/client';

@Injectable()
export class CurrenciesService {
  constructor(private client: PrismaService) {}

  async create(data: CreateCurrencyDto): Promise<Currencies> {
    return this.client.currencies.create({
      data: { ...data, createdAt: Date.now() },
    });
  }

  async findAll(params?: PaginationDto): Promise<Currencies[]> {
    const skip = pageOffset(params);
    return this.client.currencies.findMany({
      where: { isDeleted: false },
      skip,
      take: params?.limit,
    });
  }

  async findOne(id: number): Promise<Currencies | null> {
    return this.client.currencies.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateCurrencyDto): Promise<Currencies> {
    return this.client.currencies.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id },
    });
  }

  async remove(id: number): Promise<Currencies> {
    return this.client.currencies.update({
      data: { isDeleted: true, updatedAt: Date.now() },
      where: { id },
    });
  }
}
