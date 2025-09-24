import { Column, Entity, Index, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointment.entity";
import { Doctor } from "./doctor.entity";

@Entity('prescription')
export class Prescription{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'uuid'})
  @Index()
  appointmentId: string;

  @OneToOne(() => Appointment, (appointment) => appointment.prescription)
  appointment: Appointment;
  
  @Column({type:'uuid'})
  @Index()
  doctorId: string; 

  @ManyToOne(() => Doctor, (doctor) => doctor.prescription )
  doctor: Doctor;

  @Column({type: 'jsonb'})
  medication: { name: string; dosage: string; instructions: string }[];

  @Column("varchar",{length: 500 })
  notes: string;

}