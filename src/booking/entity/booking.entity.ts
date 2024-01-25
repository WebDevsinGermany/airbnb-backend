import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Accommodation } from 'src/accommodation/entity/accommodation.entity';
import { User } from 'src/user/entity/user.entity';
import { Review } from 'src/review/entity/review.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  check_in_date: Date;

  @Column()
  check_out_data: Date;

  @Column()
  status: string;

  @Column()
  number_of_guests: number;

  @Column()
  total_price: number;

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.bookings)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'accommodation_id' })
  user: User;

  @OneToOne(() => Review, (review) => review.booking)
  review: Review;
}
