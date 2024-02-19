import { IsEmail, IsString } from 'class-validator';

export class SigninUsernDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
