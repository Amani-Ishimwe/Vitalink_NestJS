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

@Entity('patients')
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

  // Gender enum
  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  // Insurance (optional)
  @Column({ nullable: true })
  insuranceInfo?: string;

  /* ========= Relations ========= */

  // Patient can have many appointments
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  // Prescriptions come through Appointments
  // (no direct relation here, handled via Appointment entity)

  // Patient can be assigned to many rooms
  @OneToMany(() => RoomAssign, (room) => room.patient)
  roomAssignments: RoomAssign[];

  // Patient can have many bills
  @OneToMany(() => Bill, (bill) => bill.patient)
  bills: Bill[];
}
