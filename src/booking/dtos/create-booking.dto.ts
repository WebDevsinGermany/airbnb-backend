import { IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  num_of_guests: number;

  @IsNotEmpty()
  check_in_date: Date;

  @IsNotEmpty()
  check_out_date: Date;

  // TODO: Once I can use AccommodationService I can uncomment @IsNotEmpty() and test it again.
  // @IsNotEmpty()
  accommodation_id: string;

  @IsNotEmpty()
  user_id: string;
}
