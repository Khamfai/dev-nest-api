import { Test, TestingModule } from '@nestjs/testing';
import { OrderPlansService } from './order-plans.service';

describe('OrderPlansService', () => {
  let service: OrderPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderPlansService],
    }).compile();

    service = module.get<OrderPlansService>(OrderPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
