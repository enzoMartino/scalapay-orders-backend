import { Module } from '@nestjs/common';
import { RedisModule } from '../../../common/redis/redis.module';
import { OrdersGuard } from './orders.guard';

@Module({
  imports: [RedisModule],
  providers: [OrdersGuard],
  exports: [OrdersGuard],
})
export class OrdersGuardModule {}
