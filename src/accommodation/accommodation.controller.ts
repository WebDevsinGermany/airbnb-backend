import { Controller, Get, Req, Post, Body, Param } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { Request } from 'express';

@Controller('/')
export class AccommodationController {
  constructor(private accommodationService: AccommodationService) {}
  @Get()
  getList(@Req() request: Request) {
    return this.accommodationService.getList();
  }

  @Post('filtering')
  getListByFilter() {}

  @Post('filter')
  getAvailableListNumber() {}

  @Get('filteroption')
  getFilterOption() {}

  @Get('rooms/:id')
  getRoom(@Param('id') id: string) {
    return this.accommodationService.findOne(id);
  }
}
