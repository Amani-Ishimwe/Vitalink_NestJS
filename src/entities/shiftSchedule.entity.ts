import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./doctor.entity";

@Entity('shiftSchedule')
export class ShiftSchedule{
     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column({type: 'uuid'})
     @Index()
     doctorId: string;

     @ManyToOne(() => Doctor, {})
     doctor: Doctor;

     @Column("date")
     startTime: Date;

     @Column("date")
     endTime: Date;
    
     @Column({enum : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']})
     day: string;

}