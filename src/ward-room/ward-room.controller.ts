import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { WardsService } from './ward-room.service';
import { CreateWardDto } from './dto/create-ward-room.dto';
import { UpdateWardRoomDto } from './dto/update-ward-room.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateRoomAssignDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('')
@ApiTags("Wards")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("RECEPTIONIST", "ADMIN")
export class WardsController {
  constructor(private readonly wardsService: WardsService) {}

  // Wards
  @Get("wards")
  @ApiOperation({ summary: "Fetching All Wards "})
  @ApiResponse({ status: 200, description: "All Wards fetched successfully"})
  @ApiQuery({ name: 'page', required: false, type: Number, description: "Page Number (default: 1"})
  @ApiQuery({ name: 'limit', required: false, type: Number, description: "Items Per Page (default: 10"})
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit :number = 10
  ) {
    return this.wardsService.findAll(page, limit);
  }

  @Get("wards/:id")
  @ApiOperation({ summary : "Fetching Ward "})
  @ApiResponse({status: 200, description: "Ward Fetched Successfully" })
  findOne(@Param("id") id: string) {
    return this.wardsService.findOne(id);
  }

  @Post("wards")
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary : "Creating Ward "})
  @ApiResponse({status: 201, description: "Ward created Successfully" })
  create(@Body() dto: CreateWardDto) {
    return this.wardsService.create(dto);
  }

  @Patch("wards/:id")
  @ApiOperation({ summary : "Updating Ward "})
  @ApiResponse({status: 200, description: "Ward updated Successfully" })
  update(@Param("id") id: string, @Body() dto: UpdateWardRoomDto) {
    return this.wardsService.update(id, dto);
  }

  @Delete("wards/:id")
  @ApiOperation({ summary : "Deleting Ward "})
  @ApiResponse({status: 200, description: "Ward deleted Successfully" })
  remove(@Param("id") id: string) {
    return this.wardsService.remove(id);
  }

  // Room Assignments
  @Post("room-assignments")
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary : "Assigning Room "})
  @ApiResponse({status: 201, description: "Room assigned successfully" })
  assign(@Body() dto: CreateRoomAssignDto) {
    return this.wardsService.assignRoom(dto);
  }

  @Patch("room-assignments/:id")
  @ApiOperation({ summary : "updating room assignment"})
  @ApiResponse({status: 201, description: "Room assignment updated successfully" })
  updateAssign(@Param("id") id: string, @Body() dto: UpdateRoomDto) {
    return this.wardsService.updateAssignment(id, dto);
  }

  @Delete("room-assignments/:id")
  @ApiOperation({ summary : "deleting room assignment"})
  @ApiResponse({status: 201, description: "Room assignment deleted successfully" })
  removeAssign(@Param("id") id: string) {
    return this.wardsService.removeAssignment(id);
  }
}
