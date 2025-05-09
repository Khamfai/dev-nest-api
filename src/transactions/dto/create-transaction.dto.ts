import { $Enums } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateTransactionDetailDto } from 'src/transaction-details/dto/create-transaction-detail.dto';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @IsNumber()
  @IsNotEmpty()
  paymentId: number;

  @IsNumber()
  @IsNotEmpty()
  currId: number;

  @IsNumber()
  @IsOptional()
  tableId?: number;

  @IsNumber()
  @IsOptional()
  cusId?: number;

  @IsNumber()
  @IsOptional()
  promoId?: number;

  @IsString()
  @IsNotEmpty()
  billNo: string;

  @IsNumber()
  @IsNotEmpty()
  subTotal: number;

  @IsNumber()
  @IsNotEmpty()
  discount?: number;

  @IsNumber()
  @IsOptional()
  disVal?: number;

  @IsNumber()
  @IsOptional()
  sercharge?: number;

  @IsNumber()
  @IsOptional()
  serVal?: number;

  @IsNumber()
  @IsOptional()
  vat?: number;

  @IsNumber()
  @IsOptional()
  vatVal?: number;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsNumber()
  @IsOptional()
  moneyRecv?: number;

  @IsNumber()
  @IsOptional()
  moneyChg?: number;

  @IsNumber()
  @IsOptional()
  people?: number;

  @IsNumber()
  @IsOptional()
  rate?: number;

  @IsEnum($Enums.PrintStatus)
  @IsOptional()
  printStt?: $Enums.PrintStatus;

  @IsEnum($Enums.PaymentStatus)
  @IsOptional()
  paymentStt?: $Enums.PaymentStatus;

  @IsEnum($Enums.TransactionType)
  @IsNotEmpty()
  tsType: $Enums.TransactionType;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsNumber()
  @IsOptional()
  createdBy?: number;

  @IsArray()
  @IsNotEmpty()
  items: CreateTransactionDetailDto[];
}
