import { Injectable } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from 'src/entities/prescription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private readonly preRepo: Repository<Prescription>
  ){}
  async create(
    createPrescriptionDto: CreatePrescriptionDto
  ):Promise<{ prescription: Prescription}> {
    const prescription = await this.preRepo.create({
      ...createPrescriptionDto,
      medication: createPrescriptionDto.medications,
      notes: createPrescriptionDto.notes
    }) 
    const savedPrescription = await this.preRepo.save(prescription)
    return  { prescription: savedPrescription}
  }


  async findAll(): Promise <{ prescriptions: Prescription[]}> {
    return this.preRepo.find().then(prescriptions => ({ prescriptions}) )
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
