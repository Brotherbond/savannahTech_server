import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, MongoRepository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: MongoRepository<Product>,
  ) {}

  async create(product: CreateProductDto) {
    return await this.productRepository.save(product);
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: ObjectId) {
    return await this.productRepository.findOne({
      where: { id },
    });
  }

  async update(id: ObjectId, updateDestinationDto: UpdateProductDto) {
    return await this.productRepository.update(id, updateDestinationDto);
  }

  async remove(id: ObjectId) {
    return await this.productRepository.delete(id);
  }
}
