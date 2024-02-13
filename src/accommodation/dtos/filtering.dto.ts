import { IsInt, IsString, ValidateNested } from 'class-validator';
import { Amenity } from '../entities/amenity.entity';
import { BookingOption } from '../entities/booking_option.entity';

export class FilteringDto {
  @IsString()
  accommodation_type_id: string;

  @IsString()
  accommodation_type_name: string;

  @IsInt()
  price_min: number;

  @IsInt()
  price_max: number;

  @IsInt()
  room_number: number;

  @IsInt()
  bed_number: number;

  @IsInt()
  bathroom_number: number;

  @IsString()
  building_type_id: string;

  @IsString()
  building_type_name: string;

  @ValidateNested()
  amenity: Amenity[];

  @ValidateNested()
  booking_option: BookingOption[];
}
