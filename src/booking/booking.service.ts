import { Injectable } from '@nestjs/common';
import { Booking } from './entity/booking.entity';
import { BookingRepository } from './booking.repository';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async getBookings(): Promise<Booking[]> {
    return await this.bookingRepository.find();
  }
}
