import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  NotFoundException,
  Param,
  Patch,
  HttpStatus,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, SigninUsernDto, UpdateUserDto, UserDto } from '../dtos';
import { Serialize } from 'src/user/interceptors';
import { Public } from 'src/common/decorators/public.decorator';
import { Tokens } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { CurrentUserId } from 'src/common/decorators/current-user-id.decorator';

@Controller('user')
@Serialize(UserDto)
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body(ValidationPipe) body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @Public()
  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body(ValidationPipe) body: SigninUsernDto): Promise<Tokens> {
    const { email, password } = body;

    return await this.authService.signin(
      await this.authService.validate(email, password),
    );
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  signout(@CurrentUserId() userId: string): Promise<string> {
    return this.authService.signout(userId);
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshtoken() {
    return 'refresh token';
  }

  @Get('/:user_id')
  @HttpCode(HttpStatus.OK)
  async findUserById(@Param('user_id') id: string) {
    const user = await this.userService.findOneByAttr(
      'user_id',
      parseInt(id, 10),
    );

    if (user === null) {
      throw new NotFoundException('👻 유저가 존재하지 않습니다.');
    }

    return user;
  }

  @Delete('/:user_id')
  @HttpCode(HttpStatus.OK)
  async removeUserById(@Param('user_id') id: string) {
    return this.userService.remove(parseInt(id, 10));
  }

  @Patch('/:user_id')
  @HttpCode(HttpStatus.OK)
  async updateUserById(
    @Param('user_id') id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.update(parseInt(id, 10), body);
  }
}
