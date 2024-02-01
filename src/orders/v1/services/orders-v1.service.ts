import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PlaceOrderV1ResponseDto } from '../dtos/responses/place-order-response.dto';
import { PlaceOrderV1RequestDto } from '../dtos/requests/place-order-request.dto';
import { ScalapayService } from 'src/scalapay/services/scalapay.service';
import { CreateOrderRequest } from 'src/scalapay/dtos/requests/create-order.request';
import { RedisService } from 'src/common/redis/services/redis.service';
import { EnvService } from 'src/common/env/services/env.service';

@Injectable()
export class OrdersV1Service {
  private readonly logger = new Logger(OrdersV1Service.name);

  constructor(
    private readonly scalapayService: ScalapayService,
    private readonly redisService: RedisService,
    private readonly envService: EnvService,
  ) {}

  async placeOrder(
    payload: PlaceOrderV1RequestDto,
    clientId: string,
  ): Promise<PlaceOrderV1ResponseDto> {
    try {
      const name = `${payload.shippingDetails.givenNames} ${payload.shippingDetails.familyNames}`;
      const clientCart = await this.redisService.getClientCart(clientId);
      const merchantUrls = this.envService.getMerchantUrls();

      const request: CreateOrderRequest = {
        consumer: {
          givenNames: payload.shippingDetails.givenNames,
          surname: payload.shippingDetails.familyNames,
        },
        shipping: {
          name,
          line1: payload.shippingDetails.address,
          suburb: payload.shippingDetails.city,
          postcode: payload.shippingDetails.postalCode.toString(),
          countryCode: payload.shippingDetails.countryCode,
        },
        totalAmount: clientCart.totalAmount,
        items: clientCart.items,
        merchant: {
          redirectConfirmUrl: merchantUrls.redirectConfirmUrl,
          redirectCancelUrl: merchantUrls.redirectCancelUrl,
        },
      };

      const response = await this.scalapayService.createOrder(request);

      return {
        expires: response.expires,
        token: response.token,
        checkoutUrl: response.checkoutUrl,
      };
    } catch (error) {
      this.logger.error(
        `[placeOrder] Error while placing order for client ${clientId}. Error details: ${error}`,
      );

      throw new InternalServerErrorException('Error while placing order');
    }
  }
}
