import { PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Amenity } from './amenity.entity';
import { Accommodation } from './accommodation.entity';

@Entity()
export class AccommodationHasAmenity {
  @PrimaryGeneratedColumn()
  accommodation_amenity_id: number;

  @ManyToOne(() => Amenity, (amenity) => amenity.accommodation_has_amenities)
  @JoinColumn({ name: 'amenity_id' })
  amenity: Amenity;

  @ManyToOne(
    () => Accommodation,
    (accommodation) => accommodation.accommodation_has_amenities,
  )
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation;
}
