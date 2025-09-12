import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Roles("ADMIN", "RECEPTIONIST", "PATIENT")
  @Get()
  findAll() {
    return this.billingService.findAll();
  }

  @Roles("ADMIN", "RECEPTIONIST", "PATIENT")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.billingService.findOne(id);
  }
  @Roles("ADMIN", "RECEPTIONIST")
  @Post(":appointmentId")
  create(
    @Param("appointmentId") appointmentId: string,
    @Body() dto: CreateBillingDto
  ) {
    return this.billingService.create(appointmentId, dto);
  }

  @Roles("ADMIN", "RECEPTIONIST")
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateBillingDto) {
    return this.billingService.update(id, dto);
  }

  @Roles("ADMIN")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.billingService.remove(id);
  }
}
