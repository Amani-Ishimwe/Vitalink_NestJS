import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from 'src/entities/bill.entity';
import { Appointment } from 'src/entities/appointment.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Bill, Appointment])
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
