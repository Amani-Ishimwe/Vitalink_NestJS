import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftSchedule } from 'src/entities/shiftSchedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShiftSchedule])
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
