import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('billing')
@ApiTags("Billing")
@ApiBearerAuth()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN", "RECEPTIONIST", "PATIENT")
  @Get()
  @ApiOperation({ summary: "Fetch all the billings"})
  @ApiResponse({status: 200, description: "Billings Fetched Successfully"})
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.billingService.findAll(page, limit);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN", "RECEPTIONIST", "PATIENT")
  @Get(":id")
  @ApiOperation({ summary: "FInd One Billing"})
  @ApiResponse({status:200, description: " One Billing Fetched Successfully"})
  findOne(@Param("id") id: string) {
    return this.billingService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN", "RECEPTIONIST")
  @Post(":appointmentId")
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: "Create Billing"})
  @ApiResponse({ status: 201, description: "Billing created successfullt"})
  create(
    @Param("appointmentId") appointmentId: string,
    @Body() dto: CreateBillingDto
  ) {
    return this.billingService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN", "RECEPTIONIST")
  @Patch(":id")
  @ApiOperation({ summary: " Update A Billing"})
  @ApiResponse({ status: 200, description: " Billing updated successfully"})
  update(@Param("id") id: string, @Body() dto: UpdateBillingDto) {
    return this.billingService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN")
  @Delete(":id")
  @ApiOperation({ summary: " Update A Billing"})
  @ApiResponse({ status: 200, description: " Billing updated successfully"})
  remove(@Param("id") id: string) {
    return this.billingService.remove(id);
  }
}
