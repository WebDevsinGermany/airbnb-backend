import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Accommodation } from './accommodation.entity';
@Entity()
export class AccommodationType {
  @PrimaryGeneratedColumn('uuid')
  accommodation_type_id: string;

  @Column()
  accommodation_type_name: string;

  @OneToMany(
    () => Accommodation,
    (accommodation) => accommodation.accommodation_type,
  )
  accommodations: Accommodation[];
}
