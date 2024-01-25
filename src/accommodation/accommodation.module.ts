import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accommodation } from './entity/accommodation.entity';
import { AccommodationHasAmenity } from './entity/accommodation_has_amenity.entity';
import { AccommodationHasBookingOption } from './entity/accommodation_has_booking_option.entity';
import { AccommodationType } from './entity/acoommodation_type.entity';
import { Amenity } from './entity/amenity.entity';
import { AmenityCategory } from './entity/amenity_category.entity';
import { BookingOption } from './entity/booking_option.entity';
import { BuildingType } from './entity/building_type.entity';
import { City } from './entity/city.entity';
import { Country } from './entity/country.entity';
import { LocationCategory } from './entity/location_category.entity';
import { Picture } from './entity/picture.entity';
import { Region } from './entity/region.entity';
import { Street } from './entity/street.entity';
import { Wishlist } from './entity/wishlist.entity';

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
})
export class AccommodationModule {}
