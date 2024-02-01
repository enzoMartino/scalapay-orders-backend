import { Injectable } from '@nestjs/common';
import { PaymentMethodsEnum } from 'src/common/enums/payment-methods.enum';
import { PlaceOrderV1Interface } from '../../interfaces/place-order.interface';
import { ScalapayStrategy } from '../../strategies/scalapay.strategy';

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
