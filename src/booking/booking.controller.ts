import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Booking } from './entities/booking.entity';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('booking')
export class BookingController {
  private logger = new Logger(BookingController.name);
  constructor(private bookingService: BookingService) {}

  @Get()
  getBookings(): Promise<Booking[]> {
    this.logger.verbose('get all bookings!');
    return this.bookingService.getBookings();
  }

  @Get('/:id')
  getBookingById(@Param('id') id: string): Promise<Booking> {
    return this.bookingService.getBookingById(id);
  }

  @Patch('/:id/status')
  updateBookingStatusById(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const { status } = updateBookingDto;
    return this.bookingService.updateBookingStatusById(id, status);
  }

  @Delete('/:id')
  deleteBookingById(@Param('id') id: string): Promise<void> {
    this.logger.verbose(`Deleteed: "${id}"`);
    return this.bookingService.deleteBookingById(id);
  }

  @Post()
  createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    this.logger.verbose(`Create: ${JSON.stringify(createBookingDto)}`);
    return this.bookingService.createBooking(createBookingDto);
  }
}
