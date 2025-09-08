import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Receptionist } from "./reception.entity";
import { Doctor } from "./doctor.entity";

@Entity()
export class Department{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar",{length:200})
    name: string;
    
    @Column("varchar",{ length: 500})
    description: string;
   
    @OneToMany(() => Receptionist, (receptionist) => receptionist.department)
    receptionists: Receptionist[];
    
    @OneToMany(() => Doctor, (doctor) => doctor.department)
    doctors: Doctor[];
}