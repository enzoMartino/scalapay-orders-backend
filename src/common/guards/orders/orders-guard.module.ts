import { Module } from '@nestjs/common';
import { RedisModule } from 'src/common/redis/redis.module';

@Module({
  imports: [RedisModule],
})
export class OrdersGuardModule {}
