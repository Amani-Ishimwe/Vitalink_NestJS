import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/entities/doctor.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Department } from 'src/entities/department.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Department)
    private readonly depaRepo: Repository<Department>
  ){}
  
  async create(
    createDoctorDto: CreateDoctorDto
  ): Promise<{ doctor: Doctor}> {

    const user = await this.userRepo.findOneBy({ id: createDoctorDto.userId })
    if(!user){
      throw new Error('User not found')
    }
    const existingDoctor = await this.doctorRepo.findOneBy({ userId: createDoctorDto.userId })
    if (existingDoctor) {
      throw new Error('Doctor already exists')
    }

    const department = await this.depaRepo.findOneBy({id : createDoctorDto.departmentId})
    if(!department){
      throw new Error("Department does not exist")
    }

    const newDoctor = this.doctorRepo.create({
      userId: user.id,
      departmentId: department.id,
      specialization: createDoctorDto.specialization,
    })
    const savedDoctor = await this.doctorRepo.save(newDoctor)
    return { doctor: savedDoctor };
  }

  async findAll(
    page: number, limit:number
  ): Promise<{ doctors: Doctor[]}> {
    const skip = (page - 1) * limit;
    const doctors =await this.doctorRepo.find({
      skip,
      take: limit,
      relations:["user","department"]
    })
    return { doctors }
  }

  async findOne(id: string) {
    const doctor = await this.doctorRepo.findOne({
      where: {id},
      relations: ["user", "department"]
    });
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return { doctor };
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<{ doctor: Doctor }> {
    const doctor = await this.doctorRepo.findOneBy({ id });
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    this.doctorRepo.merge(doctor, updateDoctorDto);
    const updatedDoctor = await this.doctorRepo.save(doctor);
    return { doctor: updatedDoctor };
  }

  async remove(id: string): Promise<{ message: string }> {
    const doctor = await this.doctorRepo.findOneBy({ id });
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    await this.doctorRepo.remove(doctor);
    return { message: 'Doctor removed successfully' };
  }
  async fetchAppointments(doctorId: string): Promise<{ appointments: any[] }> {
    const doctor = await this.doctorRepo.findOne({
      where: { id: doctorId },
      relations: ['appointment'],
    });
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return { appointments: doctor.appointment };
  }
  async fetchSchedule(doctorId: string): Promise<{ schedule: any[] }> {
    const doctor = await this.doctorRepo.findOne({
      where: { id: doctorId },
      relations: ['schedule'],
    });
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return { schedule: doctor.shiftSchedules };
  }
}