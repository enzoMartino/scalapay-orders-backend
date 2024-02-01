import { PaymentMethodsEnum } from '../../../common/enums/payment-methods.enum';
import {
  Item,
  TotalAmount,
} from '../../../scalapay/dtos/requests/create-order.request';

export interface ClientCartDto {
  items: Item[];
  totalAmount: TotalAmount;
  paymentMethod: PaymentMethodsEnum;
}
