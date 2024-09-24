import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .getOne();
  }

  async findById(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }
}

