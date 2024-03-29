import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Accommodation } from './accommodation.entity';
import { BookingOption } from './booking_option.entity';

@Entity()
export class AccommodationHasBookingOption {
  @PrimaryGeneratedColumn('uuid')
  accommodation_bookingoption_id: string;

  @ManyToOne(
    () => BookingOption,
    (booking_option) => booking_option.accommodation_has_booking_options,
  )
  @JoinColumn({ name: 'booking_option_id' })
  booking_option: BookingOption;

  @ManyToOne(
    () => Accommodation,
    (accommodation) => accommodation.accommodation_has_booking_options,
  )
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation;
}
