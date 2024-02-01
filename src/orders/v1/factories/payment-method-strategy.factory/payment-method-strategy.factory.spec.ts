import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodStrategyFactory } from './payment-method-strategy.factory';

describe('PaymentMethodStrategyFactoryService', () => {
  let service: PaymentMethodStrategyFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentMethodStrategyFactory],
    }).compile();

    service = module.get<PaymentMethodStrategyFactory>(
      PaymentMethodStrategyFactory,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
