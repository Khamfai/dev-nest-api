import { $Enums } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransactionDetailDto {
  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @IsNumber()
  @IsNotEmpty()
  tsId: number;

  @IsNumber()
  @IsNotEmpty()
  proId: number;

  @IsNumber()
  @IsNotEmpty()
  qty: number;
  price: number;

  @IsNumber()
  @IsNotEmpty()
  subTotal: number;

  @IsNumber()
  @IsOptional()
  discount?: number;

  @IsNumber()
  @IsOptional()
  disVal?: number;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsEnum($Enums.PrintStatus)
  @IsOptional()
  printStt?: $Enums.PrintStatus;

  @IsEnum($Enums.PaymentStatus)
  @IsOptional()
  paymentStt?: $Enums.PaymentStatus;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsNumber()
  @IsOptional()
  createdBy?: number;

  @IsNumber()
  @IsOptional()
  createdAt?: number;
}
