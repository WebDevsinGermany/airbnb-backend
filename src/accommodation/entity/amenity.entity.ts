import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { AmenityCategory } from './amenity_category.entity';
import { AccommodationHasAmenity } from './accommodation_has_amenity.entity';

@Entity()
export class Amenity {
  @PrimaryGeneratedColumn()
  amenity_id: number;

  @Column()
  amenity_name: string;

  @OneToMany(
    () => AccommodationHasAmenity,
    (accommodation_has_amenity) => accommodation_has_amenity.amenity,
  )
  accommodation_has_amenities: AccommodationHasAmenity[];

  @ManyToOne(
    () => AmenityCategory,
    (amenity_category) => amenity_category.amenities,
  )
  @JoinColumn({ name: 'amenity_category_id' })
  amenity_category: AmenityCategory;
}
