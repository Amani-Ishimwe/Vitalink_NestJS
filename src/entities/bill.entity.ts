import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.entity";
import { Appointment } from "./appointment.entity";

@Entity('bill')
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

    @Column("decimal",{ precision: 10, scale: 2 })
    amount: number;

    @Column({ enum: ['PENDING', 'PAID', 'OVERDUE']})
    status: string;

    @Column("date")
    issueDate: Date;

}