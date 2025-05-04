import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  createPermission(@Body() data: CreatePermissionDto) {
    return this.permissionsService.create(data);
  }

  @Get()
  findAllPermissions() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  findOnePermission(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  updatePermission(@Param('id') id: string, @Body() data: UpdatePermissionDto) {
    return this.permissionsService.update(+id, data);
  }

  @Delete(':id')
  removePermission(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
