import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Optional,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ObjectIdPipe implements PipeTransform<string> {
  private _convert: boolean;
  constructor(@Optional() convert = true) {
    this._convert = convert;
  }
  transform(value: string, metadata: ArgumentMetadata): string | ObjectId {
    try {
      if (ObjectId.isValid(value))
        return this._convert ? new ObjectId(value) : value;
      throw new BadRequestException('Invalid ObjectId');
    } catch (error) {}
  }
}
