import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLanguageDto {
  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  locale: string;
}

export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {}
