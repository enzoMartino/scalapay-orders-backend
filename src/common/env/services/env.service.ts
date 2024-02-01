import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Merchant } from 'src/scalapay/dtos/requests/create-order.request';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  getMerchantUrls(): Merchant {
    const redirectConfirmUrl = this.configService.get(
      'MERCHANT_REDIRECT_CONFIRM_URL',
    );

    const redirectCancelUrl = this.configService.get(
      'MERCHANT_REDIRECT_CANCEL_URL',
    );

    return {
      redirectConfirmUrl,
      redirectCancelUrl,
    };
  }

  getScalapayApisHostname(): string {
    return this.configService.get('SCALAPAY_APIS_HOSTNAME');
  }

  getScalapayOrdersApisEndpoint(): string {
    return this.configService.get('SCALAPAY_ORDERS_APIS_ENDPOINT');
  }

  getScalapayApisVersion(): string {
    return this.configService.get('SCALAPAY_APIS_VERSION');
  }

  getScalapayApisBearerToken(): string {
    return this.configService.get('SCALAPAY_APIS_BEARER_TOKEN');
  }

  getScalapayOrdersUrl(): string {
    const scalapayApisHostname = this.getScalapayApisHostname();
    const scalapayApisVersion = this.getScalapayApisVersion();
    const scalapayOrdersApisEndpoint = this.getScalapayOrdersApisEndpoint();

    return `${scalapayApisHostname}/${scalapayApisVersion}/${scalapayOrdersApisEndpoint}`;
  }
}
