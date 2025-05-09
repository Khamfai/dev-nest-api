import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  limitUser?: number;

  @IsNumber()
  @IsOptional()
  limitBill?: number;

  @IsNumber()
  @IsOptional()
  limitDay?: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  createdBy?: number | null;
  updatedBy?: number | null;
}

export class UpdatePlanDto extends PartialType(CreatePlanDto) {
  @IsNumber()
  @IsOptional()
  updatedBy?: number;
}
