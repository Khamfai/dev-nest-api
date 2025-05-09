import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTableDto {
  @IsString()
  @IsNotEmpty()
  tNumber: string;

  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @IsNumber()
  @IsNotEmpty()
  zoneId: number;

  @IsNumber()
  @IsOptional()
  createdBy?: number;
}

export class UpdateTableDto extends PartialType(CreateTableDto) {
  @IsNumber()
  @IsOptional()
  updatedBy?: number;
}
