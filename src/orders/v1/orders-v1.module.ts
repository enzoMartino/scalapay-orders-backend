import { Module } from '@nestjs/common';
import { OrdersV1Service } from './services/orders-v1.service';
import { OrdersV1Controller } from './controllers/orders-v1.controller';
import { ScalapayModule } from 'src/scalapay/scalapay.module';
import { OrdersGuardModule } from 'src/common/guards/orders/orders-guard.module';
import { RedisModule } from 'src/common/redis/redis.module';
import { EnvModule } from 'src/common/env/env.module';

@Module({
  imports: [ScalapayModule, OrdersGuardModule, RedisModule, EnvModule],
  controllers: [OrdersV1Controller],
  providers: [OrdersV1Service],
})
export class OrdersV1Module {}