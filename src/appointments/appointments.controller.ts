import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Roles('DOCTOR')
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Roles('DOCTOR')
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }


  @Roles('DOCTOR')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Roles('DOCTOR')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }

  @Roles('DOCTOR')
  findByDoctor(@Param('id') id: string){
    return this.appointmentsService.findByDoctor(id)
  }

  @Roles('PATIENT')
  @Get('patient/:id')
  findByPatient(@Param('id') id: string){
    return  this.appointmentsService.findByPatient(id)
  }
}
