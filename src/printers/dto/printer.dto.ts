import { PartialType } from '@nestjs/mapped-types';
import { $Enums } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePrinterDto {
  @IsNumber()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @IsEnum($Enums.PrinterInterface)
  @IsNotEmpty()
  interface: $Enums.PrinterInterface;

  @IsNumber()
  @IsNotEmpty()
  paperSize: number;

  @IsString()
  @IsOptional()
  ip?: string;

  @IsNumber()
  @IsOptional()
  port?: number;

  @IsNumber()
  @IsOptional()
  createdBy?: number;
}

export class UpdatePrinterDto extends PartialType(CreatePrinterDto) {
  @IsNumber()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  shopId?: number;

  @IsEnum($Enums.PrinterInterface)
  @IsOptional()
  interface?: $Enums.PrinterInterface;

  @IsNumber()
  @IsOptional()
  paperSize?: number;

  @IsString()
  @IsOptional()
  ip?: string;

  @IsNumber()
  @IsOptional()
  port?: number;

  @IsNumber()
  @IsOptional()
  updatedBy?: number;
}
