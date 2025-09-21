import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN','RECEPTIONIST')
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN','RECEPTIONIST')
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ) {
    return this.patientsService.findAll(page, limit);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN','RECEPTIONIST','PATIENT')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN','RECEPTIONIST')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN','RECEPTIONIST')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}
