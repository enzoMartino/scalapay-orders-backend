import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PlaceOrderV1ResponseDto } from '../dtos/responses/place-order-response.dto';
import { PlaceOrderV1RequestDto } from '../dtos/requests/place-order-request.dto';
import { OrdersV1Service } from '../services/orders-v1.service';
import { OrdersGuard } from '../../../common/guards/orders/orders.guard';
import { Request } from 'express';
import { Throttle } from '@nestjs/throttler';

@Controller('/v1/orders')
export class OrdersV1Controller {
  private readonly logger = new Logger(OrdersV1Controller.name);

  constructor(private readonly ordersService: OrdersV1Service) {}

  @Post()
  @Throttle({})
  @UseGuards(OrdersGuard)
  @HttpCode(HttpStatus.OK)
  async placeOrder(
    @Req() request: Request,
    @Body(
      new ValidationPipe({
        transform: true,
        transformOptions: { excludeExtraneousValues: true },
      }),
    )
    payload: PlaceOrderV1RequestDto,
  ): Promise<PlaceOrderV1ResponseDto> {
    return this.ordersService.placeOrder(payload, request.cookies['client-id']);
  }
}
