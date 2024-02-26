import { Controller, Get, Req, Post, Body, Param } from '@nestjs/common';
import { AccommodationService } from '../services/accommodation.service';
import { FilteringDto } from '../dtos/filtering.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { CurrentUserId } from 'src/common/decorators/current-user-id.decorator';

@Controller('/')
export class AccommodationController {
  constructor(private accommodationService: AccommodationService) {}
  @Get()
  @Public()
  getList() {
    //  @CurrentUserId() user_id : string
    //  '96170b59-c0c4-412b-8d18-62eca8a7a665'
    return this.accommodationService.getList(
      '96170b59-c0c4-412b-8d18-62eca8a7a665',
    );
  }
  //  use filter
  @Public()
  @Post('filtering')
  getListByFilter(
    @Body() filtering: FilteringDto,
    @CurrentUserId() user_id: string,
  ) {
    return this.accommodationService.getListByFilter(filtering, user_id);
  }

  @Public()
  @Get('filteroptions')
  getFilterOptions() {
    return this.accommodationService.getFilterOptions();
  }

  @Public()
  @Post('filter')
  getAvailableListNumber() {}

  @Public()
  @Get('filteroption')
  getFilterOption() {}

  @Public()
  @Get('rooms/:id')
  getRoom(@Param('id') id: string) {
    return this.accommodationService.findOne(id);
  }
}
