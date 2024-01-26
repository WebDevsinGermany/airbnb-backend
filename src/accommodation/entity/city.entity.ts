import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Accommodation } from './accommodation.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn('uuid')
  city_id: string;

  @Column()
  city_name: string;

  @OneToMany(() => Accommodation, (accommodation) => accommodation.city)
  accommodations: Accommodation[];
}
