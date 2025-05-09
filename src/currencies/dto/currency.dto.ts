import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  symbol: string;

  @IsNumber()
  @IsOptional()
  createdBy?: number;
}

export class UpdateCurrencyDto extends PartialType(CreateCurrencyDto) {
  @IsNumber()
  @IsOptional()
  updatedBy?: number;
}
