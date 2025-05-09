import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateStockDto {
  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @IsNumber()
  @IsNotEmpty()
  prodId: number;

  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @IsNumber()
  @IsNotEmpty()
  remaining: number;

  @IsNumber()
  @IsOptional()
  expDate?: number;

  @IsNumber()
  @IsOptional()
  createdBy?: number;

  @IsNumber()
  @IsOptional()
  createdAt?: number;
}

export class UpdateStockDto extends PartialType(CreateStockDto) {
  @IsNumber()
  @IsOptional()
  updatedBy?: number;
}
