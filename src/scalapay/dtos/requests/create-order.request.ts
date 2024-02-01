export interface CreateOrderRequest {
  consumer: Consumer;
  shipping: Shipping;
  totalAmount: TotalAmount;
  items: Item[];
  merchant: Merchant;
}

interface Consumer {
  givenNames: string;
  surname: string;
}

interface Shipping {
  name: string;
  line1: string;
  suburb: string;
  postcode: string;
  countryCode: string;
}

export interface TotalAmount {
  amount: string;
  currency: string;
}

export interface Item {
  name: string;
  category: string;
  sku: string;
  quantity: number;
  price: Price;
}

interface Price {
  amount: string;
  currency: string;
}

export interface Merchant {
  redirectConfirmUrl: string;
  redirectCancelUrl: string;
}
