import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Department } from "./department.entity";
import { Appointment } from "./appointment.entity";
import { Prescription } from "./prescription.entity";
import { ShiftSchedule } from "./shiftSchedule.entity";

@Entity()
export class Doctor{
    @PrimaryGeneratedColumn('uuid')
    id: string;
     
    @Column({type: 'uuid'})
    @Index()
    userId: string
    
     @OneToOne(() => User,{
         onDelete: 'CASCADE',
     })
    @JoinColumn({name:'userId'})
    user: User;
    
    @Column("varchar",{length:100})
    specialization:string

    @Column({type:'uuid' })
    @Index()
    departmentId:string

    @ManyToOne(() => Department, {
        onDelete: 'SET NULL'
    })
    @JoinColumn({name:'departmentId'})
    department: Department;

    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointment: Appointment[];
    
    @OneToMany(() => Prescription, (prescription) => prescription.doctor)
    prescription: Prescription[];

    @OneToMany(() => ShiftSchedule, (shiftSchedule) => shiftSchedule.doctor)
    shiftSchedules: ShiftSchedule[];

}