import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from 'src/entities/bill.entity';
import { Appointment } from 'src/entities/appointment.entity';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Bill)
    private billRepo: Repository<Bill>,
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>
  ) {}

  findAll() {
    return this.billRepo.find();
  }

  async findOne(id: string) {
    const bill = await this.billRepo.findOne({ where: { id } });
    if (!bill) throw new NotFoundException("Bill not found");
    return bill;
  }

  async create(appointmentId: string, dto: CreateBillingDto) {
    const appointment = await this.appointmentRepo.findOne({
      where: { id: appointmentId },
      relations: ["patient"],
    });

    if (!appointment) throw new NotFoundException("Appointment not found");

    // Example: calculate amount (dummy logic)
    const calculatedAmount = dto.amount ?? 100; // TODO: replace with real logic

    const bill = this.billRepo.create({
      ...dto,
      appointmentId,
      patientId: appointment.patient.id,
      amount: calculatedAmount,
      issueDate: new Date(),
    });

    return this.billRepo.save(bill);
  }

  async update(id: string, dto: UpdateBillingDto) {
    const bill = await this.findOne(id);
    Object.assign(bill, dto);
    return this.billRepo.save(bill);
  }

  async remove(id: string) {
    const bill = await this.findOne(id);
    return this.billRepo.remove(bill);
  }
}
