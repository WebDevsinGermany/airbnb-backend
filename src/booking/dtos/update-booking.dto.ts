import { IsEnum } from 'class-validator';
import { BookingStatus } from '../booking-status.enum';

export class UpdateBookingDto {
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
