import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class OrdersGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const cookies = request.cookies;

    if (!cookies) {
      return false;
    }

    if (cookies['client-id']) {
      return true;
    }

    return false;
  }
}
