import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserPermissionsService } from './user-permissions.service';
import {
  CreateUserPermissionDto,
  UpdateUserPermissionDto,
} from './dto/create-user-permission.dto';
import { CurrentUser } from 'src/decorator/user.decorator';
import { User } from 'src/interfaces/user.interface';
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
  findAll(@CurrentUser() user: User) {
    return this.userPermissionsService.findAll(user.shopId);
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
