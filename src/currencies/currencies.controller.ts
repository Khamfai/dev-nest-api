import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto, UpdateCurrencyDto } from './dto/currency.dto';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post()
  createCurrency(@Body() data: CreateCurrencyDto) {
    return this.currenciesService.create(data);
  }

  @Get()
  findAllCurrencies() {
    return this.currenciesService.findAll();
  }

  @Get(':id')
  findOneCurrency(@Param('id') id: string) {
    return this.currenciesService.findOne(+id);
  }

  @Patch(':id')
  updateCurrency(@Param('id') id: string, @Body() data: UpdateCurrencyDto) {
    return this.currenciesService.update(+id, data);
  }

  @Delete(':id')
  removeCurrency(@Param('id') id: string) {
    return this.currenciesService.remove(+id);
  }
}
