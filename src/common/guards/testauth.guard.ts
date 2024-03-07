import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Scope,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JWT_SECRET } from 'src/user/constants/jwt.constant';
import { UserService } from 'src/user/services';

@Injectable({ scope: Scope.REQUEST })
export class PAuthGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly jwtService: JwtService,
    private userRepo: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    console.log('token is there? ', token);
    if (token) {
      try {
        const decoded = this.jwtService.verify(token, { secret: JWT_SECRET });
        const userId = decoded.user_id;
        console.log('hello', userId); // 사용자 ID 출력
        const user = await this.userRepo.findOneByUserId(userId);
        // 사용자 정보를 Request 객체에 저장
        request.user = user;

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    return true;
  }
}

// @Injectable({ scope: Scope.REQUEST })
// export class PublicAuthGuard extends PAuthGuard {
//   constructor(reflector: Reflector, jwtService: JwtService) {
//     super(reflector, jwtService);
//   }

//   canActivate(context: ExecutionContext): boolean {
//     const isPublic = this.reflector.get('isPublic', context.getHandler());
//     if (isPublic) {
//       // 토큰 검증 없이 접근 허용
//       return true;
//     }

//     return super.canActivate(context);
//   }
// }
