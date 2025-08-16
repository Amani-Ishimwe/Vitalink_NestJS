import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column("varchar",{length: 200})
    name:string
    

    @Column("varchar",{length: 200, unique: true})
    email:string

    @Column({enum: ['PATIENT','DOCTOR','RECEPTIONIST']})
    role:string

    @Column("varchar",{length: 200})
    password:string

    @Column("varchar",{length: 15})
    phone:string

}
