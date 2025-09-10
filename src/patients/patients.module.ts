import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/entities/patient.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, User])
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}
