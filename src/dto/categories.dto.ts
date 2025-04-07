import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CategoriesDto {
  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @IsNumber()
  @IsEmpty()
  printerId: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CategoriesUpdateDto extends CategoriesDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsEmpty()
  updatedBy: number;
}
