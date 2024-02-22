import { Controller, Get, Req, Post, Body, Param } from '@nestjs/common';
import { AccommodationService } from '../services/accommodation.service';
import { FilteringDto } from '../dtos/filtering.dto';

@Controller('/')
export class AccommodationController {
  constructor(private accommodationService: AccommodationService) {}
  @Get()
  getList() {
    //  @CurrentUserId() userId : string
    //  '96170b59-c0c4-412b-8d18-62eca8a7a665'
    return this.accommodationService.getList(
      '96170b59-c0c4-412b-8d18-62eca8a7a665',
    );
  }
  //  use filter
  @Post('filtering')
  getListByFilter(@Body() filtering: FilteringDto) {
    return this.accommodationService.getListByFilter(filtering);
  }

  @Post('filter')
  getAvailableListNumber() {}

  @Get('filteroption')
  getFilterOption() {}

  @Get('rooms/:id')
  getRoom(@Param('id') id: string) {
    return this.accommodationService.findOne(id);
  }
}
