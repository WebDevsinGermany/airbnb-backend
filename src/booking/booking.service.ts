import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Booking } from './entities/booking.entity';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookingStatus } from './booking-status.enum';
import { UserService } from 'src/user/services';
import { Accommodation } from 'src/accommodation/entity/accommodation.entity';
import dayjs from 'dayjs';

@Injectable()
export class BookingService {
  private logger = new Logger(BookingService.name);
  constructor(
    private readonly bookingRepository: BookingRepository,
    // private readonly accommodationService: AccommodationService,
    private readonly userService: UserService,
  ) {}

  getBookings(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  async getBookingById(id: string): Promise<Booking> {
    const found = await this.bookingRepository.findOneBy({ booking_id: id });

    if (!found) {
      throw new NotFoundException('Booking with ID "${id}" not found');
    }

    return found;
  }

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    // TODO: get accommodation. Once I can use accommodationService I can implement it.
    // const accommodation = await this.accommodationService.findOneById(createBookingDto.accommodation_id);
    // const totalPrice = this.calculateTotalPrice(createBookingDto, accommodation);

    const user = await this.userService.findOneByUserId(
      createBookingDto.user_id,
    );

    return this.bookingRepository.createBooking(createBookingDto, user);
  }

  async updateBookingStatusById(
    id: string,
    status: BookingStatus,
  ): Promise<Booking> {
    const booking = await this.getBookingById(id);
    booking.status = status;
    await this.bookingRepository.save(booking);

    return booking;
  }

  async deleteBookingById(id: string): Promise<void> {
    const result = await this.bookingRepository.delete(id);
    // const result = await this.bookingRepository.softDelete(id);  // TODO: after Database migration, we can change it to softDelete.

    if (result.affected === 0) {
      throw new NotFoundException('Booking with ID "${id}" not found');
    }
  }

  // Get Total Price
  calculateTotalPrice(
    createBookingDto: CreateBookingDto,
    accommodation: Accommodation,
  ): number {
    const nightsStayed = this.calculateNights(
      createBookingDto.check_in_date,
      createBookingDto.check_out_date,
    );
    const basePrice = nightsStayed * accommodation.price;

    // IMPROVEMENT IDEA: Apply Discounts examples
    // basePrice = this.applyLongTermDiscount(basePrice, nightsStayed);
    // basePrice = this.applyEventDiscounts(basePrice, booking.check_in_date); // Assuming event discounts depend on dates

    return basePrice;
  }

  // Helper function for calculateTotalPrice
  calculateNights(check_in_date: Date, check_out_date: Date): number {
    const startDate = dayjs(check_in_date);
    const endDate = dayjs(check_out_date);
    const numNights = endDate.diff(startDate, 'day');
    this.logger.verbose('Number of Nights: ', numNights);
    return numNights;
  }
}
