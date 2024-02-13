import { Test, TestingModule } from '@nestjs/testing';
import { AccommodationController } from './accommodation.controller';

describe('AccommodationController', () => {
  let controller: AccommodationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccommodationController],
    }).compile();

    controller = module.get<AccommodationController>(AccommodationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
