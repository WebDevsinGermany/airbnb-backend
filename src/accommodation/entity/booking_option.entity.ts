import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AccommodationHasBookingOption } from './accommodation_has_booking_option.entity';

@Entity()
export class BookingOption {
  @PrimaryGeneratedColumn()
  booking_option_id: number;

  @Column()
  booking_option_name: string;

  @OneToMany(
    () => AccommodationHasBookingOption,
    (accommodation_has_booking_option) =>
      accommodation_has_booking_option.booking_option,
  )
  accommodation_has_booking_options: AccommodationHasBookingOption[];
}
