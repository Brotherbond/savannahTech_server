import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ObjectIdPipe } from '@/core/pipes/object-id.pipe';

@Controller({ path: 'users', version: '1' })
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: UserDto): Promise<User> {
    return new User(await this.userService.create(createUserDto));
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('local'))
  async findOne(@Param('id', ObjectIdPipe) id: ObjectId): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ObjectIdPipe) id: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return (await this.userService.update(id, updateUserDto)) as Partial<User>;
  }

  @Delete(':id')
  async remove(@Param('id', ObjectIdPipe) id: ObjectId) {
    return (await this.userService.remove(id)) as Partial<User>;
  }
}
