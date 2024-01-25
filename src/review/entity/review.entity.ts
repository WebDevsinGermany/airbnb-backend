import { Booking } from 'src/booking/entity/booking.entity';
import { Accommodation } from 'src/accommodation/entity/accommodation.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  review_id: number;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  comment: string;

  @Column()
  rating: number;

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.reviews)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'accommodation_id' })
  user: User;

  @OneToOne(() => Booking, (booking) => booking.review)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;
}
