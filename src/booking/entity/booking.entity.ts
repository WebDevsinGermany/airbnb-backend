import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Accommodation } from 'src/accommodation/entity/accommodation.entity';
import { User } from 'src/user/entity/user.entity';
import { Review } from 'src/review/entity/review.entity';
import { BookingStatus } from '../booking-status.enum';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  booking_id: string;

  @Column()
  status: BookingStatus;

  @Column()
  num_of_guests: number;

  @Column()
  check_in_date: Date;

  @Column()
  check_out_date: Date;

  @Column()
  total_price: number;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.bookings)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Review, (review) => review.booking)
  review: Review;
}
