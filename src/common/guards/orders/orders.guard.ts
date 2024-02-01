import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RedisService } from '../../../common/redis/services/redis.service';

@Injectable()
export class OrdersGuard implements CanActivate {
  constructor(private readonly redisService: RedisService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const cookies = request.cookies;

    if (!cookies) {
      return false;
    }

    const clientId = cookies['client-id'];
    if (!clientId) {
      return false;
    }

    const hasCart = await this.redisService.hasCart(clientId);

    return hasCart;
  }
}
