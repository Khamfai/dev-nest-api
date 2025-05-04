import { PaginationDto } from 'src/dto/pagination.dto';

export function pageOffset(pagination?: PaginationDto) {
  return pagination?.page == null || pagination?.limit == null
    ? undefined
    : (pagination.page - 1) * pagination.limit;
}
