import { PaymentMethodsEnum } from 'src/common/enums/payment-methods.enum';
import {
  Item,
  TotalAmount,
} from 'src/scalapay/dtos/requests/create-order.request';

export interface ClientCartDto {
  items: Item[];
  totalAmount: TotalAmount;
  paymentMethod: PaymentMethodsEnum;
}
