import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto, UpdatePlanDto } from './dto/create-plan.dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  create(@Body() data: CreatePlanDto) {
    return this.plansService.create(data);
  }

  @Get()
  findAll() {
    const total = this.plansService.count();
    const data = this.plansService.findAll();

    return { total, data };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdatePlanDto) {
    return this.plansService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plansService.remove(+id);
  }
}
