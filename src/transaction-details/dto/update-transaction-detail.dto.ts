import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDetailDto } from './create-transaction-detail.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateTransactionDetailDto extends PartialType(
  CreateTransactionDetailDto,
) {
  @IsNumber()
  @IsOptional()
  updatedBy?: number;
}
