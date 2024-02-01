import { PlaceOrderV1RequestDto } from 'src/orders/v1/dtos/requests/place-order-request.dto';

export class PlaceOrderV1RequestDtoFactory {
  static create(): PlaceOrderV1RequestDto {
    return {
      shippingDetails: {
        givenNames: 'givenNames',
        familyNames: 'familyNames',
        city: 'city',
        postalCode: 1,
        countryCode: 'countryCode',
        address: 'address',
      },
    };
  }
}
