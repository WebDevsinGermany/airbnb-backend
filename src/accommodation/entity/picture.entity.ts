import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Accommodation } from './accommodation.entity';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn('uuid')
  picture_id: string;

  @Column()
  picture_path: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.pictures)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation;
}
