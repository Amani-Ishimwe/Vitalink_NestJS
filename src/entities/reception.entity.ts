import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./department.entity";
import { User } from "./user.entity";

@Entity()
export class Receptionist{
   @PrimaryGeneratedColumn('uuid')
   id: string;
   
   @Column({type: 'uuid'})
   @Index()
   userId: string;

   @OneToOne(() => User, {
      onDelete: 'CASCADE'
   })
   @JoinColumn({ name: 'userId' })
   user: User;

   @Column({type:'uuid'})
   @Index()
   departmentId: string;

   @ManyToOne(() => Department, {
    onDelete: 'SET NULL'
   })

   @JoinColumn({ name: 'departmentId'})
   department: Department;
  
}