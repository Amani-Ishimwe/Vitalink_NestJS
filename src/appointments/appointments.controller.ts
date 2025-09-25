import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('appointments')
@ApiTags('Appointments')
@ApiBearerAuth('access-token')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: "Creating a New Appointment"})
  @ApiResponse({ status: 201, description: "New Appointment Has Been Added" })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Get()
  @ApiOperation({ summary: "Fetching All Appointments"})
  @ApiResponse({ status: 200, description: "All appointments have been successfully added"})
  @ApiQuery({ name: 'page', required: false, type: Number, description : 'Page Number (Default : 1)'})
  @ApiQuery({ name : 'limit' , required: false, type: Number, description: 'Items per page (Default: 10'})
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit : number = 10
  ) {
    return this.appointmentsService.findAll(page, limit);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Patch(':id')
  @ApiOperation({ summary: "Update an appointment "})
  @ApiResponse({ status: 200,  description: "Appointment updated Successfully"})
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Delete(':id')
  @ApiOperation({ summary: "Delete Appointment"})
  @ApiResponse({ status: 200, description: "Appointment deleted successfully"})
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Get('doctor/:id')
  @ApiOperation({ summary: "fetch appointments by doctor"})
  @ApiResponse({ status: 200, description: "Appointments fetched successfully" })
  findByDoctor(@Param('id') id: string){
    return this.appointmentsService.findByDoctor(id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  @Get('patient/:id')
  @ApiOperation({ summary: "fetches appointments by patient"})
  @ApiResponse({ status: 200, description: "Appointments fetched successfully"})
  findByPatient(@Param('id') id: string){
    return  this.appointmentsService.findByPatient(id)
  }
}
