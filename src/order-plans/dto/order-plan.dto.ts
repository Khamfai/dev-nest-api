import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderPlanDto {
  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @IsNumber()
  @IsNotEmpty()
  planId: number;

  @IsNumber()
  @IsNotEmpty()
  start: number;

  @IsNumber()
  @IsNotEmpty()
  end: number;

  @IsNumber()
  @IsOptional()
  createdBy?: number;
  updatedBy: number | null;
}

export class UpdateOrderPlanDto extends PartialType(CreateOrderPlanDto) {
  @IsNumber()
  @IsOptional()
  updatedBy?: number;
}
