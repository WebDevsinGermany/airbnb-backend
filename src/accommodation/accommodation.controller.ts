import { Controller, Get } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';

@Controller('/')
export class AccommodationController {
  constructor(private accommodationService: AccommodationService) {}
  @Get()
  getList() {
    return this.accommodationService.getList();
  }
}
