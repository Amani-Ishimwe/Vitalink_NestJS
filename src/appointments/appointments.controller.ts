import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  findByDoctor(@Param('id') id: string){
    return this.appointmentsService.findByDoctor(id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  @Get('patient/:id')
  findByPatient(@Param('id') id: string){
    return  this.appointmentsService.findByPatient(id)
  }
}
