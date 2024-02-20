import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { PasswordService } from './password.service';
import { UserService } from 'src/user/services/user.service';
import { EmailIsTakenError } from 'src/user/errors';
import { TokenService } from './token.service';
import { Tokens } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async validate(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('👻 User does not exist.');
    }

    if (!(await this.passwordService.compare(password, user.password))) {
      throw new UnauthorizedException('🔑 The password does not match.');
    }

    return user;
  }

  async signup(body: Partial<User>) {
    const { email, password, profile_picture, ...rest } = body;

    const existingUser: User = await this.userService.findOneByEmail(email);

    if (existingUser !== undefined && existingUser !== null) {
      throw new EmailIsTakenError();
    } else {
      return this.userService.create({
        email,
        password: await this.passwordService.encrypt(password),
        // 🚨 profile_picture field should be edited to be nullable
        profile_picture: profile_picture || Buffer.from(''),
        is_active: true,
        ...rest,
      });
    }
  }

  async signin(user: User): Promise<Tokens> {
    const { user_id, email } = user;

    return this.tokenService.generateToken(user_id, email);
  }

  // 🚨 this method only required when requests to third-party services.
  async signout(userId: string): Promise<string> {
    return `signout ${userId} success!`;
  }
}
