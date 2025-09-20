import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment, Status } from 'src/entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from 'src/entities/department.entity';
import { Doctor } from 'src/entities/doctor.entity';
import { Patient } from 'src/entities/patient.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appRepo: Repository<Appointment>,
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>
  ){}
  async create(
    createAppointmentDto: CreateAppointmentDto
  ): Promise<{ appointment: Appointment}> {

    const doctor = await this.doctorRepo.findOneBy({ id:  createAppointmentDto.doctorId})
    if(!doctor){
      throw new Error("Doctor Does Not Exist")
    }

    const patient = await this.patientRepo.findOneBy({ id: createAppointmentDto.patientId})
    if(!patient){
      throw new Error("Patient does not exist")
    }

    const appointment = await this.appRepo.findOneBy({ 
        doctorId: createAppointmentDto.doctorId,
        patientId: createAppointmentDto.patientId
    })
    if(appointment){
      throw new Error("Appointment Already Exists")
    }

    const newAppointment = await this.appRepo.create({
      doctorId: createAppointmentDto.doctorId,
      patientId:createAppointmentDto.patientId,
      status:createAppointmentDto.status || Status.PENDING,
      notes: createAppointmentDto.notes
  })
  const savedAppointment = await this.appRepo.save(newAppointment)
    return { appointment: savedAppointment};
  }

  async findAll():Promise<{ appointments: Appointment[]}> {
    const appointments =  await this.appRepo.find({
      relations:["doctor","patient"]
    });
    return { appointments }
  }

  // async findOne(id: string) {
  //   const appointment = await this.appRepo.findOneBy({ id})
  //   if(!appointment){
  //     throw new Error("Department not found")
  //   }
  //   return { appointment}
  // }

  async findByDoctor(doctorId: string):Promise<{ appointments: Appointment[]}>{
    const appointments = await this.appRepo.find({
      where: { doctorId },
      relations: ["doctor", "patient"]
    })
    return  {appointments}
  }

  async findByPatient(patientId: string):Promise<{ appointments: Appointment[]}>{
    const appointments =  await this.appRepo.find({
      where: {patientId},
      relations: ["doctor", "patient"]
    })
    return { appointments }
  }

  async update(
    id: string, updateAppointmentDto: UpdateAppointmentDto
   ): Promise<{ appointment: Appointment}> {
    const department = await this.appRepo.findOneBy({ id })
    if(!department){
      throw new Error("Appointment Does Not Exist")
    }
  await this.appRepo.merge(department,updateAppointmentDto)
  const updatedAppointment = await this.appRepo.save(department)
  return { appointment: updatedAppointment}
  }

  async remove(id: string):Promise<{ message: string}> {
   const appointment = await this.appRepo.findOneBy({ id })
   if(!appointment){
    throw new Error("Appointment Does Not Exist")
   }
   await this.appRepo.remove(appointment)
   return { message: "Appointment Deleted Successfully"}
  }


}
