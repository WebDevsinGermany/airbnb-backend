import { Controller, Get, Logger } from '@nestjs/common';
import { Booking } from './entity/booking.entity';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  private logger = new Logger('BookingController');
  constructor(private bookingService: BookingService) {}

  @Get()
  getBookings(): Promise<Booking[]> {
    this.logger.debug('get all bookings!');
    return this.bookingService.getBookings();
  }
}
