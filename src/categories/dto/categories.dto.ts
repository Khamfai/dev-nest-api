import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCategoriesDto {
  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @IsNumber()
  @IsNotEmpty()
  printerId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  createdBy?: number;
}

export class UpdateCategoriesDto extends PartialType(CreateCategoriesDto) {
  @IsNumber()
  @IsEmpty()
  printerId?: number;

  @IsString()
  @IsEmpty()
  name?: string;

  @IsNumber()
  @IsOptional()
  updatedBy?: number;
}
