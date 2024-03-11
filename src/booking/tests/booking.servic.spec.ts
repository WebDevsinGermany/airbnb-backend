import { Test } from '@nestjs/testing';
import { BookingService } from '../booking.service';

describe('BookingService', () => {
  let bookingService: BookingService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BookingService],
    }).compile();

    bookingService = module.get(BookingService);
  });

  describe('getBookings', () => {
    it('should be defined', () => {
      expect(bookingService).toBeDefined();
    });
  });
});
