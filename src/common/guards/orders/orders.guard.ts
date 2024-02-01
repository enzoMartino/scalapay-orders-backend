import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { RedisService } from 'src/common/redis/services/redis.service';

@Injectable()
export class OrdersGuard implements CanActivate {
  constructor(private readonly redisService: RedisService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const cookies = request.cookies;

    if (!cookies) {
      return false;
    }

    const clientId = cookies['client-id'];
    if (!clientId) {
      return false;
    }

    if (this.redisService.hasCart(clientId)) {
      return true;
    }

    return false;
  }
}
