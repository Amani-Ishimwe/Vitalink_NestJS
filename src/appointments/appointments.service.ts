import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment, Status } from 'src/entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from 'src/entities/department.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appRepo: Repository<Appointment>
  ){}
  async create(
    createAppointmentDto: CreateAppointmentDto
  ): Promise<{ appointment: Appointment}> {

    const appointment = await this.appRepo.findOneBy({ id : createAppointmentDto.appointmentId})
    if(appointment){
      throw new Error("Appointment Already Exists")
    }
    const newAppointment = await this.appRepo.create({
      ...createAppointmentDto,
      status:createAppointmentDto.status as Status,
      notes: createAppointmentDto.notes
  })
  const savedAppointment = await this.appRepo.save(newAppointment)
    return { appointment: savedAppointment};
  }

  async findAll():Promise<{ appointments: Appointment[]}> {
    return this.appRepo.find().then(appointments => ({ appointments}));
  }

  async findOne(id: string) {
    const appointment = await this.appRepo.findOneBy({ id})
    if(!appointment){
      throw new Error("Department not found")
    }
    return { appointment}
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
