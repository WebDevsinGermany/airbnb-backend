import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingRepository } from './booking.repository';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserService } from 'src/user/services';
import { User } from 'src/user/entities/user.entity';
import { Accommodation } from 'src/accommodation/entities/accommodation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Accommodation])],
  controllers: [BookingController],
  providers: [
    BookingService,
    BookingRepository,
    UserService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class BookingModule {}
