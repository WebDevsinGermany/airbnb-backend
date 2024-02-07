import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Accommodation } from './accommodation.entity';

@Entity()
export class Region {
  @PrimaryGeneratedColumn('uuid')
  region_id: string;

  @Column()
  region_name: string;

  @OneToMany(() => Accommodation, (accommodation) => accommodation.region)
  accommodations: Accommodation[];
}
