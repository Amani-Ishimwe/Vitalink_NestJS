import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender, Patient } from 'src/entities/patient.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class PatientsService {

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ){}

  async create(
    createPatientDto: CreatePatientDto
  ): Promise<{ patient: Patient }> {
    const user = await this.userRepo.findOneBy({ id: createPatientDto.userId })
    if (!user) {
      throw new Error('User not found')
    }
    if (user.role !== 'PATIENT'){
      throw new Error('User is not a patient')
    }
    
    const existingPatient = await this.patientRepo.findOneBy({ userId: createPatientDto.userId })
    if (existingPatient){
      throw new Error('Patient profile already exists for this user')
    }
    const newPatient = this.patientRepo.create({
      userId: user.id,
      dob: createPatientDto.dob,
      gender: createPatientDto.gender,
      insuranceInfo: createPatientDto.insuranceInfo,
    })
    const savedPatient = await this.patientRepo.save(newPatient)
    return { patient: savedPatient }
  }
    


  async findAll(
    page: number = 1,
    limit: number = 2
  ):Promise<{ patients: Patient[]}> {
    const skip = (page - 1) * limit
    const patients = await this.patientRepo.find({
      skip,
      take: limit
    })
    return {patients}
  }

  async findOne(id: string): Promise<{ patient: Patient }> {
    const patient = await this.patientRepo.findOneBy({ id });
    if (!patient) {
      throw new Error('Patient not found');
    }
    return { patient };
  }

  async update(id: string, updatePatientDto: UpdatePatientDto): Promise<{ patient: Patient }> {
    const patient = await this.patientRepo.findOneBy({ id });
    if (!patient) {
      throw new Error('Patient not found');
    }
    this.patientRepo.merge(patient, {
      ...updatePatientDto
    });
    const updatedPatient = await this.patientRepo.save(patient);
    return { patient: updatedPatient };
  }

   async remove(id: string): Promise<{ message: string }> {
     const patient = await this.patientRepo.findOneBy({ id });
     if (!patient) {
       throw new Error('Patient not found');
     }
     await this.patientRepo.remove(patient);
     return { message: `Patient #${id} removed successfully` };
   }
}
