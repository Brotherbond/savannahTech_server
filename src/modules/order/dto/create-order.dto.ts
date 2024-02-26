import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'typeorm';

export class CreateOrderDto {
  customerName: string;
  staffID: ObjectId;
  products: OrderProductDTO[];
}

export class OrderProductDTO {
  @IsNotEmpty()
  @IsString()
  productID: ObjectId;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
