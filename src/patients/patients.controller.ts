import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('patients')
@ApiTags("Patients")
@ApiBearerAuth('access-token')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN','RECEPTIONIST')
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary : "Creating a new patient"})
  @ApiResponse({ status: 201 , description: "New patient created Successfully"})
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN','RECEPTIONIST')
  @Get()
  @ApiOperation({ summary: "Fetching patients"})
  @ApiResponse({ status: 200, description: "Patients fetched successfully"})
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.patientsService.findAll(page, limit);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN','RECEPTIONIST','PATIENT')
  @Get(':id')
  @ApiOperation({ summary : "Fetching a patient successfully"})
  @ApiResponse({ status : 200, description: "Patient fetched successfully"})
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN','RECEPTIONIST')
  @Patch(':id')
  @ApiOperation({ summary : "Updating a patient record"})
  @ApiResponse({ status: 200, description : "Patient Updated Successfully"})
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN','RECEPTIONIST')
  @Delete(':id')
  @ApiOperation({ summary: "Deleting a patient record"})
  @ApiResponse({ status: 200, description : "Patient Deleted Successfully"})
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}
