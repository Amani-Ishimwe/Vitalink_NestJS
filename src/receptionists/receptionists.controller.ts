import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ReceptionistsService } from './receptionists.service';
import { CreateReceptionistDto } from './dto/create-receptionist.dto';
import { UpdateReceptionistDto } from './dto/update-receptionist.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('receptionists')
@ApiTags("Receptionists")
@ApiBearerAuth('access-token')
export class ReceptionistsController {
  constructor(private readonly receptionistsService: ReceptionistsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary : "Creating  a receptionist"})
  @ApiResponse({ status: 201, description: "Receptionist created successfully"})
  create(@Body() createReceptionistDto: CreateReceptionistDto) {
    return this.receptionistsService.create(createReceptionistDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary : "Fetching All Receptionists"})
  @ApiResponse({ status: 200, description: "All Receptionists fetched successfully"})
  @ApiQuery({ name: 'page', required: false, type: Number, description: "Page Number (default: 1"})
  @ApiQuery({ name: 'limit', required: false, type: Number, description: "Items Per Page (default: 10"})
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit : number = 10
    ) {
    return this.receptionistsService.findAll(page, limit);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN','RECEPTIONIST')
  @Get(':id')
  @ApiOperation({ summary : "Fetching single receptionist"})
  @ApiResponse({ status: 200, description: "Receptionist fetched successfully"})
  findOne(@Param('id') id: string) {
    return this.receptionistsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary : "Updating single receptionist"})
  @ApiResponse({ status: 200, description: "Receptionist updated successfully"})
  update(@Param('id') id: string, @Body() updateReceptionistDto: UpdateReceptionistDto) {
    return this.receptionistsService.update(id, updateReceptionistDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary : "Deleting single receptionist"})
  @ApiResponse({ status: 200, description: "Receptionist deleted successfully"})
  remove(@Param('id') id: string) {
    return this.receptionistsService.remove(id);
  }
}
