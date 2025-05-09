import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  permission: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsNumber()
  @IsOptional()
  createdBy?: number;
}

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @IsNumber()
  @IsOptional()
  updatedBy?: number;
}
