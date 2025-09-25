import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('prescriptions')
@ApiTags("Prescriptions")
@ApiBearerAuth('access-token')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: "Creating Prescription"})
  @ApiResponse({ status: 201, description: "Prescription Created Successfully"})
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Get()
  @ApiOperation({ summary: " Fetching Prescriptions "})
  @ApiResponse({ status:200, description: "Prescriptions fetched successfully"})
  @ApiQuery({ name: 'page', required: false, type: Number, description: "Page Number (default: 1"})
  @ApiQuery({ name: 'limit', required: false, type: Number, description: "Items Per Page (default: 10"})
  findAll(
    @Query('page') page: number = 1,
    @Query('limit')  limit : number = 10
  ) {
    return this.prescriptionsService.findAll(page, limit);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Get(':id')
  @ApiOperation({ summary: "Fetching single prescription"})
  @ApiResponse({ status: 200, description: "Prescription fetched successfully"})
  findOne(@Param('id') id: string) {
    return this.prescriptionsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Patch(':id')
  @ApiOperation({ summary: "Updating single prescription"})
  @ApiResponse({ status: 200, description: "Prescription updated successfully"})
  update(@Param('id') id: string, @Body() updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionsService.update(id, updatePrescriptionDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Delete(':id')
  @ApiOperation({ summary: "Deleting single prescription"})
  @ApiResponse({ status: 200, description: "Prescription deleted successfully"})
  remove(@Param('id') id: string) {
    return this.prescriptionsService.remove(id);
  }
}
