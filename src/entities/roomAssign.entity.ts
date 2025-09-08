
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.entity";
import { Ward } from './ward.entity';

@Entity()
export class RoomAssign{
    @PrimaryGeneratedColumn()
    id:string;

    @Column({type: 'uuid'})
    @Index()
    patientId: string

    @ManyToOne(() => Patient, {})
    @JoinColumn({name: 'patientId'})
    patient: Patient
}