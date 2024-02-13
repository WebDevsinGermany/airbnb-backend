import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accommodation } from './entities/accommodation.entity';
import { AccommodationHasAmenity } from './entities/accommodation_has_amenity.entity';
import { AccommodationHasBookingOption } from './entities/accommodation_has_booking_option.entity';
import { AccommodationType } from './entities/acoommodation_type.entity';
import { Amenity } from './entities/amenity.entity';
import { AmenityCategory } from './entities/amenity_category.entity';
import { BookingOption } from './entities/booking_option.entity';
import { BuildingType } from './entities/building_type.entity';
import { City } from './entities/city.entity';
import { Country } from './entities/country.entity';
import { LocationCategory } from './entities/location_category.entity';
import { Picture } from './entities/picture.entity';
import { Region } from './entities/region.entity';
import { Street } from './entities/street.entity';
import { Wishlist } from './entities/wishlist.entity';
import { AccommodationController } from './controllers/accommodation.controller';
import { AccommodationService } from './services/accommodation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Accommodation,
      AccommodationHasAmenity,
      AccommodationHasBookingOption,
      AccommodationType,
      Amenity,
      AmenityCategory,
      BookingOption,
      BuildingType,
      City,
      Country,
      LocationCategory,
      Picture,
      Region,
      Street,
      Wishlist,
    ]),
  ],
  controllers: [AccommodationController],
  providers: [AccommodationService],
})
export class AccommodationModule {}
