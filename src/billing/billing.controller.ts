import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN", "RECEPTIONIST", "PATIENT")
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 1
  ) {
    return this.billingService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN", "RECEPTIONIST", "PATIENT")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.billingService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN", "RECEPTIONIST")
  @Post(":appointmentId")
  @UsePipes(new ValidationPipe())
  create(
    @Param("appointmentId") appointmentId: string,
    @Body() dto: CreateBillingDto
  ) {
    return this.billingService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN", "RECEPTIONIST")
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateBillingDto) {
    return this.billingService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.billingService.remove(id);
  }
}
