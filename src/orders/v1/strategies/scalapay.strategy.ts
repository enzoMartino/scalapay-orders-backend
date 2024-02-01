import { Injectable } from '@nestjs/common';
import { PlaceOrderV1Interface } from '../interfaces/place-order.interface';
import { PlaceOrderV1RequestDto } from '../dtos/requests/place-order-request.dto';
import { PlaceOrderV1ResponseDto } from '../dtos/responses/place-order-response.dto';
import { ScalapayService } from '../../../scalapay/services/scalapay.service';
import { EnvService } from '../../../common/env/services/env.service';
import {
  CreateOrderRequest,
  Merchant,
} from '../../../scalapay/dtos/requests/create-order.request';
import { ClientCartDto } from '../../../common/redis/dtos/client-cart.dto';

@Injectable()
export class ScalapayStrategy implements PlaceOrderV1Interface {
  constructor(
    private readonly scalapayService: ScalapayService,
    private readonly envService: EnvService,
  ) {}

  async placeOrder(
    payload: PlaceOrderV1RequestDto,
    clientCart: ClientCartDto,
  ): Promise<PlaceOrderV1ResponseDto> {
    const merchantUrls = this.envService.getMerchantUrls();
    const request = this.createRequest(payload, clientCart, merchantUrls);
    const response = await this.scalapayService.createOrder(request);

    return {
      expires: response.expires,
      token: response.token,
      checkoutUrl: response.checkoutUrl,
    };
  }

  private createRequest(
    payload: PlaceOrderV1RequestDto,
    clientCart: ClientCartDto,
    merchant: Merchant,
  ): CreateOrderRequest {
    return {
      consumer: {
        givenNames: payload.shippingDetails.givenNames,
        surname: payload.shippingDetails.familyNames,
      },
      shipping: {
        name: `${payload.shippingDetails.givenNames} ${payload.shippingDetails.familyNames}`,
        line1: payload.shippingDetails.address,
        suburb: payload.shippingDetails.city,
        postcode: payload.shippingDetails.postalCode.toString(),
        countryCode: payload.shippingDetails.countryCode,
      },
      totalAmount: clientCart.totalAmount,
      items: clientCart.items,
      merchant: {
        redirectConfirmUrl: merchant.redirectConfirmUrl,
        redirectCancelUrl: merchant.redirectCancelUrl,
      },
    };
  }
}
