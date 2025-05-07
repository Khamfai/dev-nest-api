import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PrintersService } from './printers.service';
import { CreatePrinterDto, UpdatePrinterDto } from './dto/printer.dto';
import { CurrentUser } from 'src/decorator/user.decorator';
import { User } from 'src/interfaces/user.interface';

@Controller('printers')
export class PrintersController {
  constructor(private readonly printersService: PrintersService) {}

  @Post()
  create(@Body() createPrinterDto: CreatePrinterDto) {
    return this.printersService.create(createPrinterDto);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.printersService.findAll(user.shopId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.printersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdatePrinterDto) {
    return this.printersService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.printersService.remove(+id);
  }
}
