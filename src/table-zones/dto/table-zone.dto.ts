import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTableZoneDto {
  @IsString()
  @IsNotEmpty()
  zone: string;

  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @IsNumber()
  @IsOptional()
  createdBy?: number;
  updatedBy: number | null;
}

export class UpdateTableZoneDto extends PartialType(CreateTableZoneDto) {
  @IsNumber()
  @IsOptional()
  updatedBy?: number;
}
