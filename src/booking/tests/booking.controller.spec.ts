import { Test } from '@nestjs/testing';
import { BookingController } from '../booking.controller';

describe('BookingController', () => {
  let bookingController: BookingController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BookingController],
    }).compile();

    bookingController = module.get<BookingController>(BookingController);
  });

  it('should be defined', () => {
    expect(bookingController).toBeDefined();
  });
});
