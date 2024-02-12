import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Accommodation } from './entity/accommodation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entity/wishlist.entity';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(Accommodation)
    private accommodationRepo: Repository<Accommodation>,
    @InjectRepository(Wishlist) private wishRepo: Repository<Wishlist>,
  ) {}

  async getList(user_id: string) {
    const wishlistSelection = user_id
      ? {
          wishlist_id: true,
          user: {
            user_id: true,
          },
        }
      : false;
    const wishlistRelation = user_id ? { user: true } : false;

    const accommodations = await this.accommodationRepo.find({
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
        wishlists: wishlistSelection,
      },
      relations: {
        country: true,
        city: true,
        pictures: true,
        wishlists: wishlistRelation,
      },
      order: {
        created_at: 'DESC',
      },
    });
    if (user_id) {
      const wishlists = await this.wishRepo.find({
        relations: {
          accommodation: true,
        },
        where: {
          user: {
            user_id,
          },
        },
      });

      const mapA = new Map(
        accommodations.map((obj) => [obj.accommodation_id, obj]),
      );

      for (const wishlist of wishlists) {
        if (mapA.get(wishlist.accommodation.accommodation_id)) {
          const accObj = mapA.get(wishlist.accommodation.accommodation_id);
          accObj.wishlists = [
            {
              wishlist_id: wishlist.wishlist_id,
              accommodation: undefined,
              user: undefined,
            },
          ];
        }
      }
    }
    return accommodations;
  }

  async findOne(id: string) {
    const accommodation = await this.accommodationRepo.findOne({
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
