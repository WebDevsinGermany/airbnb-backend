import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Accommodation } from './accommodation.entity';
import { User } from 'src/user/entity/user.entity';

@Entity()
export class Wishlist {
  @ManyToOne(() => Accommodation, (accommodation) => accommodation.wishlists)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation;

  @ManyToOne(() => User, (user) => user.wishlists)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
