import { Test, TestingModule } from '@nestjs/testing';
import { ScalapayService } from './scalapay.service';

describe('ScalapayService', () => {
  let service: ScalapayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScalapayService],
    }).compile();

    service = module.get<ScalapayService>(ScalapayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
