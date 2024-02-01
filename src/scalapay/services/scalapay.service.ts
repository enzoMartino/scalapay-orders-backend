import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderResponse } from '../dtos/responses/create-order.response';
import { CreateOrderRequest } from '../dtos/requests/create-order.request';
import { catchError, exhaustMap, firstValueFrom, of } from 'rxjs';
import { AxiosError } from 'axios';
import { ScalapayCreateOrderException } from '../exceptions/create-order.exception';
import { EnvService } from '../../common/env/services/env.service';

@Injectable()
export class ScalapayService {
  private readonly logger = new Logger(ScalapayService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly envService: EnvService,
  ) {}

  async createOrder(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    this.logger.debug(`[createOrder] request: ${JSON.stringify(request)}`);
    const scalapayOrdersUrl = this.envService.getScalapayOrdersUrl();
    this.logger.debug(`[createOrder] scalapayOrdersUrl: ${scalapayOrdersUrl}`);

    return firstValueFrom(
      this.httpService
        .post<CreateOrderResponse>(
          this.envService.getScalapayOrdersUrl(),
          request,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.envService.getScalapayApisBearerToken()}`,
            },
          },
        )
        .pipe(
          exhaustMap((result) => {
            return of(result.data);
          }),
          catchError((error: AxiosError) => {
            throw new ScalapayCreateOrderException(error.message);
          }),
        ),
    );
  }
}
