import { Transform } from 'class-transformer';
import {
  Entity,
  Column,
  ObjectId,
  ObjectIdColumn,
  BeforeInsert,
} from 'typeorm';

enum CommissionType {
  Amount,
  Percentage,
}

@Entity('products')
export class Product {
  @ObjectIdColumn()
  @Transform((params) => params.obj.id.toString())
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  category: string;

  @Column()
  commission: number;

  @Column({ default: CommissionType.Percentage })
  commissionType: CommissionType;

  @Column({ default: '$' })
  currency: string;

  @Column()
  price: number;

  @BeforeInsert()
  setDefaultCommissionType() {
    this.commissionType = CommissionType.Percentage;
  }

  constructor() {
    this.commissionType = CommissionType.Percentage;
    this.currency = '$';
  }
}
