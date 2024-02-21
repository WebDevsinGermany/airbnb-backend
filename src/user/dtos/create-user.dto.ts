import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  date_of_birth: string;

  @IsString()
  last_name: string;

  @IsString()
  first_name: string;

  @IsString()
  phone_number: string;

  @IsString()
  is_host: boolean;

  // 🚨 need to verify buffer typed value
  @IsOptional()
  profile_picture: Buffer;

  @IsString()
  nation: string;
}
