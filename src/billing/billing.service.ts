import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from 'src/entities/bill.entity';
import { Appointment } from 'src/entities/appointment.entity';
import { Patient } from 'src/entities/patient.entity';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Bill)
    private billRepo: Repository<Bill>,
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
    @InjectRepository(Patient)   
    private patientRepo: Repository<Patient>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10
  ): Promise<{ bills: Bill[] }> {
    const skip = (page -1 ) * limit
    const bills = await this.billRepo.find({
      skip,
      take: limit
  });
    return { bills };
  }

  async findOne(id: string): Promise<Bill> {
    const bill = await this.billRepo.findOne({ where: { id } });
    if (!bill) throw new NotFoundException("Bill not found");
    return bill;
  }

  async create(dto: CreateBillingDto): Promise<Bill> {
    const patient = await this.patientRepo.findOne({ where: { id: dto.patientId } });
    if (!patient) throw new NotFoundException("This patient does not exist");

    const appointment = await this.appointmentRepo.findOne({ where: { id: dto.appointmentId } });
    if (!appointment) throw new NotFoundException("Appointment not found");

    const calculatedAmount = dto.amount ?? 100;

    const bill = this.billRepo.create({
      patientId: patient.id,
      appointmentId: appointment.id,
      amount: calculatedAmount,
      status: 'PENDING',
      issueDate: new Date(),
    });

    return this.billRepo.save(bill);
  }

  async update(id: string, dto: UpdateBillingDto): Promise<Bill> {
    const bill = await this.findOne(id);
    Object.assign(bill, dto);
    return this.billRepo.save(bill);
  }

  async remove(id: string): Promise<void> {
    const bill = await this.findOne(id);
    await this.billRepo.remove(bill);
  }
}
