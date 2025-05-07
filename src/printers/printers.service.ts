import { Injectable } from '@nestjs/common';
import { CreatePrinterDto, UpdatePrinterDto } from './dto/printer.dto';
import { PrismaService } from 'nestjs-prisma';
import { Printers } from '@prisma/client';
import { CRUD } from 'src/interfaces/crud.interface';

@Injectable()
export class PrintersService implements CRUD<Printers> {
  constructor(private client: PrismaService) {}
  count(shopId: number): Promise<number> {
    return this.client.printers.count({ where: { shopId, isDeleted: false } });
  }

  async create(data: CreatePrinterDto): Promise<Printers> {
    return this.client.printers.create({
      data: { ...data, createdAt: Date.now() },
    });
  }

  async findAll(shopId: number): Promise<Printers[]> {
    return this.client.printers.findMany({
      where: { shopId, isDeleted: false },
    });
  }

  async findOne(id: number): Promise<Printers | null> {
    return this.client.printers.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdatePrinterDto): Promise<Printers> {
    return this.client.printers.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id },
    });
  }

  async remove(id: number): Promise<Printers> {
    return this.client.printers.update({
      data: { isDeleted: true, updatedAt: Date.now() },
      where: { id },
    });
  }
}
