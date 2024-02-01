import { PaymentMethodsEnum } from '../../../../common/enums/payment-methods.enum';
import { PaymentMethodStrategyFactory } from './payment-method-strategy.factory';
import { mock } from 'jest-mock-extended';
import { ScalapayStrategy } from '../../strategies/scalapay.strategy';

describe('PaymentMethodStrategyFactoryService', () => {
  const scalapayStrategy = mock<ScalapayStrategy>();
  const service = new PaymentMethodStrategyFactory(scalapayStrategy);

  describe('create', () => {
    describe(`when paymentMethod is ${PaymentMethodsEnum.scalapay}`, () => {
      it('should return correct strategy', () => {
        const result = service.create(PaymentMethodsEnum.scalapay);

        expect(result).toMatchObject(scalapayStrategy);
      });
    });
  });
});
