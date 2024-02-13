import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { Accommodation } from '../entities/accommodation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from '../entities/wishlist.entity';
import { User } from 'src/user/entity/user.entity';
import { FilteringDto } from '../dtos/filtering.dto';

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

  getListByFilter(filtering: FilteringDto) {
    this.accommodationRepo.find({
      where: {
        accommodation_type: {
          accommodation_type_id: filtering.accommodation_type_id,
        },
        price: Between(filtering.price_min, filtering.price_max),
        room_number: filtering.room_number,
      },
    });
  }

  async findOne(id: string) {
    /**
     * review data, review count
     */
    const accommodation = await this.accommodationRepo.findOne({
      where: {
        accommodation_id: id,
      },
      relations: {
        country: {
          location_category: true,
        },
        city: true,
        pictures: true,
        user: true,
        region: true,
        street: true,
        accommodation_type: true,
        building_type: true,
        accommodation_has_amenities: true,
        accommodation_has_booking_options: true,
      },
    });
    if (!accommodation) {
      throw new NotFoundException('Accommodation not found.');
    }
    return accommodation;
  }
}
