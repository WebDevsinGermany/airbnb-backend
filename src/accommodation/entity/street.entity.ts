import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Accommodation } from './accommodation.entity';

@Entity()
export class Street {
  @PrimaryGeneratedColumn()
  street_id: number;

  @Column()
  street_name: string;

  @OneToMany(() => Accommodation, (accommodation) => accommodation.street)
  accommodations: Accommodation[];
}
