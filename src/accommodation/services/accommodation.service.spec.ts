import { Test, TestingModule } from '@nestjs/testing';
import { AccommodationService } from './accommodation.service';

describe('AccommodationService', () => {
  let service: AccommodationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccommodationService],
    }).compile();

    service = module.get<AccommodationService>(AccommodationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
