import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { Accommodation } from '../entities/accommodation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from '../entities/wishlist.entity';
import { FilteringDto } from '../dtos/filtering.dto';
import { Amenity } from '../entities/amenity.entity';
import { BookingOption } from '../entities/booking_option.entity';

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(Accommodation)
    private accommodationRepo: Repository<Accommodation>,
    @InjectRepository(Wishlist) private wishRepo: Repository<Wishlist>,
    @InjectRepository(Amenity) private amenityRepo: Repository<Amenity>,
    @InjectRepository(BookingOption)
    private bookoptionRepo: Repository<BookingOption>,
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

  async getFilterOptions() {
    const amenities = await this.amenityRepo.find();
    const bookoptions = await this.bookoptionRepo.find();
    return { amenity: [...amenities], bookoptions: [...bookoptions] };
  }

  async getListByFilter(filtering: FilteringDto, user_id: string) {
    const wishlistSelection =
      user_id !== null
        ? {
            wishlist_id: true,
            user: {
              user_id: true,
            },
          }
        : false;
    const wishlistRelation = user_id !== null ? { user: true } : false;

    const whereCondition: any = {
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
        accommodation_has_amenities: {
          amenity: true,
        },
        accommodation_has_booking_options: {
          booking_option: true,
        },
      },
      order: {
        created_at: 'DESC',
      },
      where: {
        accommodation_type: {
          accommodation_type_id: filtering.accommodation_type_id,
        },
        price: Between(filtering.price_min, filtering.price_max),
        bed_number:
          filtering.bed_number !== 0
            ? filtering.bed_number
            : MoreThanOrEqual(0),
        room_number:
          filtering.room_number !== 0
            ? filtering.room_number
            : MoreThanOrEqual(0),
        bathroom_number:
          filtering.bathroom_number !== 0
            ? filtering.bathroom_number
            : MoreThanOrEqual(0),
        building_type: {},
      },
    };
    if (filtering.building_type_id) {
      whereCondition.where.building_type.building_type_id =
        filtering.building_type_id;
    }
    let firstFiltered = await this.accommodationRepo.find(whereCondition);

    const requestedAmenities = filtering.amenity.map(
      (amenity) => amenity.amenity_id,
    );

    const requestedBookOptions = filtering.booking_option.map(
      (option) => option.booking_option_id,
    );

    firstFiltered = firstFiltered.filter((accommodation) => {
      const accommodationAmenities = new Set(
        accommodation.accommodation_has_amenities.map(
          (amenity) => amenity.amenity.amenity_id,
        ),
      );
      const accommodationBookOptions = new Set(
        accommodation.accommodation_has_booking_options.map(
          (option) => option.booking_option.booking_option_id,
        ),
      );
      return (
        requestedAmenities.every((amenity) =>
          accommodationAmenities.has(amenity),
        ) &&
        requestedBookOptions.every((option) =>
          accommodationBookOptions.has(option),
        )
      );
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
        firstFiltered.map((obj) => [obj.accommodation_id, obj]),
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

    return firstFiltered;
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
        accommodation_has_amenities: {
          amenity: true,
        },
        accommodation_has_booking_options: {
          booking_option: true,
        },
      },
    });
    if (!accommodation) {
      throw new NotFoundException('Accommodation not found.');
    }
    return accommodation;
  }
}
