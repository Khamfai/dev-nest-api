import { Injectable } from '@nestjs/common';
import client from 'src/configs/prisma-client';
import { CategoriesDto, CategoriesUpdateDto } from 'src/dto/categories.dto';
import { CRUD } from 'src/interfaces/crud';

@Injectable()
export class CategorieService implements CRUD {
  getDataAll() {
    const result = client.categories.findMany({ where: { isDeleted: false } });
    return result;
  }
  getDataByOne(id: number) {
    const result = client.categories.findUnique({ where: { id: id } });
    return result;
  }

  getDataByShop(shopId: number) {
    const result = client.categories.findMany({
      where: { shopId: shopId, isDeleted: false },
    });
    return result;
  }

  createData(data: CategoriesDto) {
    const add = client.categories.create({ data: data });
    return add;
  }
  updateData(data: CategoriesUpdateDto) {
    const update = client.categories.update({
      data: { shopId: data.shopId, name: data.name, updatedBy: data.updatedBy },
      where: { id: data.id },
    });
    return update;
  }
  deleteData(id: number) {
    const del = client.categories.delete({ where: { id: id } });
    return del;
  }
}
