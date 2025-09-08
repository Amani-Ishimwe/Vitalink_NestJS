import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.entity";
import { Appointment } from "./appointment.entity";

@Entity()
export class Bill{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'string'})
    @Index()
    patientId: string;

    @ManyToOne(() => Patient,{})
    @JoinColumn({ name: 'patientId'})
    patient: Patient;

    @Column({ type: 'uuid'})
    @Index()
    appointmentId: string;

    @ManyToOne(() => Appointment, {})
    @JoinColumn({ name: 'appointmentId'})
    appointment: Appointment;

}