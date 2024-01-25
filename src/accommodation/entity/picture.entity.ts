import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Accommodation } from './accommodation.entity';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  picture_id: number;

  @Column()
  picture_path: string;

  @Column()
  created_at: Date;

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.pictures)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation;
}
