import { User } from './user.entity';
import { Bill } from './bill.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Appointment } from './appointment.entity';
import { RoomAssign } from './roomAssign.entity';


export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  @Index()
  userId: string;

  @OneToOne(() => User, (user) => user.patient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'date' })
  dob: Date;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

 
  @Column({ nullable: true })
  insuranceInfo?: string;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @OneToMany(() => RoomAssign, (room) => room.patient)
  roomAssignments: RoomAssign[];

  @OneToMany(() => Bill, (bill) => bill.patient)
  bills: Bill[];
}
