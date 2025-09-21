import { Injectable } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from 'src/entities/prescription.entity';
import { Repository } from 'typeorm';
import { Appointment } from 'src/entities/appointment.entity';
import { Doctor } from 'src/entities/doctor.entity';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private readonly preRepo: Repository<Prescription>,
    @InjectRepository(Appointment)
    private readonly appRepo : Repository<Appointment>,
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>
  ){}
  async create(
    createPrescriptionDto: CreatePrescriptionDto
  ):Promise<{ prescription: Prescription}> {
    const appointment = await this.appRepo.findOneBy({ id: createPrescriptionDto.appointmentId})
    if(!appointment){
      throw new Error("The appointment does not exist")
    }

    const doctor = await this.doctorRepo.findOneBy({ id: createPrescriptionDto.doctorId})
    if(!doctor){
      throw new Error("The doctor does not exists")
    }
    const prescription = await this.preRepo.create({
      appointmentId: appointment.id,
      doctorId: doctor.id,
      medication: createPrescriptionDto.medications,
      notes: createPrescriptionDto.notes
    }) 

    const savedPrescription = await this.preRepo.save(prescription)
    return  { prescription: savedPrescription}
  }


  async findAll(): Promise <{ prescriptions: Prescription[]}> {
    const prescriptions = await this.preRepo.find()
    return { prescriptions}
  }

  async findOne(id: string) {
    const prescription = await this.preRepo.findOneBy({ id })
    if(!prescription){
      throw new Error("Prescription Not Found")
    }
    return { prescription }
  }

  async update(
    id: string, updatePrescriptionDto: UpdatePrescriptionDto
  ): Promise<{ prescription: Prescription}> {
    const prescription = await this.preRepo.findOneBy({ id })
    if(!prescription){
      throw new Error("Prescription Not Found")
    }
    await this.preRepo.merge(prescription, updatePrescriptionDto)
    const updatedPrescription  = await this.preRepo.save(prescription)

    return { prescription: updatedPrescription}
  }

  async remove(id: string): Promise<{ message: string}> {
     const prescription = await this.preRepo.findOneBy({ id })
    if(!prescription){
      throw new Error("Prescription Not Found")
    }
    await this.preRepo.remove(prescription)
    return { message: " The prescription has been removed "};
  }
}
