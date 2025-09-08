
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

    @Column({type:'uuid'})
    @Index()
    wardId: string;

    @ManyToOne(() => Ward, {

    })
    @JoinColumn({name: 'wardId'})
    ward: Ward

    @Column("date")
    checkIn: Date

    @Column("date", {nullable: true})
    checkOut ?: Date;

}