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

  async validate(email: string, password: string) {
    const user = await this.userService.findOneByAttr('email', email);

    if (!user) {
      throw new NotFoundException('👻 유저가 존재하지 않습니다.');
    }

    if (!(await this.passwordService.compare(password, user.password))) {
      throw new UnauthorizedException('🔑 비밀번호가 일치하지 않습니다.');
    }

    return user;
  }

  async signup(body: Partial<User>) {
    const { email, password, profile_picture, ...rest } = body;

    const existingUser = await this.userService.findOneByAttr('email', email);

    if (existingUser !== undefined && existingUser !== null) {
      throw new EmailIsTakenError();
    } else {
      return this.userService.create({
        email,
        password: await this.passwordService.encrypt(password),
        // 🚨 profile_picture 필드가 nullable하게 수정되어야 함
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

  // 🚨 signout 시 외부 서비스에 대한 요청을 보내는 경우에만 필요함
  async signout(userId: string): Promise<string> {
    return `signout ${userId} success!`;
  }
}
