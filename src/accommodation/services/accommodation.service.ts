import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { Accommodation } from '../entities/accommodation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from '../entities/wishlist.entity';
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

  async getListByFilter(filtering: FilteringDto) {
    // const filteredAccommodation = this.accommodationRepo
    //   .createQueryBuilder('acc')
    //   .leftJoinAndSelect('acc.accommodation_type', 'accommodation_type')
    //   .leftJoinAndSelect('acc.building_type', 'building_type')
    //   .leftJoinAndSelect(
    //     'acc.accommodation_has_amenities',
    //     'accommodation_has_amenities',
    //   )
    //   .leftJoinAndSelect(
    //     'acc.accommodation_has_booking_options',
    //     'accommodation_has_booking_options',
    //   )
    //   .where('acc.price >= :price_min AND acc.price <= :price_max', {
    //     price_min: filtering.price_min,
    //     price_max: filtering.price_max,
    //   });
    // if (filtering.accommodation_type_id) {
    //   filteredAccommodation.andWhere(
    //     'accommodation_type.accommodation_type_id = :accommodation_type_id',
    //     { accommodation_type_id: filtering.accommodation_type_id },
    //   );
    // }

    // if (filtering.bed_number) {
    //   filteredAccommodation.andWhere('acc.bed_number = :bed_number', {
    //     bed_number: filtering.bed_number,
    //   });
    // }
    // if (filtering.room_number) {
    //   filteredAccommodation.andWhere('acc.room_number = :room_number', {
    //     room_number: filtering.room_number,
    //   });
    // }
    // if (filtering.bathroom_number) {
    //   filteredAccommodation.andWhere('acc.bathroom_number = :bathroom_number', {
    //     bathroom_number: filtering.bathroom_number,
    //   });
    // }
    // if (filtering.building_type_id) {
    //   filteredAccommodation.andWhere(
    //     'building_type.building_type_id = :building_type_id',
    //     {
    //       building_type_id: filtering.building_type_id,
    //     },
    //   );
    // }

    // if (filtering.amenity.length !== 0) {
    //   filtering.amenity.forEach((amenity_obj, idx) => {
    //     const dynamic_id = `amenity_id_${idx}`;
    //     filteredAccommodation.andWhere(
    //       `accommodation_has_amenities.amenity_id = :${dynamic_id}`,
    //       { [dynamic_id]: amenity_obj.amenity_id },
    //     );
    //   });
    // }

    // if (filtering.booking_option.length !== 0) {
    //   console.log(filtering.booking_option);
    //   filtering.booking_option.forEach((booking_option_obj, idx) => {
    //     const dynamic_id = `booking_option_id_${idx}`;
    //     filteredAccommodation.andWhere(
    //       `accommodation_has_booking_options.booking_option_id = :${dynamic_id}`,
    //       { [dynamic_id]: booking_option_obj.booking_option_id },
    //     );
    //   });
    // }
    // console.log(filteredAccommodation.getSql());
    // return filteredAccommodation.getMany();
    const whereCondition: any = {
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
        accommodation_has_amenities: { amenity: {} },
      },
    };
    if (filtering.building_type_id) {
      whereCondition.where.building_type.building_type_id =
        filtering.building_type_id;
    }
    const firstFiltered = await this.accommodationRepo.find(whereCondition);

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
