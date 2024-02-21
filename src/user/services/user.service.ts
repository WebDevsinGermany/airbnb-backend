import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByUserId(id: any): Promise<User | null> {
    return await this.userRepository.findOneBy({ user_id: id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async create({ email, password, ...rest }: Partial<User>) {
    const newUser = this.userRepository.create({
      email,
      password,
      ...rest,
    });

    return await this.userRepository.save(newUser);
  }

  async update(id: number, attrs: Partial<User>) {
    const user: User = await this.findOneByUserId(id);

    if (!user) {
      throw new NotFoundException('👻 User does not exist.');
    }

    Object.assign(user, attrs);

    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user: User = await this.findOneByUserId(id);

    if (!user) {
      throw new NotFoundException('👻 User does not exist.');
    }

    return await this.userRepository.softRemove(user);
  }
}
