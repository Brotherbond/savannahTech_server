import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId as ObjectID } from 'mongodb';
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

  async findOne(_id: ObjectId) {
    return await this.productRepository.findOne({
      where: { _id: new ObjectID(_id) },
    });
  }

  async update(_id: ObjectId, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(
      { _id: new ObjectID(_id) },
      updateProductDto,
    );
  }

  async remove(_id: ObjectId) {
    return await this.productRepository.delete(new ObjectID(_id));
  }
}
