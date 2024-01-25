import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Accommodation } from 'src/accommodation/entity/accommodation.entity';
import { Wishlist } from 'src/accommodation/entity/wishlist.entity';
import { Booking } from 'src/booking/entity/booking.entity';
import { Review } from 'src/review/entity/review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @DeleteDateColumn()
  deleted_at: Date;

  @Column()
  date_of_birth: Date;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  last_name: string;

  @Column()
  first_name: string;

  @Column()
  phone: string;

  @Column()
  is_host: boolean;

  @Column()
  is_active: boolean;

  @Column({ type: 'bytea' })
  profile_picture: Buffer;

  @Column()
  nationality: string;

  @OneToMany(() => Accommodation, (accommodation) => accommodation.user)
  accommodations: Accommodation[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlists: Wishlist[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
