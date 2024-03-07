import { Expose, Type } from 'class-transformer';
import { Wishlist } from '../entities/wishlist.entity';
import { Review } from 'src/review/entity/review.entity';

class PictureDto {
  @Expose()
  picture_id: string;

  @Expose()
  picture_path: string;

  @Expose()
  created_at: string;
}

class CountryDto {
  @Expose()
  country_name: string;
}

class CityDto {
  @Expose()
  city_name: string;
}

export class AccommodationListDto {
  @Expose()
  accommodation_id: string;

  @Expose()
  price: number;

  @Expose()
  @Type(() => PictureDto)
  pictures: PictureDto[];

  @Expose()
  @Type(() => CityDto)
  city: CityDto;

  wishlists: Wishlist[];

  @Expose()
  hasWishlist: boolean;

  @Expose()
  reviews: Review[];

  @Expose()
  @Type(() => CountryDto)
  country: CountryDto;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Expose()
  deleted_at: Date;

  @Expose()
  review_average: number;
}
