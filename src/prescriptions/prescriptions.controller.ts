import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Get()
  findAll() {
    return this.prescriptionsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionsService.update(id, updatePrescriptionDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionsService.remove(id);
  }
}
