import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Accommodation } from './entity/accommodation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entity/wishlist.entity';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(Accommodation) private repo: Repository<Accommodation>,
    @InjectRepository(Wishlist) private wishRepo: Repository<Wishlist>,
  ) {}

  async getList() {
    const accommodation = await this.repo.find({
      select: {
        accommodation_id: true,
        price: true,
        city: {
          city_name: true,
        },
        country: {
          country_name: true,
        },
        pictures: true,
        review_average: true,
      },
      relations: {
        country: true,
        city: true,
        pictures: true,
      },
    });
    return accommodation;
  }
}
