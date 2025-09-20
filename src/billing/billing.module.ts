import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from 'src/entities/bill.entity';
import { Appointment } from 'src/entities/appointment.entity';
import { Patient } from 'src/entities/patient.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Bill, Appointment,Patient])
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
