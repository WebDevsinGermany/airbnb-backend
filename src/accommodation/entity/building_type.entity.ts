import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Accommodation } from './accommodation.entity';

@Entity()
export class BuildingType {
  @PrimaryGeneratedColumn()
  building_type_id: number;

  @Column()
  building_type_name: string;

  @OneToMany(
    () => Accommodation,
    (accommodation) => accommodation.building_type,
  )
  accommodations: Accommodation[];
}
