import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserPermissionsService } from './user-permissions.service';
import {
  CreateUserPermissionDto,
  UpdateUserPermissionDto,
} from './dto/create-user-permission.dto';
import { CurrentUser } from 'src/decorator/user.decorator';
import { User } from 'src/interfaces/user.interface';
import { PaginationDto } from 'src/dto/pagination.dto';
@Controller('user-permissions')
export class UserPermissionsController {
  constructor(
    private readonly userPermissionsService: UserPermissionsService,
  ) {}

  @Post()
  create(@Body() data: CreateUserPermissionDto) {
    return this.userPermissionsService.create(data);
  }

  @Get()
  findAll(@CurrentUser() user: User, @Query() query?: PaginationDto) {
    const total = this.userPermissionsService.count(user.shopId);
    const data = this.userPermissionsService.findAll(user.shopId, query);

    return { total, data };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPermissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserPermissionDto) {
    return this.userPermissionsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPermissionsService.remove(+id);
  }
}
