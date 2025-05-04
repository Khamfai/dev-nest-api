import { PaginationDto } from 'src/dto/pagination.dto';

export interface CRUD<T = unknown> {
  count(): Promise<number>;
  findAll(param?: PaginationDto): Promise<T[]>;
  findByShop(shopId: number): Promise<T[]>;
  findOne(param: unknown): Promise<T | null>;
  create(data: unknown): Promise<T | null>;
  update(id: unknown, data: unknown): Promise<T | null>;
  remove(param: unknown): Promise<T | null>;
}
