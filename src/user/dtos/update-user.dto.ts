import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  date_of_birth: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsString()
  @IsOptional()
  first_name: string;

  @IsString()
  @IsOptional()
  phone_number: string;

  @IsString()
  @IsOptional()
  is_host: boolean;

  @IsOptional()
  profile_picture: Buffer;

  @IsString()
  @IsOptional()
  nation: string;
}
