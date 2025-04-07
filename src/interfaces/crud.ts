export class Pagination {
  page: number;
  limit: number;
}

export interface CRUD {
  getDataAll(param?: Pagination);
  getDataByOne(param: unknown);
  createData(data: unknown);
  updateData(data: unknown);
  deleteData(param: unknown);
}
