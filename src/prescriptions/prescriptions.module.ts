import { Module } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescription } from 'src/entities/prescription.entity';
import { Appointment } from 'src/entities/appointment.entity';
import { Doctor } from 'src/entities/doctor.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Prescription, Appointment, Doctor])
  ],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],
})
export class PrescriptionsModule {}
