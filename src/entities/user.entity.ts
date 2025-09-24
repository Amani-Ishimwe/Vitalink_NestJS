import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.entity";
import { Doctor } from "./doctor.entity";
import { Receptionist } from "./reception.entity";
import { Appointment } from "./appointment.entity";
import { Prescription } from "./prescription.entity";
import { ShiftSchedule } from "./shiftSchedule.entity";
import { Bill } from "./bill.entity";
import { RoomAssign } from "./roomAssign.entity";


export enum Role{
  DOCTOR='DOCTOR',
  ADMIN ='ADMIN',
  RECEPTIONIST= 'RECEPTIONIST',
  PATIENT ='PATIENT'
}

@Entity('user')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column("varchar",{length: 200})
    name:string

    @Column("varchar",{length: 200, unique: true})
    email:string

    @Column({
        type:'enum',
        enum: Role
    })
    role:string

    @Column("varchar",{length: 200})
    password:string


    @Column("varchar",{length: 15})
    phone:string

    @OneToOne(() => Patient, (patient) => patient.user)
    patient: Patient;

    @OneToOne(() => Doctor, (doctor) => doctor.user)
    doctor: Doctor;

    @OneToOne(() => Receptionist, (receptionist) => receptionist.user)
    receptionist: Receptionist;

    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    patientAppointments: Appointment[];

    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    doctorAppointments: Appointment[];

    @OneToMany(() => Prescription, (prescription) => prescription.doctor)
    prescriptions: Prescription[];

    @OneToMany(() => ShiftSchedule, (shift) => shift.doctor)
    shiftSchedules: ShiftSchedule[];

    @OneToMany(() => Bill, (bill) => bill.patient)
    bills: Bill[];

    @OneToMany(() => RoomAssign, (roomAssignment) => roomAssignment.patient)
    roomAssignments: RoomAssign[];

}
