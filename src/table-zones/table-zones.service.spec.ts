import { Test, TestingModule } from '@nestjs/testing';
import { TableZonesService } from './table-zones.service';

describe('TableZonesService', () => {
  let service: TableZonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableZonesService],
    }).compile();

    service = module.get<TableZonesService>(TableZonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
