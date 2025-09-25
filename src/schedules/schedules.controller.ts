import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, UseGuards, Query } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { Role } from 'src/entities/user.entity';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('schedules')
@ApiTags("Schedules")
@ApiBearerAuth('access-token')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'DOCTOR')
  @Get()
  @ApiOperation({ summary: "Fetches all schedules"})
  @ApiResponse({ status: 200, description: "All Schedules fetched successfully"})
  @ApiQuery({ name: 'page', required: false, type: Number, description: "Page Number (default: 1"})
  @ApiQuery({ name: 'limit', required: false, type: Number, description: "Items Per Page (default: 10"})
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit : number = 10
  ) {
    return this.schedulesService.findAll(page, limit);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'DOCTOR')
  @Get(":id")
  @ApiOperation({ summary: "Fetching single schedule"})
  @ApiResponse({ status: 200, description: "Schedule fetched successfully"})
  findOne(@Param("id") id: string) {
    return this.schedulesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'DOCTOR')
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: "Creating a New Schedule "})
  @ApiResponse({ status: 201, description: "New schedule created successfully"})
  create(@Body() dto: CreateScheduleDto) {
    return this.schedulesService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'DOCTOR')
  @Patch(":id")
  @ApiOperation({ summary: "Updating a schedule"})
  @ApiResponse({ status: 200, description: "Schedule update successfully"})
  update(@Param("id") id: string, @Body() dto: UpdateScheduleDto) {
    return this.schedulesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'DOCTOR')
  @Delete(":id")
  @ApiOperation({ summary: "Deleting a schedule"})
  @ApiResponse({ status: 200, description: "Schedule deleted successfully"})
  remove(@Param("id") id: string) {
    return this.schedulesService.remove(id);
  }
}
