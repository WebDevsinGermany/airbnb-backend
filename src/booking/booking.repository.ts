import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookingStatus } from './booking-status.enum';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BookingRepository extends Repository<Booking> {
  constructor(private readonly entityManger: EntityManager) {
    super(Booking, entityManger);
  }

  async createBooking(
    createBookingDto: CreateBookingDto,
    user: User,
  ): Promise<Booking> {
    const booking = new Booking();
    booking.num_of_guests = createBookingDto.num_of_guests;
    booking.check_in_date = createBookingDto.check_in_date;
    booking.check_out_date = createBookingDto.check_out_date;
    booking.status = BookingStatus.BOOKED;
    booking.user = user;

    // TODO: Once I can use AccommodationService I can implement this.
    // booking.accommodation = accommodation;
    // booking.total_price = totalPrice;
    booking.total_price = 0;

    await this.save(booking);
    return booking;
  }
}
