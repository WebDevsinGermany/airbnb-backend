import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Booking } from './entity/booking.entity';

@Injectable()
export class BookingRepository extends Repository<Booking> {
  private logget = new Logger('BookingRepository');
  constructor(private readonly entityManger: EntityManager) {
    super(Booking, entityManger);
  }
}
