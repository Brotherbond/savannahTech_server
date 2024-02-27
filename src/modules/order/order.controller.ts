import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ObjectId } from 'typeorm';
import { ObjectIdPipe } from '@/core/pipes/object-id.pipe';

@Controller({ path: 'orders', version: '1' })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Post('many')
  async createMany() {
    return this.orderService.createMany();
  }

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ObjectIdPipe) id: ObjectId) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ObjectIdPipe) id: ObjectId,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id', ObjectIdPipe) id: ObjectId) {
    return this.orderService.remove(id);
  }
}
