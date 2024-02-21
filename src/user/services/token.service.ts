import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload, Tokens } from '../interfaces';
import { JWT_SECRET } from 'src/user/constants/jwt.constant';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async generateToken(user_id: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      user_id,
      email,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, this._getAccessTokenOptions()),
      this.jwtService.signAsync(jwtPayload, this._getRefreshTokenOptions()),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
  private _getRefreshTokenOptions(): JwtSignOptions {
    return this._getTokenOptions('refresh');
  }

  private _getAccessTokenOptions(): JwtSignOptions {
    return this._getTokenOptions('access');
  }

  private _getTokenOptions(type: 'refresh' | 'access') {
    const options: JwtSignOptions = {
      secret: JWT_SECRET,
      expiresIn: type === 'refresh' ? '1y' : '7d',
    };

    return options;
  }
}
