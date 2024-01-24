import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Accommodation } from './accommodation.entity';
import { LocationCategory } from './location_category.entity';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  country_id: number;

  @Column()
  country_name: string;

  @ManyToOne(
    () => LocationCategory,
    (location_category) => location_category.countries,
  )
  @JoinColumn({ name: 'location_category_id' })
  location_category: LocationCategory;

  @OneToMany(
    () => Accommodation,
    (accommodation) => accommodation.building_type,
  )
  accommodations: Accommodation[];
}
