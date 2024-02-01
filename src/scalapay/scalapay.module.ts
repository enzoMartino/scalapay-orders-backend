import { Module } from '@nestjs/common';
import { ScalapayService } from './services/scalapay.service';
import { HttpModule } from '@nestjs/axios';
import { EnvModule } from 'src/common/env/env.module';

@Module({
  imports: [HttpModule, EnvModule],
  providers: [ScalapayService],
  exports: [ScalapayService],
})
export class ScalapayModule {}
