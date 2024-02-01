import { Injectable } from '@nestjs/common';
import { PlaceOrderV1Interface } from '../../interfaces/place-order.interface';
import { ScalapayStrategy } from '../../strategies/scalapay.strategy';
import { PaymentMethodsEnum } from '../../../../common/enums/payment-methods.enum';

@Injectable()
export class PaymentMethodStrategyFactory {
  constructor(private readonly scalapayStrategy: ScalapayStrategy) {}

  create(paymentMethod: PaymentMethodsEnum): PlaceOrderV1Interface {
    switch (paymentMethod) {
      case PaymentMethodsEnum.scalapay:
        return this.scalapayStrategy;
      default:
        throw Error(`${paymentMethod} strategy is not implemented`);
    }
  }
}
