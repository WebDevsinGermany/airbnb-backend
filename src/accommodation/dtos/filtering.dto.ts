import { IsInt, IsString, IsOptional, IsArray } from 'class-validator';

export class FilteringDto {
  @IsString()
  @IsOptional()
  accommodation_type_id: string;

  @IsString()
  @IsOptional()
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
  @IsOptional()
  building_type_name: string;

  @IsArray()
  amenity: AmenityDto[];

  @IsArray()
  booking_option: BookingOpDto[];
}

export class AmenityDto {
  @IsString()
  amenity_id: string;
}

export class BookingOpDto {
  @IsString()
  booking_option_id: string;
}
