import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { WardsService } from './ward-room.service';
import { CreateWardDto } from './dto/create-ward-room.dto';
import { UpdateWardRoomDto } from './dto/update-ward-room.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateRoomAssignDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("RECEPTIONIST", "ADMIN")
export class WardsController {
  constructor(private readonly wardsService: WardsService) {}

  // Wards
  @Get("wards")
  findAll() {
    return this.wardsService.findAll();
  }

  @Get("wards/:id")
  findOne(@Param("id") id: string) {
    return this.wardsService.findOne(id);
  }

  @Post("wards")
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateWardDto) {
    return this.wardsService.create(dto);
  }

  @Patch("wards/:id")
  update(@Param("id") id: string, @Body() dto: UpdateWardRoomDto) {
    return this.wardsService.update(id, dto);
  }

  @Delete("wards/:id")
  remove(@Param("id") id: string) {
    return this.wardsService.remove(id);
  }

  // Room Assignments
  @Post("room-assignments")
  @UsePipes(new ValidationPipe())
  assign(@Body() dto: CreateRoomAssignDto) {
    return this.wardsService.assignRoom(dto);
  }

  @Patch("room-assignments/:id")
  updateAssign(@Param("id") id: string, @Body() dto: UpdateRoomDto) {
    return this.wardsService.updateAssignment(id, dto);
  }

  @Delete("room-assignments/:id")
  removeAssign(@Param("id") id: string) {
    return this.wardsService.removeAssignment(id);
  }
}
