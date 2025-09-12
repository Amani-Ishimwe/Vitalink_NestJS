import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShiftSchedule } from 'src/entities/shiftSchedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(ShiftSchedule)
    private scheduleRepo: Repository<ShiftSchedule>
  ) {}

  findAll() {
    return this.scheduleRepo.find({ relations: ["doctor"] });
  }

  async findOne(id: string) {
    const schedule = await this.scheduleRepo.findOne({
      where: { id },
      relations: ["doctor"],
    });
    if (!schedule) throw new NotFoundException("Schedule not found");
    return schedule;
  }

  create(dto: CreateScheduleDto) {
    const schedule = this.scheduleRepo.create(dto);
    return this.scheduleRepo.save(schedule);
  }

  async update(id: string, dto: UpdateScheduleDto) {
    const schedule = await this.findOne(id);
    Object.assign(schedule, dto);
    return this.scheduleRepo.save(schedule);
  }

  async remove(id: string) {
    const schedule = await this.findOne(id);
    return this.scheduleRepo.remove(schedule);
  }
}
