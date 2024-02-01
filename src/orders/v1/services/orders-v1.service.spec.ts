import { Test, TestingModule } from '@nestjs/testing';
import { OrdersV1Service } from './orders-v1.service';

describe('OrdersV1Service', () => {
  let service: OrdersV1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersV1Service],
    }).compile();

    service = module.get<OrdersV1Service>(OrdersV1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
