import { Module } from '@nestjs/common';
import { ReceptionistsService } from './receptionists.service';
import { ReceptionistsController } from './receptionists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receptionist } from 'src/entities/reception.entity';
import { User } from 'src/entities/user.entity';
import { Department } from 'src/entities/department.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Receptionist, User, Department])
  ],
  controllers: [ReceptionistsController],
  providers: [ReceptionistsService],
})
export class ReceptionistsModule {}
