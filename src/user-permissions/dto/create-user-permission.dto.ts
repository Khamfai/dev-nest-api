import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserPermissionDto {
  @IsNumber()
  @IsNotEmpty()
  uid: number;

  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @IsNumber()
  @IsNotEmpty()
  permisId: number;
}

export class UpdateUserPermissionDto extends PartialType(
  CreateUserPermissionDto,
) {
  @IsNumber()
  @IsNotEmpty()
  uid: number;

  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  @IsNumber()
  @IsNotEmpty()
  permisId: number;
}
