import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Roles('ADMIN')
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.doctorsService.findAll(page, limit);
  }
 

  @Roles('ADMIN','DOCTOR')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @Roles('ADMIN', 'DOCTOR')
  @Get(':id/appointments')
  fetchAppointments(@Param('id') id: string) {
    return this.doctorsService.fetchAppointments(id);
  }

  @Roles('ADMIN', 'DOCTOR')
  @Get(':id/schedule')
  fetchSchedule(@Param('id') id: string) {
    return this.doctorsService.fetchSchedule(id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
}
