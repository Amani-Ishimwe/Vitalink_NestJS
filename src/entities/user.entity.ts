import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column({unique: true})
    email:string

    @Column({enum: ['PATIENT','DOCTOR','RECEPTIONIST']})
    role:string

    @Column()
    password:string

    @Column()
    phone:string

}
