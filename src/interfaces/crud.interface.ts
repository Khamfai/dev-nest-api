import { PaginationDto } from 'src/dto/pagination.dto';

export interface CRUD<T = unknown> {
  count(shopId?: unknown): Promise<number>;
  findAll(shopId?: number, param?: PaginationDto): Promise<T[]>;
  findOne(param: unknown): Promise<T | null>;
  create(data: unknown): Promise<T | null>;
  update(id: unknown, data: unknown): Promise<T | null>;
  remove(param: unknown): Promise<T | null>;
}
