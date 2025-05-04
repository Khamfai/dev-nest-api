import { Injectable } from '@nestjs/common';
import { CreatePlanDto, UpdatePlanDto } from './dto/create-plan.dto';
import { Plans } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PaginationDto } from 'src/dto/pagination.dto';
import { pageOffset } from 'src/utils/offset.util';
import { take } from 'rxjs';

@Injectable()
export class PlansService {
  constructor(private client: PrismaService) {}

  async create(data: CreatePlanDto): Promise<Plans> {
    return this.client.plans.create({
      data: { ...data, createdAt: Date.now() },
    });
  }

  async findAll(params?: PaginationDto): Promise<Plans[]> {
    const skip = pageOffset(params);
    return this.client.plans.findMany({
      where: { isDeleted: false },
      skip,
      take: params?.limit,
    });
  }

  async findOne(id: number): Promise<Plans | null> {
    return this.client.plans.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdatePlanDto): Promise<Plans> {
    return this.client.plans.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id },
    });
  }

  async remove(id: number): Promise<Plans> {
    return this.client.plans.update({
      data: { isDeleted: true, updatedAt: Date.now() },
      where: { id },
    });
  }
}
