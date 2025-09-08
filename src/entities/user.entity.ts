import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.entity";
import { Doctor } from "./doctor.entity";
import { Receptionist } from "./reception.entity";
import { Appointment } from "./appointment.entity";
import { Prescription } from "./prescription.entity";
import { ShiftSchedule } from "./shiftSchedule.entity";
import { Bill } from "./bill.entity";
import { RoomAssign } from "./roomAssign.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column("varchar",{length: 200})
    name:string


    @Column("varchar",{length: 200, unique: true})
    email:string

    @Column({enum: ['PATIENT','DOCTOR','RECEPTIONIST','ADMIN']})
    role:string

    @Column("varchar",{length: 200})
    password:string

    @Column("varchar",{length: 15})
    phone:string

     @OneToOne(() => Patient, (patient) => patient.user)
  patient: Patient;

  // One-to-One with Doctor
  @OneToOne(() => Doctor, (doctor) => doctor.user)
  doctor: Doctor;

  // One-to-One with Receptionist
  @OneToOne(() => Receptionist, (receptionist) => receptionist.user)
  receptionist: Receptionist;

  // One-to-Many with Appointments (as patient)
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  patientAppointments: Appointment[];

  // One-to-Many with Appointments (as doctor)
  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  doctorAppointments: Appointment[];

  // One-to-Many with Prescriptions (as doctor)
  @OneToMany(() => Prescription, (prescription) => prescription.doctor)
  prescriptions: Prescription[];

  // One-to-Many with ShiftSchedules (as doctor)
  @OneToMany(() => ShiftSchedule, (shift) => shift.doctor)
  shiftSchedules: ShiftSchedule[];

  // One-to-Many with Bills (as patient)
  @OneToMany(() => Bill, (bill) => bill.patient)
  bills: Bill[];

  // One-to-Many with RoomAssignments (as patient)
  @OneToMany(() => RoomAssign, (roomAssignment) => roomAssignment.patient)
  roomAssignments: RoomAssign[];

}
