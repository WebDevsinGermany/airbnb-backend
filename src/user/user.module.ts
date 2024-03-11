import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import { PasswordService } from './services/password.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    PasswordService,
    TokenService,
    AccessTokenStrategy,
  ],
  exports: [UserService],
})
export class UserModule {}
