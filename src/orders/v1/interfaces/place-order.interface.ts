import { ClientCartDto } from '../../../common/redis/dtos/client-cart.dto';
import { PlaceOrderV1RequestDto } from '../dtos/requests/place-order-request.dto';
import { PlaceOrderV1ResponseDto } from '../dtos/responses/place-order-response.dto';

export interface PlaceOrderV1Interface {
  placeOrder(
    payload: PlaceOrderV1RequestDto,
    clientCart: ClientCartDto,
  ): Promise<PlaceOrderV1ResponseDto>;
}
