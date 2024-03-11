import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AccommodationService } from '../services/accommodation.service';
import { FilteringDto } from '../dtos/filtering.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { CurrentUserId } from 'src/common/decorators/current-user-id.decorator';
import { Serialize } from '../interceptors';
import { AccommodationListDto } from '../dtos/accommodationlist.dto';
import { PAuthGuard } from 'src/common/guards/jwt-public-auth.guard';

@Controller('/')
export class AccommodationController {
  constructor(private accommodationService: AccommodationService) {}

  @Get()
  @Serialize(AccommodationListDto)
  @UseGuards(PAuthGuard)
  getList(@CurrentUserId() user_id: string) {
    //  @CurrentUserId() user_id : string
    //  '96170b59-c0c4-412b-8d18-62eca8a7a665'

    return this.accommodationService.getList(user_id);
  }
  //  use filter
  // @Public()
  @Post('filtering')
  @Serialize(AccommodationListDto)
  @UseGuards(PAuthGuard)
  getListByFilter(
    @Body() filtering: FilteringDto,
    @CurrentUserId() user_id: string,
  ) {
    return this.accommodationService.getListByFilter(filtering, user_id);
  }

  // @Public()
  @Get('filteroptions')
  getFilterOptions() {
    return this.accommodationService.getFilterOptions();
  }

  @Public()
  @Post('filteredamount')
  getAvailableListAmount(@Body() filtering: FilteringDto) {
    return this.accommodationService.getAmountOfFilteredList(filtering);
  }

  @Public()
  @Get('rooms/:id')
  getRoom(@Param('id') id: string) {
    return this.accommodationService.findOne(id);
  }
}
