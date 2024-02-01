import { Module } from '@nestjs/common';
import { OrdersV1Module } from './orders/v1/orders-v1.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 3,
      },
    ]),
    OrdersV1Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
