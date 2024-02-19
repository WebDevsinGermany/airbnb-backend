import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailIsTakenError extends HttpException {
  constructor() {
    super('🤖 이미 존재하는 이메일입니다', HttpStatus.CONFLICT);
  }
}
