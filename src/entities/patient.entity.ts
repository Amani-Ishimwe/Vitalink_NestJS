import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Patient{
    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @Column("varchar",{length:200})
    name:string

    @Column("varchar",{length:200})
    email:string

}