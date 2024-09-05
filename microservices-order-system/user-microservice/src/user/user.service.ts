import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: number) {
    const user = this.userRepository.findById(id);
    if (!user) {
      throw new BadRequestException(`User with id #${id} not found`);
    }

    return user;
  }

  async findAll() {
    const users = this.userRepository.findAll();
    if (!users) {
      throw new BadRequestException(`Users not found`);
    }
  }
}
