import { Injectable, Logger } from '@nestjs/common';
import { ClientCartDto } from '../dtos/client-cart.dto';
import { PaymentMethodsEnum } from '../../../common/enums/payment-methods.enum';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  async getClientCart(clientId: string): Promise<ClientCartDto> {
    this.logger.debug(`[getClientCart] clientId: ${clientId}`);

    if (clientId !== '123') {
      return null;
    }

    return {
      items: [
        {
          name: 'T-Shirt',
          category: 'clothes',
          sku: '12341234',
          quantity: 1,
          price: {
            amount: '10.00',
            currency: 'EUR',
          },
        },
      ],
      totalAmount: {
        amount: '10.00',
        currency: 'EUR',
      },
      paymentMethod: PaymentMethodsEnum.scalapay,
    };
  }

  async hasCart(clientId: string): Promise<boolean> {
    return clientId === '123';
  }
}
