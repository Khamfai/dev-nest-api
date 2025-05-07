import { Module } from '@nestjs/common';
import { TableZonesService } from './table-zones.service';
import { TableZonesController } from './table-zones.controller';

@Module({
  controllers: [TableZonesController],
  providers: [TableZonesService],
})
export class TableZonesModule {}
