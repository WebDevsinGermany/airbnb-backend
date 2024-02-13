import { IsOptional } from 'class-validator';
import { Accommodation } from 'src/accommodation/entities/accommodation.entity';
import { Wishlist } from 'src/accommodation/entities/wishlist.entity';
import { Booking } from 'src/booking/entity/booking.entity';
import { Review } from 'src/review/entity/review.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'date',
  })
  date_of_birth: string;

  @Column()
  last_name: string;

  @Column()
  first_name: string;

  @Column()
  phone_number: string;

  @Column()
  is_host: boolean;

  @Column({
    type: 'bytea',
  })
  @IsOptional()
  profile_picture: Buffer;

  @Column()
  is_active: boolean;

  @Column()
  nation: string;

  @AfterInsert()
  logInsert() {
    console.log('User inserted of id: ', this.user_id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('User updated of id: ', this.user_id);
  }

  @AfterRemove()
  logRemove() {
    console.log('User removed of id: ', this.user_id);
  }

  @OneToMany(() => Accommodation, (accommodation) => accommodation.user)
  accommodations: Accommodation[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlists: Wishlist[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
