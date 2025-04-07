import { IsNumber } from 'class-validator';

export class FindOneById {
  @IsNumber()
  id: number;
}
