import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Accommodation } from './accommodation.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  wishlist_id: string;

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.wishlists)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation;

  @ManyToOne(() => User, (user) => user.wishlists)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
