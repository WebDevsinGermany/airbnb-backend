import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { AccommodationType } from './acoommodation_type.entity';
import { BuildingType } from './building_type.entity';
import { Region } from './region.entity';
import { Street } from './street.entity';
import { Picture } from './picture.entity';
import { City } from './city.entity';
import { AccommodationHasAmenity } from './accommodation_has_amenity.entity';
import { Wishlist } from './wishlist.entity';
import { AccommodationHasBookingOption } from './accommodation_has_booking_option.entity';
import { User } from 'src/user/entity/user.entity';
import { Booking } from 'src/booking/entity/booking.entity';
import { Review } from 'src/review/entity/review.entity';

@Entity()
export class Accommodation {
  @PrimaryGeneratedColumn()
  accommodation_id: number;

  @Column()
  title: string;

  /**
   * onetomany의 argument(인자)에 대한 설명
   * 첫번째 인자는 상대방 엔티티의 타입이 무엇인지를 말한다.
   * 두번째 인자는 상대방 엔티티에서 나의 엔티티로 돌아올때 경로(길)을 알려주는 역할이다.
   * 아래의 예제에서는 타겟이 AccommodationType 엔티티가 되고
   * 나로 돌아오는 경로는 상대방 엔티티에서 accommodation 변수를 통해서 접근하는것이다.
   * ps. Chatgpt's answer.
   */
  @ManyToOne(
    () => AccommodationType,
    (accommodation_type) => accommodation_type.accommodations,
  )
  @JoinColumn({ name: 'accommodation_type_id' })
  accommodation_type: AccommodationType;

  @Column()
  price: number;

  @Column()
  room_number: number;

  @Column()
  bed_number: number;

  @ManyToOne(
    () => BuildingType,
    (building_type) => building_type.accommodations,
  )
  @JoinColumn({ name: 'building_type_id' })
  building_type: BuildingType;

  @Column()
  bathroom_number: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.accommodations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Region, (region) => region.accommodations)
  @JoinColumn({ name: 'region_id' })
  region: Region;

  @ManyToOne(() => Street, (street) => street.accommodations)
  @JoinColumn({ name: 'street_id' })
  street: Street;

  @Column()
  house_number: number;

  @Column()
  zipcode: string;

  @Column()
  person_max_number: number;

  @OneToMany(() => Picture, (picture) => picture.accommodation)
  pictures: Picture[];

  @ManyToOne(() => City, (city) => city.accommodations)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @OneToMany(
    () => AccommodationHasAmenity,
    (accommodation_has_amenity) => accommodation_has_amenity.accommodation,
  )
  accommodation_has_amenities: AccommodationHasAmenity[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.accommodation)
  wishlists: Wishlist[];

  @OneToMany(() => Booking, (booking) => booking.accommodation)
  bookings: Booking[];

  @OneToMany(() => Review, (review) => review.accommodation)
  reviews: Review[];

  @OneToMany(
    () => AccommodationHasBookingOption,
    (accommodation_has_booking_option) =>
      accommodation_has_booking_option.accommodation,
  )
  accommodation_has_booking_options: AccommodationHasBookingOption[];

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @DeleteDateColumn()
  deleted_at: Date;
}
