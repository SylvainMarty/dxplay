import { Test, TestingModule } from '@nestjs/testing';
import { LedMatrixService } from './led-matrix.service';

describe('LedMatrixService', () => {
  let service: LedMatrixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LedMatrixService],
    }).compile();

    service = module.get<LedMatrixService>(LedMatrixService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
