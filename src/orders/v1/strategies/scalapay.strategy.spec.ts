import { mock } from 'jest-mock-extended';
import { ScalapayStrategy } from './scalapay.strategy';
import { ScalapayService } from '../../../scalapay/services/scalapay.service';
import { EnvService } from '../../../common/env/services/env.service';
import { PlaceOrderV1RequestDtoFactory } from '../../../../test/factories/place-order-request-dto.factory';
import { ClientCartDtoFactory } from '../../../../test/factories/client-cart-dto.factory';
import {
  CreateOrderRequest,
  Merchant,
} from '../../../../src/scalapay/dtos/requests/create-order.request';
import { CreateOrderResponse } from '../../../../src/scalapay/dtos/responses/create-order.response';

describe('ScalapayStrategy', () => {
  const scalapayService = mock<ScalapayService>();
  const envService = mock<EnvService>();
  const service = new ScalapayStrategy(scalapayService, envService);

  describe('placeOrder', () => {
    const payload = PlaceOrderV1RequestDtoFactory.create();
    const clientCart = ClientCartDtoFactory.create();
    const merchant: Merchant = {
      redirectCancelUrl: 'redirectCancelUrl',
      redirectConfirmUrl: 'redirectConfirmUrl',
    };
    const createOrderResponse: CreateOrderResponse = {
      token: 'token',
      expires: 'expires',
      checkoutUrl: 'checkoutUrl',
    };

    beforeEach(() => {
      envService.getMerchantUrls.mockReturnValueOnce(merchant);

      scalapayService.createOrder.mockResolvedValueOnce(createOrderResponse);
    });

    it('should call envService.getMerchantUrls with right params', async () => {
      await service.placeOrder(payload, clientCart);

      expect(envService.getMerchantUrls).toHaveBeenCalledWith();
    });

    it('should call scalapayService.createOrder with right params', async () => {
      const expected: CreateOrderRequest = {
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
          redirectCancelUrl: merchant.redirectCancelUrl,
          redirectConfirmUrl: merchant.redirectConfirmUrl,
        },
      };

      await service.placeOrder(payload, clientCart);

      expect(scalapayService.createOrder).toHaveBeenCalledWith(expected);
    });

    it('should return right response', async () => {
      const result = await service.placeOrder(payload, clientCart);

      expect(result).toMatchObject(createOrderResponse);
    });
  });
});
