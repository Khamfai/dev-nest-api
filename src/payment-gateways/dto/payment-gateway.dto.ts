import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentGatewayDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  createdBy?: number;
  updatedBy: number | null;
}

export class UpdatePaymentGatewayDto extends PartialType(
  CreatePaymentGatewayDto,
) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  updatedBy: number | null;
}
