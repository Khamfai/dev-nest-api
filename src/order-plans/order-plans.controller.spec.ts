import { Test, TestingModule } from '@nestjs/testing';
import { OrderPlansController } from './order-plans.controller';
import { OrderPlansService } from './order-plans.service';

describe('OrderPlansController', () => {
  let controller: OrderPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderPlansController],
      providers: [OrderPlansService],
    }).compile();

    controller = module.get<OrderPlansController>(OrderPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
