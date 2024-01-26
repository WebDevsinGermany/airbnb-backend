import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Accommodation } from './accommodation.entity';

@Entity()
export class Street {
  @PrimaryGeneratedColumn('uuid')
  street_id: string;

  @Column()
  street_name: string;

  @OneToMany(() => Accommodation, (accommodation) => accommodation.street)
  accommodations: Accommodation[];
}
