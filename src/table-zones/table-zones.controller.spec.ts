import { Test, TestingModule } from '@nestjs/testing';
import { TableZonesController } from './table-zones.controller';
import { TableZonesService } from './table-zones.service';

describe('TableZonesController', () => {
  let controller: TableZonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableZonesController],
      providers: [TableZonesService],
    }).compile();

    controller = module.get<TableZonesController>(TableZonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
