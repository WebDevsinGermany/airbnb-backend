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

  async findOneByAttr(attr: string, value: any): Promise<User | null> {
    return await this.userRepository.findOne({ where: { [attr]: value } });
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
    const user = await this.findOneByAttr('user_id', id);

    if (!user) {
      throw new NotFoundException('👻 유저가 존재하지 않습니다.');
    }

    Object.assign(user, attrs);

    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOneByAttr('user_id', id);

    if (!user) {
      throw new NotFoundException('👻 유저가 존재하지 않습니다.');
    }

    return await this.userRepository.softRemove(user);
  }
}
