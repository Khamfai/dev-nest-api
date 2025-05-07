import { $Enums } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @IsNumber()
  @IsNotEmpty()
  planId: number;

  @IsNumber()
  @IsNotEmpty()
  paymentId: number;

  @IsNumber()
  @IsNotEmpty()
  currId: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum($Enums.PaymentStatus)
  @IsOptional()
  paymentStt?: $Enums.PaymentStatus;

  @IsNumber()
  @IsOptional()
  createdBy?: number;
}
