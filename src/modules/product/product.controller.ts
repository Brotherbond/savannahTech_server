import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ObjectId } from 'typeorm';
import { UpdateManyProductDto } from './dto/update-many-product.dto';
import { ObjectIdPipe } from '@/core/pipes/object-id.pipe';

@Controller({ path: 'products', version: '1' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ObjectIdPipe) id: ObjectId) {
    return this.productService.findOne(id);
  }

  @Patch('many')
  async updateMany(@Body() updateManyProductDto: UpdateManyProductDto) {
    return this.productService.updateMany(updateManyProductDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ObjectIdPipe) id: ObjectId,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id', ObjectIdPipe) id: ObjectId) {
    return this.productService.remove(id);
  }
}
