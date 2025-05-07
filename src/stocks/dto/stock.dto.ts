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

  updatedBy: number | null;
}

export class UpdateStockDto extends PartialType(CreateStockDto) {
  @IsNumber()
  @IsOptional()
  prodId?: number;

  @IsNumber()
  @IsOptional()
  qty?: number;

  @IsNumber()
  @IsOptional()
  remaining?: number;

  @IsNumber()
  @IsOptional()
  expDate?: number;

  @IsNumber()
  @IsOptional()
  updatedBy?: number;
}
