import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./doctor.entity";
import { Patient } from "./patient.entity";
import { Prescription } from "./prescription.entity";
import { Bill } from "./bill.entity";
import { CANCELLED } from "dns";


export enum Status{
    PENDING = 'PENDING',
    CONFIRMED ='CONFIRMED',
    CANCELLED ='CANCELLED',
    COMPLETED ='COMPLETED'

}
@Entity('appointment')
export class Appointment{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'uuid'})
    @Index()
    doctorId: string;

    @ManyToOne(() => Doctor, {
        onDelete: 'SET NULL'
    })
    @JoinColumn({name:'doctorId'})
    doctor: Doctor;

    @Column({type: 'uuid'})
    @Index()
    patientId: string;

    @ManyToOne(() => Patient, {
        onDelete: 'SET NULL'
    })
    @JoinColumn({name:'patientId'})
    patient: Patient;
    
    @Column({
        type: 'enum',
        enum: Status
    })
    status: string;

    @Column("varchar",{length:500})
    notes: string;
    
    @OneToOne(() => Prescription, (prescription) => prescription.appointment)
    prescription: Prescription; 

    @OneToOne(() => Bill, (bill) => bill.appointment)
    bill: Bill;

}