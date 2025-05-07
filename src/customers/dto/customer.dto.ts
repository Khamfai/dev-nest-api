import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @IsString()
  @IsOptional()
  tel?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  prId?: number;

  @IsNumber()
  @IsOptional()
  drId?: number;

  @IsNumber()
  @IsOptional()
  villId?: number;

  @IsNumber()
  @IsOptional()
  score?: number;

  @IsNumber()
  @IsOptional()
  createdBy?: number;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  shopId?: number;

  @IsString()
  @IsOptional()
  tel?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  prId?: number;

  @IsNumber()
  @IsOptional()
  drId?: number;

  @IsNumber()
  @IsOptional()
  villId?: number;

  @IsNumber()
  @IsOptional()
  score?: number;

  @IsNumber()
  @IsOptional()
  updatedBy?: number;
}
