import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ where: { email } });
  }

  async findOne(_id: ObjectId) {
    return await this.userRepository.findOne({
      where: { _id: new ObjectId(_id) },
    });
  }

  async update(id: ObjectId, updateDestinationDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateDestinationDto);
  }

  async remove(id: ObjectId) {
    return await this.userRepository.delete({ id });
  }
}
