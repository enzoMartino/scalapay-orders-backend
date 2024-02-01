import { Module } from '@nestjs/common';
import { OrdersV1Service } from './services/orders-v1.service';
import { OrdersV1Controller } from './controllers/orders-v1.controller';
import { ScalapayModule } from '../../scalapay/scalapay.module';
import { OrdersGuardModule } from '../../common/guards/orders/orders-guard.module';
import { RedisModule } from '../../common/redis/redis.module';
import { EnvModule } from '../../common/env/env.module';
import { PaymentMethodStrategyFactory } from './factories/payment-method-strategy.factory/payment-method-strategy.factory';
import { ScalapayStrategy } from './strategies/scalapay.strategy';

@Module({
  imports: [ScalapayModule, OrdersGuardModule, RedisModule, EnvModule],
  controllers: [OrdersV1Controller],
  providers: [OrdersV1Service, PaymentMethodStrategyFactory, ScalapayStrategy],
})
export class OrdersV1Module {}
