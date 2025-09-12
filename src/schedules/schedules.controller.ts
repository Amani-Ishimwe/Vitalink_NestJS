import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Roles('ADMIN', 'DOCTOR')
  @Get()
  findAll() {
    return this.schedulesService.findAll();
  }

  @Roles('ADMIN', 'DOCTOR')
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.schedulesService.findOne(id);
  }

  @Roles('ADMIN', 'DOCTOR')
  @Post()
  create(@Body() dto: CreateScheduleDto) {
    return this.schedulesService.create(dto);
  }

  @Roles('ADMIN', 'DOCTOR')
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateScheduleDto) {
    return this.schedulesService.update(id, dto);
  }

  @Roles('ADMIN', 'DOCTOR')
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.schedulesService.remove(id);
  }
}
