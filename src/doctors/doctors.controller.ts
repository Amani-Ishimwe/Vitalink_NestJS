import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('doctors')
@ApiTags("Doctors")
@ApiBearerAuth()
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: "Creating a new doctor"})
  @ApiResponse({ status: 201, description : "New Doctor Created Successfully"})
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary : "Fetching all doctors"})
  @ApiResponse({ status :200, description: "Fetched All Doctors Successfully"})
  @ApiQuery({ name :'page', required: false, type : Number, description:"Page number (default : 1)" })
  @ApiQuery({ name :'limit', required: false, type : Number, description:"Items per page (default : 10)" })
  findAll(
   @Query('page') page: number = 1,
   @Query('limit') limit: number = 10) {
    return this.doctorsService.findAll(page, limit);
  }
 

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN','DOCTOR')
  @Get(':id')
  @ApiOperation({summary : "Fetch single doctor" })
  @ApiResponse({ status:200, description:" Doctor fetched successfully"})
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'DOCTOR')
  @Get(':id/appointments')
  @ApiOperation({ summary: "Fetch appointments"})
  @ApiResponse({ status: 200, description: "Appointments fetched successfully"})
  fetchAppointments(@Param('id') id: string) {
    return this.doctorsService.fetchAppointments(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'DOCTOR')
  @Get(':id/schedule')
  @ApiOperation({ summary :"Fetching schedules"})
  @ApiResponse({ status: 200, description: "Fetch schedules successfully"})
  fetchSchedule(@Param('id') id: string) {
    return this.doctorsService.fetchSchedule(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary: "Updating a doctor"})
  @ApiResponse({ status: 200, description: "Doctor Updated successfully"})
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary: "Deleting  A Doctor"})
  @ApiResponse({ status: 200, description: "Doctor Deleted Successfully"})
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
}
