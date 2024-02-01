import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PlaceOrderV1ResponseDto } from '../dtos/responses/place-order-response.dto';
import { PlaceOrderV1RequestDto } from '../dtos/requests/place-order-request.dto';
import { RedisService } from 'src/common/redis/services/redis.service';
import { PaymentMethodStrategyFactory } from '../factories/payment-method-strategy.factory/payment-method-strategy.factory';

@Injectable()
export class OrdersV1Service {
  private readonly logger = new Logger(OrdersV1Service.name);

  constructor(
    private readonly redisService: RedisService,
    private readonly paymentMethodStrategyFactory: PaymentMethodStrategyFactory,
  ) {}

  async placeOrder(
    payload: PlaceOrderV1RequestDto,
    clientId: string,
  ): Promise<PlaceOrderV1ResponseDto> {
    try {
      const clientCart = await this.redisService.getClientCart(clientId);

      return this.paymentMethodStrategyFactory
        .create(clientCart.paymentMethod)
        .placeOrder(payload, clientCart);
    } catch (error) {
      this.logger.error(
        `[placeOrder] Error while placing order for client ${clientId}. Error details: ${error}`,
      );

      throw new InternalServerErrorException('Error while placing order');
    }
  }
}
