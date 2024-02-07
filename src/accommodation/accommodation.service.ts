import { Injectable, NotFoundException } from '@nestjs/common';
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
      order: {
        created_at: 'DESC',
      },
    });
    // const user = await this.wishRepo.findOneBy({ user });

    const mapA = new Map(
      accommodation.map((obj) => [obj.accommodation_id, obj]),
    );
    return accommodation;
  }

  async findOne(id: string) {
    const accommodation = await this.repo.findOne({
      where: {
        accommodation_id: id,
      },
      relations: {
        country: true,
        city: true,
        pictures: true,
        user: true,
        region: true,
        street: true,
        accommodation_type: true,
        building_type: true,
        accommodation_has_amenities: true,
      },
    });
    if (!accommodation) {
      throw new NotFoundException('Accommodation not found.');
    }
    return accommodation;
  }
}
