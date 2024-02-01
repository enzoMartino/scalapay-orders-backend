import { mock } from 'jest-mock-extended';
import { OrdersGuard } from './orders.guard';
import { RedisService } from '../../../common/redis/services/redis.service';
import { ExecutionContext } from '@nestjs/common';

describe('OrdersGuard', () => {
  const redisService = mock<RedisService>();
  const ordersGuard = new OrdersGuard(redisService);

  describe('canActivate', () => {
    describe('when the request has no cookies', () => {
      const context: ExecutionContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            cookies: null,
          }),
        }),
      } as ExecutionContext;

      it('should return false', async () => {
        const result = await ordersGuard.canActivate(context);

        expect(result).toBe(false);
      });
    });

    describe('when the request has no client-id cookie', () => {
      const context: ExecutionContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            cookies: {},
          }),
        }),
      } as ExecutionContext;

      it('should return false', async () => {
        const result = await ordersGuard.canActivate(context);

        expect(result).toBe(false);
      });
    });

    describe('when the client-id has no cart', () => {
      const context: ExecutionContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            cookies: {
              'client-id': '123',
            },
          }),
        }),
      } as ExecutionContext;

      beforeEach(() => {
        redisService.hasCart.mockResolvedValueOnce(false);
      });

      it('should return false', async () => {
        const result = await ordersGuard.canActivate(context);

        expect(result).toBe(false);
      });
    });

    describe('when the client-id has cart', () => {
      const context: ExecutionContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            cookies: {
              'client-id': '123',
            },
          }),
        }),
      } as ExecutionContext;

      beforeEach(() => {
        redisService.hasCart.mockResolvedValueOnce(true);
      });

      it('should return true', async () => {
        const result = await ordersGuard.canActivate(context);

        expect(result).toBe(true);
      });
    });
  });
});
