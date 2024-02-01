import { PaymentMethodsEnum } from '../../src/common/enums/payment-methods.enum';
import { ClientCartDto } from '../../src/common/redis/dtos/client-cart.dto';

export class ClientCartDtoFactory {
  static create(): ClientCartDto {
    return {
      items: [
        {
          name: 'name',
          category: 'category',
          sku: 'sku',
          quantity: 1,
          price: {
            amount: 'amount',
            currency: 'currency',
          },
        },
      ],
      totalAmount: {
        amount: 'amount',
        currency: 'currency',
      },
      paymentMethod: PaymentMethodsEnum.scalapay,
    };
  }
}
