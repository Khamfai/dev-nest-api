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
import { CurrentUser } from 'src/decorator/user.decorator';
import { User } from 'src/interfaces/user.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAllCategories(@CurrentUser() user: User, @Query() params: PaginationDto) {
    const total = this.categoriesService.count();
    const data = this.categoriesService.findAll(user.shopId, params);
    return { total, data };
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
