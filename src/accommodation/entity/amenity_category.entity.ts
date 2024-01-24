import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Amenity } from './amenity.entity';

@Entity()
export class AmenityCategory {
  @PrimaryGeneratedColumn()
  amenity_category_id: number;

  @Column()
  amenity_category_name: string;

  @OneToMany(() => Amenity, (amenity) => amenity.amenity_category)
  amenities: Amenity[];
}
