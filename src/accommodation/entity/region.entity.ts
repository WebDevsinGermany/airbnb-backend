import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Accommodation } from './accommodation.entity';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  country_id: number;

  @Column()
  country_name: string;

  @OneToMany(() => Accommodation, (accommodation) => accommodation.region)
  accommodations: Accommodation[];
}
