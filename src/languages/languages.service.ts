import { Injectable } from '@nestjs/common';
import { CreateLanguageDto, UpdateLanguageDto } from './dto/language.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class LanguagesService {
  constructor(private client: PrismaService) {}

  create(data: CreateLanguageDto) {
    return this.client.languages.create({
      data: { ...data, createdAt: Date.now() },
    });
  }

  findAll() {
    return this.client.languages.findMany({ where: { isDeleted: false } });
  }

  findOne(id: number) {
    return this.client.languages.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateLanguageDto) {
    return this.client.languages.update({
      data: { ...data, updatedAt: Date.now() },
      where: { id },
    });
  }

  remove(id: number) {
    return this.client.languages.delete({ where: { id } });
  }
}
