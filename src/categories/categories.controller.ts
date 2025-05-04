import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { PaginationDto } from 'src/dto/pagination.dto';
import {
  CreateCategoriesDto,
  UpdateCategoriesDto,
} from 'src/categories/dto/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAllCategories(@Query() params: PaginationDto) {
    const total = this.categoriesService.count();
    const data = this.categoriesService.findAll(params);
    return { total, data };
  }

  @Get('/shop/:shopId')
  findCategoriesByShop(@Param('shopId') shopId: string) {
    return this.categoriesService.findByShop(+shopId);
  }

  @Get(':id')
  findOneCategory(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Post()
  createCategory(@Body() data: CreateCategoriesDto) {
    return this.categoriesService.create(data);
  }

  @Put(':id')
  updateCategory(@Param('id') id: string, @Body() data: UpdateCategoriesDto) {
    return this.categoriesService.update(+id, data);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
