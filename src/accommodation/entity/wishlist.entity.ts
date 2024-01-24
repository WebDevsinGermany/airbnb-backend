import { JoinColumn, ManyToOne } from 'typeorm';
import { Accommodation } from './accommodation.entity';

export class Wishlist {
  @ManyToOne(() => Accommodation, (accommodation) => accommodation.wishlists)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation;

  @ManyToOne(() => User, (user) => user.wishlist)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
