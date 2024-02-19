import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  user_id: number;

  created_at: Date;

  updated_at: Date;

  deleted_at: Date;

  @Expose()
  email: string;

  password_hash: string;

  @Expose()
  date_of_birth: string;

  @Expose()
  last_name: string;

  @Expose()
  first_name: string;

  @Expose()
  phone_number: string;

  @Expose()
  is_host: boolean;

  @Expose()
  profile_picture: Buffer;

  is_active: boolean;

  @Expose()
  nation: string;
}
