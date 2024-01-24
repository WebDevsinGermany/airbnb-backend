import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Country } from './country.entity';

@Entity()
export class LocationCategory {
  @PrimaryGeneratedColumn()
  location_category_id: number;

  @Column()
  location_category_name: string;

  @OneToMany(() => Country, (country) => country.location_category)
  countries: Country[];
}
